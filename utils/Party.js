// Credit: BloomCore
import Feature from "../core/Feature"
import EventEnums from "../core/EventEnums"
import { Event } from "../core/Event"
import { scheduleTask } from "./Ticker"

const stripRank = (name) => name.replace(/(\[[A-z]+\++\] )/, "")

const messagesToHide = [
    /^-{53}$/,
    /^Party (Members|Members\:|Leader\:|Moderators\:).+$/,
    /^You are not currently in a party\.$/
]

let hidingPartySpam = false
const feat = new Feature()
  .addSubEvent(
    new Event(EventEnums.SERVER.CHAT, (event) => {
      cancel(event)
    }, new RegExp(`(${messagesToHide.join("|")})`)),
    () => hidingPartySpam
  )
  .addSubEvent(
    new Event("messageSent", (msg, event) => {
      if (["/pl", "/party list"].includes(msg)) cancel(event)
    }),
    () => hidingPartySpam
)
  
const hidePartySpam = (ticks) => {
  hidingPartySpam = true
  feat.update()

  scheduleTask(() => {
    hidingPartySpam = false
    feat.update()
  }, ticks)
}

export default new class Party {
	constructor() {
		this.members = {}
		this.leader = null
		this.excludePlayers = [] // Auto reparty won't reinvite these players
		this.memberJoined = [
			/^(.+) &r&ejoined the party.&r$/,
			/^(.+) &r&einvited &r.+ &r&eto the party! They have &r&c60 &r&eseconds to accept.&r$/,
			/^&eYou have joined &r(.+)'[s]? &r&eparty!&r$/,
			/^&dParty Finder &r&f> &r(.+) &r&ejoined the dungeon group! \(&r&b.+&r&e\)&r$/
		]
		this.memberLeft = [
			/^(.+) &r&ehas been removed from the party.&r$/,
			/^(.+) &r&ehas left the party.&r$/,
			/^(.+) was removed from your party because they disconnected.$/,
            /^Kicked (.+) because they were offline.$/
		]
		this.partyDisbanded = [
			/^.+ &r&ehas disbanded the party!&r$/,
			/^&cThe party was disbanded because all invites expired and the party was empty&r$/,
			/^&eYou left the party.&r$/,
			/^&6Party Members \(\d+\)&r$/,
            /^You are not currently in a party\.$/,
            /^You have been kicked from the party by .+$/,
            /^The party was disbanded because the party leader disconnected\.$/
		]
		this.leaderMessages = [
			/^&eParty Leader: &r(.+) &r&a●&r$/,
			/^&eYou have joined &r(.+)'s* &r&eparty!&r$/,
            /^&eThe party was transferred to &r(.+) &r&eby &r.+&r$/
		]

        register("chat", (event) => {
            let formatted = ChatLib.getChatMessage(event, true)
            let unformatted = formatted.removeFormatting()
            this.memberJoined.forEach(regex => {
                let match = formatted.match(regex)
                if (match) this.addMember(match[1])
            })
            this.memberLeft.forEach(regex => {
                let match = formatted.match(regex)
                if (match) this.removeMember(match[1])
            })
            this.leaderMessages.forEach(regex => {
                let match = formatted.match(regex)
                if (match) this.makeLeader(match[1])
            })
            this.partyDisbanded.forEach(regex => {
                let match = formatted.match(regex)
                if (match) this.disbandParty()
            })

            // Joined a party
            if (/&eYou'll be partying with: .+/.test(formatted)) {
                // You'll be partying with: [MVP+] Noob2334, [MVP+] urMomLolxdddd, UnclaimedBloom6
                // (?<=:|,)\s*(?:\[[^\]]+\] )*(\w+)
                let players = formatted.match(/&eYou'll be partying with: (.+)/)[1].split("&e, ")
                for (let p of players) this.addMember(p)
            }
            // Party List shown in chat
            if (/^&eParty .+: (.+)/.test(formatted)) {
                let match = formatted.match(/^&eParty .+: &r(.+)/)
                let players = match[1].split(new RegExp("&r&a ● &r|&r&c ● &r| &r&a●&r| &r&c●&r"))
                for (i in players) {
                    if (players[i].replace(new RegExp(" ", "g"), "") !== "") this.addMember(players[i])
                }
            }
            // You make a party in party finder
            if (unformatted == "Party Finder > Your party has been queued in the dungeon finder!") {
                scheduleTask(() => {
                    hidePartySpam(20)
                    ChatLib.command("pl")
                }, 5);
            }

            // Creating a party
            if (Object.keys(this.members).length == 1) {
                let match = formatted.match(/(.+) &r&einvited &r.+ &r&eto the party! They have &r&c60 &r&eseconds to accept.&r/)
                if (match) this.makeLeader(match[1])
            }

            // Joining a party
            if (/&eYou have joined &r.+'s &r&eparty!&r/.test(formatted)) {
                scheduleTask(() => {
                    hidePartySpam(15)
                    ChatLib.command("pl")
                }, 6);
            }

            // Party leader left
            let match = formatted.match(/&eThe party was transferred to &r(.+) &r&ebecause &r(.+) &r&eleft&r/)
            if (match) {
                if (stripRank(match[2].removeFormatting()) == Player.getName()) this.disbandParty()
                else {
                    this.makeLeader(match[1])
                    this.removeMember(match[2])
                }
            }
        })
	}

	addMember(player) {
		// Can use member's formatted name with rank
        this.members[stripRank(player.removeFormatting())] = player
	}

	removeMember(player) {
        delete this.members[stripRank(player.removeFormatting())]
	}

	makeLeader(player) {
        this.leader = stripRank(player.removeFormatting())
	}

	disbandParty() {
		this.members = {}
		this.leader = null
        this.excludePlayers = []
    }
    
    amILeader() {
        return this.leader === Player.getName()
    }

    getMembers() {
        return Object.keys(this.members)
    }
}
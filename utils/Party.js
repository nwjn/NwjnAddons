// Credit: Bloomcore
import { getPlayerName } from "./functions"
import EventEnums from "../core/EventEnums"
import { Event } from "../core/Event"
import Feature from "../core/Feature"
import { scheduleTask } from "../core/CustomRegisters";

let hidingPartySpam = false
const feat = new Feature()
  .addSubEvent(
    new Event(EventEnums.CHAT, (event) => {
      cancel(event)
    }, /(Party [Members|Leader:|Members:]+.+|-----------------------------------------------------)/),
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

// Party regexes
const criteria = [
  // lead
  ["setLead", /^Party Leader: (.+) ●$/],
  ["setLead", /^You have joined (.+)'s? party!$/],
  ["setLead", /^The party was transferred to (.+) by .+$/],

  // add
  ["add", /^(.+) joined the party.$/],
  ["add", /^(.+) invited .+ to the party! They have 60 seconds to accept.$/],
  ["add", /^You have joined (.+)'s? party!$/],
  ["add", /^Party Finder > (.+) joined the dungeon group! \(.+\)$/],

  // remove
  ["remove", /^(.+) has been removed from the party.$/],
  ["remove", /^(.+) has left the party.$/],
  ["remove", /^(.+) was removed from your party because they disconnected.$/],
  ["remove", /^Kicked (.+) because they were offline.$/],

  // disband
  ["disband", /^(.+ has disbanded the party!)$/],
  ["disband", /^(The party was disbanded because all invites expired and the party was empty)$/],
  ["disband", /^(You left the party.)$/],
  ["disband", /^(Party Members \(\d+\))$/],
  ["disband", /^(You are not currently in a party\.)$/],
  ["disband", /^(You have been kicked from the party by .+)$/],
  ["disband", /^(The party was disbanded because the party leader disconnected\.)$/]
]
const misc = [
  [
    /You'll be partying with: (.+)/,
    (match) => {
      const players = match[1].split(", ")
      players.forEach(it => Party.addMember(it))
    }
  ],
  [
    /^Party .+: (.+)/,
    (match) => {
      const players = match[1].split(/ ● ?/g)
      players.forEach(it => Party.addMember(it.trim()))
    }
  ],
  [
    /^(Party Finder > Your party has been queued in the dungeon finder!)$/,
    (match) => {
      scheduleTask(() => {
        ChatLib.command("party list")
        hidePartySpam(20)
      }, 5)
    }
  ],
  [
    /(.+) invited .+ to the party! They have 60 seconds to accept./,
    (match) => {
      if (Party.getMembers().length <= 1) {
        Party.makeLeader(match[1])
      }
    }
  ],
  [
    /You have joined (.+)'s party!/,
    () => {
      scheduleTask(() => {
        ChatLib.command("party list")
        hidePartySpam(20)
      }, 6)
    }
  ],
  [
    /The party was transferred to (.+) because (.+) left/,
    (match) => {
      if (getPlayerName(match[2]) === Player.getName()) Party.disbandParty()
      else {
        Party.makeLeader(match[1])
        Party.removeMember(match[2])
      }
    }
  ]
]
export default new class Party {
  #members = new Set()
  #leader = null

	constructor() {
    register("chat", (event) => {
      const msg = ChatLib.getChatMessage(event, false)

      criteria.find(([cmd, regex]) => {
        const match = msg.match(regex)
        if (match) return this[cmd](match[1])
      })
      
      // Misc
      misc.find(([regex, fn]) => {
        const match = msg.match(regex)
        if (match) return fn(match)
      })
    })
      .setCriteria(/(?:party|because they were offline)/gi)
      .setPriority(Priority.HIGHEST)
	}

  add(player) {
		this.#members.add(getPlayerName(player))
	}

  remove(player) {
		this.#members.delete(getPlayerName(player))
	}

  setLead(player) {
		this.#leader = getPlayerName(player)
	}

  disband() {
		this.#members.clear()
		this.#leader = null
  }
  
  getMembers() {
    return Array.from(this.#members.values())
  }

  amILeader() {
    return this.#leader === Player.getName();
  }
}
import Event from "../Events/Event"
import ModAPI from "../../../tska/api/ModAPI"
import { scheduleTask } from "../../../tska/shared/ServerTick"
import Seconds from "../Time/Seconds"

export default new class {
    constructor() {
        this.SERVER_IP_REGEX = /^[^\.]+\.hypixel\.net$/
        this.START_PARTY_REGEX = /^(?:\[\w+\+*\] )?\w{1,16} invited .+ to the party! They have 60 seconds to accept\.$/
        this.TRANSFER_PARTY_REGEX = /^The party was transferred to (?:\[\w+\+*\] )?(\w{1,16}) because .+ left$/
        this.DISBAND_PARTY_REGEXES = [
            "(?:\\[\\w+\\+*\\] )?\\w{1,16} has disbanded the party!",
            "The party was disbanded because all invites expired and the party was empty\\.",
            "You left the party\\.",
            "You are not currently in a party\\.",
            "You have been kicked from the party by .+",
            "The party was disbanded because the party leader disconnected\\."
        ]

        this.isLeader = false
        this.inParty = false
        this.members = {}

        ModAPI.on("partyinfo", (inParty, members) => {
            this.inParty = inParty
            this.isLeader = inParty && members[Player.getUUID()] === "LEADER"
            this.members = members
        })
        
        new Event("ServerConnect", this._request.bind(this))

        new Event("ServerChat", () => this.inParty = this.isLeader = false, { setCriteria: new RegExp(`^${this.DISBAND_PARTY_REGEXES.join("|")}$`) })
        new Event("ServerChat", () => this.isLeader = this.isLeader || !this.inParty, { setCriteria: this.START_PARTY_REGEX })
        new Event("ServerChat", (leader) => this.isLeader = Player.getName() === leader.removeFormatting(), { setCriteria: this.TRANSFER_PARTY_REGEX })
        
        if (World.isLoaded()) this._request()
	}

    /** @private */
    _request() {
        if (!this.SERVER_IP_REGEX.test(Server.getIP())) return

        scheduleTask(ModAPI.requestPartyInfo.bind(ModAPI), Seconds.of(2))
    }
}
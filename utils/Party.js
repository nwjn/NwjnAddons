import Event from "../libs/Events/Event"
import ModAPI from "../../tska/api/ModAPI"
import { scheduleTask } from "../libs/Time/ServerTime"
import Seconds from "../libs/Time/Units/Seconds"

export default new class Party {
	constructor() {
        /** @private */ this._isLead = false
        /** @private */ this._inParty = false

        ModAPI.on("partyinfo", (inParty, members) => {
            this._inParty = inParty
            this._isLead = inParty && members[Player.getUUID()] === "LEADER"
        })
        
        new Event("serverConnect", this._request.bind(this))

        new Event("serverChat", () => this._inParty = this._isLead = false, /^(?:\[\w+\+*\] )?\w{1,16} has disbanded the party!|The party was disbanded because all invites expired and the party was empty.|You left the party\.|You are not currently in a party\.|You have been kicked from the party by .+|The party was disbanded because the party leader disconnected\.$/)
        new Event("serverChat", () => this._isLead = this._isLead || !this._inParty, /^(?:\[\w+\+*\] )?\w{1,16} invited .+ to the party! They have 60 seconds to accept\.$/)
        new Event("serverChat", (leader) => this._isLead = Player.getName() === leader.removeFormatting(), /^The party was transferred to (?:\[\w+\+*\] )?(\w{1,16}) because .+ left$/)
        
        if (World.isLoaded()) this._request()
	}

    /** @private */
    _request() {
        if (!/^[^\.]+\.hypixel\.net$/.test(Server.getIP())) return

        scheduleTask(ModAPI.requestPartyInfo.bind(ModAPI), Seconds.of(2))
    }

    isLeader() {
        return this._isLead
    }
}
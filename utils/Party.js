import { HypixelModAPI } from "../../HypixelModAPI";

class Party {
  #members = []
  #leader = ""
  #me = Player.getName()

  constructor() {
    HypixelModAPI.on("partyInfo", (partyInfo) => {
      this.#members = []
      this.#leader = ""
      Object.entries(partyInfo).forEach(([uuid, role]) => {
        const ign = this._uuidToIGN(uuid)
        if (role === "LEADER") this.#leader = ign
        else if (ign !== this.#me) this.#members.push(ign)
      })
    })

    register("step", () => this._getParty()).setDelay(30)
  }

  _uuidToIGN(uuid) {
    JSON.parse(FileLib.getUrlContent(`https://api.ashcon.app/mojang/v2/user/${uuid}`)).username
  }

  _getParty() {
    HypixelModAPI.requestPartyInfo()
  }

  inParty() {
    return this.#members.length && this.#leader
  }

  amILeader() {
    return this.#leader === this.#me
  }

  get Members() {
    return this.#members
  }
}

export default new Party()
import { HypixelModAPI } from "../../HypixelModAPI";
import { delay } from "./functions.js";

class Party {
  #allMemebers = []
  #leader = ""
  constructor() {
    HypixelModAPI.on("partyInfo", (partyInfo) => {
      this.#allMemebers = []
      this.#leader = ""
      Object.entries(partyInfo).forEach(([uuid, role]) => {
        delay(() => {
          if (role === "LEADER") this.#leader = this._uuidToIGN(uuid)
          else this.#allMemebers.push(this._uuidToIGN(uuid))
        }, 50)
      })
    })

    register("step", () => this._getParty()).setDelay(60)
  }

  _uuidToIGN(uuid) {
    JSON.parse(FileLib.getUrlContent(`https://api.ashcon.app/mojang/v2/user/${uuid}`)).username
  }

  _getParty() {
    HypixelModAPI.requestPartyInfo()
  }

  inParty() {
    return () => this.#allMemebers != {}
  }

  amILeader() {
    return this.#leader === Player.getName()
  }

  get Members() {
    return () => this.#allMemebers
  }
}

export default new Party()
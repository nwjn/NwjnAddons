import axios from "../../axios"
import { makeModMessage } from "./functions";

class UpdateUtil {
  #currentVersion = JSON.parse(FileLib.read("NwjnAddons", "metadata.json")).version
  #ctjsVersion = ChatTriggers.MODVERSION
  #hardcodedVersion = "0.11.5"
  
  #newestVersion
  #description
  #broadcast
  #changelog

  constructor() {
    axios.get("https://chattriggers.com/api/modules/1528").then(res => {
      const data = res.data
      const release = data.releases[0]

      this.#changelog = release.changelog.replace(/\\r/g, "  ")
      this.#description = data.description
      this.#newestVersion = release.releaseVersion
      
      if (this.#isNewVersion) return this.#sendUpdatePrompt()
      
      this.#sendBroadcastMessage()
    })
  }

  #isNewVersion() {
    return (
      this.#newestVersion != this.#hardcodedVersion &&
      this.#newestVersion != this.#currentVersion
    )
  }

  #sendUpdatePrompt() {
    ChatLib.chat(ChatLib.getChatBreak("§m-"));
    ChatLib.chat(makeModMessage("Update", `${this.#currentVersion} -> ${this.#newestVersion}`))
    ChatLib.chat(`&eChanges:&r \n${ this.#changelog }\n`)

    ChatLib.chat("Run '&6/ct load&r' if ctjs auto-update enabled")
    new TextComponent("If you have issues with this &nOpen URL!&r for a fix guide.")
      .setClickAction("open_url")
      .setClickValue("https://somethingsomething")
      .chat()
  }

  #sendBroadcastMessage() {
    this.#broadcast = this.#description.substring(
      this.#description.lastIndexOf("[") + 1,
      this.#description.lastIndexOf("]")
    )
    if (this.#broadcast == "null") return

    ChatLib.chat(makeModMessage("Broadcast", this.#broadcast))
  }
}

export default new UpdateUtil
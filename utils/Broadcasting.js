import axios from "../../axios"
import { PREFIX } from "./constants"
import { data } from "./data/DataWriter"

// [Welcome Message]
// very useful trigger
const welcome = register("gameLoad", () => {
  if (data.newUser) {
    data.newUser = false

    ChatLib.chat(`${ PREFIX } &dFrom: &6nwjn: &7Welcome! Open settings with '/nwjn'. Official Discord: https://discord.gg/3S3wXpC4gE`)
  }
  welcome.unregister()
})

// [Broadcast Message]
const messenger = register("worldLoad", () => {
  axios.get("https://chattriggers.com/api/modules/NwjnAddons").then(res => {
    const desc = res.data.description
    const msg = desc.substring(
      desc.lastIndexOf("[") + 1,
      desc.lastIndexOf("]")
    )

    if (msg !== "Nothing" && msg !== data.newMsg) {
      ChatLib.chat(`${ PREFIX } &dFrom: &6nwjn: &7${ msg }`)
      messenger.unregister()
    }
  })
})
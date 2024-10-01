import { TextHelper } from "./TextHelper"
import { data } from "./data/Data"

// [Welcome Message]
// very useful trigger
const welcome = register("worldLoad", () => {
  welcome.unregister()
  if (!data.newUser) return

  data.newUser = false

  ChatLib.chat(`${ TextHelper.PREFIX } &dFrom: &6nwjn: &7Welcome! Open settings with '/nwjn'. Official Discord: https://discord.gg/3S3wXpC4gE`)
})

// [Broadcast Message]
const messenger = register("worldLoad", () => {
  messenger.unregister()
  const desc = JSON.parse(FileLib.getUrlContent("https://chattriggers.com/api/modules/NwjnAddons")).description

  const msg = desc.substring(
    desc.lastIndexOf("[") + 1,
    desc.lastIndexOf("]")
  )

  if (msg !== "Nothing" && msg !== data.newMsg) {
    data.newMsg = msg
    ChatLib.chat(`${ TextHelper.PREFIX } &dFrom: &6nwjn: &7${ msg }`)
  }
});

// [CT Update Message]
const version = register("worldLoad", () => {
  version.unregister()
  const latest = JSON.parse(FileLib.getUrlContent("https://api.github.com/repos/Chattriggers/chattriggers/releases"))[0].name
  if (ChatTriggers.MODVERSION === latest) return
  ChatLib.chat(`${TextHelper.PREFIX} Please use Chattriggers-v${latest} to run this module most efficiently. https://github.com/ChatTriggers/ChatTriggers/releases/tag/${latest}`)
})
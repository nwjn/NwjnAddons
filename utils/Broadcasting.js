import TextUtil from "../core/static/TextUtil"
import { data } from "../data/Data"

// [Welcome Message]
// very useful trigger
const welcome = register("worldLoad", () => {
  welcome.unregister()
  if (!data.newUser) return

  data.newUser = false

  ChatLib.chat(`${ TextUtil.NWJNADDONS } &dFrom: &6nwjn: &7Welcome! Open settings with '/nwjn'. Official Discord: https://discord.gg/3S3wXpC4gE`)
})

const moduleApi = JSON.parse(FileLib.getUrlContent("https://chattriggers.com/api/modules/NwjnAddons"))
// [Broadcast Message]
const messenger = register("worldLoad", () => {
  messenger.unregister()
  const desc = moduleApi.description

  const msg = desc.match(/\[(.+)\]: # $/)?.[1]

  if (msg !== "Nothing" && msg !== data.newMsg) {
    data.newMsg = msg
    ChatLib.chat(`${ TextUtil.NWJNADDONS } &dFrom: &6nwjn: &7${ msg }`)
  }
});

// [CT ModVersion Message]
const version = register("worldLoad", () => {
  version.unregister()
  const release = moduleApi.releases[0]
  const [modVer, moduleVer] = [release.modVersion, release.releaseVersion]

  if (TextUtil.VERSION !== moduleVer || ChatTriggers.MODVERSION === modVer) return
  ChatLib.chat(`${TextUtil.NWJNADDONS} Please use Chattriggers-v${modVer} to run this module most efficiently. https://github.com/ChatTriggers/ChatTriggers/releases/tag/${modVer}`)
})
import axios from "../../axios"
import { PREFIX } from "./constants"
import { data } from "./data/DataWriter"

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
}).unregister();

messenger.register()
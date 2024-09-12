import Settings from "../../utils/Settings"
import { registerWhen } from "../../utils/functions.js";

registerWhen(register("chat", (msg, event) => {
  cancel(event)
  ChatLib.chat(msg)
}).setCriteria("${msg}\n&r&cPlease be mindful of Discord links in chat as they may pose a security risk&r"), () => Settings().discord);
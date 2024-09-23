import Settings from "../../utils/Settings.js"
import { registerWhen } from "../../utils/functions.js";
import Loc from "../../utils/Location.js"

registerWhen(register("chat", (event) => {
  cancel(event)
}).setCriteria("[BOSS] ${*}"), () => Settings().bossCleaner);

registerWhen(register("chat", (msg, event) => {
  cancel(event)
  ChatLib.chat(msg)
}).setCriteria("${msg}\n&r&cPlease be mindful of Discord links in chat as they may pose a security risk&r"), () => Settings().discordCleaner);

registerWhen(register("chat", (event) => {
  cancel(event)
}).setCriteria("[NPC] ${*}"), () => Settings().visitorCleaner && Loc.inWorld("Garden"));
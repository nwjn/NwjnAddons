import settings from "../../config"
import { registerWhen } from "../../utils/functions";
import WorldUtil from "../../utils/world"

registerWhen(register("chat", (event) => {
  cancel(event)
}).setCriteria("[NPC] ${*}"), () => settings.visitorCleaner && WorldUtil.worldIs("Garden"));
import settings from "../../config"
import { registerWhen } from "../../utils/functions";
import { getWorld } from "../../utils/world";

registerWhen(register("chat", (event) => {
  cancel(event)
}).setCriteria("[NPC] ${*}"), () => settings.visitorCleaner && getWorld() === "Garden");
import settings from "../../config"
import { registerWhen } from "../../utils/functions";

registerWhen(register("chat", (event) => {
  cancel(event)
}).setCriteria("[BOSS] ${*}").setPriority(Priority.LOWEST), () => settings.boss);
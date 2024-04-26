import settings from "../../config"
import { registerWhen } from "../../utils/functions";
import { EntityArmorStand } from "../../utils/constants";

let dmgIds = []
registerWhen(register("tick", () => {
  const DMGS = World.getAllEntitiesOfType(EntityArmorStand.class).filter(stand => dmgIds.indexOf(stand.getUUID()) == -1 && !/[❤A-Za-z:-_]/.test(stand.getName()) && /\d/.test(stand.getName().removeFormatting()))
  
  let i = DMGS.length;
  while (i--) {
    const dmg = DMGS[i]
    ChatLib.chat(dmg.getName())
    dmgIds.push(dmg.getUUID())
  }
}), () => settings.damageTracker)

import { onWorldLeave } from "../../utils/functions";
onWorldLeave(() => {
  if (!settings.damageTracker) return
  dmgIds = []
});

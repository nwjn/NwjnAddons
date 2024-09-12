import Settings from "../../utils/Settings.js"
import { registerWhen } from "../../utils/functions.js";
import { EntityArmorStand } from "../../utils/constants";

let dmgIds = []
registerWhen(register("tick", () => {
  const DMGS = World.getAllEntitiesOfType(EntityArmorStand.class).filter(stand => dmgIds.indexOf(stand.getUUID()) == -1 && !/[A-Za-z:-_.#]/.test(stand.getName().removeFormatting()))
  
  let i = DMGS.length;
  while (i--) {
    let dmg = DMGS[i]
    ChatLib.chat(dmg.getName())
    dmgIds.push(dmg.getUUID())
  }
}), () => Settings().damageTracker)

register("worldUnload", () => {
  if (!Settings().damageTracker) return
  dmgIds = []
});
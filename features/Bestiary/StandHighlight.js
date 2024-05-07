import settings from "../../config";
import RenderLib from "RenderLib"
import { registerWhen, getRGB1 } from "../../utils/functions";
import { data } from "../../utils/data";
import { EntityArmorStand } from "../../utils/constants";

let filteredStands = []
registerWhen(register("step", () => {
  const STANDS = World.getAllEntitiesOfType(EntityArmorStand.class)
  filteredStands = []

  STANDS.forEach(stand => {
    data.standList.forEach(entry => {
      if (stand.getName().includes(entry)) filteredStands.push(stand);
    });
  })
}).setDelay(1), () => settings.stand !== "")

registerWhen(register("renderWorld", () => {
  let i = filteredStands.length
  while (i--) {
    const stand = filteredStands[i]
    const closest = World.getWorld().func_72839_b(stand.getEntity(), stand.getEntity().func_174813_aQ().func_72314_b(1, 1, 1)).filter(e => !(e instanceof EntityArmorStand))?.[0]
    
    if (!closest) return;
    RenderLib.drawEspBox(closest.field_70165_t, closest.field_70163_u, closest.field_70161_v, closest.field_70130_N, closest.field_70131_O, ...getRGB1(settings.standColor), 1, false);
  }
}), () => settings.stand !== "")
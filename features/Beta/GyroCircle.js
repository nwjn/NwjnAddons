import settings from "../../config"
import { registerWhen, getRGB1 } from "../../utils/functions";
import RenderLib from "RenderLib"

// Credit: https://www.chattriggers.com/modules/v/Griffinowo
function getVec3iPos(vec) {
  return [~~vec.func_177958_n() + 0.5, ~~vec.func_177956_o() + 1, ~~vec.func_177952_p() + 0.5]
}

registerWhen(register("renderWorld", (partialTick) => {
  if (Player.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString("id") !== "GYROKINETIC_WAND") return;

  const rayTrace = Player.getPlayer().func_174822_a(25, partialTick);

  if (rayTrace.field_72313_a.toString() !== "BLOCK") return;

  RenderLib.drawCyl(...getVec3iPos(rayTrace.func_178782_a()), 10, 1, 0.25, 30, 1, 0, 90, 90, ...getRGB1(settings.gyroColor), settings.gyroOpacity, false, false);
}), () => settings.gyro);
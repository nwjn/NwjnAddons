import settings from "../config";
import { registerWhen, getRGB1 } from "../utils/functions";
import RenderLib from "RenderLib"
import { EntityArmorStand } from "../utils/constants";

// Credit: GriffinOwO on ct for gyro
function getVec3Pos(vec) {
  return [vec.field_72450_a, vec.field_72448_b, vec.field_72449_c]
}

function getVec3iPos(vec) {
  return [parseInt(vec.func_177958_n()), parseInt(vec.func_177956_o()), parseInt(vec.func_177952_p())]
}

registerWhen(register("renderWorld", (partialTick) => {
  let holding = Player.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")
  if (holding?.getString("id") != "GYROKINETIC_WAND") return;

  const moveObject = Player.getPlayer().func_174822_a(25, partialTick);

  if (moveObject.field_72313_a.toString() !== "BLOCK") return;

  const topBlockState = World.getWorld().func_180495_p(moveObject.func_178782_a().func_177984_a());
  const topBlock = topBlockState.func_177230_c(); 
  if (topBlock instanceof Java.type("net.minecraft.block.BlockSlab")) return;

  if (topBlock instanceof Java.type("net.minecraft.block.BlockStairs")) {
    const halfValue = topBlockState.func_177229_b(topBlock.field_176308_b);
    if (halfValue.toString() === "bottom") return;
  }

  if (topBlock.func_149730_j()) return;

  // Get the position
  const [x, y, z] = getVec3iPos(moveObject.func_178782_a()); 
  const [sx, sy, sz] = getVec3Pos(moveObject.field_72307_f);
  
  const [rx, ry, rz] = true ? [x + 0.5, y + 1, z + 0.5] : [sx, sy, sz]
  RenderLib.drawCyl(rx, ry, rz, 10, 1, 0.25, 30, 1, 0, 90, 90, settings.gyroColor.getRed() / 255, settings.gyroColor.getGreen() / 255, settings.gyroColor.getBlue() / 255, settings.gyroOpacity, false, false);
}), () => settings.gyro);

registerWhen(register("renderWorld", () => {
  const holding = Player.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString("id");
  if (!["JINGLE_BELLS", "ENRAGER"].includes(holding)) return;
  RenderLib.drawCyl(Player.getRenderX(), Player.getRenderY(), Player.getRenderZ(), 10, 1, 0.25, 30, 1, 0, 90, 90, ...getRGB1(settings.agroColor), settings.agroOpacity, false, false);
}), () => settings.agro);

registerWhen(register("renderWorld", () => {
  const TOTEMS = World.getAllEntitiesOfType(EntityArmorStand.class).filter(totem => totem.getName().includes("Totem of Corruption") || settings.totemOptions != 0)
  TOTEMS.forEach(totem => {
    RenderLib.drawCyl(totem.getRenderX(), totem.getRenderY() - 0.25, totem.getRenderZ(), 18, 1, 0.25, 30, 1, 0, 90, 90, ...getRGB1(settings.totemColor), settings.totemOpacity, false, false);
  })

  const block = Player.lookingAt()
  const holding = Player.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString("id");
  if (block.toString().includes('minecraft:air') || settings.totemOptions == 1 || holding != "TOTEM_OF_CORRUPTION") return
  RenderLib.drawCyl(block.getRenderX() + 0.5, block.getRenderY() + 1, block.getRenderZ() + 0.5, 18, 1, 0.25, 30, 1, 0, 90, 90, ...getRGB1(settings.totemColor), settings.totemOpacity, false, false);
}), () => settings.totem);
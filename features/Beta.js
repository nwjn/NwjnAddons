import settings from "../config";
import { registerWhen, holding, getVec3Pos, getVec3iPos, getRGB1 } from "../utils/functions";
import RenderLib from "../../RenderLib";
import { EntityArmorStand, comma } from "../utils/constants";

registerWhen(register("chat", (event) => {
  cancel(event)
}).setCriteria("[BOSS] ${*}"), () => settings.boss);

let dmgIds = []
registerWhen(register("tick", () => {
  const DMGS = World.getAllEntitiesOfType(EntityArmorStand.class).filter(stand => stand.getName().includes(",") && dmgIds.indexOf(stand.getUUID()) == -1 && !stand.getName().includes("Lv") && !stand.getName().includes("❤") && !stand.getName().removeFormatting().match(/[A-Za-z]/g))
  // const DMGS = World.getAllEntitiesOfType(EntityArmorStand.class).filter(e => e.getName().includes("⚔") && dmgIds.indexOf(e.getUUID()) == -1)
  
  DMGS.forEach(dmg => {
    ChatLib.chat(dmg.getName())
    dmgIds.push(dmg.getUUID())
  })
}), () => settings.damageTracker)

registerWhen(register("step", () => {
  dmg = []
  dmgIds = []
}).setDelay(20), () => settings.damageTracker)

// Credit: GriffinOwO on ct for gyro
registerWhen(register("renderWorld", (partialTick) => {
  if (holding(true, "String", "id") != "GYROKINETIC_WAND") return;

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
  RenderLib.drawCyl(rx, ry, rz, 10, 1, 0.25, 30, 1, 0, 90, 90, ...getRGB1(settings.gyroColor), settings.gyroOpacity, false, false);
}), () => settings.gyro);

registerWhen(register("renderWorld", () => {
  if (!["JINGLE_BELLS", "ENRAGER"].includes(holding(true, "String", "id"))) return;
  RenderLib.drawCyl(Player.getRenderX(), Player.getRenderY(), Player.getRenderZ(), 10, 1, 0.25, 30, 1, 0, 90, 90, ...getRGB1(settings.agroColor), settings.agroOpacity, false, false);
}), () => settings.agro);

registerWhen(register("renderWorld", () => {
  // TODO (TRY): get the banner skin and scan for banner
  const TOTEMS = World.getAllEntitiesOfType(EntityArmorStand.class).filter(totem => totem.getName().includes("Totem of Corruption") || settings.totemOptions != 0)
  TOTEMS.forEach(totem => {
    RenderLib.drawCyl(totem.getRenderX(), totem.getRenderY() - 0.25, totem.getRenderZ(), 18, 1, 0.25, 30, 1, 0, 90, 90, ...getRGB1(settings.totemColor), settings.totemOpacity, false, false);
  })

  const block = Player.lookingAt()
  if (block.toString().includes('minecraft:air') || settings.totemOptions == 1 || holding(true, "String", "id") != "TOTEM_OF_CORRUPTION") return
  RenderLib.drawCyl(block.getRenderX() + 0.5, block.getRenderY() + 1, block.getRenderZ() + 0.5, 18, 1, 0.25, 30, 1, 0, 90, 90, ...getRGB1(settings.totemColor), settings.totemOpacity, false, false);
}), () => settings.totem);
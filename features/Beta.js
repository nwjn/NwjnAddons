import settings from "../config";
import { registerWhen } from "../utils/functions";
import RenderLib from "../../RenderLib";
import { EntityArmorStand, comma } from "../utils/constants";

registerWhen(register("chat", (event) => {
  cancel(event)
}).setCriteria("[BOSS] ${*}"), () => settings.boss);

// Credit: GriffinOwO on ct for gyro
function getVec3Pos(vec) {
  return [vec.field_72450_a, vec.field_72448_b, vec.field_72449_c]
}

function getVec3iPos(vec) {
  return [parseInt(vec.func_177958_n()), parseInt(vec.func_177956_o()), parseInt(vec.func_177952_p())]
}

let dmgIds = []
let totalDmg = 0
registerWhen(register("tick", () => {
  // const DMGS = World.getAllEntitiesOfType(EntityArmorStand.class).filter(stand => stand.getName().includes(",") && dmgIds.indexOf(stand.getUUID()) == -1 && !stand.getName().includes("Lv") && !stand.getName().includes("❤") && !stand.getName().removeFormatting().match(/[A-Za-z]/g))
  const DMGS = World.getAllEntitiesOfType(EntityArmorStand.class).filter(e => e.getName().includes("⚔") && dmgIds.indexOf(e.getUUID()) == -1)
    
  DMGS.forEach(dmg => {
    ChatLib.chat(dmg.getName())
    dmgIds.push(dmg.getUUID())
    totalDmg += parseInt(dmg.getName().removeFormatting().replace(/[^0-9]/g, ""))
  })
}), () => settings.damageTracker)

register("command", () => {
  ChatLib.chat(comma(totalDmg))
  totalDmg = 0
  dmgIds = []
}).setName("dmg", true)

registerWhen(register("worldUnload", () => {
  dmg = []
  dmgIds = []
}), () => settings.damageTracker)

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
  if ((!holding.includes("JINGLE_BELLS") || holding.includes("ENRAGER"))) return
  RenderLib.drawCyl(Player.getX(), Player.getY(), Player.getZ(), 10, 1, 0.25, 30, 1, 0, 90, 90, settings.agroColor.getRed() / 255, settings.agroColor.getGreen() / 255, settings.agroColor.getBlue() / 255, settings.agroOpacity, false, false);
}), () => settings.agro);

// TODO: find method to get skyblock item's base name
registerWhen(register("renderWorld", () => {
  const holding = Player.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString("id")
  const TOTEMS = World.getAllEntitiesOfType(EntityArmorStand.class).filter(totem => totem.getName().includes("Totem of Corruption") || settings.totemOptions != 0)
  TOTEMS.forEach(totem => {
    RenderLib.drawCyl(totem.getX(), totem.getY() - 0.25, totem.getZ(), 18, 1, 0.25, 30, 1, 0, 90, 90, settings.totemColor.getRed() / 255, settings.totemColor.getGreen() / 255, settings.totemColor.getBlue() / 255, settings.totemOpacity, false, false);
  })

  const block = Player.lookingAt()
  if (block.toString().includes('minecraft:air') || settings.totemOptions == 1 || holding != "TOTEM_OF_CORRUPTION") return
  RenderLib.drawCyl(block.getX() + 0.5, block.getY() + 1, block.getZ() + 0.5, 18, 1, 0.25, 30, 1, 0, 90, 90, settings.totemColor.getRed() / 255, settings.totemColor.getGreen() / 255, settings.totemColor.getBlue() / 255, settings.totemOpacity, false, false);
}), () => settings.totem);
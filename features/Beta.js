import settings from "../config";
import { registerWhen } from "../utils/functions";
import RenderLib from "../../RenderLib";
import { ARMOR_STANDS, comma } from "../utils/constants";

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

let dmg = []
let dmgNumbers = []
registerWhen(register("renderworld", () => {
  World.getAllEntitiesOfType(ARMOR_STANDS).forEach(stand => {
    if (stand.getName().includes("Lv") || stand.toString().includes("name=Armor Stand") || !stand.getName().includes(",")) return
    if (!dmg.includes(stand.getUUID().toString())) {
      dmg.push(stand.getUUID().toString())
      ChatLib.chat(stand.getName())
      dmgNumbers.push(ChatLib.removeFormatting(stand.getName()))
    }
  })
}), () => settings.damageTracker)

register("command", () => {
  let totalDmg = 0
  dmgNumbers.forEach(hit => {
    hit = ChatLib.removeFormatting(hit)
    hit = hit.replaceAll(/\D/g, "")
    totalDmg += parseInt(hit)
  })
  ChatLib.chat(`${ comma(totalDmg.toString()) }`)
  dmgNumbers = []
}).setName("dmg", true)

registerWhen(register("worldUnload", () => {
  dmg = []
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
  let holding = Player.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString("id")
  if (holding != "JINGLE_BELLS" && holding != "ENRAGER") return;
  RenderLib.drawCyl(Player.getX(), Player.getY(), Player.getZ(), 10, 1, 0.25, 30, 1, 0, 90, 90, settings.agroColor.getRed() / 255, settings.agroColor.getGreen() / 255, settings.agroColor.getBlue() / 255, settings.agroOpacity, false, false);
}), () => settings.agro);

registerWhen(register("renderWorld", () => {
  let holding = Player.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString("id")
  World.getAllEntitiesOfType(ARMOR_STANDS).forEach(stand => {
    if (stand.getName().includes("Totem of Corruption") && settings.totemOptions != 0) {
      RenderLib.drawCyl(stand.getX(), stand.getY() - 0.25, stand.getZ(), 18, 1, 0.25, 30, 1, 0, 90, 90, settings.totemColor.getRed() / 255, settings.totemColor.getGreen() / 255, settings.totemColor.getBlue() / 255, settings.totemOpacity, false, false);
    }
  })
  let block = Player.lookingAt()
  if (block.toString().includes('minecraft:air') || settings.totemOptions == 1 || holding != "TOTEM_OF_CORRUPTION") return
  RenderLib.drawCyl(block.getX() + 0.5, block.getY() + 1, block.getZ() + 0.5, 18, 1, 0.25, 30, 1, 0, 90, 90, settings.totemColor.getRed() / 255, settings.totemColor.getGreen() / 255, settings.totemColor.getBlue() / 255, settings.totemOpacity, false, false);
}), () => settings.totem);

registerWhen(register("renderWorld", () => {
  let inv = Player.getInventory()
  if (!inv?.getStackInSlot(39)?.getName()?.includes("Frozen Blaze") || !inv?.getStackInSlot(38)?.getName()?.includes("Frozen Blaze") || !inv?.getStackInSlot(37)?.getName()?.includes("Frozen Blaze") || !inv?.getStackInSlot(36)?.getName()?.includes("Frozen Blaze")) return
  RenderLib.drawCyl(Player.getX(), Player.getY(), Player.getZ(), 5, 1, 0.25, 30, 1, 0, 90, 90, settings.fbColor.getRed() / 255, settings.fbColor.getGreen() / 255, settings.fbColor.getBlue() / 255, settings.fbOpacity, false, false);
}), () => settings.fb);
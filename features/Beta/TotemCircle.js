import settings from "../../config"
import { registerWhen, getRGB1 } from "../../utils/functions";
import RenderLib from "RenderLib";
import { EntityArmorStand } from "../../utils/constants";

registerWhen(register("renderWorld", () => {
  const TOTEMS = World.getAllEntitiesOfType(EntityArmorStand.class).filter(e => e.getName() === "§5§lTotem of Corruption")

  let i = TOTEMS.length
  while (i--) {
    const totem = TOTEMS[i]
    RenderLib.drawCyl(totem.getX(), totem.getY() - 0.25, totem.getZ(), 18, 1, 0.25, 30, 1, 0, 90, 90, ...getRGB1(settings.totemColor), settings.totemOpacity, false, false);
  }
}).setPriority(Priority.HIGHEST), () => [1, 2].includes(settings.totemOptions) && settings.totem);

registerWhen(register("drawBlockHighlight", (pos) => {
  if (Player.lookingAt() instanceof BlockType || Player.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString("id") != "TOTEM_OF_CORRUPTION") return

  RenderLib.drawCyl(pos.getX() + 0.5, pos.getY() + 1, pos.getZ() + 0.5, 18, 1, 0.25, 30, 1, 0, 90, 90, ...getRGB1(settings.totemColor), settings.totemOpacity, false, false);
}).setPriority(Priority.HIGHEST), () => [0, 2].includes(settings.totemOptions) && settings.totem);
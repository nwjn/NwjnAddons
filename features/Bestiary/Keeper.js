import settings from "../../config";
import RenderLib from "RenderLib"
import WorldUtil from "../../utils/world"
import { getMaxHP, registerWhen } from "../../utils/functions";

const CAVE_SPIDER_CLASS = Java.type("net.minecraft.entity.monster.EntityCaveSpider").class

let keepers = []
registerWhen(register("step", () => {
  keepers = World.getAllEntitiesOfType(CAVE_SPIDER_CLASS).filter(e =>
    getMaxHP(e) % 3000 === 0 && Player.asPlayerMP().canSeeEntity(e)
  )
}).setDelay(1), () => WorldUtil.worldIs("Spider's Den") && settings.keeper)

registerWhen(register("renderWorld", () => {
  let i = keepers.length
  while (i--) {
    const keeper = keepers[i]
    const [x, y, z, w, h] = [keeper.getRenderX(), keeper.getRenderY(), keeper.getRenderZ(), 1, 1]

    RenderLib.drawEspBox(x, y - 0.7, z, w, h, 0, 1, 0, 1, false);
    Tessellator.drawString(`Keeper`, x, y + 1.5, z, 0x00ff00, false);
  }
}), () => WorldUtil.worldIs("Spider's Den") && settings.keeper);
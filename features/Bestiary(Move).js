import settings from "../config";
import WorldUtil from "../utils/world"
import RenderLib from "RenderLib"
import { registerWhen } from "../utils/functions";
import { EntityPlayer, SMA } from "../utils/constants";

let filteredMatchos = []
registerWhen(register("step", () => {
  const MATCHOS = World.getAllEntitiesOfType(EntityPlayer.class).filter(matcho => matcho.getName() == "matcho ")

  filteredMatchos = MATCHOS.filter(matcho => Player.asPlayerMP().canSeeEntity(matcho))
}).setFps(2), () => settings.matcho && WorldUtil.worldIs("Crimson Isle"))

registerWhen(register("renderWorld", () => {
  // MOVED MATCHO ALERT TO THE MOB COUNT OVERLAY
  filteredMatchos.forEach(matcho => {
    const x = matcho.getRenderX()
    const y = matcho.getRenderY()
    const z = matcho.getRenderZ()
    const w = matcho.getWidth()
    const h = matcho.getHeight()

    RenderLib.drawEspBox(x, y, z, w, h, 0, 1, 0, 1, false);
    Tessellator.drawString(`Matcho`, x, y + h + 0.5, z, 0x00ff00, false);
  })
}), () =>  WorldUtil.worldIs("Crimson Isle") && settings.matcho)

let filteredKeepers = []
const CAVE_SPIDER_CLASS = Java.type("net.minecraft.entity.monster.EntityCaveSpider").class
registerWhen(register("step", () => {
  const KEEPERS = World.getAllEntitiesOfType(CAVE_SPIDER_CLASS).filter(keeper => keeper.getEntity().func_110148_a(SMA.field_111267_a).func_111125_b() % 3000 == 0)
  
  filteredKeepers = KEEPERS.filter(keeper => Player.asPlayerMP().canSeeEntity(keeper))
}).setFps(2), () => settings.keeper && WorldUtil.worldIs("Spider's Den"))

registerWhen(register("renderWorld", () => {
  filteredKeepers.forEach(keeper => {
    const [x, y, z] = [keeper.getRenderX(), keeper.getRenderY(), keeper.getRenderZ()]
    RenderLib.drawEspBox(x, y - 0.7, z, 1, 1, 0, 1, 0, 1, false);
    Tessellator.drawString(`Keeper`, x, y + 1.5, z, 0x00ff00, false);
  })
}), () => WorldUtil.worldIs("Spider's Den") && settings.keeper);
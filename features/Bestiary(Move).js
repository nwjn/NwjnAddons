import settings from "../config";
import RenderLib from "RenderLib"
import { registerWhen, getRGB1 } from "../utils/functions";
import { getWorld } from "../utils/world";
import { data } from "../utils/data";
import { EntityArmorStand, EntityPlayer, SMA } from "../utils/constants";
import { mobCountOverlay } from "./Bestiary/MobHighlight";

let filteredMatchos = []
registerWhen(register("step", () => {
  if (!settings.rawMobList) mobCountOverlay.setMessage("")
  const MATCHOS = World.getAllEntitiesOfType(EntityPlayer.class).filter(matcho => matcho.getName() == "matcho ")

  const txt = mobCountOverlay.message.includes("Matcho") ? mobCountOverlay.message.replace(/Matcho: [0-9]+\n/g, `Matcho: ${ MATCHOS.length }\n`) : mobCountOverlay.message += `Matcho: ${ MATCHOS.length }\n`
  
  mobCountOverlay.setMessage(txt) 

  filteredMatchos = MATCHOS.filter(matcho => Player.asPlayerMP().canSeeEntity(matcho))
}).setFps(2), () => settings.matcho && getWorld() == "Crimson Isle")

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
}), () => getWorld() == "Crimson Isle" && settings.matcho)

let filteredKeepers = []
const CAVE_SPIDER_CLASS = Java.type("net.minecraft.entity.monster.EntityCaveSpider").class
registerWhen(register("step", () => {
  if (!settings.rawMobList) mobCountOverlay.setMessage("")
  const KEEPERS = World.getAllEntitiesOfType(CAVE_SPIDER_CLASS).filter(keeper => keeper.getEntity().func_110148_a(SMA.field_111267_a).func_111125_b() % 3000 == 0)
  
  const txt = mobCountOverlay.message.indexOf("Keeper") == -1 ? mobCountOverlay.message + `\nKeeper: ${ KEEPERS.length }\n` : mobCountOverlay.message.replace(/Keeper: [0-9]+\n/g, `Keeper: ${ KEEPERS.length }\n`)

  mobCountOverlay.setMessage(txt)
  
  filteredKeepers = KEEPERS.filter(keeper => Player.asPlayerMP().canSeeEntity(keeper))
}).setFps(2), () => settings.keeper && getWorld() == "Spider's Den")

registerWhen(register("renderWorld", () => {
  filteredKeepers.forEach(keeper => {
    const [x, y, z] = [keeper.getRenderX(), keeper.getRenderY(), keeper.getRenderZ()]
    RenderLib.drawEspBox(x, y - 0.7, z, 1, 1, 0, 1, 0, 1, false);
    Tessellator.drawString(`Keeper`, x, y + 1.5, z, 0x00ff00, false);
  })
}), () => getWorld() == "Spider's Den" && settings.keeper);
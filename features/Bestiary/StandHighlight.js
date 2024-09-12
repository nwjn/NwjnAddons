import Settings from "../../utils/Settings.js"
import RenderLib from "RenderLib"
import { registerWhen, getRGB } from "../../utils/functions.js";
import { EntityArmorStand } from "../../utils/constants";
import { getClassOfEntity } from "./MobHighlight.js";

let standList = []
export function setStandHighlight() {
  standList = []
  if (!Settings().playerList)

  Settings().standList.split(/,\s?/g).forEach(entry => {
    const [name, mob] = entry.split("-")

    // Check if entry is valid
    if (!name) return
    const clazz = getClassOfEntity(mob)
    if (!clazz) return

    playerList.push([
      name,
      clazz
    ])
  })
}

let renderThese = []
registerWhen(register("step", () => {
  renderThese = []
  World.getAllEntitiesOfType(EntityArmorStand.class).forEach(stand => {
    standList.forEach(entry => {
      if (stand.getName().includes(entry)) {
        renderThese.push(stand)
      }
    })
  })
}).setDelay(1), () => Settings().standList)

registerWhen(register("renderWorld", () => {
  const color = getRGB(Settings().standColor)
  renderThese.forEach(it => RenderLib.drawEspBox(it.getRenderX(), it.getRenderY(), it.getRenderZ(), it.getWidth(), it.getHeight(), ...color, false))
}), () => Settings().standList)
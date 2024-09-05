import settings from "../../settings"
import RenderLib from "RenderLib"
import { registerWhen, getRGB } from "../../utils/functions";
import { data } from "../../utils/data";
import { EntityArmorStand } from "../../utils/constants";

export const setStandHighlight = () => data.standList = settings().stand.split("|")

let renderThese = []
registerWhen(register("step", () => {
  renderThese = []
  World.getAllEntitiesOfType(EntityArmorStand.class).forEach(stand => {
    data.standList.forEach(entry => {
      if (stand.getName().includes(entry)) {
        renderThese.push(stand)
      }
    })
  })
}).setDelay(1), () => settings().stand !== "")

registerWhen(register("renderWorld", () => {
  const color = getRGB(settings().standColor)
  renderThese.forEach(it => RenderLib.drawEspBox(it.getRenderX(), it.getRenderY(), it.getRenderZ(), it.getWidth(), it.getHeight(), ...color, false))
}), () => settings().stand !== "")
// import Settings from "../../Settings.js"
// import RenderLib from "RenderLib"
// import { registerWhen, getRGB } from "../../utils/functions.js";
// import { getClassOfEntity } from "./MobHighlight.js";

// const ARMOR_STAND_CLASS = net.minecraft.entity.item.EntityArmorStand
// let standList = []
// export function setStandHighlight() {
//   standList = []
//   if (!Settings().standList) return

//   Settings().standList.split(/,\s?/g).forEach(entry => {
//     const [name, mob] = entry.split("-")

//     // Check if entry is valid
//     if (!name) return
//     const clazz = getClassOfEntity(mob)
//     if (!clazz) return

//     playerList.push([
//       name,
//       clazz
//     ])
//   })
// }

// let renderThese = []
// registerWhen(register("step", () => {
//   renderThese = []
//   World.getAllEntitiesOfType(ARMOR_STAND_CLASS).forEach(stand => {
//     standList.forEach(entry => {
//       if (stand.getName().includes(entry)) {
//         renderThese.push(stand)
//       }
//     })
//   })
// }).setDelay(1), () => Settings().standList)

// registerWhen(register("renderWorld", () => {
//   const color = getRGB(Settings().standColor)
//   renderThese.forEach(it => RenderLib.drawEspBox(it.getRenderX(), it.getRenderY(), it.getRenderZ(), it.getWidth(), it.getHeight(), ...color, false))
// }), () => Settings().standList)
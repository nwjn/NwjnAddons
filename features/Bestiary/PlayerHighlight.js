// import Settings from "../../Settings.js"
// import RenderLib from "RenderLib"
// import { registerWhen, getRGB, realPlayer } from "../../utils/functions.js";
// import { TextHelper } from "../../utils/TextHelper.js";

// let playerHighlight = []
// export function setPlayerHighlight() {
//   playerHighlight = []
//   if (!Settings().playerList) return

//   Settings().playerList.split(/,\s?/g).forEach(entry => {
//     const [name, hpParam] = entry.split("-")

//     // Check if entry is valid
//     if (!name) return

//     const hps = hpParam?.split("|")?.map(hp => TextHelper.convertToNumber(hp))

//     playerHighlight.push([
//       name,
//       hps
//     ])
//   })
// }
  
// let renderThese = []
// registerWhen(register("step", () => {
//   renderThese = []
//   World.getAllPlayers().forEach(player => {
//     if (player.isInvisible() || player.getName() == Player.getName()) return
//     Settings().playerList.forEach(entry => {
//       if (player.getName().includes(entry[0]) || (entry[0] == "Player" && realPlayer(player))) renderThese.push(player)
//     });
//   })
// }).setDelay(1), () => Settings().player)

// registerWhen(register("renderWorld", () => {
//   const color = getRGB(Settings().playerColor)
//   renderThese.forEach(it => 
//     RenderLib.drawEspBox(it.getRenderX(), it.getRenderY(), it.getRenderZ(), 0.6, 1.8, ...color, false)
//   )
// }), () => Settings().player)
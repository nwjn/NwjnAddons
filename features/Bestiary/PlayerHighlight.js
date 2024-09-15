import Settings from "../../utils/Settings.js"
import RenderLib from "RenderLib"
import { registerWhen, getRGB } from "../../utils/functions.js";
import { shortNum } from "../../utils/Enums.js";
import { realPlayer } from "../../utils/functions/player.js";

let playerHighlight = []
export function setPlayerHighlight() {
  playerHighlight = []
  if (!Settings().playerList) return

  Settings().playerList.split(/,\s?/g).forEach(entry => {
    const [name, hpParam] = entry.split("-")

    // Check if entry is valid
    if (!name) return

    const hps = hpParam?.split("|")?.map(hp => {
      hp = hp.toLowerCase().match(/([\d\.]+)([kmb])?/)
      return (parseFloat(hp[1]) * shortNum[hp[2]])
    })

    playerHighlight.push([
      name,
      hps
    ])
  })
}
  
let renderThese = []
registerWhen(register("step", () => {
  renderThese = []
  World.getAllPlayers().forEach(player => {
    if (player.isInvisible() || player.getName() == Player.getName()) return
    Settings().playerList.forEach(entry => {
      if (player.getName().includes(entry[0]) || (entry[0] == "Player" && realPlayer(player))) renderThese.push(player)
    });
  })
}).setDelay(1), () => Settings().player)

registerWhen(register("renderWorld", () => {
  const color = getRGB(Settings().playerColor)
  renderThese.forEach(it => 
    RenderLib.drawEspBox(it.getRenderX(), it.getRenderY(), it.getRenderZ(), 0.6, 1.8, ...color, false)
  )
}), () => Settings().player)
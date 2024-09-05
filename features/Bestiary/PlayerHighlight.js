import settings from "../../settings"
import RenderLib from "RenderLib"
import { registerWhen, getRGB, realPlayer } from "../../utils/functions";
import { data } from "../../utils/data";

export const setPlayerHighlight = () => data.playerList = settings().player.split("|")
  
let renderThese = []
registerWhen(register("step", () => {
  renderThese = []
  World.getAllPlayers().forEach(player => {
    if (player.isInvisible() || player.getName() == Player.getName()) return
    data.playerList.forEach(entry => {
      if (player.getName().includes(entry) || (entry == "Player" && realPlayer(player))) renderThese.push(player)
    });
  })
}).setDelay(1), () => settings().player !== "")

registerWhen(register("renderWorld", () => {
  const color = getRGB(settings().playerColor)
  renderThese.forEach(it => 
    RenderLib.drawEspBox(it.getRenderX(), it.getRenderY(), it.getRenderZ(), 0.6, 1.8, ...color, false)
  )
}), () => settings().player !== "")
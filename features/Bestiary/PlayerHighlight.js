import settings from "../../config";
import RenderLib from "RenderLib"
import { registerWhen, getRGB1 } from "../../utils/functions";
import { data } from "../../utils/data";
import { realPlayer } from "../../utils/functions";

let filteredPlayers = []
registerWhen(register("step", () => {
  const PLAYERS = World.getAllPlayers().filter(e => !e.isInvisible() && (settings.player != "Player" || realPlayer(e)))
  
  filteredPlayers = []
  PLAYERS.forEach(player => {
    data.playerList.forEach(entry => {
      if (player.getName().includes(entry) || entry == "Player") filteredPlayers.push(player)
    })
  })
}).setFps(2), () => settings.player !== "")

registerWhen(register("renderWorld", () => {
  filteredPlayers.forEach(player => {
    RenderLib.drawEspBox(player.getRenderX(), player.getRenderY(), player.getRenderZ(), 0.6, 1.8, ...getRGB1(settings.playerColor), 1, false)
  })
}), () => settings.player !== "")
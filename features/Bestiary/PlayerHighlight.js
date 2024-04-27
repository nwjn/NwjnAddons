import settings from "../../config";
import RenderLib from "RenderLib"
import { registerWhen, getRGB1 } from "../../utils/functions";
import { data } from "../../utils/data";
import { EntityPlayer } from "../../utils/constants";

let filteredPlayers = []
registerWhen(register("step", () => {
  const PLAYERS = World.getAllEntitiesOfType(EntityPlayer.class).filter(e => !e.isInvisible() && (settings.player == "Player" && World.getPlayerByName(e.getName())?.getPing() == 1))
  
  filteredPlayers = []
  PLAYERS.forEach(player => {
    data.playerList.forEach(entry => {
      if (player.getName().includes(entry) || entry == "Player") filteredPlayers.push(player)
    })
  })
}).setFps(2), () => settings.player)

registerWhen(register("renderWorld", () => {
  filteredPlayers.forEach(player => {
    RenderLib.drawEspBox(player.getRenderX(), player.getRenderY(), player.getRenderZ(), 1, 2, ...getRGB1(settings.playerColor), 1, false)
  })
}), () => settings.player)
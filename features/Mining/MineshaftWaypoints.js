import settings from "../../settings"
import { registerWhen, getDistance, onWorldLeave } from "../../utils/functions";
import renderBeaconBeam from "BeaconBeam"
import RenderLib from "RenderLib"
import { PREFIX } from "../../utils/constants";
import WorldUtil from "../../utils/WorldUtil"

const data = JSON.parse(FileLib.read("NwjnAddons/features/Mining", "MineshaftWaypointsData.json"))
let checkedCorpses = []
let currentRoom;

function renderWaypoint(text, coords, hex, rgb) {
  RenderLib.drawEspBox(...coords, 1, 1, ...rgb, 1, true);
  RenderLib.drawInnerEspBox(...coords, 1, 1, ...rgb, 0.25, true);
  Tessellator.drawString(text, ...coords, hex, true);
  renderBeaconBeam(coords[0] - 0.5, coords[1], coords[2] - 0.5, ...rgb, 0.5, false, 75);
}


function findRoomType() {
  const scoreboard = Scoreboard.getLines()
  const line = scoreboard[scoreboard.length - 1]?.toString()?.removeFormatting()?.slice(-5)

  const material = line?.slice(0, -1)
  const type = line?.endsWith("2") ? "Crystal" : line

  if (type in data.rooms && material in data.names) {
    currentRoom = data.rooms[type]
    const name = data.names[material]
  
    const formatName = type === "Crystal" ? `${name} Crystal` : name
    ChatLib.chat(`${ PREFIX }: ${ formatName }`)
  }
}

registerWhen(register("step", () => {
  if (!currentRoom) findRoomType()
}).setDelay(1), () => WorldUtil.isWorld("Mineshaft") && settings().mineshaftWaypoints)

registerWhen(register("renderWorld", () => {
  if (!currentRoom) return;
  const corpses = currentRoom.corpses
  let i = corpses.length;
  while (i--) {
    let corpse = corpses[i]
    if (checkedCorpses.some(e => getDistance(e, corpse) < 5)) continue;
    if (Player.asPlayerMP().distanceTo(...corpse) < 3) checkedCorpses.push([Player.getX(), Player.getY(), Player.getZ()])
    renderWaypoint("Guess", corpse, 0xff5555, [1, 0, 0]);
  }
  renderWaypoint("Exit", currentRoom.exit, 0x55ffff, [1, 0, 0])
}), () => WorldUtil.isWorld("Mineshaft") && settings().mineshaftWaypoints);

onWorldLeave(() => {
  currentRoom = undefined
  checkedCorpses.length = 0
})
import settings from "../../config"
import { registerWhen, delay, getDistance, onWorldJoin } from "../../utils/functions";
import renderBeaconBeam from "BeaconBeam"
import RenderLib from "RenderLib"
import { PREFIX } from "../../utils/constants";

const data = JSON.parse(FileLib.read("NwjnAddons/features/Mining", "MineshaftData.json"))
let claimed = []
let room;

function renderWaypoint(text, coords, hex, rgb) {
  RenderLib.drawEspBox(...coords, 1, 1, ...rgb, 1, true);
  RenderLib.drawInnerEspBox(...coords, 1, 1, ...rgb, 0.25, true);
  Tessellator.drawString(text, ...coords, hex, true);
  renderBeaconBeam(coords[0] - 0.5, coords[1], coords[2] - 0.5, ...rgb, 0.5, false, 75);
}


function findRoomType(tries) {
  if (!tries) return
  tries--

  const scoreboard = Scoreboard.getLines()
  const line = scoreboard[scoreboard.length - 1]?.toString()?.removeFormatting()?.slice(-5)

  const material = line?.slice(0, -1)
  const type = line?.endsWith("2") ? "Crystal" : line

  if (type in data.rooms && material in data.names) {
    room = data.rooms[type]
    const name = data.names[material]

    const formatName = type === "Crystal" ? `${name} Crystal` : name
    ChatLib.chat(`${PREFIX}: ${formatName}`)
  }
  else {
    delay(() => findRoomType(tries), 1000);
  }
}

registerWhen(register("renderWorld", () => {
  if (!room) return;
  const corpses = room.corpses
  let i = corpses.length;
  while (i--) {
    let corpse = corpses[i]
    if (claimed.some(e => getDistance(e, corpse) < 5)) continue;
    if (Player.asPlayerMP().distanceTo(...corpse) < 3) claimed.push([Player.getX(), Player.getY(), Player.getZ()])
    renderWaypoint("Guess", corpse, 0xff5555, [1, 0, 0]);
  }
  renderWaypoint("Exit", room.exit, 0x55ffff, [1, 0, 0])
}), () => settings.mineshaft);

register("chat", () => {
  claimed.push([Player.getX(), Player.getY(), Player.getZ()])
}).setCriteria("  ${*} CORPSE LOOT! ")

register("chat", () => {
  claimed.push([Player.getX(), Player.getY(), Player.getZ()])
}).setCriteria("You need to be holding ${*} Key to unlock this corpse!")

onWorldJoin(() => {
  room = undefined
  claimed.length = 0
  findRoomType(10)
})
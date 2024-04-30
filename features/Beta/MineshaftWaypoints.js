import settings from "../../config"
import { registerWhen } from "../../utils/functions";
import renderBeaconBeam from "BeaconBeam"
import RenderLib from "RenderLib"
import { EntityArmorStand, PREFIX } from "../../utils/constants";
import WorldUtil from "../../utils/world"

/*
! This section of corpse esp will be removed upon next release
function renderWaypoint(text, coords, hex, rgb) {
  RenderLib.drawEspBox(...coords, 1, 1, ...rgb, 1, true);
  RenderLib.drawInnerEspBox(...coords, 1, 1, ...rgb, 0.25, true);
  Tessellator.drawString(text, ...coords, hex, true);
  renderBeaconBeam(coords[0] - 0.5, coords[1], coords[2] - 0.5, ...rgb, 0.5, false, 50);
}

let claimed = []
let corpses = []
let exit = false;
const CORPSE_TYPES = {
  "Lapis Armor Helmet": {
    name: "Lapis",
    color: [0.33, 0.33, 1]
  },
  "Mineral Helmet": {
    name: "Tungsten",
    color: [0.66, 0.66, 0.66]
  },
  "Yog Helmet": {
    name: "Umber",
    color: [1, 0.66, 0]
  },
  "Vanguard Helmet": {
    name: "Vanguard",
    color: [0.33, 1, 1]
  }
}

registerWhen(register("step", () => {
  const stands = World.getAllEntitiesOfType(EntityArmorStand.class)
  const entities = stands.filter(a => a?.getEntity()?.func_71124_b(4)); // only visible stands that also have default name and have helm
  const find = stands.find(a => a?.getName() == "Exit the Glacite Mineshaft");
  if (find) {
    exit = [(~~find.getX()) - 0.5, ~~find.getY(), (~~find.getZ()) - 0.5]
  }

  let i = entities.length; while (i--) {
    const entity = entities[i];
    const pos = entity.getPos();
    
    if (corpses.some(e => pos?.compareTo(e.vec) == 0) || claimed.some(e => pos.distance(e) < 7)) continue; // if corpse is already rendered or claimed, skip finding its coords

    const helm = entity.getEntity()?.func_71124_b(4)?.func_82833_r()?.removeFormatting();
    const [text, rgb] = [CORPSE_TYPES[helm]?.name, CORPSE_TYPES[helm]?.color]
    if (!text || !rgb) continue;
    corpses.push(
      {
        "loc": [~~entity.getX(), ~~entity.getY(), ~~entity.getZ()],
        "vec": pos,
        "text": text,
        "rgb": rgb
      }
    );
  }
}).setDelay(1), () => settings.mineshaft && WorldUtil.worldIs("Mineshaft"))

registerWhen(register("renderWorld", () => {
  let x = corpses.length; while (x--) {
    const corpse = corpses[x];
    if (claimed.some(e => corpse.vec.distance(e) < 7) || (settings.lapis && corpse.text != "Lapis")) continue;
    renderWaypoint(corpse.text, corpse.loc, 0xff5555, corpse.rgb);
  }
  if (exit) renderWaypoint("Exit", exit, 0x55ffff, [1, 0, 0])
}), () => settings.mineshaft && WorldUtil.worldIs("Mineshaft"))

register("chat", () => {
  claimed.push([Player.getX(), Player.getY(), Player.getZ()])
}).setCriteria("  ${*} CORPSE LOOT! ")


import { onWorldLeave } from "../../utils/functions";
onWorldLeave(() => {
  if (!settings.mineshaft) return
  claimed.length = 0
  corpses.length = 0
  exit = false
});
*/

// /*
// * Pseudo for new waypoints
// function renderWaypoint(text, coords, hex, rgb) {
//   RenderLib.drawEspBox(...coords, 1, 1, ...rgb, 1, true);
//   RenderLib.drawInnerEspBox(...coords, 1, 1, ...rgb, 0.25, true);
//   Tessellator.drawString(text, ...coords, hex, true);
//   renderBeaconBeam(coords[0] - 0.5, coords[1], coords[2] - 0.5, ...rgb, 0.5, false, 75);
// }

// function findRoomType(tries = 10) {
//   if (!tries || (!WorldUtil.worldIs("Mineshaft"))) return
//   tries--;

//   const scoreboard = Scoreboard.getLines()
//   const line = scoreboard[scoreboard.length - 1].toString().removeFormatting().slice(-5)

//   const find = line.endsWith("2") ? "2" : line
//   const obj = (JSON.parse(FileLib.read("NwjnAddons", "CorpseData.json")))[find]
//   console.log(JSON.stringify(obj, null, 4))
// }
const data = JSON.parse(FileLib.read("NwjnAddons/features/Beta", "MineshaftData.json"))
let room;

function findRoomType(testString) {
  const material = testString.slice(0, -1)
  const type = testString.endsWith("2") ? "Crystal" : testString
  if (!(type in data.rooms) || !(material in data.names)) return;

  room = data.rooms[type]
  const name = data.names[material]

  const formatName = type === "Crystal" ? `${name} Crystal` : name
  ChatLib.chat(`${PREFIX}: ${formatName}`)
}

register("command", (test) => {
  findRoomType(test)
}).setName("test", true);

import { getDistance } from "../../utils/functions";

registerWhen(register("renderWorld", () => {
  if (!room) return;
  const corpses = room.corpses
  let x = corpses.length; while (x--) {
    let corpse = corpses[x]
    if (claimed.some(e => getDistance(e, corpse) < 7)) continue;
    renderWaypoint("Guess", corpse, 0xff5555, [1, 0, 0]);
  }
  renderWaypoint("Exit", room.exit, 0x55ffff, [1, 0, 0])
}), () => settings.mineshaft)
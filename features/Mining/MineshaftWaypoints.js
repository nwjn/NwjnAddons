// import { getDistance } from "../../utils/functions.js";
// import renderBeaconBeam from "BeaconBeam"
// import RenderLib from "RenderLib"
// import { TextHelper } from "../../utils/TextHelper.js";

// const data = JSON.parse(FileLib.read("NwjnAddons", "features/MiningMineshaftWaypointsData.json"))
// let checkedCorpses = []
// let currentRoom;

// function renderWaypoint(text, coords, hex, rgb) {
//   RenderLib.drawEspBox(...coords, 1, 1, ...rgb, 1, true);
//   RenderLib.drawInnerEspBox(...coords, 1, 1, ...rgb, 0.25, true);
//   Tessellator.drawString(text, ...coords, hex, true);
//   renderBeaconBeam(coords[0] - 0.5, coords[1], coords[2] - 0.5, ...rgb, 0.5, false, 75);
// }


// function findRoomType() {
//   const scoreboard = Scoreboard.getLines()
//   const line = scoreboard?.slice(-1)?.getName()?.removeFormatting()
//   if (!/[A-Z]{4}[12]$/.test(line)) return

//   const [_, material, type] = line.match(/([A-Z]{4})(1|2)$/)

//   if (type in data.rooms && material in data.names) {
//     currentRoom = data.rooms[type]
//     const name = data.names[material]
  
//     const formatName = type == 2 ? `${name} Crystal` : name
//     ChatLib.chat(`${ TextHelper.PREFIX }: ${ formatName }`)
//   }
// }

// import Feature from "../../core/Feature.js";
// import EventEnums from "../../core/EventEnums.js";
// import { Event } from "../../core/Event.js";

// const mineshaft = new Feature("mineshaftWaypoints", "mineshaft")
//   .addEvent(
//     new Event(EventEnums.PACKET.CUSTOM.TICK, () => {
//       if (!currentRoom) return findRoomType()
      
//       mineshaft.update()
//     })
//   )
//   .addSubEvent(
//     new Event("renderWorld", () => {
//       currentRoom.corpses.forEach(it => {
//         if (checkedCorpses.some(e => getDistance(e, it) < 5)) return;
//         if (Player.asPlayerMP().distanceTo(...it) < 3) checkedCorpses.push([Player.getX(), Player.getY(), Player.getZ()])
//         renderWaypoint("Guess", corpse, 0xff5555, [1, 0, 0]);
//       })
//       renderWaypoint("Exit", currentRoom.exit, 0x55ffff, [1, 0, 0])
//     }),
//     () => currentRoom
//   )
//   .addSubEvent(
//     new Event("worldUnload", () => {
//       currentRoom = undefined
//       checkedCorpses = []
      
//       mineshaft.update()
//     }),
//     () => currentRoom
//   )
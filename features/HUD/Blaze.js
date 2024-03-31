import settings from "../../config"
import { data } from "../../utils/data";
import { Overlay } from "../../utils/overlay";
import { registerWhen, fixLength } from "../../utils/functions";
import { getWorld } from "../../utils/world";

const blazeExample = 
`&aGummy: &cInactive
&7Wisp: &cInactive`;
const blazeOverlay = new Overlay("blaze", ["Crimson Isle"], () => true, data.blazeL, "moveBlaze", blazeExample)

function timeFormat(seconds) {
  return (seconds < 0 ? "&cInactive" : `${fixLength(Math.floor(seconds / 60))}:${fixLength(seconds % 60)}`)
}

let gummy = data.gummy;
let wisp = data.wisp;
registerWhen(register("chat", () => {
  gummy = 3_600;
}).setChatCriteria("You ate a Re-heated Gummy Polar Bear!"), () => settings.blaze)

registerWhen(register("chat", () => {
  wisp = data.pet.includes("Parrot") ? 2_520 : 1_800;
}).setChatCriteria("BUFF! You ${*} with Wisp's Ice-Flavored Water I! Press TAB or type /effects to view your active effects!"), () => settings.blaze);

registerWhen(register("step", () => {
  if (!getWorld()) return;
  if (gummy > -1) gummy -= 1;
  if (wisp > -1) wisp -= 1

  blazeOverlay.message =
  `&aGummy: &f${ timeFormat(gummy) }\n&7Wisp: &f${ timeFormat(wisp) }`;
}).setDelay(1), () => settings.blaze);

registerWhen(register("gameUnload", () => {
  data.gummy = gummy;
  data.wisp = wisp;
}), () => settings.blaze);

registerWhen(register("serverDisconnect", () => {
  data.gummy = gummy;
  data.wisp = wisp;
}), () => settings.blaze);
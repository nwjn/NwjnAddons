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
  return seconds ? `${fixLength(Math.floor(seconds / 60))}:${fixLength(seconds % 60)}` : "&cInactive"
}

let gummy = data.gummy;
let wisp = data.wisp;
registerWhen(register("chat", () => {
  gummy = 3_600;
  data.save()
}).setChatCriteria("You ate a Re-heated Gummy Polar Bear!"), () => settings.blaze)

registerWhen(register("chat", () => {
  wisp = data.pet.includes("Parrot") ? 2_520 : 1_800;
  data.save()
}).setChatCriteria("BUFF! You ${*} with Wisp's Ice-Flavored Water I! Press TAB or type /effects to view your active effects!"), () => settings.blaze);

registerWhen(register("step", (elapsed) => {
  if (!getWorld()) return;
  gummy && (gummy--)
  wisp && (wisp--)
  
  blazeOverlay.message = `&aGummy: &f${ timeFormat(gummy) }\n&7Wisp: &f${ timeFormat(wisp) }`;

  if (!(elapsed % 15)) {
    data.gummy = gummy;
    data.wisp = wisp;
    data.save()
  }
}).setDelay(1), () => settings.blaze);
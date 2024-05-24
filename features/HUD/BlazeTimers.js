import settings from "../../config"
import { data } from "../../utils/data";
import { Overlay } from "../../utils/overlay";
import { registerWhen, fixLength } from "../../utils/functions";
import WorldUtil from "../../utils/world"

const blazeExample = 
`&aGummy: &cInactive
&7Wisp: &cInactive`;
const blazeOverlay = new Overlay("blaze", ["Crimson Isle"], () => true, data.blazeL, "moveBlaze", blazeExample)

function timeFormat (seconds) {
  return seconds ? `${fixLength(~~(seconds / 60))}:${fixLength(seconds % 60)}` : "&cInactive"
}

let gummy;
let wisp;
registerWhen(register("chat", () => {
  gummy = 3_600; // 60 minutes as seconds
}).setChatCriteria("You ate a Re-heated Gummy Polar Bear!"), () => settings.blaze)

registerWhen(register("chat", () => {
  wisp = data.pet.includes("Parrot") ? 2_520 : 1_800; // 42 min with parrot, else 30min as seconds
}).setChatCriteria("BUFF! You ${*} with Wisp's Ice-Flavored Water I! Press TAB or type /effects to view your active effects!"), () => settings.blaze);

registerWhen(register("step", () => {
  if (gummy) gummy--
  if (wisp) wisp--
  
  blazeOverlay.setMessage(`&aGummy: &f${ timeFormat(gummy) }\n&7Wisp: &f${ timeFormat(wisp) }`);
}).setDelay(1), () => settings.blaze && WorldUtil.isSkyblock());


import { onWorldJoin, onWorldLeave } from "../../utils/functions";

onWorldJoin(() => {
  if (!settings.blaze) return
  gummy = data.gummy
  wisp = data.wisp
})

onWorldLeave(() => {
  if (!settings.blaze) return
  data.gummy = gummy;
  data.wisp = wisp;
})


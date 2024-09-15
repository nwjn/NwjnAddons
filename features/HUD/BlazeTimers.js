import Settings from "../../utils/Settings"
import { data } from "../../utils/data/DataWriter.js";
import { Overlay } from "../../utils/overlay";
import { registerWhen, fixLength } from "../../utils/functions.js";
import Loc from "../../utils/Location.js"

const blazeExample = 
`&aGummy: &cInactive
&7Wisp: &cInactive`
const blazeOverlay = new Overlay("blaze", ["Crimson Isle"], () => true, data.blazeL, "moveBlaze", blazeExample)

function timeFormat (seconds) {
  return seconds ? `${fixLength(~~(seconds / 60))}:${fixLength(seconds % 60)}` : "&cInactive"
}

registerWhen(register("chat", () => {
  data.gummy = 3_600; // 60 minutes as seconds
}).setChatCriteria("You ate a Re-heated Gummy Polar Bear!"), () => Settings().blaze)

registerWhen(register("chat", () => {
  data.wisp = data.pet.includes("Parrot") ? 2_520 : 1_800; // 42 min with parrot, else 30min as seconds
}).setChatCriteria("BUFF! You ${*} with Wisp's Ice-Flavored Water I! Press TAB or type /effects to view your active effects!"), () => Settings().blaze)

registerWhen(register("step", () => {
  data.gummy--
  data.wisp--
  
  blazeOverlay.setMessage(`&aGummy: &f${ timeFormat(data.gummy) }\n&7Wisp: &f${ timeFormat(data.wisp) }`);
}).setDelay(1), () => Settings().blaze && Loc.inSkyblock())
import settings from "../../config"
import { data } from "../../utils/data";
import { Overlay } from "../../utils/overlay";
import { registerWhen, fixLength } from "../../utils/functions";

const blazeExample = `&aGummy: &cN/A\n&7Wisp: &cN/A`
const blazeOverlay = new Overlay("blaze", ["all"], () => true, data.blazeL, "moveBlaze", blazeExample)

function timeFormat(seconds) {
  return (seconds < 0 ? "&cInactive" : `${fixLength(Math.floor(seconds / 60))}:${fixLength(seconds % 60)}`)
}

registerWhen(register("chat", () => {
  data.gummy = 3_600;
  data.save()
}).setChatCriteria("You ate a Re-heated Gummy Polar Bear!"), () => settings.blaze)

registerWhen(register("chat", () => {
  data.wisp = data.pet.includes("Parrot") ? 2_520 : 1_800;
  data.save()
}).setChatCriteria("BUFF! You ${*} with Wisp's Ice-Flavored Water I! Press TAB or type /effects to view your active effects!"), () => settings.blaze);

registerWhen(register("step", () => {
  if (Scoreboard.getTitle().removeFormatting() != "SKYBLOCK") return;
  data.gummy -= data.gummy < 0 ? 0 : 1;
  data.wisp -= data.wisp < 0 ? 0 : 1;

  blazeOverlay.message = `&aGummy: &f${timeFormat(data.gummy)}\n&7Wisp: &f${timeFormat(data.wisp)}`;
  data.save()
}).setDelay(1), () => settings.blaze)
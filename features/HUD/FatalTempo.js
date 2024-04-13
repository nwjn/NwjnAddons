import settings from "../../config"
import { data } from "../../utils/data";
import { Overlay } from "../../utils/overlay";
import { registerWhen, holding } from "../../utils/functions";
import { getWorld } from "../../utils/world";

const ftExample = `Fatal Tempo: 0%`;
const ftOverlay = new Overlay("ft", ["all"], () => true, data.ftL, "moveFt", ftExample);

let ftHits = [];
let time = 0
let hits = 1

function ftHitsNum() {
  return ftHits.length * hits;
}

function ftPercent(level) {
  const percent = ftHitsNum() * level * 10;
  return percent <= 200 ? percent : 200;
}

registerWhen(register("actionBar", (stacks) => {
  hits = getWorld() == "Kuudra" ? (stacks == 10 ? 5 : 3) : 1;
}).setCriteria(" ${stacks}⁑").setContains(), () => settings.ft)

let ftLevel = 0;
let countdown = 0
let percent = 0

registerWhen(register("renderOverlay", () => {
  percent = ftPercent(ftLevel);
  countdown = countdown < 0 ? countdown : 3 - (countdown - time) / 1000;
  const color = (countdown > 0 && countdown < 1) ? "&c" : "&f";
  
  if (percent == 200 && countdown < 3) {
    const option = settings.ftTimer
    const x = (Renderer.screen.getWidth() / 2 - 13 - (option - 1) * 9) / option
    const y = (Renderer.screen.getHeight() / 2 - 15 - (option - 1) * 5.5) / option
    Renderer.scale(option)
    Renderer.drawString(`${ color }${ countdown.toFixed(3) }`, x, y);
  }
}), () => settings.ft);

// todo: figure out why breaking
// function addHits() {
//   if (holding("String", "id") != "TERMINATOR") return
//   const ftLvl = holding("EA").getCompoundTag("enchantments").getTag("ultimate_fatal_tempo");
//   if (ftLvl) {
//     time = Date.now();
//     ftLevel = ftLvl;
//     ftHits.push(time);
//   }
// }
// registerWhen(register("soundPlay", addHits).setCriteria("random.bow"), () => settings.ft && getWorld() == "Kuudra");

// registerWhen(register("soundPlay", addHits).setCriteria("random.successful_hit"), () => settings.ft && getWorld() != "Kuudra");

registerWhen(register("soundPlay", (pos, name) => {
  if ((getWorld() == "Kuudra" && name.toString() != "random.bow") || (getWorld() != "Kuudra" && name.toString() != "random.successful_hit")) return
  const holding = Player.getHeldItem()
  if (holding.getRegistryName() != "minecraft:bow") return
  const ftLvl = holding?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes").getCompoundTag("enchantments").getTag("ultimate_fatal_tempo");
  if (ftLvl) {
    time = new Date().getTime();
    ftLevel = ftLvl;
    ftHits.push(time);
  }
}), () => settings.ft);

registerWhen(register("step", () => {
  const time = Date.now()
  if (ftHits && time - ftHits[ftHits.length - 1] >= 3000) ftHits = [];
  countdown = time;
}).setFps(50), () => settings.ft);

registerWhen(register("step", () => {
  ftOverlay.message = (settings.ftOptions == 0) || (settings.ftOptions == 1 && percent != 0) || (settings.ftOptions == 2 && percent == 200) ? `Fatal Tempo: ${ percent }%` : "";
}).setFps(3), () => settings.ft)
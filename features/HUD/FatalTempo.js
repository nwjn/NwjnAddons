import settings from "../../config"
import { data } from "../../utils/data";
import { Overlay } from "../../utils/overlay";
import { registerWhen } from "../../utils/functions";
import { getWorld } from "../../utils/world";

const ftExample = `Fatal Tempo: 0%`;
const ftOverlay = new Overlay("ft", ["all"], () => true, data.ftL, "moveFt", ftExample);

let ftHits = [];
let time = 0
let hits = 1
const ftAddHit = (time) => {
  ftHits.push(time);
};
const ftHitsNum = () => {
  return ftHits.length * hits;
};
const ftPercent = (ftLvl) => {
  let percent = ftHitsNum() * ftLvl * 10;
  return percent <= 200 ? percent : 200;
}

registerWhen(register("actionBar", (stacks) => {
  hits = getWorld() == "Kuudra" ? stacks == 10 ? 5 : 3 : 1;
}).setCriteria(" ${stacks}⁑").setContains(), () => settings.ft)

let countdown = 0
let percent = 0

registerWhen(register("renderOverlay", () => {
  let color = "&f";
  percent = ftPercent(ftLevel);
  countdown = 3 - (countdown - time) / 1000;
  if (countdown < 0) countdown = 0;
  else if (countdown < 1 && countdown > 0) color = "&c";
  if (percent == 200 && countdown < 3) {
    let x = (Renderer.screen.getWidth() / 2 - 13 - (settings.ftTimer - 1) * 9) / settings.ftTimer
    let y = (Renderer.screen.getHeight() / 2 - 15 - (settings.ftTimer - 1) * 5.5) / settings.ftTimer
    Renderer.scale(settings.ftTimer)
    Renderer.drawString(`${ color }${ countdown.toFixed(3) }`, x, y);
  }
}), () => settings.ft);

let ftLevel = 0;
registerWhen(register("soundPlay", (pos, name) => {
  if ((getWorld() == "Kuudra" && name.toString() != "random.bow") || (getWorld() != "Kuudra" && name.toString() != "random.successful_hit")) return
  const holding = Player.getHeldItem()
  if (holding.getRegistryName() != "minecraft:bow") return
  let ftLvl = holding?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes").getCompoundTag("enchantments").getTag("ultimate_fatal_tempo");
  if (ftLvl) {
    time = new Date().getTime();
    ftLevel = ftLvl;
    ftAddHit(time);
  }
}), () => settings.ft);

registerWhen(register("step", () => {
  if(ftHitsNum() > 0 && new Date().getTime() - ftHits[ftHits.length - 1] >= 3000)ftHits = [];
  countdown = new Date().getTime()
}).setFps(50), () => settings.ft);

register("step", () => {
  if (settings.ft) {
    if ((settings.ftOptions == 0) || (settings.ftOptions == 1 && percent != 0) || (settings.ftOptions == 2 && percent == 200)) {
      ftOverlay.message = `Fatal Tempo: ${ percent }%`;
    }
    else {
      ftOverlay.message = ""
    }
  }
}).setFps(10)
import settings from "../../config"
import { data } from "../../utils/data";
import { Overlay } from "../../utils/overlay";
import { registerWhen } from "../../utils/functions";
import { getWorld } from "../../utils/world";

const ftExample = `Fatal Tempo:&c 0% | 0.00s`;
const ftOverlay = new Overlay("ft", ["all"], () => true, data.ftL, "moveFt", ftExample);

let prevHit;
let hits = 0
let ftLevel = 0;

const addHits = () => {
  const holding = Player.getHeldItem()
  if (!["minecraft:bow", "minecraft:bone"].includes(holding?.getRegistryName())) return

  const ftLvl = holding.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getCompoundTag("enchantments")?.getTag("ultimate_fatal_tempo");
  if (!ftLvl) return

  ftLevel = ftLvl;
  prevHit = Date.now()
  hits++
}

registerWhen(register("soundPlay", addHits).setCriteria("tile.piston.out"), () => settings.ft && getWorld() === "Kuudra");
registerWhen(register("soundPlay", addHits).setCriteria("random.successful_hit"), () => settings.ft && getWorld() !== "Kuudra");

const calcString = (countdown, percent) => {
  countdown = countdown >= 0 ? countdown : 0
  percent = percent <= 200 ? percent : 200
  let displayText = settings.ftShowTitle ? `Fatal Tempo: ` : ""

  displayText +=
    (countdown > 1 && percent === 200) ? "&a" :
    (countdown > 0 && percent > 0) ? "&e" :
    "&c"

  displayText += settings.ftShowPercent ? `${percent}%` : ""

  displayText += (settings.ftShowPercent && settings.ftShowTime) ? " | " : ""

  displayText += settings.ftShowTime ? `${ countdown.toFixed(2) }s` : ""

  return (
    (settings.ftShowWhen === 0) ||
    (settings.ftShowWhen === 1 && percent > 0) ||
    (settings.ftShowWhen === 2 && percent === 200)
  )
  ? displayText : "";
}

registerWhen(register("tick", () => {
  const countdown = (3 - (Date.now() - prevHit) / 1000)
  const percent = hits * ftLevel * 10

  if (countdown < 0) {
    prevHit = 0
    hits = 0
  }

  ftOverlay.setMessage(calcString(countdown, percent))
}), () => settings.ft)
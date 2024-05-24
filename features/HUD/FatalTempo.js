import settings from "../../config"
import { data } from "../../utils/data";
import { Overlay } from "../../utils/overlay";
import { registerWhen, clamp } from "../../utils/functions";
import WorldUtil from "../../utils/world"

const ftExample = `Fatal Tempo:&c 0% | 0.00s`;
const ftOverlay = new Overlay("ft", ["all"], () => true, data.ftL, "moveFt", ftExample);

let prevHit;
let hits = 0
let ftLevel = 0;

const addHits = () => {
  const holding = Player.getHeldItem()
  if (holding?.getRegistryName() !== "minecraft:bow") return

  const ftLvl = holding.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getCompoundTag("enchantments")?.getTag("ultimate_fatal_tempo");
  if (!ftLvl) return

  ftLevel = ftLvl;
  prevHit = Date.now()
  hits++
}

registerWhen(register("soundPlay", addHits).setCriteria("tile.piston.out"), () => settings.ft && WorldUtil.worldIs("Kuudra"));
registerWhen(register("soundPlay", addHits).setCriteria("random.successful_hit"), () => settings.ft && !WorldUtil.worldIs("Kuudra"));

const calcString = (countdown = 0, percent = 0) => {
  countdown = clamp(countdown, 0, 3)
  percent = clamp(percent, 0, 200)
  let displayText = settings.ftShowTitle ? `Fatal Tempo: ` : ""

  displayText += settings.ftShowPercent ? 
    ((percent === 200) ? "&a" :
    (percent > 0) ? "&e" :
    "&c")
  : ""

  const percentString = percent >= 100 ? percent : `  ${percent}`
  displayText += settings.ftShowPercent ? `${percentString}%` : ""

  displayText += (settings.ftShowPercent && settings.ftShowTime) ? " &r| " : ""

  displayText += settings.ftShowTime ?
    ((countdown > 1.25) ? "&a" :
    (countdown > 0) ? "&e" :
    "&c")
  : ""

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
}), () => settings.ft);

ftOverlay.setMessage(calcString())
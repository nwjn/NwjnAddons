import settings from "../../settings"
import { data } from "../../utils/data";
import { Overlay } from "../../utils/overlay";
import { registerWhen, clamp } from "../../utils/functions";
import WorldUtil from "../../utils/WorldUtil"

const ftExample = `Fatal Tempo:&c   0% | 0.00s`;
const ftOverlay = new Overlay("fatalTempo", ["all"], () => true, data.ftL, "moveFt", ftExample);

let prevHit = 0
let hits = 0
let ftLevel = 0

const addHits = () => {
  const holding = Player.getHeldItem()
  if (holding?.getRegistryName() !== "minecraft:bow") return

  const ftLvl = holding.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getCompoundTag("enchantments")?.getTag("ultimate_fatal_tempo");
  if (!ftLvl) return

  ftLevel = ftLvl;
  prevHit = Date.now()
  hits++
}

registerWhen(register("soundPlay", addHits).setCriteria("tile.piston.out"), () => settings().fatalTempo && WorldUtil.isWorld("Kuudra"));
registerWhen(register("soundPlay", addHits).setCriteria("random.successful_hit"), () => settings().fatalTempo && !WorldUtil.isWorld("Kuudra"));

const calcString = (countdown = 0, percent = 0) => {
  countdown = clamp(countdown, 0, 3)
  percent = clamp(percent, 0, 200)
  let displayText = settings().ftPrefix ? `Fatal Tempo: ` : ""

  displayText += settings().ftPercent ? 
    ((percent === 200) ? "&a" :
    (percent > 0) ? "&e" :
    "&c")
  : ""

  const percentString = percent >= 100 ? percent : `  ${percent}`
  displayText += settings().ftPercent ? `${percentString}%` : ""

  displayText += (settings().ftPercent && settings().ftTime) ? " &r| " : ""

  displayText += settings().ftTime ?
    ((countdown > 1.25) ? "&a" :
    (countdown > 0) ? "&e" :
    "&c")
  : ""

  displayText += settings().ftTime ? `${ countdown.toFixed(2) }s` : ""

  return (
    (settings().fatalTempo === 1) ||
    (settings().fatalTempo === 2 && percent > 0) ||
    (settings().fatalTempo === 3 && percent === 200)
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
}), () => settings().fatalTempo !== 0);

ftOverlay.setMessage(
  settings().fatalTempo == 1 ? ftExample : ""
)
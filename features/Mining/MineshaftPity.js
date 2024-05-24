import settings from "../../config"
import { registerWhen } from "../../utils/functions";
import { Overlay } from "../../utils/overlay";
import { data } from "../../utils/data";
import WorldUtil from "../../utils/world";

const dataset = JSON.parse(FileLib.read("NwjnAddons/features/Mining", "MineshaftPityBlocks.json"))
const [VALID_BLOCKS, VALID_SOUNDS] = [dataset.blocks, dataset.sounds]

const pityExample = 
`&6Shaft Pity: &b1/2000 &7(0.05%)`;
const pityOverlay = new Overlay("mineshaftPity", ["Dwarven Mines"], () => true, data.pityL, "movePity", pityExample)

let pityLeft = 2000
const changePity = (block) => {
  const [name, bit] = block
  const qualityTest = VALID_BLOCKS.find(e => e.blocks.find(x => x.name == name && (x.bit == bit || x.bit == null)))

  if (qualityTest) {
    pityLeft -= qualityTest.quality
    const percent = (1 / pityLeft) * 100
    pityOverlay.setMessage(`&6Shaft Pity: &b1/${pityLeft} &7(${percent.toFixed(3)}%)`)
  }
}


let lastBlock;
registerWhen(register("hitBlock", (block) => {
  lastBlock = [block.type.getName(), block.getMetadata()]
}), () => WorldUtil.worldIs("Dwarven Mines") && settings.mineshaftPity)

registerWhen(register("soundPlay", (_, name, vol, pitch) => {
  const find = VALID_SOUNDS.find(e =>
    e.name === name &&
    vol === e.vol &&
    [pitch, undefined].includes(e?.pitch)
  )

  if (find) changePity(lastBlock)
}), () => WorldUtil.worldIs("Dwarven Mines") && settings.mineshaftPity);

const reset = () => {
  pityLeft = 2000
  const percent = (1 / pityLeft) * 100
  pityOverlay.setMessage(`&6Shaft Pity: &b1/${pityLeft} &7(${percent.toFixed(3)}%)`)
}

register("chat", reset).setCriteria(/(MINESHAFT! A Mineshaft portal spawned nearby!| ⛏ (?:) entered the mineshaft!)/);
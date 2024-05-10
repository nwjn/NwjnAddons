import settings from "../../config"
import { registerWhen } from "../../utils/functions";
import { Overlay } from "../../utils/overlay";
import { data } from "../../utils/data";
import WorldUtil from "../../utils/world";

// name, bits, quality
const VALID_BLOCKS = [
  {
    quality: 2,
    blocks: [
      { name: "Stained Clay", bit: 9 },
      { name: "Wool", bit: 7 },
      { name: "Wool", bit: 3 },
      { name: "Prismarine", bit: 2 },
      { name: "Prismarine", bit: 1}
    ]
  },

  {
    quality: 4,
    blocks: [
      { name: "Stained Glass", bit: null },
      { name: "Stained Glass Pane", bit: null },
      
      { name: "Packed Ice", bit: 0 },

      { name: "Stained Clay", bit: 12 },
      { name: "Red Sandstone Slab", bit: 8 },
      { name: "Hardened Clay", bit: 0 },

      { name: "Clay", bit: 0 },
      { name: "Cobblestone", bit: 0 }
    ]
  },

  {
    quality: 8,
    blocks: [
      { name: "Stone", bit: 4 }
    ]
  }
]


const pityExample = 
`&6Shaft Pity: &b1/2000 &7(0.00%)`;
const pityOverlay = new Overlay("mineshaftPity", ["all"], () => true, data.pityL, "movePity", pityExample)

let pityLeft = 2000
// registerWhen(
  register("hitBlock", (block) => {
  const [name, bit] = [block.type.getName(), block.getMetadata()]
  
  const qualityTest = VALID_BLOCKS.find(e => e.blocks.find(x => x.name == name && x.bit == bit))

  if (qualityTest) {
    pityLeft -= qualityTest.quality
    const percent = (1 / pityLeft) * 100
    pityOverlay.setMessage(`&6Shaft Pity: &b1/${pityLeft} &7(${percent}%)`)
  }
})
  // , () => WorldUtil.worldIs("Dwarven Mines") && settings.mineshaftPity);
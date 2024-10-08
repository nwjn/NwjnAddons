
import Feature from "../../core/Feature";
import { Event } from "../../core/Event";
import Settings from "../../data/Settings";
import RenderUtil from "../../core/static/RenderUtil";

// Credit: https://github.com/DocilElm/Doc/blob/main/features/misc/BlockOverlay.js for these fields
const Blocks = net.minecraft.init.Blocks
const BlockFlowingLava = Blocks.field_150356_k
const BlockLava = Blocks.field_150353_l
const BlockFlowingWater = Blocks.field_150358_i
const BlockWater = Blocks.field_150355_j
const BlockAir = Blocks.field_150350_a

new Feature("blockHighlight")
  .addEvent(
    new Event("drawBlockHighlight", ({x, y, z}, event) => {
      const ctBlock = World.getBlockAt(x, y, z)
      const mcBlock = ctBlock.type.mcBlock

      if (mcBlock == BlockAir ||
        mcBlock == BlockFlowingLava ||
        mcBlock == BlockFlowingWater ||
        mcBlock == BlockLava ||
        mcBlock == BlockWater) return

      const pticks = event.partialTicks

      const [ r, g, b, a ] = Settings().highlightColor

      cancel(event)

      RenderUtil.outlineBlock(ctBlock, r, g, b, a, false, 3, true, pticks)
    })
  );
import ConfigProperty from "../../data/ConfigProperty"
import Feature from "../../libs/Features/Feature"
import RenderHelper from "../../libs/Render/RenderHelper"
import { renderAABBOutline, renderAABBFilled } from "../../../Apelles/index"

const setting = new ConfigProperty("Switch", {
    category: "General",
    configName: "BlockHighlight",
    title: "Toggle Block Highlight",
    description: "Adds an overlay onto the hitbox of the block currently looked at"
})

const color = new ConfigProperty("ColorPicker", {
    category: "General",
    configName: "BlockHighlightColor",
    title: "Highlight Color",
    description: "Sets the color for block highlight",
    value: [255, 190, 239, 255],
    shouldShow: data => data.BlockHighlight
})

new class extends Feature {
    constructor() {
        super({setting})

        this.addEvent(net.minecraftforge.client.event.DrawBlockHighlightEvent, this.onBlockHighlight.bind(this))
    }

    /**
     * @Event net.minecraftforge.client.event.DrawBlockHighlightEvent
     */
    onBlockHighlight(event) {
        const { target } = event
        cancel(event)
        if (target?./* typeOfHit */field_72313_a?.toString() !== "BLOCK") return
        
        const BlockPos = target./* getBlockPos */func_178782_a()
        if (!BlockPos) return
        
        const world = World.getWorld()
        const BlockState = world./* getBlockState */func_180495_p(BlockPos)

        // Accurately retrieve the Block's bounds
        const Block = BlockState./* getBlock */func_177230_c()
        Block./* setBlockBoundsBasedOnState */func_180654_a(world, BlockPos)
        const BlockBounds = Block./* getSelectedBoundingBox */func_180646_a(world, BlockPos)
        
        // RenderUtil.drawFilledOutline(BlockBounds, this.Color, false, 6, false)
        const [mX, mY, mZ, MX, MY, MZ] = RenderHelper.getAxisCoords(BlockBounds)

        renderAABBOutline(color.packedInt, mX, mY, mZ, MX, MY, MZ, {lw: 6, smooth: true, cull: false})   
        renderAABBFilled(color.packedIntScaled, mX, mY, mZ, MX, MY, MZ, {cull: false})
    }

    postInit() {
        color.trackColor()
    }
}
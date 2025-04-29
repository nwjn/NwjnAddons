import { renderMCAABBFilled, renderMCAABBOutline } from "../../../Apelles"
import ConfigProperty from "../../data/ConfigProperty"
import Feature from "../../libs/Features/Feature"

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

        this.addEvent("DrawBlockHighlight", this.onBlockHighlight.bind(this))
    }

    /**
     * @Event DrawBlockHighlight
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

        renderMCAABBOutline(color.packed, BlockBounds, {lw: 4, smooth: true, cull: false})   
        renderMCAABBFilled(color.dulled, BlockBounds, {cull: false})
    }

    postInit() {
        color.update()
    }
}
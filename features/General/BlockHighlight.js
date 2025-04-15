import Feature from "../../libs/Features/Feature"
import RenderUtil from "../../libs/Render/RenderUtil"

new class BlockHighlight extends Feature {
    constructor() {
        super({
            setting: this.constructor.name, 
            color: this.constructor.name + "Color"
        })


        this.addEvent(net.minecraftforge.client.event.DrawBlockHighlightEvent, this.onBlockHighlight.bind(this))

        this.init()
    }

    /** @Event {net.minecraftforge.client.event.DrawBlockHighlightEvent} */
    onBlockHighlight(event) {
        const { target } = event
        if (target?./* typeOfHit */field_72313_a?.toString() !== "BLOCK") return
        
        const BlockPos = target./* getBlockPos */func_178782_a()
        if (!BlockPos) return
        
        const world = World.getWorld()
        const BlockState = world./* getBlockState */func_180495_p(BlockPos)

        // Accurately retrieve the Block's bounds
        const Block = BlockState./* getBlock */func_177230_c()
        Block./* setBlockBoundsBasedOnState */func_180654_a(world, BlockPos)
        const BlockBounds = Block./* getSelectedBoundingBox */func_180646_a(world, BlockPos)
        
        RenderUtil.drawFilledOutline(BlockBounds, this.Color, false, 6, false)
        cancel(event)
    }
}
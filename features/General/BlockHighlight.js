import Feature from "../../libs/Features/Feature"
import ConfigProperty from "../../data/ConfigProperty"
import Apelles from "../../libs/Helper/RenderUtil"

void new class extends Feature {
    constructor() {
        super({
            setting: new ConfigProperty("Switch", {
                category: "General",
                configName: "BlockHighlight",
                title: "Toggle Block Highlight",
                description: "Adds an overlay onto the hitbox of the block currently looked at"
            }),
            
            color: new ConfigProperty("ColorPicker", {
                category: "General",
                configName: "BlockHighlightColor",
                title: "➤ Highlight Color",
                description: "     Sets the color for block highlight",
                value: [255, 190, 239, 255],
                shouldShow: data => data.BlockHighlight
            }),

            MC: Client.getMinecraft()
        })

        this.addEvent("RenderWorld", this.onRenderWorld.bind(this))
        this.addEvent("DrawBlockHighlight", this.onBlockHighlight.bind(this))
    }

    /** @Event RenderWorld */
    onRenderWorld() {
        const target = this.MC./* objectMouseOver */field_71476_x
        if (target?./* typeOfHit */field_72313_a?.toString() !== "BLOCK") return
        
        const BlockPos = target./* getBlockPos */func_178782_a()
        if (!BlockPos) return
        
        const world = World.getWorld()
        const BlockState = world./* getBlockState */func_180495_p(BlockPos)

        const Block = BlockState./* getBlock */func_177230_c()
        Block./* setBlockBoundsBasedOnState */func_180654_a(world, BlockPos)

        const BlockBounds = Block./* getSelectedBoundingBox */func_180646_a(world, BlockPos)./* expand */func_72314_b(0.02, 0.02, 0.02)

        Apelles.renderMCAABBOutline(this.color.packed, BlockBounds, { lw: 2, smooth: true, cull: false })   
        Apelles.renderMCAABBFilled(this.color.dulled, BlockBounds, { cull: false })
    }

    /** 
     * @Event DrawBlockHighlight
     * Not rendering here because it does not trigger underwater
     */
    onBlockHighlight(_, event) {
        cancel(event)
    }
}
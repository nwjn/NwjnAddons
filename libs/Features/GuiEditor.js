import { addCommand } from "../../libs/Helper/Command"
import NumUtil from "../Helper/NumUtil"

const FontRenderer = Renderer.getFontRenderer()
const MCTessellator = net.minecraft.client.renderer.Tessellator./* getInstance */func_178181_a()
const DefaultVertexFormats$POSITION = net.minecraft.client.renderer.vertex.DefaultVertexFormats./* POSITION */field_181705_e
const WorldRenderer = MCTessellator./* getWorldRenderer */func_178180_c()

const EditorGui = new Gui()
const GuiFeatures = new Set()

export const createOverlayFor = (GuiFeature) => GuiFeatures.add(GuiFeature)
new class GuiEditor {
    constructor() {
        addCommand("gui", "Opens the Editor Gui", () => EditorGui.open())

        // Editing Handlers
        const Dragger = register("dragged", ((dX, dY, mX, mY) => {
            const feat = GuiFeatures.find(feat => this.isInBounds(feat, mX, mY))
            if (!feat) return

            feat.data.x = Math.min(Math.max(feat.data.x + dX, 0), Renderer.screen.getWidth() - feat.maxWidth * feat.data.scale)
            feat.data.y = Math.min(Math.max(feat.data.y + dY, 0), Renderer.screen.getHeight() - feat.totHeight * feat.data.scale)
        })).unregister()
        EditorGui.registerScrolled((mX, mY, delta) => {
            const feat = GuiFeatures.find(feat => this.isInBounds(feat, mX, mY))
            if (!feat) return

            feat.data.scale += delta * 0.025
        })

        // Rendering Handlers
        const Overlay = register("renderOverlay", () => GuiFeatures.forEach(feat => this.draw(feat)))
        EditorGui.registerOpened(() => {
            Overlay.unregister()
            Dragger.register()
        })
        EditorGui.registerClosed(() => {
            Overlay.register()
            Dragger.unregister()
        })
        EditorGui.registerDraw(() => GuiFeatures.forEach(feat => this.drawInEditor(feat)))
    }    

    isInBounds(feat, mX, mY) {
        const { x, y, scale } = feat.data

        return mX >= x
            && mY >= y
            && mX <= x + feat.maxWidth * scale
            && mY <= y + feat.totHeight * scale
    }

    draw(feat) {
        if (!feat.isRegistered || !feat.lines.length) return
        this._draw(feat, feat.lines)
    }

    drawInEditor(feat) {
        const lines = feat.lines.length ? feat.lines : feat.defaultText
        this._draw(feat, lines)
    }

    _draw(feat, lines) {
        const {x, y, scale} = feat.data
        const [ox, oy] = [x / scale, y / scale]
        
        Renderer.retainTransforms(true)
        Renderer.scale(scale, scale)
        GlStateManager./* enableBlend */func_179147_l()
        GlStateManager./* disableTexture2D */func_179090_x()
        GlStateManager./* tryBlendFuncSeparate */func_179120_a(770, 771, 1, 0)
        GlStateManager./* color */func_179131_c(0.2, 0.2, 0.2, 0.6)

        WorldRenderer./* begin */func_181668_a(7, DefaultVertexFormats$POSITION)
        WorldRenderer./* pos */func_181662_b(ox - 1, oy + feat.totHeight + 1, 0)./* endVertex */func_181675_d()
        WorldRenderer./* pos */func_181662_b(ox + feat.maxWidth + 1, oy + feat.totHeight + 1, 0)./* endVertex */func_181675_d()
        WorldRenderer./* pos */func_181662_b(ox + feat.maxWidth + 1, oy - 1, 0)./* endVertex */func_181675_d()
        WorldRenderer./* pos */func_181662_b(ox - 1, oy - 1, 0)./* endVertex */func_181675_d()
        MCTessellator./* draw */func_78381_a()

        GlStateManager./* enableTexture2D */func_179098_w()
        GlStateManager./* disableBlend */func_179084_k()
        
        const argb = feat.color.shifted | 0
        for (let i = 0; i < lines.length; i++) 
            FontRenderer./* drawString */func_175065_a(lines[i], ox, oy + 1 + i * 9, argb, true)
        Renderer.retainTransforms(false)
        Renderer.finishDraw()
    }
}
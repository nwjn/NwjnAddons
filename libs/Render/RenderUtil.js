/** 
 * Many optimizations taken from DocileElm and PerseusPotter:
 * Their respective links are:
 * @author DocilElm
 * @license {GNU-GPL-3} https://github.com/DocilElm/Doc/blob/main/LICENSE
 * @credit https://github.com/DocilElm/Doc/blob/main/shared/Render.js
 * @author PerseusPotter
 * @license {GNU-GPL-3} https://github.com/PerseusPotter/chicktils/blob/master/LICENSE.md
 * @credit https://github.com/PerseusPotter/chicktils/blob/master/util/draw.js
 */

import { getRenderX, getRenderY, getRenderZ } from "../../../Apelles/index"
const MCTessellator = net.minecraft.client.renderer.Tessellator./* getInstance */func_178181_a()
const WorldRenderer = MCTessellator./* getWorldRenderer */func_178180_c()

export default class RenderUtil {
    /**
     * - Chattriggers' Tessellator.drawString() with depth check and multiline
     * - Renders floating lines of text in the 3D world at a specific position.
     *
     * @param {String|String[]} text The text to render
     * @param {Number} x X coordinate in the game world
     * @param {Number} y Y coordinate in the game world
     * @param {Number} z Z coordinate in the game world
     * @param {Number} color the color of the text
     * @param {Boolean} renderBlackBox
     * @param {Number} scale the scale of the text
     * @param {Boolean} increase whether to scale the text up as the player moves away
     * @param {Boolean} shadow whether to render shadow
     * @param {Boolean} esp whether to render through walls
     */
    static drawString(
        text,
        x,
        y,
        z,
        color = Renderer.WHITE,
        renderBlackBox = true,
        scale = 1,
        increase = true,
        shadow = true,
        esp = true
    ) {
        const [rx, ry, rz] = [getRenderX(), getRenderY(), getRenderZ()]
        if (increase) scale = Math.hypot(x - rx, y - ry, z - rz) / 128
        const xMulti = Client.settings.getSettings()./* thirdPersonView */field_74320_O === 2 ? -1 : 1
    
        const lines = text.addColor().split("\n")
        const height = lines.length * 9 + 1
        const widths = lines.map(l => Renderer.getStringWidth(l) * 0.5)
        const maxWidth = Math.max.call(null, widths) + 1

        Tessellator
            .pushMatrix()
            .translate(x - rx, y - ry, z - rz)
            .rotate(-Player.getPitch(), 0, 1, 0)
            .rotate(Player.getYaw() * xMulti, 1, 0, 0)
            .scale(-scale, -scale, scale)
            .enableAlpha()
            .enableBlend()
            .tryBlendFuncSeparate(770, 771, 1, 771)
            .depthMask(false)
            if (esp) Tessellator.disableDepth()

        if (renderBlackBox) {
            Tessellator.colorize(0, 0, 0, 0.25)
            WorldRenderer./* begin */func_181668_a(5, net.minecraft.client.renderer.vertex.DefaultVertexFormats./* POSITION */field_181705_e)
            WorldRenderer./* pos */func_181662_b(-maxWidth, -1, -1)./* endVertex */func_181675_d()
            WorldRenderer./* pos */func_181662_b(-maxWidth, height, -1)./* endVertex */func_181675_d()
            WorldRenderer./* pos */func_181662_b(maxWidth, -1, -1)./* endVertex */func_181675_d()
            WorldRenderer./* pos */func_181662_b(maxWidth, height, -1)./* endVertex */func_181675_d()
            MCTessellator./* draw */func_78381_a()
        }
        
        Tessellator
            .enableTexture2D()

        const FontRenderer = Renderer.getFontRenderer()
        lines.forEach((line, index) => 
            FontRenderer./* drawString */func_175065_a(line, -widths[index], index * 9, color, shadow)
        )

        Tessellator
            .popMatrix()
            .disableBlend()
            .depthMask(true)
            if (esp) Tessellator.enableDepth()
    }
}
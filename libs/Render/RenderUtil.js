// /** 
//  * Many optimizations taken from DocileElm and PerseusPotter:
//  * Their respective links are:
//  * @author DocilElm
//  * @license {GNU-GPL-3} https://github.com/DocilElm/Doc/blob/main/LICENSE
//  * @credit https://github.com/DocilElm/Doc/blob/main/shared/Render.js
//  * @author PerseusPotter
//  * @license {GNU-GPL-3} https://github.com/PerseusPotter/chicktils/blob/master/LICENSE.md
//  * @credit https://github.com/PerseusPotter/chicktils/blob/master/util/draw.js
//  */

// import { ColorContainer } from "./ColorContainer"
// import RenderHelper from "./RenderHelper"
// const MCTessellator = net.minecraft.client.renderer.Tessellator./* getInstance */func_178181_a()
// const DefaultVertexFormats = net.minecraft.client.renderer.vertex.DefaultVertexFormats
// const DefaultVertexFormats$POSITION = DefaultVertexFormats./* POSITION */field_181705_e
// const WorldRenderer = MCTessellator./* getWorldRenderer */func_178180_c()

// // From BeaconBeam module
// const beaconBeam = new net.minecraft.util.ResourceLocation("textures/entity/beacon_beam.png")

// export default class RenderUtil {
//     /**
//      * @param {AxisAlignedBB} aabb
//      * @param {ColorContainer} color
//      * @param {Boolean} esp 
//      * @param {Number} lineWidth 
//      * @param {Boolean} checkFrustum
//      */
//     static drawFilledOutline(aabb, color, esp, lineWidth, checkFrustum) {
//         if (checkFrustum && !RenderHelper.inFrustum(aabb)) return
        
//         const {rx, ry, rz} = RenderHelper.getRenderPos()

//         GL11.glLineWidth(lineWidth)
//         GL11.glEnable(2848)
//         GlStateManager./* enableBlend */func_179147_l()
//         GlStateManager./* disableTexture2D */func_179090_x()
//         GlStateManager./* tryBlendFuncSeparate */func_179120_a(770, 771, 1, 0)
//         if (esp) GlStateManager./* disableDepth */func_179097_i()
//         GlStateManager./* pushMatrix */func_179094_E()
//         color.glColor(0.2)
//         GlStateManager./* translate */func_179109_b(-rx, -ry, -rz)
                
//         const [minX, minY, minZ, maxX, maxY, maxZ] = RenderHelper.getAxisCoords(aabb)
//         // Filled
//         WorldRenderer./* begin */func_181668_a(5, DefaultVertexFormats$POSITION)
//         WorldRenderer./* pos */func_181662_b(minX, minY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, minY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(minX, minY, maxZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, minY, maxZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(minX, maxY, maxZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, maxY, maxZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(minX, maxY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, maxY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(minX, minY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, minY, minZ)./* endVertex */func_181675_d()
//         MCTessellator./* draw */func_78381_a()
//         WorldRenderer./* begin */func_181668_a(7, DefaultVertexFormats$POSITION)
//         WorldRenderer./* pos */func_181662_b(minX, minY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(minX, minY, maxZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(minX, maxY, maxZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(minX, maxY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, minY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, minY, maxZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, maxY, maxZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, maxY, minZ)./* endVertex */func_181675_d()
//         MCTessellator./* draw */func_78381_a()

//         // Outline
//         color.glColor()
//         WorldRenderer./* begin */func_181668_a(3, DefaultVertexFormats$POSITION)
//         WorldRenderer./* pos */func_181662_b(minX, minY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, minY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, minY, maxZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(minX, minY, maxZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(minX, minY, minZ)./* endVertex */func_181675_d()
//         MCTessellator./* draw */func_78381_a()
//         WorldRenderer./* begin */func_181668_a(3, DefaultVertexFormats$POSITION)
//         WorldRenderer./* pos */func_181662_b(minX, maxY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, maxY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, maxY, maxZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(minX, maxY, maxZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(minX, maxY, minZ)./* endVertex */func_181675_d()
//         MCTessellator./* draw */func_78381_a()
//         WorldRenderer./* begin */func_181668_a(1, DefaultVertexFormats$POSITION)
//         WorldRenderer./* pos */func_181662_b(minX, minY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(minX, maxY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, minY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, maxY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, minY, maxZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, maxY, maxZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(minX, minY, maxZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(minX, maxY, maxZ)./* endVertex */func_181675_d()
//         MCTessellator./* draw */func_78381_a()

//         GlStateManager./* popMatrix */func_179121_F()
//         GlStateManager./* disableBlend */func_179084_k()
//         GlStateManager./* enableTexture2D */func_179098_w()
//         if (esp) GlStateManager./* enableDepth */func_179126_j()
//         GL11.glDisable(2848)
//         GL11.glLineWidth(3)
//     }

//     /**
//      * @param {Number} x
//      * @param {Number} y
//      * @param {Number} z
//      * @param {Number} w
//      * @param {Number} h
//      * @param {ColorContainer} color
//      * @param {Boolean} esp 
//      * @param {Number} lineWidth 
//      * @param {Boolean} checkFrustum
//      */
//     static drawOutlinedBox(x, y, z, w, h, color, esp, lineWidth, checkFrustum) {
//         RenderHelper.drawOutlinedAABB(RenderHelper.toAABB(x, y, z, w, h), color, esp, lineWidth, checkFrustum)
//     }

//     /**
//      * @param {net.minecraft.util.AxisAlignedBB} aabb 
//      * @param {ColorContainer} color
//      * @param {Boolean} esp 
//      * @param {Number} lineWidth 
//      * @param {Boolean} checkFrustum
//      */
//     static drawOutlinedAABB(aabb, color, esp, lineWidth, checkFrustum) {
//         if (checkFrustum && !RenderHelper.inFrustum(aabb)) return

//         const {rx, ry, rz} = RenderHelper.getRenderPos()

//         GlStateManager./* disableTexture2D */func_179090_x()
//         GlStateManager./* disableLighting */func_179140_f()
//         GlStateManager./* disableAlpha */func_179118_c()
//         GL11.glLineWidth(lineWidth)
//         GL11.glEnable(2848)
//         color.glColor()
//         GlStateManager./* pushMatrix */func_179094_E()
//         GlStateManager./* translate */func_179109_b(-rx, -ry, -rz)
//         GlStateManager./* depthMask */func_179132_a(false)
//         GlStateManager./* enableBlend */func_179147_l()
//         GlStateManager./* tryBlendFuncSeparate */func_179120_a(770, 771, 1, 0)
//         if (esp) GlStateManager./* disableDepth */func_179097_i()

//         const [minX, minY, minZ, maxX, maxY, maxZ] = RenderHelper.getAxisCoords(aabb)
//         WorldRenderer./* begin */func_181668_a(3, DefaultVertexFormats$POSITION)
//         WorldRenderer./* pos */func_181662_b(minX, minY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, minY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, minY, maxZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(minX, minY, maxZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(minX, minY, minZ)./* endVertex */func_181675_d()
//         MCTessellator./* draw */func_78381_a()
//         WorldRenderer./* begin */func_181668_a(3, DefaultVertexFormats$POSITION)
//         WorldRenderer./* pos */func_181662_b(minX, maxY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, maxY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, maxY, maxZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(minX, maxY, maxZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(minX, maxY, minZ)./* endVertex */func_181675_d()
//         MCTessellator./* draw */func_78381_a()
//         WorldRenderer./* begin */func_181668_a(1, DefaultVertexFormats$POSITION)
//         WorldRenderer./* pos */func_181662_b(minX, minY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(minX, maxY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, minY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, maxY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, minY, maxZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, maxY, maxZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(minX, minY, maxZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(minX, maxY, maxZ)./* endVertex */func_181675_d()
//         MCTessellator./* draw */func_78381_a()

//         GlStateManager./* popMatrix */func_179121_F()
//         GlStateManager./* enableTexture2D */func_179098_w()
//         GlStateManager./* enableAlpha */func_179141_d()
//         GL11.glDisable(2848)
//         GL11.glLineWidth(3)
//         GlStateManager./* depthMask */func_179132_a(true)
//         GlStateManager./* disableBlend */func_179084_k()
//         if (esp) GlStateManager./* enableDepth */func_179126_j()
//     }

//     /**
//      * @param {Number} x
//      * @param {Number} y
//      * @param {Number} z
//      * @param {Number} w
//      * @param {Number} h
//      * @param {ColorContainer} color
//      * @param {Boolean} esp 
//      * @param {Boolean} checkFrustum
//      */
//     static drawFilledBox(x, y, z, w, h, color, esp, checkFrustum) {
//         RenderUtil.drawFilledBox(RenderHelper.toAABB(x, y, z, w, h), color, esp, checkFrustum)
//     }

//     /**
//      * @param {net.minecraft.util.AxisAlignedBB} aabb 
//      * @param {ColorContainer} color
//      * @param {Boolean} esp 
//      * @param {Boolean} checkFrustum
//      */
//     static drawFilledAABB(aabb, color, esp, checkFrustum) {
//         if (checkFrustum && !RenderHelper.inFrustum(aabb)) return
        
//         const {rx, ry, rz} = RenderHelper.getRenderPos()
        
//         GlStateManager./* disableTexture2D */func_179090_x()
//         GlStateManager./* disableLighting */func_179140_f()
//         GlStateManager./* disableAlpha */func_179118_c()
//         color.glColor()
//         GlStateManager./* pushMatrix */func_179094_E()
//         GlStateManager./* translate */func_179109_b(-rx, -ry, -rz)
//         GlStateManager./* depthMask */func_179132_a(false)
//         GlStateManager./* enableBlend */func_179147_l()
//         GlStateManager./* tryBlendFuncSeparate */func_179120_a(770, 771, 1, 0)
//         if (esp) GlStateManager./* disableDepth */func_179097_i()

//         const [minX, minY, minZ, maxX, maxY, maxZ] = RenderHelper.getAxisCoords(aabb)
//         WorldRenderer./* begin */func_181668_a(5, DefaultVertexFormats$POSITION)
//         WorldRenderer./* pos */func_181662_b(minX, minY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, minY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(minX, minY, maxZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, minY, maxZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(minX, maxY, maxZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, maxY, maxZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(minX, maxY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, maxY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(minX, minY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, minY, minZ)./* endVertex */func_181675_d()
//         MCTessellator./* draw */func_78381_a()

//         WorldRenderer./* begin */func_181668_a(7, DefaultVertexFormats$POSITION)
//         WorldRenderer./* pos */func_181662_b(minX, minY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(minX, minY, maxZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(minX, maxY, maxZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(minX, maxY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, minY, minZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, minY, maxZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, maxY, maxZ)./* endVertex */func_181675_d()
//         WorldRenderer./* pos */func_181662_b(maxX, maxY, minZ)./* endVertex */func_181675_d()
//         MCTessellator./* draw */func_78381_a()

//         GlStateManager./* popMatrix */func_179121_F()
//         GlStateManager./* enableTexture2D */func_179098_w()
//         GlStateManager./* enableAlpha */func_179141_d()
//         GL11.glDisable(2848)
//         GL11.glLineWidth(3)
//         GlStateManager./* depthMask */func_179132_a(true)
//         GlStateManager./* disableBlend */func_179084_k()
//         if (esp) GlStateManager./* enableDepth */func_179126_j()
//     }

//     /**
//      * @param {Number} ix
//      * @param {Number} iy
//      * @param {Number} iz
//      * @param {ColorContainer} color
//      * @param {Boolean} esp
//      * @param {Number} height 
//      * @param {Boolean} checkFrustum
//      * @link https://github.com/NotEnoughUpdates/NotEnoughUpdates/blob/98f4f6140ab8371f1fd18846f5489318af2b2252/src/main/java/io/github/moulberry/notenoughupdates/core/util/render/RenderUtils.java#L220
//      */
//     static renderBeaconBeam(x, y, z, color, esp, height, checkFrustum) {
//         if (checkFrustum && !RenderHelper.inFrustum(RenderHelper.toAABB(x, y, z, 0.5, height))) return

//         const {rx, ry, rz} = RenderHelper.getRenderPos()

//         const [r, g, b, a] = color.rgba1

//         GlStateManager./* pushMatrix */func_179094_E()
//         GlStateManager./* translate */func_179109_b(-rx, -ry, -rz)

//         const bottomOffset = 0
//         const topOffset = bottomOffset + height
//         if (esp) GlStateManager./* disableDepth */func_179097_i()
//         Client.getMinecraft()./* getTextureManager */func_110434_K()./* bindTexture */func_110577_a(beaconBeam)
//         GL11.glTexParameterf(3553, 10242, 10497)
//         GL11.glTexParameterf(3553, 10243, 10497)

//         GlStateManager./* disableLighting */func_179140_f()
//         GlStateManager./* enableCull */func_179089_o()
//         GlStateManager.func_179098_w()
//         GlStateManager./* tryBlendFuncSeparate */func_179120_a(770, 771, 1, 0)
//         GlStateManager./* enableBlend */func_179147_l()

//         const time = 0.2 * (World.getWorld().func_82737_E() + Tessellator.getPartialTicks())
//         const d1 = Math.ceil(time) - time
//         const d2 = time * -0.1875
//         const d4 = Math.cos(d2 + 2.356194490192345) * 0.2
//         const d5 = Math.sin(d2 + 2.356194490192345) * 0.2
//         const d6 = Math.cos(d2 + 0.7853981633974483) * 0.2
//         const d7 = Math.sin(d2 + 0.7853981633974483) * 0.2
//         const d8 = Math.cos(d2 + 3.9269908169872414) * 0.2
//         const d9 = Math.sin(d2 + 3.9269908169872414) * 0.2
//         const d10 = Math.cos(d2 + 5.497787143782138) * 0.2
//         const d11 = Math.sin(d2 + 5.497787143782138) * 0.2
//         const d14 = d1 - 1
//         const d15 = height * 2.5 + d14

//         WorldRenderer.func_181668_a(7, DefaultVertexFormats.field_181709_i);
//         WorldRenderer.func_181662_b(x + d4, y + topOffset, z + d5).func_181673_a(1, d15).func_181666_a(r, g, b, a).func_181675_d()
//         WorldRenderer.func_181662_b(x + d4, y + bottomOffset, z + d5).func_181673_a(1, d14).func_181666_a(r, g, b, 1).func_181675_d()
//         WorldRenderer.func_181662_b(x + d6, y + bottomOffset, z + d7).func_181673_a(0, d14).func_181666_a(r, g, b, 1).func_181675_d()
//         WorldRenderer.func_181662_b(x + d6, y + topOffset, z + d7).func_181673_a(0, d15).func_181666_a(r, g, b, a).func_181675_d()
//         WorldRenderer.func_181662_b(x + d10, y + topOffset, z + d11).func_181673_a(1, d15).func_181666_a(r, g, b, a).func_181675_d()
//         WorldRenderer.func_181662_b(x + d10, y + bottomOffset, z + d11).func_181673_a(1, d14).func_181666_a(r, g, b, 1).func_181675_d()
//         WorldRenderer.func_181662_b(x + d8, y + bottomOffset, z + d9).func_181673_a(0, d14).func_181666_a(r, g, b, 1).func_181675_d()
//         WorldRenderer.func_181662_b(x + d8, y + topOffset, z + d9).func_181673_a(0, d15).func_181666_a(r, g, b, a).func_181675_d()
//         WorldRenderer.func_181662_b(x + d6, y + topOffset, z + d7).func_181673_a(1, d15).func_181666_a(r, g, b, a).func_181675_d()
//         WorldRenderer.func_181662_b(x + d6, y + bottomOffset, z + d7).func_181673_a(1, d14).func_181666_a(r, g, b, 1).func_181675_d()
//         WorldRenderer.func_181662_b(x + d10, y + bottomOffset, z + d11).func_181673_a(0, d14).func_181666_a(r, g, b, 1).func_181675_d()
//         WorldRenderer.func_181662_b(x + d10, y + topOffset, z + d11).func_181673_a(0, d15).func_181666_a(r, g, b, a).func_181675_d()
//         WorldRenderer.func_181662_b(x + d8, y + topOffset, z + d9).func_181673_a(1, d15).func_181666_a(r, g, b, a).func_181675_d()
//         WorldRenderer.func_181662_b(x + d8, y + bottomOffset, z + d9).func_181673_a(1, d14).func_181666_a(r, g, b, 1).func_181675_d()
//         WorldRenderer.func_181662_b(x + d4, y + bottomOffset, z + d5).func_181673_a(0, d14).func_181666_a(r, g, b, 1).func_181675_d()
//         WorldRenderer.func_181662_b(x + d4, y + topOffset, z + d5).func_181673_a(0, d15).func_181666_a(r, g, b, a).func_181675_d()
//         MCTessellator./* draw */func_78381_a()
//         GlStateManager./* disableCull */func_179129_p()

//         const d12 = -1 + d1
//         const d13 = height + d12

//         WorldRenderer./* begin */func_181668_a(GL11.GL_QUADS, DefaultVertexFormats./* POSITION_TEX_COLOR */field_181709_i)
//         const w = 0.3
//         WorldRenderer.func_181662_b(x - w, y + topOffset, z - w).func_181673_a(1, d13).func_181666_a(r, g, b, 0.25 * a).func_181675_d()
//         WorldRenderer.func_181662_b(x - w, y + bottomOffset, z - w).func_181673_a(1, d12).func_181666_a(r, g, b, 0.25).func_181675_d()
//         WorldRenderer.func_181662_b(x + w, y + bottomOffset, z - w).func_181673_a(0, d12).func_181666_a(r, g, b, 0.25).func_181675_d()
//         WorldRenderer.func_181662_b(x + w, y + topOffset, z - w).func_181673_a(0, d13).func_181666_a(r, g, b, 0.25 * a).func_181675_d()
//         WorldRenderer.func_181662_b(x + w, y + topOffset, z + w).func_181673_a(1, d13).func_181666_a(r, g, b, 0.25 * a).func_181675_d()
//         WorldRenderer.func_181662_b(x + w, y + bottomOffset, z + w).func_181673_a(1, d12).func_181666_a(r, g, b, 0.25).func_181675_d()
//         WorldRenderer.func_181662_b(x - w, y + bottomOffset, z + w).func_181673_a(0, d12).func_181666_a(r, g, b, 0.25).func_181675_d()
//         WorldRenderer.func_181662_b(x - w, y + topOffset, z + w).func_181673_a(0, d13).func_181666_a(r, g, b, 0.25 * a).func_181675_d()
//         WorldRenderer.func_181662_b(x + w, y + topOffset, z - w).func_181673_a(1, d13).func_181666_a(r, g, b, 0.25 * a).func_181675_d()
//         WorldRenderer.func_181662_b(x + w, y + bottomOffset, z - w).func_181673_a(1, d12).func_181666_a(r, g, b, 0.25).func_181675_d()
//         WorldRenderer.func_181662_b(x + w, y + bottomOffset, z + w).func_181673_a(0, d12).func_181666_a(r, g, b, 0.25).func_181675_d()
//         WorldRenderer.func_181662_b(x + w, y + topOffset, z + w).func_181673_a(0, d13).func_181666_a(r, g, b, 0.25 * a).func_181675_d()
//         WorldRenderer.func_181662_b(x - w, y + topOffset, z + w).func_181673_a(1, d13).func_181666_a(r, g, b, 0.25 * a).func_181675_d()
//         WorldRenderer.func_181662_b(x - w, y + bottomOffset, z + w).func_181673_a(1, d12).func_181666_a(r, g, b, 0.25).func_181675_d()
//         WorldRenderer.func_181662_b(x - w, y + bottomOffset, z - w).func_181673_a(0, d12).func_181666_a(r, g, b, 0.25).func_181675_d()
//         WorldRenderer.func_181662_b(x - w, y + topOffset, z - w).func_181673_a(0, d13).func_181666_a(r, g, b, 0.25 * a).func_181675_d()
//         MCTessellator./* draw */func_78381_a()

//         GlStateManager./* enableTexture2D */func_179098_w()
//         if (esp) GlStateManager./* enableDepth */func_179126_j()
//         GlStateManager./* popMatrix */func_179121_F()
//     }
    
//     static renderWaypoint(text, x, y, z, color, phase, checkFrustum) {
//         const WaypointBB = RenderHelper.toAABB(x, y, z, Renderer.getStringWidth(text), 100)
//         if (checkFrustum && !RenderHelper.inFrustum(WaypointBB)) return

//         RenderUtil.renderBeaconBeam(x, y, z, color, phase, 100, false)

//         RenderUtil.drawString(text, x, y + 3, z, Renderer.WHITE, true, 0.4, true, true, phase, false)

//         const BlockBB = RenderHelper.toAABB(x, y, z, 1, 1)
//         RenderUtil.drawFilledOutline(BlockBB, color, phase, 4, false)
//     }
    
//     /**
//      * - Chattriggers' Tessellator.drawString() with depth check and multiline
//      * - Renders floating lines of text in the 3D world at a specific position.
//      *
//      * @param {String|String[]} text The text to render
//      * @param {Number} x X coordinate in the game world
//      * @param {Number} y Y coordinate in the game world
//      * @param {Number} z Z coordinate in the game world
//      * @param {ColorContainer|Number} color the color of the text
//      * @param {Boolean} renderBlackBox
//      * @param {Number} scale the scale of the text
//      * @param {Boolean} increase whether to scale the text up as the player moves away
//      * @param {Boolean} shadow whether to render shadow
//      * @param {Boolean} esp whether to render through walls
//      */
//     static drawString(
//         text,
//         x,
//         y,
//         z,
//         color = Renderer.WHITE,
//         renderBlackBox = true,
//         scale = 1,
//         increase = true,
//         shadow = true,
//         esp = true,
//         checkFrustum = true
//     ) {
//         const {rx, ry, rz} = RenderHelper.getRenderPos()
//         if (increase) scale = Math.hypot(x - rx, y - ry, z - rz) / 128
//         const xMulti = Client.settings.getSettings()./* thirdPersonView */field_74320_O === 2 ? -1 : 1
    
//         const lines = text.addColor().split("\n")
//         const height = lines.length * 9 + 1
//         const widths = lines.map(l => Renderer.getStringWidth(l) * 0.5)
//         const maxWidth = Math.max.call(null, widths) + 1
        
//         if (checkFrustum && !RenderHelper.isBoundsInFrustum((x - rx) * scale, (y - ry) * scale, (z - rz) * scale, maxWidth, height)) return

//         Tessellator
//             .pushMatrix()
//             .translate(x - rx, y - ry, z - rz)
//             .rotate(-RenderHelper.getRenderPitch(), 0, 1, 0)
//             .rotate(RenderHelper.getRenderYaw() * xMulti, 1, 0, 0)
//             .scale(-scale, -scale, scale)
//             .enableAlpha()
//             .enableBlend()
//             .tryBlendFuncSeparate(770, 771, 1, 771)
//             .depthMask(false)
//             if (esp) Tessellator.disableDepth()

//         if (renderBlackBox) {
//             Tessellator.colorize(0, 0, 0, 0.25)
//             WorldRenderer./* begin */func_181668_a(5, DefaultVertexFormats$POSITION)
//             WorldRenderer./* pos */func_181662_b(-maxWidth, -1, -1)./* endVertex */func_181675_d()
//             WorldRenderer./* pos */func_181662_b(-maxWidth, height, -1)./* endVertex */func_181675_d()
//             WorldRenderer./* pos */func_181662_b(maxWidth, -1, -1)./* endVertex */func_181675_d()
//             WorldRenderer./* pos */func_181662_b(maxWidth, height, -1)./* endVertex */func_181675_d()
//             MCTessellator./* draw */func_78381_a()
//         }
        
//         Tessellator
//             .enableTexture2D()

//         const FontRenderer = Renderer.getFontRenderer()
//         color = color instanceof ColorContainer ? color.getFontHex() : color
//         lines.forEach((line, index) => 
//             FontRenderer./* drawString */func_175065_a(line, -widths[index], index * 9, color, shadow)
//         )

//         Tessellator
//             .popMatrix()
//             .disableBlend()
//             .depthMask(true)
//             if (esp) Tessellator.enableDepth()
//     }
// }
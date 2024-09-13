const fontRenderer = Renderer.getFontRenderer()
const renderManager = Renderer.getRenderManager()
/**
 * Just Tesselator#drawString with depth check
 *
 * Renders floating lines of text in the 3D world at a specific position.
 *
 * @param {String} text The string array of text to render
 * @param {Number} x X coordinate in the game world
 * @param {Number} y Y coordinate in the game world
 * @param {Number} z Z coordinate in the game world
 * @param {Number} scale the scale of the text
 * @param {Number} color the color of the text
 * @param {Boolean} increase whether to scale the text up as the player moves away
 * @param {Boolean} depth whether to show through walls
 */
export function tessellateStringWithDepth(
  text,
  x,
  y,
  z,
  scale = 1,
  color = 0xffffff,
  increase = false,
  depth = false
) {
  const lText = text.addColor()
  const renderPos = Tessellator.getRenderPos(x, y, z)
  
  let lScale = scale
  if (increase) {
    const distance = Math.sqrt(renderPos.x * renderPos.x + renderPos.y * renderPos.y + renderPos.z * renderPos.z)
    const multiplier = distance / 120 //mobs only render ~120 blocks away
    lScale *= 0.45 * multiplier
  }
  const xMultiplier = Client.getMinecraft().field_71474_y.field_74320_O == 2 ? -1 : 1

  Tessellator.colorize(1, 1, 1, 0.5)
  Tessellator.pushMatrix()

  Tessellator.translate(renderPos.x, renderPos.y, renderPos.z)
  Tessellator.rotate(-renderManager.field_78735_i, 0, 1, 0)
  Tessellator.rotate(renderManager.field_78732_j * xMultiplier, 1, 0, 0)

  Tessellator.scale(-lScale, -lScale, lScale)
  Tessellator.disableLighting()
  Tessellator.depthMask(false)
  if (depth) {
    Tessellator.disableDepth()
  }

  Tessellator.enableBlend()
  Tessellator.blendFunc(770, 771)

  const textWidth = fontRenderer.func_78256_a(lText)
  fontRenderer.func_78276_b(lText, -textWidth / 2, 0, color)

  Tessellator.colorize(1, 1, 1, 1)
  Tessellator.depthMask(true)
  Tessellator.enableDepth()
  Tessellator.popMatrix()
}

// Fixes first title not showing on load
register("worldLoad", () => {
  Client.showTitle("", "", 1, 1, 1)
})
export default class RenderUtil {
  static #fontRenderer = Renderer.getFontRenderer()
  static #renderManager = Renderer.getRenderManager()
  /**
   * Renders floating lines of text in the 3D world at a specific position. Customized from Tesselator#drawString
   *
   * @param {Object} params
   */
  static drawString({
    text,
    x,
    y,
    z,
    color = 0xffffff,
    scale = 1,
    increase = false,
    depth = false
  }) {
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
    Tessellator.rotate(-this.#renderManager.field_78735_i, 0, 1, 0)
    Tessellator.rotate(this.#renderManager.field_78732_j * xMultiplier, 1, 0, 0)

    Tessellator.scale(-lScale, -lScale, lScale)
    Tessellator.disableLighting()
    Tessellator.depthMask(false)
    if (depth) {
      Tessellator.disableDepth()
    }

    Tessellator.enableBlend()
    Tessellator.blendFunc(770, 771)

    const textWidth = this.#fontRenderer.func_78256_a(lText)
    this.#fontRenderer.func_78276_b(lText, -textWidth / 2, 0, color)

    Tessellator.colorize(1, 1, 1, 1)
    Tessellator.depthMask(true)
    Tessellator.enableDepth()
    Tessellator.popMatrix()
  }
}
class RenderUtil {
  constructor() {
    this.fontRenderer = Renderer.getFontRenderer()
    this.renderManager = Renderer.getRenderManager()
  }

  drawStringWithDepth(text, x, y, z, color, scale = 1) {
    const renderPos = Tessellator.getRenderPos(x, y, z)
    const lScale = scale

    const xMultiplier = Client.getMinecraft().field_71474_y.field_74320_O == 2 ? -1 : 1

    GlStateManager.func_179131_c(1, 1, 1, 0.5)
    GlStateManager.func_179094_E()
    GlStateManager.func_179137_b(renderPos.x, renderPos.y, renderPos.z)
    GlStateManager.func_179114_b(-this.renderManager.field_78735_i, 0, 1, 0)
    GlStateManager.func_179114_b(this.renderManager.field_78732_j * xMultiplier, 1, 0, 0)
    GlStateManager.func_179152_a(-lScale, -lScale, lScale)
    GlStateManager.func_179140_f()
    GlStateManager.func_179132_a(false)

    GlStateManager.func_179147_l()
    GlStateManager.func_179112_b(770, 771)

    const textWidth = this.fontRenderer.func_78256_a(text)

    this.fontRenderer.func_78276_b(text, -textWidth / 2, 0, color)

    GlStateManager.func_179131_c(1, 1, 1, 1)
    GlStateManager.func_179132_a(true)
    GlStateManager.func_179126_j()
    GlStateManager.func_179121_F()
  }
}

export default new RenderUtil;
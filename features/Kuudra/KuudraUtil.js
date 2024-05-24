import { onWorldLeave } from "../../utils/functions"

class KuudraUtil {
  constructor() {
    this.registers = [];
    this.reset();

    register("chat", () => {
      this.phase = -1
      this.setRegisters()
    }).setCriteria("[NPC] Elle: Talk with me to begin!")

    register("chat", () => {
      this.phase = 1;
      this.setRegisters();
    }).setCriteria("[NPC] Elle: Okay adventurers, I will go and fish up Kuudra!");

    register("chat", () => {
      this.phase = 2;
      this.setRegisters();
    }).setCriteria("[NPC] Elle: OMG! Great work collecting my supplies!");

    register("chat", () => {
      this.phase = 3;
      this.freshers.clear()
      this.setRegisters();
    }).setCriteria("[NPC] Elle: Phew! The Ballista is finally ready! It should be strong enough to tank Kuudra's blows now!");

    register("chat", () => {
      this.phase = 4;
      this.setRegisters();
    }).setCriteria("[NPC] Elle: POW! SURELY THAT'S IT! I don't think he has any more in him!")

    onWorldLeave(() => {
      this.reset();
    });

    this.registerWhen(register("guiClosed", (event) => {
      if (event?.toString()?.includes("vigilance")) this.setRegisters()
    }), () => this.inKuudra());
    
    // render stuff
    this.fontRenderer = Renderer.getFontRenderer()
    this.renderManager = Renderer.getRenderManager()
  }

  /**
   * Resets all variables
   */
  reset() {
    this.supplies = [true, true, true, true, true, true]
    this.phase = false
    this.preSpot = ""
    this.preLoc = [0, 0, 0]
    this.missing = ""
    this.freshers = new Set()
    this.freshTime = 0
    this.freshLeft = 0
    this.build = 0
    this.builders = 0
    this.buildPiles = []

    this.setRegisters(false)
  }

  /**
   * True -> When in a real phase
   * @returns {Boolean}
   */
  inKuudra() {
    return Boolean(this.phase)
  }

  /**
   * True -> When in pahse 1-4
   * @returns {Boolean}
   */
  isFight() {
    return (this.phase > 0)
  }

  /**
   * True -> Phase in param is current phase
   * @param {Number} phase 
   * @returns {Boolean}
   */
  isPhase(phase) {
    return (this.phase == phase)
  }

  registerWhen(trigger, dependency, active = false) {
    (this.registers).push([trigger.unregister(), dependency, active]);
  }

  setRegisters(on = true) {
    (this.registers).forEach(trigger => {
      if (trigger[1]() && !trigger[2]) {
        trigger[0].register();
        trigger[2] = true;
      } else if ((!trigger[1]() && trigger[2]) || !on) {
        trigger[0].unregister();
        trigger[2] = false;
      }
    });
  }

  /**
   * Same as Tesselator.drawString() but with depth check and slightly more customized
   */
  drawKuudraHP(text, x, y, z, w, h, color = 0x00ffffff, lScale = 0.2) {
    const yaw = Player.getYaw()
    const wShift = w * 0.8
    const hShift = h / 2

    const xShift = x + (wShift * Math.cos((yaw - 90) * (Math.PI / 180)))
    const yShift = y + hShift
    const zShift = z + (wShift * Math.sin((yaw - 90) * (Math.PI / 180)))
    
    const renderPos = Tessellator.getRenderPos(xShift, yShift, zShift)

    const xMultiplier = Client.getMinecraft().field_71474_y.field_74320_O == 2 ? -1 : 1

    Tessellator.colorize(1, 1, 1, 0.5)
    Tessellator.pushMatrix()

    Tessellator.translate(renderPos.x, renderPos.y, renderPos.z)
    Tessellator.rotate(-this.renderManager.field_78735_i, 0, 1, 0)
    Tessellator.rotate(this.renderManager.field_78732_j * xMultiplier, 1, 0, 0)

    Tessellator.scale(-lScale, -lScale, lScale)
    Tessellator.disableLighting
    Tessellator.depthMask(false)

    Tessellator.enableBlend()
    Tessellator.blendFunc(770, 771)

    const textWidth = this.fontRenderer.func_78256_a(text)
    this.fontRenderer.func_78276_b(text, -textWidth / 2, 0, color)

    Tessellator.colorize(1, 1, 1, 1)
    Tessellator.depthMask(true)
    Tessellator.enableDepth()
    Tessellator.popMatrix()
  }
}

export default new KuudraUtil;
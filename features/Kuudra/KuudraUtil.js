import { onWorldLeave, getMaxHP } from "../../utils/functions"
import RenderUtil from "../../utils/RenderUtil";
import { EntityGiant, EntityArmorStand, EntityMagmaCube } from "../../utils/constants";

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

    register("guiClosed", (event) => {
      if (event?.toString()?.includes("vigilance")) this.setRegisters()
    });
    
    // render stuff
    this.fontRenderer = Renderer.getFontRenderer()
    this.renderManager = Renderer.getRenderManager()
  }

  /**
   * Resets all variables
   */
  reset() {
    this.phase = false
    this.supplies = [true, true, true, true, true, true]
    this.pres = undefined;
    this.preSpot = ""
    this.preLoc = []
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

  getKuudra() {
    // Array.find
    const cubes = World.getAllEntitiesOfType(EntityMagmaCube.class)
    let boss;
    let i = cubes.length
    while (i--) {
      let cube = cubes[i]
      // Kuudra's hp is 100k
      if (getMaxHP(cube) !== 100_000) continue;
      
      boss = cube
      break;
    }
    return boss
  }

  getSupplies() {
    const giants = World.getAllEntitiesOfType(EntityGiant.class)
    let supplies = []

    // Array.filter.map
    let i = giants.length
    while (i--) {
      let giant = giants[i]
      if (giant.getEntity()?.func_70694_bm()?.toString() !== "1xitem.skull@3") continue;

      let yaw = giant.getYaw()
      supplies.push(
        [
          giant.getX() + (3.7 * Math.cos((yaw + 130) * (Math.PI / 180))),
          72,
          giant.getZ() + (3.7 * Math.sin((yaw + 130) * (Math.PI / 180)))
        ]
      )
    }
    return supplies
  }

  getBuild() {
    const stands = World.getAllEntitiesOfType(EntityArmorStand.class)
    let buildText = []
    
    let i = stands.length
    while (i--) {
      let stand = stands[i]
      if (stand.getName()?.match(/progress/gi)) buildText.push(stand)
    }
    return buildText
  }

  drawKuudraHP(text, x, y, z, w, h) {
    const yaw = Player.getYaw()
    const wShift = w * 0.8
    const hShift = h / 2

    const xShift = x + (wShift * Math.cos((yaw - 90) * (Math.PI / 180)))
    const yShift = y + hShift
    const zShift = z + (wShift * Math.sin((yaw - 90) * (Math.PI / 180)))
    
    RenderUtil.drawString({
      text,
      x: xShift,
      y: yShift,
      z: zShift,
      scale: 0.2
    })
  }
}

export default new KuudraUtil;
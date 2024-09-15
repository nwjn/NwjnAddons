import { EntityGiant, EntityArmorStand } from "../../utils/constants";
import { meinConf } from "../../utils/Settings.js";

const PHASE = {
  "Talk with me to begin!": 0,
  "Okay adventurers, I will go and fish up Kuudra!": 1,
  "OMG! Great work collecting my supplies!": 2,
  "Phew! The Ballista is finally ready! It should be strong enough to tank Kuudra's blows now!": 3,
  "POW! SURELY THAT'S IT! I don't think he has any more in him!": 4
}

class KuudraUtil {
  #registers = []
  #phase = undefined

  constructor() {
    // [Register Checks]
    this._setRegisters()
    meinConf.onCloseGui(() => this._setRegisters())

    // [Reset Variables]
    this._reset()
    register("worldUnload", () => this._reset())

    // [Phase Listener]
    register("chat", (msg) => {
      this.#phase = PHASE?.[msg]
      this._setRegisters()
    }).setCriteria("[NPC] Elle: ${msg}")

    // // [Crate Entities]
    // this.registerWhen(register("step", () => {
    //   this.#crates =
    //     World.getAllEntitiesOfType(EntityGiant.class)
    //       .filter(it => it.entity?.func_70694_bm()?.toString() === "1xitem.skull@3")
    // }).setDelay(2), () => this.inPhase(1))

    // // [Pile Entities]
    // this.registerWhen(register("step", () => {
    //   this.#piles =
    //     World.getAllEntitiesOfType(EntityArmorStand.class)
    //       .filter(it => /PROGRESS: \d{1,3}%/.test(it.getName()?.removeFormatting()))
    // }).setDelay(2), () => this.inPhase(2))
  }
  
  registerWhen(trigger, dependency, active = false) {
    this.#registers.push([trigger.unregister(), dependency, active]);
  }

  _setRegisters(on = true) {
    this.#registers.forEach(trigger => {

      if (trigger[1]() && !trigger[2]) {
        trigger[0].register();
        trigger[2] = true;
      }

      else if ((!trigger[1]() && trigger[2]) || !on) {
        trigger[0].unregister();
        trigger[2] = false;
      }
    });
  }
  
  _reset() {
    this._setRegisters(false)
    this.#phase = undefined
  }
  
  /**
   * Checks if player is in kuudra
   * @returns {Boolean} 
   */
  inKuudra() {
    return this.#phase !== undefined
  }

  /**
   * Checks if the fight has started
   * @returns {Boolean}
   */
  hasStarted() {
    return Boolean(this.#phase)
  }

  /**
   * Checks if input is current phase
   * @param {Number} phase - test phase number
   * @returns {Boolean} Whether or not in this phase
   */
  inPhase(phase) {
    return this.#phase === phase
  }
}

export default new KuudraUtil();
import { meinConf } from "../../utils/Settings.js";
import Party from "../../utils/Party.js";

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
    // [Register Checks][NPC] Elle: Talk with me to begin!
    this._setRegisters()
    meinConf.onCloseGui(() => this._setRegisters())

    // [Reset Variables]
    this._reset()
    register("worldUnload", () => this._reset())

    // [Phase Listener]
    register("chat", (msg) => {
      const phase = PHASE?.[msg]
      if (!phase) return

      this.#phase = phase
      this._setRegisters()
    }).setCriteria("[NPC] Elle: ${msg}")
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
    this.kuudra = undefined
    this.party = Party.Members
    this.teammates = []
    this.preName = ""
    this.preLoc = undefined
    this.supplies = [true, true, true, true, true, true]
    this.missing = ""
    this.crates = []
    this.freshers = new Set()
    this.freshTime = 0
    this.build = 0
    this.piles = []
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
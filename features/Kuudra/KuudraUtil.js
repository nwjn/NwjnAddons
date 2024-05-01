import { onWorldJoin } from "../../utils/functions"

// const reference = JSON.parse(FileLib.read("NwjnAddons/features/Kuudra", "KuudraData.json"))
const references = {
  supplies: [true, true, true, true, true, true],
  preLoc: [0, 0, 0]
}

class KuudraUtil {
  constructor() {
    this.registers = []

    register("chat", () => {
      this.phase = 1
      this.setRegisters()
    }).setCriteria("[NPC] Elle: Okay adventurers, I will go and fish up Kuudra!")

    register("chat", () => {
      this.phase = 2
      this.setRegisters()
    }).setCriteria("[NPC] Elle: OMG! Great work collecting my supplies!")

    register("chat", () => {
      this.phase = 3
      this.fresh = []
      this.setRegisters()
    }).setCriteria("[NPC] Elle: Phew! The Ballista is finally ready! It should be strong enough to tank Kuudra's blows now!")

    register("chat", () => {
      this.phase = 4
      this.setRegisters()
    }).setCriteria("[NPC] Elle: POW! SURELY THAT'S IT! I don't think he has any more in him!");

    onWorldJoin(() => {
      this.reset()
      this.setRegisters(false)
    })
  }
  
  /**
   * Resets all variables
   */
  reset() {
    this.preSpot = ""
    this.preLoc = [0, 0, 0]
    this.missing = ""
    this.phase = 0
    this.fresh = []
    this.supplies = references.supplies
  }

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
}

export default new KuudraUtil;
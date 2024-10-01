// // import { meinConf } from "../../utils/Settings.js";
// // import Party from "../../utils/Party.js";
// import { Event } from "../../core/Event.js";
// import EventEnums from "../../core/EventEnums.js";
// // import Feature from "../../core/Feature.js";

// const PHASE = [
//   "Talk with me to begin!",
//   "Okay adventurers, I will go and fish up Kuudra!",
//   "OMG! Great work collecting my supplies!",
//   "Phew! The Ballista is finally ready! It should be strong enough to tank Kuudra's blows now!",
//   "POW! SURELY THAT'S IT! I don't think he has any more in him!"
// ]

// class KuudraUtil {
//   #features = [];
//   #phase;

//   constructor() {
//     // [Reset Variables]
//     this._reset()
//     register("worldUnload", () => this._reset())

//     // [Phase Listener]
//     PHASE.forEach((it, idx) => {
//       new Event(EventEnums.CHAT, () => {
//         this.#phase = idx
//         this._updateFeats()
//       }, `[NPC] Elle: ${it}`)
//     })
//   }
  
//   addFeat(feat) {
//     this.#features.push(feat)
//   }

//   _updateFeats() {
//     this.#features.forEach(it => it.update())
//   }
  
//   _reset() {
//     this.#features.forEach(it => it._unregister())
//     this.#phase = undefined
//   }
  
//   /**
//    * Checks if player is in kuudra
//    * @returns {Boolean} 
//    */
//   inKuudra() {
//     return this.#phase !== undefined
//   }

//   /**
//    * Checks if the fight has started
//    * @returns {Boolean}
//    */
//   hasStarted() {
//     return Boolean(this.#phase)
//   }

//   /**
//    * Checks if input is current phase
//    * @param {Number} phase - test phase number
//    * @returns {Boolean} Whether or not in this phase
//    */
//   inPhase(phase) {
//     return this.#phase === phase
//   }
// }

// export default new KuudraUtil();
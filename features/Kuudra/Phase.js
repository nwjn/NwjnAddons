import WorldUtil from "../../utils/world"
import { registerWhen, onWorldLeave } from "../../utils/functions";

let phase = 0
export function getPhase() { return phase; }

registerWhen(register("chat", () => {
  phase = 1;
}).setCriteria("[NPC] Elle: Okay adventurers, I will go and fish up Kuudra!"), () => WorldUtil.worldIs("Kuudra"));

registerWhen(register("chat", () => {
  phase = 2;
}).setCriteria("[NPC] Elle: OMG! Great work collecting my supplies!"), () => WorldUtil.worldIs("Kuudra"));

registerWhen(register("chat", () => {
  phase = 3;
}).setCriteria("[NPC] Elle: Phew! The Ballista is finally ready! It should be strong enough to tank Kuudra's blows now!"), () => WorldUtil.worldIs("Kuudra"));

registerWhen(register("chat", () => {
  phase = 4;
}).setCriteria("[NPC] Elle: POW! SURELY THAT'S IT! I don't think he has any more in him!"), () => WorldUtil.worldIs("Kuudra"));

onWorldLeave(() => {
  phase = 0;
});
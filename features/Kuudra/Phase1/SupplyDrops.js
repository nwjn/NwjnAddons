// import Settings from "../../../utils/Settings";
// import renderBeaconBeam from "../../../../BeaconBeam"
// import { ENTITY } from "../../../utils/Constants";
// import KuudraUtil from "../KuudraUtil"

// const ARMOR_STAND_CLASS = ENTITY.ArmorStand.class
// const PILES = {
//   "Shop": [-98, -112],
//   "Equals": [-98, -99],
//   "X Cannon": [-110, -106],
//   "X": [-106, -112],
//   "Triangle": [-94, -106],
//   "Slash": [-106, -99]
// }

// function recordUnplaced() {
//   let received = []
//   World.getAllEntitiesOfType(ARMOR_STAND_CLASS)
//     .forEach(it => {
//       if (!it.getName().includes("SUPPLIES RECEIVED")) return;
//       received.push([
//         ~~it.getX(),
//         ~~it.getZ()
//       ]);
//     })
  
//   Object.entries(PILES).forEach(([_, [x, z]], idx) => {
//     if (received.some(([xe, ze]) => x === xe && z === ze)) KuudraUtil.supplies[idx] = false
//   })
// }

// KuudraUtil.registerWhen(register("chat", () => recordUnplaced()).setCriteria("${*} recovered one of Elle's supplies! ${*}").setPriority(Priority.HIGHEST), () => KuudraUtil.inPhase(1) && Settings().supplyPiles)

// KuudraUtil.registerWhen(register("step", () => recordUnplaced()).setDelay(2), () => KuudraUtil.inPhase(1) && Settings().supplyPiles);

// KuudraUtil.registerWhen(register("renderWorld", () => {
//   const missing = KuudraUtil.missing
//   const supplies = KuudraUtil.supplies
//   Object.entries(PILES).forEach(([name, [x, z]], idx) => {
//     if (!supplies[idx]) return;
//     const color = missing === name ? [1, 0, 0] : [1, 1, 1]
//     renderBeaconBeam(x, 79, z, ...color, 0.8, true, 100)
//   })
// }), () => KuudraUtil.inPhase(1) && Settings().supplyPiles);

// KuudraUtil.registerWhen(register("chat", (supply) => {
//   KuudraUtil.missing = supply
// }).setCriteria("Party > ${*}: No ${supply}!"), () => KuudraUtil.inPhase(1) && Settings().supplyPiles)
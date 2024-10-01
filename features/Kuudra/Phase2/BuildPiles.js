// import Settings from "../../../utils/Settings"
// import renderBeaconBeam from "../../../../BeaconBeam"
// import KuudraUtil from "../KuudraUtil"
// import { ENTITY } from "../../../utils/Constants";
// const ARMOR_STAND_CLASS = ENTITY.ArmorStand.class

// KuudraUtil.registerWhen(register("step", () => {
//   KuudraUtil.piles =
//     World.getAllEntitiesOfType(ARMOR_STAND_CLASS)
//       .filter(it => /PROGRESS: \d{1,3}%/.test(it.getName()?.removeFormatting()))
// }).setDelay(2), () => KuudraUtil.inPhase(2) && (Settings().buildPiles || Settings().progressWithPhase))
    
// KuudraUtil.registerWhen(register("renderWorld", () => {
//   KuudraUtil.piles.forEach(it => {
//     const [x, y, z, name] = [it.getRenderX(), it.getRenderY(), it.getRenderZ(), it.getName()]
//     if (Settings().buildPiles) {
//       renderBeaconBeam(
//         x, y, z,
//         1, 0, 0, 0.8,
//         true,
//         100
//       );
//     }
//     if (Settings().progressWithPhase && name.includes("PROGRESS")) {
//       Tessellator.drawString(
//         name,
//         x, y + 2.475, z,
//         0x00ffffff, false, 0.02665, false
//       )
//     }
//   })
// }), () => KuudraUtil.inPhase(2) && (Settings().buildPiles || Settings().progressWithPhase));
// import Feature from "../../../core/Feature";
// import { Event } from "../../../core/Event";
// import EventEnums from "../../../core/EventEnums";
// import { TextHelper } from "../../../utils/TextHelper";
// import KuudraUtil from "../KuudraUtil";
// import renderBeaconBeam from "../../../../BeaconBeam"

// const crates = new Map()
// const feat = new Feature("supplyBeacons", "kuudra")
//   .addSubEvent(
//     new Event(EventEnums.FORGE.ENTITYJOIN, (entity, id) => {
//       if (crates.has(id) || entity.func_70694_bm()?.toString() !== "1xitem.skull@3") return

//       const giant = new Entity(entity)
//       const θrad = (it.getYaw() + 130) * TextHelper.RADIAN

//       crates.set(giant, [3.7 * Math.cos(θrad), 3.7 * Math.sin(θrad)])
//       feat.update()
//     }, net.minecraft.entity.monster.EntityGiantZombie),
//     () => KuudraUtil.inPhase(1)
//   )
//   .addSubEvent(
//     new Event("renderWorld", () => {
//       crates.forEach(([Δx, Δz], it) => {
//         if (it.isDead()) return crates.delete(it)
//         renderBeaconBeam(
//           it.getRenderX() + Δx,
//           72,
//           it.getRenderZ() + Δz,
//           0, 1, 1, 0.8,
//           true,
//           100
//         );
//       })
//     }),
//     () => KuudraUtil.inPhase(1) && crates.size()
//   )
//   .onUnregister(() => {
//     crates.clear()
//   })
// KuudraUtil.addFeat(feat)
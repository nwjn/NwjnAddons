import Settings from "../../../utils/Settings";
import renderBeaconBeam from "../../../../BeaconBeam"
import KuudraUtil from "../KuudraUtil"
import { radian } from "../../../utils/functions/format";
import { ENTITY } from "../../../utils/Constants";
const GIANT_CLASS = ENTITY.Giant.class

KuudraUtil.registerWhen(register("step", () => {
  KuudraUtil.crates = []
  World.getAllEntitiesOfType(GIANT_CLASS)
    .forEach(it => {
      if (it.entity?.func_70694_bm()?.toString() !== "1xitem.skull@3") return
      const θrad = (it.getYaw() + 130) * radian
      KuudraUtil.crates.push(
        [
          it,
          3.7 * Math.cos(θrad),
          3.7 * Math.sin(θrad)
        ]
      )
    })
}).setDelay(1), () => KuudraUtil.inPhase(1) && Settings().supplyBeacons)

KuudraUtil.registerWhen(register("renderWorld", () => {
  KuudraUtil.crates.forEach(([it, Δx, Δy]) => {
    renderBeaconBeam(
      it.getRenderX() + Δx,
      72,
      it.getRenderZ() + Δy,
      0, 1, 1, 0.8,
      false,
      100
    );
  })
}), () => KuudraUtil.inPhase(1) && Settings().supplyBeacons);
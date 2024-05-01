import settings from "../../../config"
import renderBeaconBeam from "../../../../BeaconBeam"
import { EntityGiant } from "../../../utils/constants";
import KuudraUtil from "../KuudraUtil"

// todo: whats that brotha
let giants = []
KuudraUtil.registerWhen(register("tick", () => {
  giants = World.getAllEntitiesOfType(EntityGiant.class).filter(e => e.getEntity().func_70694_bm()?.toString() == "1xitem.skull@3").map(giant => {
    let calc = (giant.getYaw() + 130) * (Math.PI / 180)

    return [
      giant.getRenderX() + (3.7 * Math.cos(calc)),
      75,
      giant.getRenderZ() + (3.7 * Math.sin(calc))
    ]
  })
}), () => KuudraUtil.isPhase(1) && settings.supplyWaypoints);

KuudraUtil.registerWhen(register("renderWorld", () => {
  let i = giants.length
  while (i--) {
    let giant = giants[i]

    renderBeaconBeam(...giant, 0, 1, 1, 0.8, true, 100);
  }
}), () => KuudraUtil.isPhase(1) && settings.supplyWaypoints);
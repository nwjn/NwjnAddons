import settings from "../../config"
import WorldUtil from "../../utils/world";
import renderBeaconBeam from "../../../BeaconBeam"
import { registerWhen } from "../../utils/functions";
import { getPhase } from "./Phase";
import { EntityGiant } from "../../utils/constants";

let giants = []
registerWhen(register("tick", () => {
  if (getPhase() != 1) return;

  // TODO: find giant's y vec and filter by that isntead
  giants = World.getAllEntitiesOfType(EntityGiant.class).filter(e => e.getEntity().func_70694_bm()?.toString() == "1xitem.skull@3").map(giant => {
    const calc = (giant.getYaw() + 130) * (Math.PI / 180)

    return [
      giant.getRenderX() + (3.7 * Math.cos(calc)),
      72,
      giant.getRenderZ() + (3.7 * Math.sin(calc))
    ]
  })
}), () => WorldUtil.worldIs("Kuudra") && settings.supplyWaypoints);

registerWhen(register("renderWorld", () => {
  if (getPhase() != 1) return;

  let i = giants.length
  while (i--) {
    const giant = giants[i]

    renderBeaconBeam(...giant, 0, 1, 1, 0.8, true, 100);
  }
}), () => WorldUtil.worldIs("Kuudra") && settings.supplyWaypoints)
import kuudraConfig from "../kuudraConfig";
import renderBeaconBeam from "../../../../BeaconBeam"
import { EntityGiant } from "../../../utils/constants";
import KuudraUtil from "../KuudraUtil"

// ! canca
let giants = []
KuudraUtil.registerWhen(register("tick", () => {
  giants = World.getAllEntitiesOfType(EntityGiant.class).filter(e =>
    e.getEntity().func_70694_bm()?.toString() == "1xitem.skull@3"
  ).map(giant => {
    const yaw = giant.getYaw()
    const x = giant.getRenderX() + (3.7 * Math.cos((yaw + 130) * (Math.PI / 180)));
    const z = giant.getRenderZ() + (3.7 * Math.sin((yaw + 130) * (Math.PI / 180)));

    return ([x, 75, z])
  })
  // .filter(giant => 
  //   Player.asPlayerMP().distanceTo(...giant) > 2
  // );
}), () => KuudraUtil.isPhase(1) && kuudraConfig.supplyBeacons);

KuudraUtil.registerWhen(register("renderWorld", () => {
  let i = giants.length
  while (i--) {
    let giant = giants[i]

    renderBeaconBeam(
      ...giant,
      ...[0, 1, 1, 0.8],
      true,
      100
    );
  }
}), () => KuudraUtil.isPhase(1) && kuudraConfig.supplyBeacons);
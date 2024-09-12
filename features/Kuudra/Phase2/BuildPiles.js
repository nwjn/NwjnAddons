import Settings from "../../../utils/Settings"
import renderBeaconBeam from "../../../../BeaconBeam"
import KuudraUtil from "../KuudraUtil"

KuudraUtil.registerWhen(register("renderWorld", () => {
  // Array.forEach
  let i = KuudraUtil.buildPiles.length
  while (i--) {
    let stand = KuudraUtil.buildPiles[i]

    renderBeaconBeam(
      stand.getRenderX(), stand.getRenderY(), stand.getRenderZ(),
      1, 0, 0, 0.8,
      true,
      100
    );
  }
}), () => KuudraUtil.isPhase(2) && Settings.buildPiles)
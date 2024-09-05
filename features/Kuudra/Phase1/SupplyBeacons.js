import settings from "../../../settings";
import renderBeaconBeam from "../../../../BeaconBeam"
import KuudraUtil from "../KuudraUtil"

let supplies = []
KuudraUtil.registerWhen(register("tick", (elapsed) => {
  // once every 2 ticks
  if (elapsed % 2 !== 0) return;

  supplies = KuudraUtil.getSupplies()
}), () => KuudraUtil.isPhase(1) && settings.supplyBeacons);

KuudraUtil.registerWhen(register("renderWorld", () => {
  // Array.forEach
  let i = supplies.length
  while (i--) {
    let supply = supplies[i]

    renderBeaconBeam(
      ...supply,
      0, 1, 1, 0.8,
      true,
      100
    );
  }
}), () => KuudraUtil.isPhase(1) && settings.supplyBeacons);
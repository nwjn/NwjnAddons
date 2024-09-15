import Settings from "../../../utils/Settings";
import renderBeaconBeam from "../../../../BeaconBeam"
import { EntityArmorStand } from "../../../utils/constants";
import KuudraUtil from "../KuudraUtil"

// ! cancer
KuudraUtil.registerWhen(register("step", () => {
  const piles = World.getAllEntitiesOfType(EntityArmorStand.class)

  // Array.filter.forEach
  let i = piles.length
  while (i--) {
    let pile = piles[i]
    if (!pile.getName().includes("SUPPLIES RECEIVED")) continue

    let [x, z] = [~~pile.getX(), ~~pile.getZ()]

    if (x == -98 && z == -112) KuudraUtil.supplies[0] = false
    else if (x == -98 && z == -99) KuudraUtil.supplies[1] = false
    else if (x == -110 && z == -106) KuudraUtil.supplies[2] = false
    else if (x == -106 && z == -112) KuudraUtil.supplies[3] = false
    else if (x == -94 && z == -106) KuudraUtil.supplies[4] = false
    else if (x == -106 && z == -99) KuudraUtil.supplies[5] = false
  }
}).setFps(2), () => KuudraUtil.inPhase(1) && Settings().supplyPiles);

KuudraUtil.registerWhen(register("renderWorld", () => {
  const missing = KuudraUtil.missing

  if (KuudraUtil.supplies[0]) {
    const color = missing == "Shop" ? [1, 0, 0] : [1, 1, 1]
    renderBeaconBeam(-98, 79, -112, ...color, 0.8, true, 100); // shop
  }
  if (KuudraUtil.supplies[1]) {
    const color = missing == "Equals" ? [1, 0, 0] : [1, 1, 1]
    renderBeaconBeam(-98, 79, -99, ...color, 0.8, true, 100); // equals
  }
  if (KuudraUtil.supplies[2]) {
    const color = missing == "X Cannon" ? [1, 0, 0] : [1, 1, 1]
    renderBeaconBeam(-110, 79, -106, ...color, 0.8, true, 100); // cannon
  }
  if (KuudraUtil.supplies[3]) {
    const color = missing == "X" ? [1, 0, 0] : [1, 1, 1]
    renderBeaconBeam(-106, 79, -112, ...color, 0.8, true, 100); // x
  }
  if (KuudraUtil.supplies[4]) {
    const color = missing == "Triangle" ? [1, 0, 0] : [1, 1, 1]
    renderBeaconBeam(-94, 79, -106, ...color, 0.8, true, 100); // tri
  }
  if (KuudraUtil.supplies[5]) {
    const color = missing == "Slash" ? [1, 0, 0] : [1, 1, 1]
    renderBeaconBeam(-106, 79, -99, ...color, 0.8, true, 100); // slash
  }
}), () => KuudraUtil.inPhase(1) && Settings().supplyPiles)
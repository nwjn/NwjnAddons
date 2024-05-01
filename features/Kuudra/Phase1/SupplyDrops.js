import settings from "../../../config"
import renderBeaconBeam from "../../../../BeaconBeam"
import { EntityArmorStand } from "../../../utils/constants";
import KuudraUtil from "../KuudraUtil"

// todo: brotha euhh
KuudraUtil.registerWhen(register("step", () => {
  const piles = World.getAllEntitiesOfType(EntityArmorStand.class).filter(e => e.getName().includes("SUPPLIES RECEIVED"))

  let i = piles.length
  while (i--) {
    const pile = piles[i]
    const x = ~~pile.getX()
    const z = ~~pile.getZ()

    if (x == -98 && z == -112) KuudraUtil.supplies[0] = false
    else if (x == -98 && z == -99) KuudraUtil.supplies[1] = false
    else if (x == -110 && z == -106) KuudraUtil.supplies[2] = false
    else if (x == -106 && z == -112) KuudraUtil.supplies[3] = false
    else if (x == -94 && z == -106) KuudraUtil.supplies[4] = false
    else if (x == -106 && z == -99) KuudraUtil.supplies[5] = false
  }
}).setFps(2), () => KuudraUtil.isPhase(1) && settings.supplyPiles);

KuudraUtil.registerWhen(register("renderWorld", () => {
  const missing = KuudraUtil.missing

  if (KuudraUtil.supplies[0]) {
    const color = missing == "Shop" ? [1, 0, 0] : [1, 1, 1]
    renderBeaconBeam(-98, 78, -112, ...color, 0.8, true, 100); // shop
  }
  if (KuudraUtil.supplies[1]) {
    const color = missing == "Equals" ? [1, 0, 0] : [1, 1, 1]
    renderBeaconBeam(-98, 78, -99, ...color, 0.8, true, 100); // equals
  }
  if (KuudraUtil.supplies[2]) {
    const color = missing == "X Cannon" ? [1, 0, 0] : [1, 1, 1]
    renderBeaconBeam(-110, 78, -106, ...color, 0.8, true, 100); // cannon
  }
  if (KuudraUtil.supplies[3]) {
    const color = missing == "X" ? [1, 0, 0] : [1, 1, 1]
    renderBeaconBeam(-106, 78, -112, ...color, 0.8, true, 100); // x
  }
  if (KuudraUtil.supplies[4]) {
    const color = missing == "Triangle" ? [1, 0, 0] : [1, 1, 1]
    renderBeaconBeam(-94, 78, -106, ...color, 0.8, true, 100); // tri
  }
  if (KuudraUtil.supplies[5]) {
    const color = missing == "Slash" ? [1, 0, 0] : [1, 1, 1]
    renderBeaconBeam(-106, 78, -99, ...color, 0.8, true, 100); // slash
  }
}), () => KuudraUtil.isPhase(1) && settings.supplyPiles)
import Settings from "../../../utils/Settings"
import KuudraUtil from "../KuudraUtil"

KuudraUtil.registerWhen(register("renderWorld", () => {

  let i = KuudraUtil.buildPiles.length
  while (i--) {
    let stand = KuudraUtil.buildPiles[i]
    let name = stand.getName()

    Tessellator.drawString(
      name,
      stand.getX(), stand.getY() + 2.475, stand.getZ(),
      0x00ffffff, false, 0.02665, false
    )
  }
}), () => KuudraUtil.isPhase(2) && Settings.progressWithPhase)
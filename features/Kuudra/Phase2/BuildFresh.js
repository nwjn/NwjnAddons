import Settings from "../../../utils/Settings";
import KuudraUtil from "../KuudraUtil"

KuudraUtil.registerWhen(register("renderWorld", () => {
  const freshLeft = KuudraUtil.freshLeft
  if (freshLeft <= 0) return;

  Tessellator.drawString(
    freshLeft.toFixed(1),
    -101.5, 85.125, -105.5,
    0x55ff55, false, 0.5, false
  );

}), () => KuudraUtil.isPhase(2) && Settings.buildFresh)
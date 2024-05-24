import kuudraConfig from "../KuudraConfig";
import KuudraUtil from "../KuudraUtil"

KuudraUtil.registerWhen(register("renderWorld", () => {
  Tessellator.drawString(
    `${KuudraUtil.builders} builders`,
    -101.5, 79.125, -105.5,
    0x00ffff, false, 0.2, false
  );
}), () => KuudraUtil.isPhase(2) && kuudraConfig.buildPercent);
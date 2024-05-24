import kuudraConfig from "../KuudraConfig";
import KuudraUtil from "../KuudraUtil"

KuudraUtil.registerWhen(register("renderWorld", () => {
  Tessellator.drawString(
    `${ KuudraUtil.build }%`,
    -101.5, 91.125, -105.5,
    0xffffff, false, 0.5, false
  );

}), () => KuudraUtil.isPhase(2) && kuudraConfig.buildPercent)
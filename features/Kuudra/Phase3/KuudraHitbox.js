import Settings from "../../../utils/Settings";
import RenderLib from "../../../../RenderLib"
import KuudraUtil from "../KuudraUtil";

KuudraUtil.registerWhen(register("renderWorld", () => {
  // Kuudra's hp is 100k
  const boss = KuudraUtil.getKuudra()
  if (!boss) return;

  // hitbox
  RenderLib.drawEspBox(
    boss.getRenderX(), boss.getRenderY(), boss.getRenderZ(),
    boss.getWidth(), boss.getHeight(),
    1, 1, 0, 0.5,
    false
  );
}), () => KuudraUtil.isPhase(3) && Settings.kuudraHitbox);
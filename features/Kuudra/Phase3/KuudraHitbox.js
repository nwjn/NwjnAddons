import kuudraConfig from "../kuudraConfig";
import RenderLib from "../../../../RenderLib"
import KuudraUtil from "../KuudraUtil";
import { EntityMagmaCube } from "../../../utils/constants";
import { getMaxHP } from "../../../utils/functions";

KuudraUtil.registerWhen(register("renderWorld", () => {
  // Kuudra's hp is 100k
  const boss = World.getAllEntitiesOfType(EntityMagmaCube.class).find(e =>
    getMaxHP(e) === 100_000
  )
  if (!boss) return;

  // hitbox
  RenderLib.drawEspBox(
    boss.getRenderX(), boss.getRenderY(), boss.getRenderZ(),
    boss.getWidth(), boss.getHeight(),
    1, 1, 0, 0.5,
    false
  );
}), () => KuudraUtil.isPhase(3) && kuudraConfig.kuudraHitbox);
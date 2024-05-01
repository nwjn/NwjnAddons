import settings from "../../../config"
import RenderLib from "../../../../RenderLib"
import KuudraUtil from "../KuudraUtil"
import { extractIGN, delay } from "../../../utils/functions";

KuudraUtil.registerWhen(register("chat", (player) => {
  const disectedName = extractIGN(player)

  if (disectedName == Player.getName()) return;

  (KuudraUtil.freshers).add(disectedName)

  delay(() =>
    (KuudraUtil.freshers).delete(disectedName),
  10000);
}).setCriteria("Party > ${player}: FRESH").setStart(), () => KuudraUtil.isPhase(2) && settings.freshHitbox);

KuudraUtil.registerWhen(register("renderWorld", () => {
  const freshers = (KuudraUtil.freshers).map(fresher =>
    World.getPlayerByName(fresher)
  ).filter(fresher => Boolean(fresher))

  let i = freshers.length
  while (i--) {
    const entity = freshers[i]

    RenderLib.drawInnerEspBox(
      ...[entity.getRenderX(), entity.getRenderY(), entity.getRenderZ()],
      ...[0.6, 1.8],
      ...[0, 1, 0, 0.5],
      false
    )
  }
}), () => KuudraUtil.isPhase(2) && settings.freshHitbox)
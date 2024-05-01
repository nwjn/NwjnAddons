import settings from "../../../config"
import RenderLib from "../../../../RenderLib"
import KuudraUtil from "../KuudraUtil"
import { extractIGN } from "../../../utils/functions";

KuudraUtil.registerWhen(register("chat", (player) => {
  const disectedName = extractIGN(player)

  if (!disectedName || !KuudraUtil.freshers || disectedName === Player.getName()) return;

  KuudraUtil.freshers.add(disectedName)

  setTimeout(() =>
    KuudraUtil.freshers.delete(disectedName),
  10000);
}).setCriteria("Party > ${player}: FRESH").setStart(), () => KuudraUtil.isPhase(2) && settings.freshHitbox);

KuudraUtil.registerWhen(register("renderWorld", () => {
  KuudraUtil.freshers.forEach(fresher => {
    const player = World.getPlayerByName(fresher)
    if (!player) return;

    RenderLib.drawInnerEspBox(
      ...[player.getX(), player.getY(), player.getZ()],
      ...[1, 2],
      ...[0, 1, 0, 0.5],
      false
    )
  })
}), () => KuudraUtil.isPhase(2) && settings.freshHitbox)
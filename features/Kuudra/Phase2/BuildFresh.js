import Settings from "../../../utils/Settings";
import KuudraUtil from "../KuudraUtil"

KuudraUtil.registerWhen(register("renderWorld", () => {
  const freshLeft = 10 - (Date.now() - KuudraUtil.freshTime) / 1000
  if (freshLeft <= 0) return;

  Tessellator.drawString(
    freshLeft.toFixed(1),
    -101.5, 85.125, -105.5,
    0x55ff55, false, 0.5, false
  );
}), () => KuudraUtil.inPhase(2) && Settings().buildFresh);

KuudraUtil.registerWhen(register("chat", () => {
  KuudraUtil.freshTime = Date.now()
}).setCriteria("Your Fresh Tools Perk bonus doubles your building speed for the next 10 seconds!"), () => KuudraUtil.inPhase(2) && Settings().buildFresh);

KuudraUtil.registerWhen(register("chat", () => {
  const build = KuudraUtil.build?.getName()?.removeFormatting()?.match(/^Building Progress (\d{1,3})%/)?.[1] ?? 0
  ChatLib.say(`/pc FRESH! (${ build }%)`)
}).setCriteria("Your Fresh Tools Perk bonus doubles your building speed for the next 10 seconds!"), () => KuudraUtil.inPhase(2) && Settings().fresh)
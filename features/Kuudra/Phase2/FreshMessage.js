import Settings from "../../../utils/Settings";
import KuudraUtil from "../KuudraUtil";

KuudraUtil.registerWhen(register("chat", () => {
  KuudraUtil.freshTime = Date.now()
}).setCriteria("Your Fresh Tools Perk bonus doubles your building speed for the next 10 seconds!"), () => KuudraUtil.inPhase(2) && Settings().buildFresh);

KuudraUtil.registerWhen(register("chat", () => {
  ChatLib.say(`/pc FRESH! (${ KuudraUtil.build }%)`)
}).setCriteria("Your Fresh Tools Perk bonus doubles your building speed for the next 10 seconds!"), () => KuudraUtil.inPhase(2) && Settings().fresh)
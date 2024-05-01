import settings from "../../../config"
import KuudraUtil from "../KuudraUtil";

KuudraUtil.registerWhen(register("chat", () => {
  settings.inBuild && (freshTime = Date.now())
  settings.fresh && ChatLib.say(`/pc FRESH! (${ KuudraUtil.build }%)`)
}).setCriteria("Your Fresh Tools Perk bonus doubles your building speed for the next 10 seconds!"), () => KuudraUtil.isPhase(2) && (settings.inBuild || settings.fresh))
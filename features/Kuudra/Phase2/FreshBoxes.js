import Settings from "../../../utils/Settings";
import KuudraUtil from "../KuudraUtil"
import { getPlayerName } from "../../../utils/functions/player";

KuudraUtil.registerWhen(register("chat", (player) => {
  const name = getPlayerName(player)

  KuudraUtil.freshers.add(name)

  setTimeout(() =>
    KuudraUtil.freshers.delete(name),
  10000);
}).setCriteria("Party > ${player}: FRESH").setStart(), () => KuudraUtil.isPhase(2) && Settings.teamHighlight);
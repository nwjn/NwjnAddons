import kuudraConfig from "../kuudraConfig";
import KuudraUtil from "../KuudraUtil"
import { extractIGN } from "../../../utils/functions";

KuudraUtil.registerWhen(register("chat", (player) => {
  const disectedName = extractIGN(player)

  if (!disectedName || !KuudraUtil.freshers) return;

  KuudraUtil.freshers.add(disectedName)

  setTimeout(() =>
    KuudraUtil.freshers.delete(disectedName),
  10000);
}).setCriteria("Party > ${player}: FRESH").setStart(), () => KuudraUtil.isPhase(2) && kuudraConfig.teamHighlight);
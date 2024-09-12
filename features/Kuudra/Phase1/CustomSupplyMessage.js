import Settings from "../../../utils/Settings";
import KuudraUtil from "../KuudraUtil";

KuudraUtil.registerWhen(register("chat", (player, supply, event) => {
  // Array.find
  const scoreboard = Scoreboard.getLines()
  let time;
  let i = scoreboard.length
  while (i--) {
    let line = scoreboard[i].getName()
    if (!line.includes("Time Elapsed")) continue

    time = line.removeFormatting().split(": ").slice(-1)
    break
  }

  cancel(event);
  ChatLib.chat(`${ player }&a&lrecovered a supply at ${ time }!${supply}`)
}).setCriteria("${player}&a&lrecovered one of Elle's supplies!${supply}"), () => KuudraUtil.isPhase(1) && Settings.customSupply)
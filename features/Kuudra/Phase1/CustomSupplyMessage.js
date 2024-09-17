import Settings from "../../../utils/Settings";
import KuudraUtil from "../KuudraUtil";

KuudraUtil.registerWhen(register("chat", (player, supply, event) => {
  const time = Scoreboard.getLines().find(l => l.getName().includes("Time Elapsed"))?.getName()?.removeFormatting()?.match(/Time Elapsed: (.+)/)?.[1]

  cancel(event);
  ChatLib.chat(`${ player }&a&lrecovered a supply at ${ time }!${supply}`)
}).setCriteria("${player}&a&lrecovered one of Elle's supplies!${supply}"), () => KuudraUtil.inPhase(1) && Settings().customSupply)
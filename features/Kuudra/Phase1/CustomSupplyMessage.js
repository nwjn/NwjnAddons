import kuudraConfig from "../kuudraConfig";
import KuudraUtil from "../KuudraUtil";

KuudraUtil.registerWhen(register("chat", (player, supply, event) => {
  const score = Scoreboard.getLines().find(e => e.toString().includes("Time Elapsed"))
  const time = score ? score.toString().removeFormatting().split(": ").slice(-1) : NaN

  cancel(event);
  ChatLib.chat(`${ player }&a&lrecovered a supply at ${ time }!${supply}`)
}).setCriteria("${player}&a&lrecovered one of Elle's supplies!${supply}"), () => KuudraUtil.isPhase(1) && kuudraConfig.customSupply)
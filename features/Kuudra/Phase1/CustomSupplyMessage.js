// import Feature from "../../../core/Feature";
// import EventEnums from "../../../core/EventEnums";
// import { Event } from "../../../core/Event";
// import KuudraUtil from "../KuudraUtil";

// const feat = new Feature("customSupply", "kuudra")
//   .addSubEvent(
//     new Event(EventEnums.PACKET.SERVER.CHAT, (player, supply, event) => {
//       const time = Scoreboard.getLines().find(l => l.getName().includes("Time Elapsed"))?.getName()?.removeFormatting()?.match(/Time Elapsed: (.+)/)?.[1]

//       cancel(event);
//       ChatLib.chat(`${ player }&a&lrecovered a supply at ${ time }!${supply}`)
//     }, /(.+)&a&lrecovered one of Elle's supplies!(.+)/),
//     () => KuudraUtil.inPhase(1)
//   )
// KuudraUtil.addFeat(feat)
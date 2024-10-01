// import Settings from "../../../utils/Settings";
// import KuudraUtil from "../KuudraUtil";
// import { ENTITY } from "../../../utils/Constants";

// const OTHER_PLAYER_CLASS = ENTITY.Player.class

// KuudraUtil.registerWhen(register("chat", (mana) => {
//   let players = []
//   World.getAllEntitiesOfType(OTHER_PLAYER_CLASS).forEach(it => {
//     if (Player.asPlayerMP().distanceTo(it) > 5) return;
//     players.push(it.getName())
//    })

//   ChatLib.say(`/pc Drained ${mana} mana for: [${players.join(", ")}]`)
// }).setCriteria("Used Extreme Focus! (${mana} Mana)"), () => KuudraUtil.inPhase(4) && Settings().partyDrain);
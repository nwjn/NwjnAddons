import Settings from "../../../utils/Settings";
import KuudraUtil from "../KuudraUtil";
import { getDistance } from "../../../utils/functions/format.js";
import { EntityGiant } from "../../../utils/constants";
import Loc from "../../../utils/Location.js";

/**
 * PreName: [x, y, z, l]
 */
const PRE = {
  "Triangle": [-67.5, 77, -122.5, 15],
  "X": [-142.5, 77, -151.5, 30],
  "Equals": [-65.5, 76, -87.5, 15],
  "Slash": [-113.5, 77, -68.5, 15]
}
let preName = "", preLoc = []

KuudraUtil.registerWhen(register("chat", () => {
  [preName, preLoc] =
    Object.entries(PRE)
      .find(([_, [x, y, z, l]]) => Player.asPlayerMP().distanceTo(x, y, z) < l)
      ?? ["", Loc.Spawn];
}).setCriteria("[NPC] Elle: Head over to the main platform, I will join you when I get a bite!"), () => KuudraUtil.inPhase(1) && Settings().noSupply)

/**
 * PostName: [x, y, z, l]
 */
const POST = {
  "Triangle": [-81, 76, -143, 18],
  "X": [-143, 76, -125, 16],
  "Slash": [-143, 76, -80, 20]
}

KuudraUtil.registerWhen(register("chat", () => {
  if (!preName || (preLoc === Loc.Spawn) || !POST[preName]) return;

  const crates =
    World.getAllEntitiesOfType(EntityGiant.class)
      .filter(it => it.entity?.func_70694_bm()?.toString() === "1xitem.skull@3")
      .map(it =>
        [
          it.getX() + (3.7 * Math.cos((it.getYaw() + 130) * (Math.PI / 180))),
          75,
          it.getZ() + (3.7 * Math.sin((it.getYaw() + 130) * (Math.PI / 180)))
        ]
      )
  
  const preReq = crates.some(it => getDistance(preLoc.slice(0, 2), it) < 18)
  const postReq = crates.some(it => getDistance(POST[preName].slice(0, 2), it) < POST[preName][3])

  if (!preReq) {
    ChatLib.command(`pc No ${ preName }!`);
  }
  else if (!postReq) {
    let postName;
    switch (preName) {
      case "Triangle": postName = "Shop"; break;
      case "X": postName = "X Cannon"; break;
      case "Slash": postName = "Square"; break;
      default: return;
    }
    ChatLib.command(`pc No ${ postName }!`);
  }
}).setCriteria("[NPC] Elle: Not again!"), () => KuudraUtil.inPhase(1) && Settings().noSupply)

KuudraUtil.registerWhen(register("chat", (missing) => {
  KuudraUtil.missing = missing
}).setCriteria("Party > ${*}: No ${missing}!"), () => KuudraUtil.inPhase(1) && Settings().supplyPiles)
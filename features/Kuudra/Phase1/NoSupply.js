import Settings from "../../../utils/Settings";
import KuudraUtil from "../KuudraUtil";
import { getDistance, radian } from "../../../utils/functions/format.js";
import { ENTITY } from "../../../utils/Constants.js";

const GIANT_CLASS = ENTITY.Giant.class
/**
 * PreName: [x, y, z, l]
 */
const PRE = {
  "Triangle": [-67.5, 77, -122.5, 15],
  "X": [-142.5, 77, -151.5, 30],
  "Equals": [-65.5, 76, -87.5, 15],
  "Slash": [-113.5, 77, -68.5, 15]
}

KuudraUtil.registerWhen(register("chat", () => {
  [KuudraUtil.preName, KuudraUtil.preLoc] =
    Object.entries(PRE)
      .find(([_, [x, y, z, l]]) => Player.asPlayerMP().distanceTo(x, y, z) < l)
      ?? ["", undefined];
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
  const [preName, preLoc] = [KuudraUtil.preName, KuudraUtil.preLoc]
  if (!preLoc || !POST?.[preName]) return;

  let crates = []
  World.getAllEntitiesOfType(GIANT_CLASS)
    .forEach(it => {
      if (it.entity?.func_70694_bm()?.toString() !== "1xitem.skull@3") return
      const θrad = (it.getYaw() + 130) * radian
      crates.push(
        [
          it.getX() + (3.7 * Math.cos(θrad)),
          75,
          it.getZ() + (3.7 * Math.sin(θrad))
        ]
      )
    })
  
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

KuudraUtil.registerWhen(register("chat", (supply) => {
  KuudraUtil.missing = supply
}).setCriteria("Party > ${*}: No ${supply}!"), () => KuudraUtil.inPhase(1) && Settings().supplyPiles)
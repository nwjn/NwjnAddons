import Settings from "../../../utils/Settings";
import KuudraUtil from "../KuudraUtil";
import { getDistance } from "../../../utils/functions.js";
import { EntityGiant } from "../../../utils/constants";

// ! cancer
KuudraUtil.registerWhen(register("chat", () => {
  if (Player.asPlayerMP().distanceTo(-67.5, 77, -122.5) < 15) {
    KuudraUtil.preSpot = "Triangle";
    KuudraUtil.preLoc = [-67.5, 77, -122.5]
  }
  else if (Player.asPlayerMP().distanceTo(-142.5, 77, -151) < 30) {
    KuudraUtil.preSpot = "X";
    KuudraUtil.preLoc = [-142.5, 77, -151]
  }
  else if (Player.asPlayerMP().distanceTo(-65.5, 76, -87.5) < 15) {
    KuudraUtil.preSpot = "Equals";
    KuudraUtil.preLoc = [-65.5, 76, -87.5]
  }
  else if (Player.asPlayerMP().distanceTo(-113.5, 77, -68.5) < 15) {
    KuudraUtil.preSpot = "Slash";
    KuudraUtil.preLoc = [-113.5, 77, -68.5]
  }
}).setCriteria("[NPC] Elle: Head over to the main platform, I will join you when I get a bite!"), () => KuudraUtil.isPhase(1) && Settings.noSupply)

const shop = [-81, 76, -143]
const xCannon = [-143, 76, -125]
const square = [-143, 76, -80]

KuudraUtil.registerWhen(register("chat", () => {
  if (!KuudraUtil.preSpot) return;

  const crates = World.getAllEntitiesOfType(EntityGiant.class).filter(e =>
    e.getEntity().func_70694_bm()?.toString() == "1xitem.skull@3"
  ).map(giant => {
    const yaw = giant.getYaw()
    const x = giant.getX() + (3.7 * Math.cos((yaw + 130) * (Math.PI / 180)));
    const z = giant.getZ() + (3.7 * Math.sin((yaw + 130) * (Math.PI / 180)));

    return ([x, 75, z])
  })

  let pre = false
  let second = false

  let i = crates.length
  while (i--) {
    const crate = crates[i]
    if (getDistance(KuudraUtil.preLoc, crate) < 18) pre = true;

    if (KuudraUtil.preSpot == "Triangle") {
      if (getDistance(shop, crate) < 18) second = true
    }
    else if (KuudraUtil.preSpot == "X") {
      if (getDistance(xCannon, crate) < 16) second = true
    }
    else if (KuudraUtil.preSpot == "Slash") {
      if (getDistance(square, crate) < 20) second = true
    }
  }
  if (!pre) {
    ChatLib.say(`/pc No ${ KuudraUtil.preSpot }!`);
  }
  else if (!second) {
    switch (KuudraUtil.preSpot) {
      case "Triangle": second = "Shop"; break;
      case "X": second = "X Cannon"; break;
      case "Slash": second = "Square"; break;
      default: return;
    }
    ChatLib.say(`/pc No ${ second }!`);
  }
}).setCriteria("[NPC] Elle: Not again!"), () => KuudraUtil.isPhase(1) && Settings.noSupply)

KuudraUtil.registerWhen(register("chat", (supply) => {
  KuudraUtil.missing = supply
}).setCriteria("Party > ${*}: No ${supply}!"), () => KuudraUtil.isPhase(1) && Settings.noSupply)
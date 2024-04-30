import settings from "../config";
import WorldUtil from "../utils/world"
import renderBeaconBeam from "BeaconBeam"
import RenderLib from "RenderLib"
import { registerWhen, getRGB1 } from "../utils/functions";
import { EntityArmorStand, EntityPlayer, EntityMagmaCube, EntityGiant, SMA } from "../utils/constants";

let freshies = []
let freshTime = 0
let build = 0

registerWhen(register("chat", (player) => {
  player = player.removeFormatting().split("] ").toString().replace(/[^A-Za-z0-9_]/g, "");

  freshies.push(player)
  setTimeout(() => {
    freshies.splice(freshies.indexOf(player), 1)
  }, 10000);
}).setCriteria("Party > ${player}: FRESH").setContains(), () => settings.freshHitbox && WorldUtil.worldIs("Kuudra"))

registerWhen(register("chat", () => {
  // TODO: TEST
  settings.inBuild && (freshTime = Date.now())
  settings.fresh && ChatLib.say(`/pc FRESH! (${ build }%)`)
}).setCriteria("Your Fresh Tools Perk bonus doubles your building speed for the next 10 seconds!"), () => WorldUtil.worldIs("Kuudra") && (settings.inBuild || settings.fresh))

let preSpot = ""
let preLoc = new Vec3i(0, 0, 0)
// TODO: (TEST & REPLACE)
// let preLoc = new Vec3i()
registerWhen(register("chat", () => {
  if (Player.asPlayerMP().distanceTo(-67.5, 77, -122.5) < 15) {
    preSpot = "Triangle";
    preLoc = new Vec3i(-67.5, 77, -122.5)
    // TODO: (TEST & REPLACE) for each reassignment
    // preLoc.x = -67.5; preLoc.y = 77; preLoc.z = -122.5
  }
  else if (Player.asPlayerMP().distanceTo(-142.5, 77, -151) < 30) {
    preSpot = "X";
    preLoc = new Vec3i(-142.5, 77, -151)
  }
  else if (Player.asPlayerMP().distanceTo(-65.5, 76, -87.5) < 15) {
    preSpot = "Equals";
    preLoc = new Vec3i(-65.5, 76, -87.5)
  }
  else if (Player.asPlayerMP().distanceTo(-113.5, 77, -68.5) < 15) {
    preSpot = "Slash";
    preLoc = new Vec3i(-113.5, 77, -68.5)
  }
}).setCriteria("[NPC] Elle: Head over to the main platform, I will join you when I get a bite!"), () => WorldUtil.worldIs("Kuudra") && settings.noPre)

const shop = new Vec3i(-81, 76, -143)
const xCannon = new Vec3i(-143, 76, -125)
const square = new Vec3i(-143, 76, -80)
let missing = ""

registerWhen(register("chat", () => {
  let xs = []
  let zs = []
  // TODO: CHANGE
  // use 2d array
  World.getAllEntitiesOfType(EntityGiant.class).forEach(giant => {
    if (giant?.getEntity()?.func_70694_bm()?.toString() != "1xitem.skull@3") return
    let yaw = giant.getYaw();
    let x = giant.getX() + (3.7 * Math.cos((yaw + 130) * (Math.PI / 180)))
    let z = giant.getZ() + (3.7 * Math.sin((yaw + 130) * (Math.PI / 180)))
    xs?.push(x)
    zs?.push(z)
  });
  let pre = false
  let second = false
  xs.forEach(supply => {
    let index = xs.indexOf(supply)
    if (preLoc.distance(new Vec3i(supply, 76, zs[index])) < 18) pre = true
    if (preSpot == "Triangle") {
      if (shop.distance(new Vec3i(supply, 76, zs[index])) < 18) second = true
    }
    else if (preSpot == "X") {
      if (xCannon.distance(new Vec3i(supply, 76, zs[index])) < 16) second = true
    }
    else if (preSpot == "Slash") {
      if (square.distance(new Vec3i(supply, 76, zs[index])) < 20) second = true
    }
  })
  if (second && pre) return;
  let msg = ""
  if (!pre && preSpot) {
    msg = `No ${ preSpot }!`
    ChatLib.say(`/pc ${ msg }`);
  }
  else if (!second && preSpot != "Equals") {
    switch (preSpot) {
      case "Triangle": second = "Shop"; break;
      case "X": second = "X Cannon"; break;
      case "Slash": second = "Square"; break;
      default: return;
    }
    msg = `No ${second}!`
    ChatLib.say(`/pc ${ msg }`);
  }
}).setCriteria("[NPC] Elle: Not again!"), () => WorldUtil.worldIs("Kuudra") && settings.noPre)

registerWhen(register("chat", (supply) => {
  missing = supply
}).setCriteria("Party > ${*}: No ${supply}!"), () => settings.noPre)


registerWhen(register("chat", (player, supply, event) => {
  const score = Scoreboard.getLines().find(e => e.toString().includes("Time Elapsed"))
  const time = score ? score.toString().removeFormatting().split(": ").slice(-1) : NaN

  cancel(event);
  ChatLib.chat(`${ player }&a&lrecovered a supply at ${ time }!${supply}`)
}).setCriteria("${player}&a&lrecovered one of Elle's supplies!${supply}"), () => settings.customSupply && WorldUtil.worldIs("Kuudra"))

registerWhen(register("renderWorld", () => {
  // TODO: CHANGE
  // put all this shit in different triggers
  if (settings.teammates) {
    World.getAllEntitiesOfType(EntityPlayer.class).forEach(player => {
    let ping = World.getPlayerByName(player.getName())?.getPing();
    if (ping != 1 || player.isInvisible()) return;
      
      // TODO: TEST
    const [x, y, z] = [player.getRenderX(), player.getRenderY(), player.getRenderZ()]
    RenderLib.drawEspBox(x, y, z, 1, 2, ...getRGB1(settings.teammateColor), 1, true);
    Tessellator.drawString(`${player.getName()}`, x, y + 2.5, z, 0x00ffff, false)
  })
  }
  if (phase == 2) {
    const stands = World.getAllEntitiesOfType(EntityArmorStand.class).filter(e => !e.getName().includes("Lv") && e.getName() != "Armor Stand")
    stands.forEach(stand => {
      let name = stand.getName().removeFormatting()
      let rawName = stand.getName();
      if (name.includes("Building Progress")) {
        let helpers = ""
        helpers = name.substring(name.indexOf("(") + 1, name.indexOf("(") + 2)
        Tessellator.drawString(`${ helpers } builders`, stand.getX(), stand.getY() - 5, stand.getZ(), 0x00ffff, false, 0.2, false)
        build = name.substring(0, name.indexOf("%")).replaceAll(/\D/g, "");
        if (settings.inBuild) {
          let newTime = Date.now();
          let freshLeft = 10 - (newTime - freshTime) / 1000;
          if (freshLeft > 0) {
            Tessellator.drawString(`${ freshLeft.toFixed(2) }`, stand.getX(), stand.getY() + 1, stand.getZ(), 0x55ff55, false, 0.5, false);
          }
          Tessellator.drawString(`${ build }%`, stand.getX(), stand.getY() + 7, stand.getZ(), 0xffffff, false, 0.5, false);
        }
      }
      else if (name.includes("PROGRESS: ") && name.includes("%") && settings.inBuild) {
        Tessellator.drawString(`${ rawName }`, stand.getX(), stand.getY() + 2.475, stand.getZ(), 0x00ffffff, false, 0.02665, false);
        renderBeaconBeam(stand.getX(), stand.getY(), stand.getZ(), 1, 0, 0, 0.8, true, 100);
      }
    });
  }
  if (settings.freshHitbox) {
    if (!freshies.length) return
    freshies.forEach(fresher => {
      let fresh = World?.getPlayerByName(fresher)
      if (fresher == Player.getName() || !fresh?.getX()) return
      RenderLib.drawInnerEspBox(fresh.getRenderX(), fresh.getRenderY(), fresh.getRenderZ(), 1, 2, 0, 1, 0, 0.5, false)
    })
  }
}), () => WorldUtil.worldIs("Kuudra"))

registerWhen(register("renderWorld", () => {
  const boss = World.getAllEntitiesOfType(EntityMagmaCube.class).find(e => e.getEntity().func_110148_a(SMA.field_111267_a).func_111125_b() == 100_000)
  boss && RenderLib.drawEspBox(boss.getRenderX(), boss.getRenderY(), boss.getRenderZ(), boss.getWidth(), boss.getHeight(), 0.914, 1, 0, 1, false)
}), () => settings.kuudraHitbox && WorldUtil.worldIs("Kuudra"))

register("worldUnload", () => {
  build = 0
  freshies = []
  freshTime = 0
  missing = ""
});

registerWhen(register("renderSlot", (slot, gui, event) => {
  if (!slot?.toString().includes("ContainerLocalMenu: Perk Menu")) return
  slot = slot.getItem()?.getName()?.removeFormatting()
  if (slot?.includes("Steady Hands") || slot?.includes("Bomberman") || slot == "Elle's Lava Rod" || slot == "Elle's Pickaxe" || slot == "Auto Revive" || slot?.includes("Mining Frenzy") || slot?.includes("Human Cannonball")) {
    cancel(event)
  }
}), () => settings.renderPerk && WorldUtil.worldIs("Kuudra"))
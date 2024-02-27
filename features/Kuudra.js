import settings from "../config";
import renderBeaconBeam from "BeaconBeam"
import RenderLib from "RenderLib"
import { registerWhen } from "../utils/functions";
import { getWorld } from "../utils/world";
import { ARMOR_STANDS, PLAYERS, MAGMA_CUBES, GIANT_ZOMBIES } from "../utils/constants";

let phase = 0
let supply1 = true
let supply2 = true
let supply3 = true
let supply4 = true
let supply5 = true
let supply6 = true
let build = 0
let freshies = []
let freshTime = 0

registerWhen(register("chat", () => {
  phase = 1;
}).setCriteria("[NPC] Elle: Okay adventurers, I will go and fish up Kuudra!"), () => getWorld() == "Kuudra");

registerWhen(register("chat", () => {
  phase = 2;
}).setCriteria("[NPC] Elle: OMG! Great work collecting my supplies!"), () => getWorld() == "Kuudra");

registerWhen(register("chat", () => {
  phase = 3;
  freshies = []
}).setCriteria("[NPC] Elle: Phew! The Ballista is finally ready! It should be strong enough to tank Kuudra's blows now!"), () => getWorld() == "Kuudra");

registerWhen(register("chat", () => {
  phase = 4;
}).setCriteria("[NPC] Elle: POW! SURELY THAT'S IT! I don't think he has any more in him!"), () => getWorld() == "Kuudra");

registerWhen(register("chat", (player) => {
  if (player.includes("]")) {
    player = player.substring(player.indexOf(" ") + 1)
  }
  if (player.includes(" ")) {
    player = player.substring(0, player.indexOf(" "))
  }
  freshies.push(player)
  setTimeout(() => {
    freshies.splice(freshies.indexOf(player), 1)
  }, 10000);
}).setCriteria("Party > ${player}: FRESH${*}"), () => settings.freshHitbox && getWorld() == "Kuudra")

registerWhen(register("renderEntity", (stand) => {
  if (stand.getClassName() != "EntityArmorStand" || phase != 1 || stand.getName().includes("Lv") || stand.toString().includes("name=Armor Stand")) return
  
  if (stand.getName().includes("SUPPLIES RECEIVED")) {
    let x = Math.trunc(stand.getX())
    let z = Math.trunc(stand.getZ())
    if (x == -98 && z == -112) supply1 = false
    if (x == -98 && z == -99) supply2 = false
    if (x == -110 && z == -106) supply3 = false
    if (x == -106 && z == -112) supply4 = false
    if (x == -94 && z == -106) supply5 = false
    if (x == -106 && z == -99) supply6 = false
  }
}), () => settings.supply && getWorld() == "Kuudra")

registerWhen(register("chat", () => {
  if (settings.inBuild) {
    freshTime = new Date().getTime()
  }
  if (settings.fresh) {
    ChatLib.say(`/pc FRESH! (${ build }%)`)
  }
}).setCriteria("Your Fresh Tools Perk bonus doubles your building speed for the next 10 seconds!"), () => getWorld() == "Kuudra")

let preSpot = ""
let preLoc = new Vec3i(0,0,0)
registerWhen(register("chat", () => {
  if (Player.asPlayerMP().distanceTo(-67.5, 77, -122.5) < 15) {
    preSpot = "Triangle";
    preLoc = new Vec3i(-67.5, 77, -122.5)
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
}).setCriteria("[NPC] Elle: Head over to the main platform, I will join you when I get a bite!"), () => getWorld() == "Kuudra" && settings.noPre)

const shop = new Vec3i(-81, 76, -143)
const xCannon = new Vec3i(-143, 76, -125)
const square = new Vec3i(-143, 76, -80)
let missing = ""

registerWhen(register("chat", () => {
  let xs = []
  let zs = []
  let pre = false
  let second = false
  let msg = ""
  World.getAllEntitiesOfType(GIANT_ZOMBIES).forEach(giant => {
    if (giant?.getEntity()?.func_70694_bm()?.toString() != "1xitem.skull@3") return
    let yaw = giant.getYaw();
    let x = giant.getX() + (3.7 * Math.cos((yaw + 130) * (Math.PI / 180)))
    let z = giant.getZ() + (3.7 * Math.sin((yaw + 130) * (Math.PI / 180)))
    xs.push(x)
    zs.push(z)
  });
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
  if (second == true && pre == true) return;
  if (pre == false && preSpot != "") {
    msg = `No ${preSpot}!`
  }
  else if (second == false) {
    if (preSpot == "Triangle") second = "Shop"
    else if (preSpot == "X") second = "X Cannon"
    else if (preSpot == "Slash") second = "Square"
    if (preSpot == "Equals" || second == false) return
    msg = `No ${second}!`
  }
  ChatLib.say(`/pc ${ msg }`);
}).setCriteria("[NPC] Elle: Not again!"), () => getWorld() == "Kuudra" && settings.noPre)

registerWhen(register("chat", (supply) => {
  missing = supply
}).setCriteria("Party > ${*}: No ${supply}!"), () => settings.noPre)


registerWhen(register("chat", (supply, event) => {
  let name = new Message(event).getFormattedText()
  name = name.toString().substring(0, name.indexOf("recovered") - 7)
  cancel(event);
  let time = undefined
  Scoreboard.getLines().forEach(line => { if (line.toString().includes("Time Elapsed")) time = line.toString(); })
  time = time?.substring(time?.indexOf(":") + 2)
  ChatLib.chat(`${name} &a&lrecovered a supply at ${time}! &r&8(${supply}/6)`)
}).setCriteria("${*} recovered one of Elle's supplies! (${supply}/6)"), () => settings.customSupply && getWorld() == "Kuudra")

registerWhen(register("renderWorld", () => {
  if (settings.teammates) {
    World.getAllEntitiesOfType(PLAYERS).forEach(player => {
    let ping = World.getPlayerByName(player.getName())?.getPing();
    if (ping != 1 || player.isInvisible()) return;
    RenderLib.drawEspBox(player.getX(), player.getY(), player.getZ(), 1, 2, settings.teammateColor.getRed() / 255, settings.teammateColor.getGreen() / 255, settings.teammateColor.getBlue() / 255, 1, true);
    Tessellator.drawString(`${player.getName()}`, player.getX(), player.getY() + 2.5, player.getZ(), 0x00ffff, false)
  })
  }
  if (settings.pearl) {
    // Triangle
    RenderLib.drawInnerEspBox(-97, 157, -112, 1, 1, 1, 0, 0, 1, true);
    RenderLib.drawEspBox(-70.5, 79, -134.5, 1, 1, 2, 0, 0, 1, false);
    RenderLib.drawEspBox(-85.5, 78, -128.5, 1, 1, 2, 0, 0, 1, false); 
    RenderLib.drawInnerEspBox(-95.5, 161, -105.5, 1, 1, 1, 0, 1, 1, true);
    RenderLib.drawEspBox(-67.5, 77, -122.5, 1, 1, 2, 0, 1, 1, false);
    // X
    RenderLib.drawInnerEspBox(-103, 160, -109, 1, 1, 1, 1, 1, 1, true);
    RenderLib.drawEspBox(-134.5, 77, -138.5, 1, 1, 1, 1, 1, 1, false);
    RenderLib.drawEspBox(-130.5, 79, -113.5, 1, 1, 1, 0.588, 0.059, 1, false);
    RenderLib.drawInnerEspBox(-110, 155, -106, 1, 1, 1, 0.588, 0.059, 1, true);
    // Square
    RenderLib.drawInnerEspBox(-43.5, 120, -149.5, 1, 1, 0, 1, 1, 1, true)
    RenderLib.drawInnerEspBox(-45.5, 135, -138.5, 1, 1, 0, 1, 1, 1, true)
    RenderLib.drawInnerEspBox(-35.5, 138, -124.5, 1, 1, 0, 1, 1, 1, true)
    RenderLib.drawInnerEspBox(-26.5, 126, -111.5, 1, 1, 0, 1, 1, 1, true)
    RenderLib.drawEspBox(-140.5, 78, -90.5, 1, 1, 0, 1, 1, 1, false);
    // =
    RenderLib.drawInnerEspBox(-106, 165, -101, 1, 1, 0, 1, 0, 1, true);
    RenderLib.drawEspBox(-65.5, 76, -87.5, 1, 1, 0, 1, 0, 1, false);
    // /
    RenderLib.drawInnerEspBox(-105, 157, -98, 1, 1, 0, 0, 1, 1, true);
    RenderLib.drawEspBox(-112.5, 76.5, -68.5, 1, 1, 0, 0, 1, 1, false);
  }
  if (settings.supplyWaypoints && phase == 1) {
    World.getAllEntitiesOfType(GIANT_ZOMBIES).forEach(giant => {
      if (giant?.getEntity()?.func_70694_bm()?.toString() != "1xitem.skull@3") return
      let yaw = giant.getYaw();
      renderBeaconBeam(giant.getX() + (3.7 * Math.cos((yaw + 130) * (Math.PI / 180))), 72, giant.getZ() + (3.7 * Math.sin((yaw + 130) * (Math.PI / 180))), 0, 1, 1, 0.8, true, 100);
    });
  }
  if (settings.supply && phase == 1) {
    let color = [1, 1, 1]
    if (supply1) {
      color = missing == "Shop" ? [1, 0, 0] : [1, 1, 1]
      renderBeaconBeam(-98, 78, -112, ...color, 0.8, true, 100); // shop
    }
    if (supply2) {
      color = missing == "Equals" ? [1, 0, 0] : [1, 1, 1]
      renderBeaconBeam(-98, 78, -99, ...color, 0.8, true, 100); // equals
    }
    if (supply3) {
      color = missing == "X Cannon" ? [1, 0, 0] : [1, 1, 1]
      renderBeaconBeam(-110, 78, -106, ...color, 0.8, true, 100); // cannon
    }
    if (supply4) {
      color = missing == "X" ? [1, 0, 0] : [1, 1, 1]
      renderBeaconBeam(-106, 78, -112, ...color, 0.8, true, 100); // x
    }
    if (supply5) {
      color = missing == "Triangle" ? [1, 0, 0] : [1, 1, 1]
      renderBeaconBeam(-94, 78, -106, ...color, 0.8, true, 100); // tri
    }
    if (supply6) {
      color = missing == "Slash" ? [1, 0, 0] : [1, 1, 1]
      renderBeaconBeam(-106, 78, -99, ...color, 0.8, true, 100); // slash
    }
  }
  if (phase == 2) {
    World.getAllEntitiesOfType(ARMOR_STANDS).forEach(stand => {
      if (stand.getName().includes("Lv") || stand.toString().includes("name=Armor Stand")) return;
      let name = ChatLib.removeFormatting(stand.getName());
      let rawName = stand.getName();
      if (name.includes("Building Progress")) {
        let helpers = ""
        helpers = name.substring(name.indexOf("(") + 1, name.indexOf("(") + 2)
        Tessellator.drawString(`${ helpers } builders`, stand.getX(), stand.getY() - 5, stand.getZ(), 0x00ffff, false, 0.2, false)
        build = name.substring(0, name.indexOf("%")).replaceAll(/\D/g, "");
        if (settings.inBuild) {
          let newTime = new Date().getTime();
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
    if (freshies.length == 0) return
    freshies.forEach(fresher => {
      let fresh = World?.getPlayerByName(fresher)
      if (fresher == Player.getName() || fresh?.getX() == null) return
      RenderLib.drawInnerEspBox(fresh.getX(), fresh.getY(), fresh.getZ(), 1, 2, 0, 1, 0, 0.5, false)
    })
  }
}), () => getWorld() == "Kuudra")

registerWhen(register("renderWorld", () => {
  World.getAllEntitiesOfType(MAGMA_CUBES).forEach(entity => {
    let maxHP = entity.getEntity().func_110148_a(Java.type('net.minecraft.entity.SharedMonsterAttributes').field_111267_a).func_111125_b()
    if (maxHP == 100_000) {
      RenderLib.drawEspBox(entity.getX(), entity.getY(), entity.getZ(), entity.getWidth(), entity.getHeight(), 0.914, 1, 0, 1, true)
    }
  })
}), () => settings.kuudraHitbox && getWorld() == "Kuudra")

register("worldUnload", () => {
  phase = 0
  supply1 = true
  supply2 = true
  supply3 = true
  supply4 = true
  supply5 = true
  supply6 = true
  build = 0
  freshies = []
  freshTime = 0
  missing = ""
});

registerWhen(register("renderEntity", (entity, position, ticks, event) => {
  if (entity.getClassName() != "EntityArmorStand") return
  if (!entity.toString().removeFormatting().includes(["[Lv"])) return
  cancel(event)
}), () => settings.kuudraTags && getWorld() == "Kuudra")

registerWhen(register("renderSlot", (slot, gui, event) => {
  if (!slot?.toString().includes("ContainerLocalMenu: Perk Menu")) return
  slot = slot.getItem()?.getName()?.removeFormatting()
  if (slot?.includes("Steady Hands") || slot?.includes("Bomberman") || slot == "Elle's Lava Rod" || slot == "Elle's Pickaxe" || slot == "Auto Revive" || (settings.renderStun && ((slot?.includes("Mining Frenzy") || slot?.includes("Human Cannonball"))))) {
    cancel(event)
  }
}), () => settings.renderPerk && getWorld() == "Kuudra")

registerWhen(register("guiMouseClick", (x, y, button, gui, event) => {
  let slot = Client.currentGui.getSlotUnderMouse()
  if (!slot?.toString()?.includes("ContainerLocalMenu: Perk Menu")) return
  slot = slot?.getItem()?.getName()?.removeFormatting()
  if (slot?.includes("Steady Hands") || slot?.includes("Bomberman") || slot == "Elle's Lava Rod" || slot == "Elle's Pickaxe" || slot == "Auto Revive" || (settings.renderStun && (slot?.includes("Mining Frenzy") || slot?.includes("Human Cannonball")))) {
    cancel(event)
  }
}), () => settings.renderPerk && getWorld() == "Kuudra");

const ZOMBIES = Java.type("net.minecraft.entity.monster.EntityZombie").class;
const MID = new Vec3i(-102, 79, -95)

registerWhen(register("renderWorld", () => {
  if (phase != 2) return
  World.getAllEntitiesOfType(ZOMBIES).forEach(zombie => {
    if (zombie.getMotionX() == 0 && zombie.getMotionZ() == 0 && zombie.getY() == 79 && MID.distance(zombie.getPos()) < 15) {
      RenderLib.drawEspBox(zombie.getX(), zombie.getY(), zombie.getZ(), zombie.getWidth(), zombie.getHeight(), 1, 1, 1, 1, true)
    }
  })
}), () => getWorld() == "Kuudra" && settings.breakingPiles)
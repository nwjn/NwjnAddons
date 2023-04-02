import Settings from "../config";
import { alert, guiShader } from "../utils/functions";
import { data, short_number, champDisplay, consts } from "../utils/constants";
let inKuudra = false;

// Credit: OdinClient for Kuudra Alerts inspiration
register("chat", () => {
  if (Settings.alerts) {
    inKuudra = true;
    alert("&c&lNO KUUDRA KEYS!")
  }
}).setCriteria("WARNING: You do not have a key for this tier in your inventory, you will not be able to claim rewards.");
  
// UNREADY ALERT
register("chat", (player) => {
  if (Settings.alerts) {
    inKuudra = true;
    const name = player.removeFormatting().toUpperCase();
    alert(`&c&l${ name } IS NO LONGER READY!`);
  }
}).setCriteria("${player} is no longer ready!");
  
// CHOOSE PERK ALERT
register("chat", () => {
  if (Settings.alerts) {
    inKuudra = true;
    alert("&c&lPURCHASE CLASS PATH!", "");
  }
}).setCriteria("[NPC] Elle: Okay adventurers, I will go and fish up Kuudra!");
  
// FUELING ALERT
register("chat", () => {
  if (Settings.alerts) {
    inKuudra = true;
    alert("&c&lGET SUPPLIES!", "");
  }
}).setCriteria("[NPC] Elle: Not again!");
  
// BUILDING ALERT
register("chat", () => {
  if (Settings.alerts) {
    inKuudra = true;
    alert("&c&lSTART BUILDING!", "");
  }
}).setCriteria("[NPC] Elle: It's time to build the Ballista again! Cover me!");

register("chat", (player) => {
    // Kuudra stunned alert
  if (Settings.alerts) {
    inKuudra = true;
    alert("&c&lKUUDRA STUNNED!", player);
  }
}).setCriteria("{player} destroyed one of Kuudra's pods!");


register("renderWorld", () => {
  if (Settings.inBuild) {
  TabList.getNames().forEach(name => {
    if (ChatLib.removeFormatting(name).trim().includes("Area: Instanced")) {
        World.getAllEntities().forEach(stand => {
          if (stand.getName().trim().includes("PROGRESS: ")) {
            Tessellator.drawString(stand.getName(), stand.getX(), stand.getY() + 2.475, stand.getZ(), 0xffffff, false, 0.02665, false);
          }
        });
      }
    })
  }
})   


if (Settings.announceVanqs) {
  register("chat", () => {
    let playerX = Player.getX();
    let playerY = Player.getY();
    let playerZ = Player.getZ();
    ChatLib.say(`/pc [NwjnAddons] x: ${playerX}, y: ${playerY}, z: ${playerZ} vanquisher!!!`)
  }).setChatCriteria("&r&aA &r&cVanquisher &r&ais spawning nearby!&r")
}
    
let cexp = 0
let nowCexp = 0
let nowCexp2 = 0
let kills = 0
let gainedCexp = 0
let lastCexp = false
const short_number = (num) => {
  if (num == undefined) return;
  return num.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

register("entitydeath", (entity) => {
  if (Settings.hyp) {
    const heldItem = Player.getHeldItem().getNBT().getCompoundTag("tag").getCompoundTag("ExtraAttributes").getString("id");
    const weapon = ["HYPERION", "ASTRAEA", "SCYLLA", "VALKYRIE", "NECRON_BLADE_UNREFINED", "INK_WAND", "FIRE_VEIL_WAND"];
    const tp = ["ASPECT_OF_THE_VOID", "ASPECT_OF_THE_END"];
    if ((entity.getClassName() == "EntityBlaze") && (Player.asPlayerMP().distanceTo(entity) < 6) && (tp.includes(heldItem))) {
      kills = -2;
    }
    if ((entity.getClassName() == "EntityBlaze") && (Player.asPlayerMP().distanceTo(entity) < 6) && (weapon.includes(heldItem))) {
      kills += 1;
      lastCexp = false;
      nowCexp = Player?.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getDouble("champion_combat_xp");
      nowCexp = Math.floor(nowCexp);
      if ((entity.getClassName() == "EntityBlaze") && (Player.asPlayerMP().distanceTo(entity) < 6) && (nowCexp != cexp)) {
        gainedCexp = 0
        if (nowCexp != cexp) {
          if (weapon.includes(heldItem)) {
            nowCexp2 = Player?.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getDouble("champion_combat_xp");
            nowCexp2 = Math.floor(nowCexp2);
            gainedCexp = nowCexp2 - cexp;
          }
          cexp = nowCexp;
          kills = -2;
          lastCexp = true;
        }
      }
      else if ((entity.getClassName() == "EntityBlaze") && (Player.asPlayerMP().distanceTo(entity) < 6) && (lastCexp == false) && (nowCexp == cexp) && (kills >= 3)) {
        alert("&cHYPE BROKEN");
        gainedCexp = 0
        kills = 0;
      }
    }
  }
})
register("renderoverlay", () => {
  guiShader();
  Renderer.drawStringWithShadow(`&6Champion XP: &e${ short_number(nowCexp) } (+${ short_number(gainedCexp) })`, data.champX, data.champY);
})

champDisplay.registerClicked((x, y, button_num) => {
  data.champX = x
  data.champY = y
  data.save();
})
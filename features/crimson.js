import Settings from "../config";
import { alert } from "../utils/functions";
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


// register('tick', () => {
//   TabList.getNames().forEach(name => {
//   if (ChatLib.removeFormatting(name).trim().includes("Area: Private Island")) {
//     if (Settings.inBuild)
//       World.getAllEntities().forEach(stand => {
//         if (stand.getName().trim().includes("PROGRESS: ")) {
//           // Renderer.drawStringWithShadow()
//           Tessellator.drawString(stand.getName(), stand.getX(), stand.getY(), stand.getZ())
//         }
//       })
//     }
//   })
// })    

let cexp = 0
let nowCexp = 0
let kills = 0
let lastCexp = false
const short_number = (num) => {
  if (num == undefined) return;
  return num.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

register("entitydeath", (entity) => {
  if (Settings.hyp) {
    breakme: {
      const heldItem = Player.getHeldItem().getNBT().getCompoundTag("tag").getCompoundTag("ExtraAttributes").getString("id");
      const witherBlades = ["HYPERION", "ASTRAEA", "SCYLLA", "VALKYRIE", "NECRON_BLADE_UNREFINED"];

      if ((entity.getClassName() == "EntityBlaze") && (Player.asPlayerMP().distanceTo(entity) < 6) && (witherBlades.includes(heldItem))) {
        kills += 1;
        lastCexp = false;
        nowCexp = Player?.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getDouble("champion_combat_xp");
        nowCexp = Math.floor(nowCexp);
        if (entity.getClassName() != "EntityBlaze") {
        }
        else if ((entity.getClassName() == "EntityBlaze") && (Player.asPlayerMP().distanceTo(entity) < 6) && (nowCexp != cexp)) {
          ChatLib.chat(`${ short_number(nowCexp) }`);
          if (nowCexp != cexp) {
            cexp = nowCexp;
            kills = 0;
            lastCexp = true;
            break breakme;
          }
        }
        else if ((entity.getClassName() == "EntityBlaze") && (Player.asPlayerMP().distanceTo(entity) < 6) && (lastCexp == false) && (nowCexp == cexp) && (kills >= 3)) {
          ChatLib.chat(kills);
          alert("&cHYPE BROKEN");
          kills = -2;
        }
      }
    }
  }
});
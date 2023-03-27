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

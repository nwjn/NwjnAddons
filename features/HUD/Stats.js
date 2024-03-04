import settings from "../../config"
import { data } from "../../utils/data";
import { Overlay } from "../../utils/overlay";
import { registerWhen } from "../../utils/functions";
import { getWorld } from "../../utils/world";

const statsExample =
`Speed: ✦0
Strength: &c❁0
Crit Chance: &9☣0
Crit Damage: &9☠0
Attack Speed: &e⚔0`;
const statsOverlay = new Overlay("stats", ["all"], () => true, data.statsL, "moveStats", statsExample);

registerWhen(register("tick", () => {
  try {
    statsOverlay.message = ""
    let tab = TabList.getNames().filter(e => e.match(/(:|☻)/g));
    const world = getWorld();
    let start;
    let end;
    if (!["The Rift", "Garden"].includes(world)) {
      start = tab.findIndex(e => e.startsWith("§r§e§lSkills:")) + 1;
      end = 5
    }
    else if (world == "The Rift") {
      start = tab.findIndex(e => e.startsWith("§r§d§lStats:")) + 1
      end = 4
    }
    else if (world == "Garden") {
      start = tab.findIndex(e => e.startsWith("§r§e§lSkills:")) + 1;
      end = 4
      statsOverlay.message = ` Yaw/Pitch: ${ Player.getYaw().toFixed(1) }/${ Player.getPitch().toFixed(1) }\n`;
      statsOverlay.message += ` Contest:${tab[tab.findIndex(e => e.startsWith("§r§e§lJacob")) + 1]}\n`
      statsOverlay.message += tab.findIndex(e => e.includes("☻")) != -1 ? `${tab[tab.findIndex(e => e.includes("☻"))]}\n` : "\n"
    }
    tab.splice(start, end).forEach(e => statsOverlay.message += `${ e }\n`)
  } catch (e) {}
}), () => settings.stats)
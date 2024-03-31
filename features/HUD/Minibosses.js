import settings from "../../config"
import { data } from "../../utils/data";
import { Overlay } from "../../utils/overlay";
import { registerWhen } from "../../utils/functions";
import { getWorld } from "../../utils/world";

const miniExample = `&6Last Minibosses:\n`
const miniOverlay = new Overlay("mini", ["Crimson Isle"], () => true, data.miniL, "moveMini", miniExample)

registerWhen(register("chat", (mini) => {
  mini = mini.trim()
  if (mini == "BLADESOUL") data.lastMini.push("&8Bladesoul")
  else if (mini == "BARBARIAN DUKE X") data.lastMini.push("&eBarbarian Duke X")
  else if (mini == "ASHFANG") data.lastMini.push("&cAshfang")
  else if (mini == "MAGMA BOSS") data.lastMini.push("&4Magma Boss")
  else if (mini == "MAGE OUTLAW") data.lastMini.push("&5Mage Outlaw")
  if (data.lastMini.length > 4) data.lastMini.shift()
  
  miniOverlay.message = miniExample + data.lastMini.join("\n");
}).setCriteria("${mini} DOWN!"), () => getWorld() == "Crimson Isle" && settings.mini);

if (settings.mini) miniOverlay.message = miniExample + data.lastMini.join("\n")
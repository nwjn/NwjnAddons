import WorldUtil from "../../utils/WorldUtil"
import { data } from "../../utils/data";
import { Overlay } from "../../utils/overlay";
import { registerWhen } from "../../utils/functions";

const miniExample = `&6Last Minibosses:\n`
const miniOverlay = new Overlay("mini", ["Crimson Isle"], () => true, data.miniL, "moveMini", miniExample)

registerWhen(register("chat", (mini) => {
  mini = mini.trim()
  
  switch (mini) {
    case "BLADESOUL": mini = "&8Bladesoul"; break;
    case "BARBARIAN DUKE X": mini = "&eBarbarian Duke X"; break;
    case "ASHFANG": mini = "&cAshfang"; break;
    case "MAGMA BOSS": mini = "&4Magma Boss"; break;
    case "MAGE OUTLAW": mini = "&5Mage Outlaw"; break;
    default: return;
  }
  data.lastMini.push(mini)
  
  if (data.lastMini.length > 4) data.lastMini.shift()
  data.save()
  
  miniOverlay.setMessage(miniExample + data.lastMini.join("\n"))
}).setCriteria("${mini} DOWN!"), () => WorldUtil.isWorld("Crimson Isle"));

miniOverlay.setMessage(miniExample + data.lastMini.join("\n"))
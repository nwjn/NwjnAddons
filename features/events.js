import Settings from "../config";
import { guiShader } from "../utils/functions";

let powder = false;
let sbupdate = false;

register("chat", () => {
  guiShader()
  if (Settings.doublepowder) {
    powder = true
    ChatLib.say('/gc [NwjnAddons] 2x Powder Alert!')
    if (ChatLib.getChatLines().includes("&cYou cannot say the same message twice!&r")) {
      setTimeout(() => {
        ChatLib.chat("&d[NwjnAddons] &cAlready sent 2x powder alert to guild!")
        powder = false
      }, 5) 
    }
  }
}).setChatCriteria(" &b⚑ &eThe &b2x Powder &eevent starts in &a20 &eseconds!").setContains();

register("chat", () => {
  if (Settings.gameupdate) {
    sbupdate = true;
    ChatLib.say('/gc [NwjnAddons] Game Update Alert!')
    if (ChatLib.getChatLines().includes("&cYou cannot say the same message twice!&r")) {
      setTimeout(() => {
        ChatLib.chat("&d[NwjnAddons] &cAlready sent game update alert to guild!")
        sbupdate = false
      }, 5) 
    }
  }
}).setChatCriteria("&r&c[Important] &r&eThis server will restart soon: &r&bGame Update&r").setContains();

if (powder == true || sbupdate == true) {
  register("chat", function (e) {
    cancel(e)
  }).setChatCriteria("&cYou cannot say the same message twice!&r").setParameter("<c>")
}
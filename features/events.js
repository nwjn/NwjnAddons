/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../config";

let powder = false;
let sbupdate = false;

register("chat", () => {
  if (Settings.doublepowder) {
    powder = true
    ChatLib.say('/gc [NwjnAddons] 2x Powder Alert!')
    if (ChatLib.getChatLines().includes("&cYou cannot say the same message twice!&r")) {
      setTimeout(() => {
        ChatLib.chat("&d[NwjnAddons] &cAlready sent 2x powder alert to guild!")
      }, 5) 
      register("chat", function (e) {
        cancel(e)
      }).setChatCriteria("&cYou cannot say the same message twice!&r").setParameter("<c>")
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
      }, 5) 
      register("chat", function (e) {
        cancel(e)
      }).setChatCriteria("&cYou cannot say the same message twice!&r").setParameter("<c>")
    }
  }
}).setChatCriteria("&r&c[Important] &r&eThis server will restart soon: &r&bGame Update&r").setContains();

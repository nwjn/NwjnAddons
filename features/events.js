/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../config";

let powder = false;
let sbupdate = false;
let Boolean = false;

// Automatically sends a guild message when a 2x event is announced in Dwarven Mines or Crystal Hollows.
register("chat", () => {
  if (Settings.doublepowder) {
    powder = true
    ChatLib.say('/gc [NwjnAddons] 2x Powder Alert!')
    if (ChatLib.getChatLines().includes("&cYou cannot say the same message twice!&r")) {
      setTimeout(() => {
        ChatLib.chat("&d[NwjnAddons] &cAlready sent 2x powder alert to guild!")
      },5) 
    }
  }
}).setChatCriteria("&b⚑ &eThe &b2x Powder &eevent starts in &a20 &eseconds! &eThis is a passive event! &bIt's happening everywhere in the &bCrystal Hollows!&r").setContains();

// Automatically sends a guild message when a game update is announced in your lobby
register("chat", () => {
  if (Settings.gameupdate) {
    sbupdate = true;
    ChatLib.say('/gc [NwjnAddons] Game Update Alert!')
    if (ChatLib.getChatLines().includes("&cYou cannot say the same message twice!&r")) {
      setTimeout(() => {
        ChatLib.chat("&d[NwjnAddons] &cAlready sent game update alert to guild!")
      },5) 
    }
  }
}).setChatCriteria("&r&c[Important] &r&eThis server will restart soon: &r&bGame Update&r").setContains();

// Clears the "You cannot say the same message twice!" message from the chat
register("chat", function (e) {
  cancel(e)
}).setChatCriteria("&cYou cannot say the same message twice!&r").setParameter("<c>")
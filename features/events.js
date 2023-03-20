import Settings from "./config.js";

let inCrystalHollows = false

register("chat", () => {
  if (Settings.doublepowder) {
    inCrystalHollows = true
    ChatLib.say('/w nwjn [NwjnAddons] 2x Powder!')
  }
}).setChatCriteria(" &b⚑ &eThe &b2x Powder &eevent starts in &a20 &eseconds! &eThis is a passive event! &bIt's happening everywhere in the &bCrystal Hollows!&r")
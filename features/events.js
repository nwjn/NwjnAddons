import Settings from "../config";

let powder = false;
let sbupdate = false;
let Boolean = false;

// if (Scoreboard.getLines(true).includes("⏣")) {

// register("worldload", () => {
//   new Message("&cYou cannot say the same message twice!&r").setChatLineId(-1).chat();
//   console.log(new Message("&cYou cannot say the same message twice!&r").getChatLineId())
//   console.log("setchatlineid")
//   setTimeout(() => {
//     ChatLib.clearChat(-1)
//     console.log("clearchat")
//     if (ChatLib.getChatLines().includes("&cYou cannot say the same message twice!&r")) {
//       Boolean = true;
//       console.log(Boolean)
//       ChatLib.clearChat(-1)
//     }
//     else {
//       Boolean = false;
//       console.log(Boolean)
//     }
//   }, 10000) 
// })

register("chat", () => {
  console.log("[Log] double powder =", Settings.doublepowder)
  if (Settings.doublepowder) {
    powder = true
    ChatLib.say('/w nwjn [NwjnAddons] 2x Powder Alert!')
  }
}).setChatCriteria("&b⚑ &eThe &b2x Powder &eevent starts in &a20 &eseconds! &eThis is a passive event! &bIt's happening everywhere in the &bCrystal Hollows!&r").setContains();

register("chat", () => {
  console.log("[Log] gameupdate = ", Settings.gameupdate);
  if (Settings.gameupdate) {
    sbupdate = true;
    ChatLib.say('/w nwjn [NwjnAddons] Game Update Alert!')
    if (ChatLib.getChatLines().includes("&cYou cannot say the same message twice!&r")) {
      console.log("[Log] Cleared Message:")
      setTimeout(() => {
        ChatLib.chat("&d[NwjnAddons] &cAlready sent game update alert to guild!")
        console.log("[Log] Already sent game update alert!")
        ChatLib.clearChat(1)
      }, 10) 
    }
  }
}).setChatCriteria("&c[Important] &eThis server will restart soon: &bGame update&r").setContains();

// Copy For Testing
// &cYou cannot say the same message twice!&r
// &b⚑ &eThe &b2x Powder &eevent starts in &a20 &eseconds! &eThis is a passive event! &bIt's happening everywhere in the &bCrystal Hollows!&r
// &c[Important] &eThis server will restart soon: &bGame update&r
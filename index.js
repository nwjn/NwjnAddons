import Settings from "./config.js";
import "./features/general.js";
import "./features/levels.js";
import "./features/bestiary.js";
import "./features/kuudra.js";
import "./features/events.js";

import { helpHelper, NwjnAddonsMessage } from "./functions.js";

register("command", (arg) => {
helpMessage = helpHelper({
  '': '__title__',
  'General': 'Miscellaneous functions',
  'Levels': 'Helps with Skyblock Leveling',
  'Bestiary': 'Helps with bestiary',
  'Kuudra': 'Helps with kuudra',
  'Events': 'Helps with events'
})
  if (arg == "help") {
    ChatLib.chat(helpMessage)
  }

  else if (!arg) {
    Settings.openGUI()
  }

  else {
    ChatLib.chat(NwjnAddonsMessage(`${arg} has not been implemented yet. Type '/nwjn help' for help.`))
  }
}).setName("nwjn", true);

// ChatLib.chat("NwjnAddons works.")

// registerCommand((arg) => {
//   if (arg != 1) {
//     ChatLib.chat("Command takes 1 argument.");
//   } else {
//     ChatLib.chat(`NwjnAddons - ${ arg } has not yet been implemented. Type '/nwjn help' for help.`);
//   }
// })
//   .setTabCompletions((args) => {
//     return ["help", "foo"];
//   })
//   .setCommandName("nwjn");

// // a basic worldload trigger
// register("worldload", () => {
//   ChatLib.chat("World loaded.")
// });

// // a basic chat trigger
// register("chat", (player, message, event) => {
//   cancel(event);
//   ChatLib.chat(`${player}: ${message}`);
// }).setCriteria(`<${ player }> ${ message }`);

// // an automated response
// register("messageSent", (message, event) => {
//   if (message.toLowerCase().includes("ping")) {
//     ChatLib.chat("Pong!");
//   }
// });

// register("chat", () => {
//   ChatLib.say('/p holy shit it finally worked')
// }).setChatCriteria("&r&9Party &8> &b[MVP&d+&b] Jumbo_Cube&f: &rtest&r")
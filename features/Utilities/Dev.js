import Loc from "../../utils/Location";
import { PREFIX, version } from "../../utils/constants"
import Party from "../../utils/Party";

register("command", (arg) => {
  switch (arg) {
    case "world":
      ChatLib.chat(`${ PREFIX } WorldData: ${ Loc.Data }`);
      break;
    case "party":
      Party._getParty();
      break;
    case "version":
      ChatLib.chat(ChatLib.getChatBreak("-"));
      ChatLib.chat(`${ PREFIX } &bYou are currently on version &e${ version }`);
      ChatLib.chat(`Libraries:`);
      const libraries = JSON.parse(FileLib.read("NwjnAddons", "metadata.json")).requires;
      libraries.forEach(lib => {
        ChatLib.chat(`  &b${ lib }&r: &e${ JSON.parse(FileLib.read(lib, "metadata.json")).version }`);
      });
      ChatLib.chat(ChatLib.getChatBreak("-"));
      break;
  }
}).setName("nwjndev");

let code = []

register("command", (...args) => {
  try {
    const command = args.shift()
    switch (command) {
      case "add": 
        code.push(args.join(" "));
        ChatLib.chat(`&dEval added new code:&r ${args.join(" ")}`);
        break;
      case "reset": 
        code.length = 0;
        ChatLib.chat(`&dEval reset all code`);  break;
      case "view":
        ChatLib.chat(`&dCode:`)
        ChatLib.chat(code.join("\n"));
        break;
      case "run":
        ChatLib.chat(`&dRunning code...`);
        eval(code.join("\n"));
        ChatLib.command("eval reset", true)
        break;
      default: return;
    }
    ChatLib.chat("")
  } catch (err) {ChatLib.chat(`${PREFIX} Eval: &c${err}`)}
}).setName("eval", true)
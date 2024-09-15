import Loc from "../../utils/Location";
import { PREFIX } from "../../utils/constants"

register("command", (arg) => {
  switch (arg) {
    case "world": 
      ChatLib.chat(`${PREFIX} WorldData: ${Loc.Data}`)
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
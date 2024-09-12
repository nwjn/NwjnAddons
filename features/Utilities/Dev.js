import Loc from "../../utils/Location";
import {PREFIX} from "../../utils/constants"
register("command", (arg) => {
  switch (arg) {
    case "world": 
      ChatLib.chat(`${PREFIX} WorldData: ${Loc.Data}`)
  }
}).setName("nwjndev")
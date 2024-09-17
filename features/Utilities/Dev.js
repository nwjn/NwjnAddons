import Loc from "../../utils/Location";
import { PREFIX, version } from "../../utils/Constants"
import Party from "../../utils/Party";
import { meinConf } from "../../utils/Settings";

register("command", (arg) => {
  switch (arg) {
    case "world":
      ChatLib.chat(`${ PREFIX } WorldData: ${ Loc.Data }`);
      break;
    case "party":
      ChatLib.chat(`${ PREFIX } Party: ${ Party.Members }`)
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
    case "apply":
      meinConf.setScheme("utils/data/Scheme.json").apply();
      break;
  }
}).setName("nwjndev");
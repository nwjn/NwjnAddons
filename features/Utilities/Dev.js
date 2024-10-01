import Party from "../../utils/Party";
import Settings from "../../Settings";
import { TextHelper } from "../../utils/TextHelper";
import Location from "../../utils/Location";

register("command", (arg) => {
  switch (arg) {
    case "world":
      ChatLib.chat(`${ TextHelper.PREFIX } WorldData: ${ Location.area } | ${Location.subarea}`);
      break;
    case "party":
      ChatLib.chat(`${ TextHelper.PREFIX } Party: ${ Party.getMembers().toString() }`)
      break;
    case "version":
      ChatLib.chat(ChatLib.getChatBreak("-"));
      ChatLib.chat(`${ TextHelper.PREFIX } &bYou are currently on version ${ TextHelper.VERSION }`);
      ChatLib.chat(`Libraries:`);
      const libraries = JSON.parse(FileLib.read("NwjnAddons", "metadata.json")).requires;
      libraries.forEach(lib => {
        ChatLib.chat(`  &b${ lib }&r: &e${ JSON.parse(FileLib.read(lib, "metadata.json")).version }`);
      });
      ChatLib.chat(ChatLib.getChatBreak("-"));
      break;
    case "apply":
      Settings().getConfig().setScheme("utils/data/Scheme.json").apply();
      break;
  }
}).setName("nwjndebug");
import Party from "../../utils/Party";
import Settings from "../../data/Settings";
import TextUtil from "../../core/static/TextUtil";
import Location from "../../utils/Location";

register("command", (arg) => {
  switch (arg) {
    case "world":
      ChatLib.chat(`${ TextUtil.NWJNADDONS } WorldData: ${ Location.area } | ${Location.subarea}`);
      break;
    case "party":
      ChatLib.chat(`${ TextUtil.NWJNADDONS } Party: ${ Party.getMembers().toString() }`)
      break;
    case "version":
      ChatLib.chat(ChatLib.getChatBreak("-"));
      ChatLib.chat(`${ TextUtil.NWJNADDONS } &bYou are currently on version ${ TextUtil.VERSION }`);
      ChatLib.chat(`Libraries:`);
      const libraries = JSON.parse(FileLib.read("NwjnAddons", "metadata.json")).requires;
      libraries.forEach(lib => {
        ChatLib.chat(`  &b${ lib }&r: &e${ JSON.parse(FileLib.read(lib, "metadata.json")).version }`);
      });
      ChatLib.chat(ChatLib.getChatBreak("-"));
      break;
    case "apply":
      Settings().getConfig().setScheme("/data/Scheme.json").apply();
      break;
  }
}).setName("nwjndebug");
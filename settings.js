/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "./config.js";
import PogObject from "../PogData";

const prefix = "&7[&6NwjnAddons&7]&6"
const StartSeparator = "&b&m------------------------&r  &6NwjnAddons  &b&m------------------------&r"
const EndSeparator = "&b&m-------------------------------------------------------------&r"

const EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");


let gloottrackertextcmd
register("command", (...args) => {
  if (args[0] == undefined) {
    Settings.openGUI();
  } else if (args[0].toLowerCase() === "settings") {
    Settings.openGUI();
  } else if (!Settings.overall) {
    ChatLib.chat(new Message(`${ prefix } You disabled NwjnAddons, turn it on in the Settings (turn on Overall) `, new TextComponent(("&6[Settings]")).setClick("run_command", "/nwjn").setHoverValue("&eClick to run command")));
  } else if (args[0].toLowerCase() === "discord") {
    ChatLib.chat(new Message(`${ prefix } Here is the Discord invite Link `, new TextComponent(("&9[Discord]")).setClick("open_url", "https://discord.gg/wer8VU5E9P").setHoverValue("&eClick to join Discord")));
  } else if (args[0].toLowerCase() === "move") {
    if (args[1].toLowerCase() == "location") {
      ChatLib.command("dgolemlocation", true);
    } else if (args[1].toLowerCase() == "stage") {
      ChatLib.command("dgolemstage", true);
    } else if (args[1].toLowerCase() == "golemcountdown") {
      ChatLib.command("dgolemcountdown", true);
    } else if (args[1].toLowerCase() == "sinces4") {
      ChatLib.command("dgolemsinces4", true);
    } else if (args[1].toLowerCase() == "golemloottracker") {
      ChatLib.command("dgolemloottracker", true);
    } else if (args[1].toLowerCase() == "dragoncountdown") {
      ChatLib.command("ddragoncountdown", true);
    } else {
      ChatLib.chat(`${ prefix } Possible inputs: location, stage, golemcountdown, sinces4, golemloottracker, dragoncountdown`);
    }
  }
})

/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "./config";
import "./features/general";
import "./features/levels";
import "./features/bestiary";
import "./features/kuudra";
import "./features/events";
import "./utils/api";
import { helpHelper, NwjnAddonsMessage } from "./utils/functions";
import { data, PREFIX, bestiaryDisplay, statsDisplay } from "./utils/constants";


register("command", (arg) => {
  if (arg == "help") {
    helpMessage = helpHelper({
      '': '__title__',
      '/bestiarytracker': 'makes bestiary tracker moveable',
      '/statstracker': `makes stats tracker moveable`,
      '/clearchat': 'clears the chat',
    })
    ChatLib.chat(helpMessage)
    console.log("Executed '/nwjn help'")
  }


  else if (!arg) {
    Settings.openGUI()
    console.log("Opened GUI")
  }
    
  else {
    ChatLib.chat(NwjnAddonsMessage(`${arg} has not been implemented yet. Type '/nwjn help' for help.`))
  }
}).setTabCompletions("nwjn").setCommandName("nwjn", true).setAliases("n", "NWJN", "NwjnAddons", "nwjnaddons");


register("command", () => {
    ChatLib.clearChat()
    console.log("Cleared Chat!")
}).setCommandName("clearchat");

register("command", () => {
  bestiaryDisplay.open();
}).setCommandName("bestiarytracker");

register("command", () => {
  statsDisplay.open();
}).setCommandName("statstracker")

register("chat", () => {
  ChatLib.say("/pc rer dorp? enchintad bonk {23% majik fin]")
}).setChatCriteria("&r&6&lRARE DROP! &r&fEnchanted Book&r")

register("guiClosed", () => {
  Settings.save();
});

// register("command", () => {
//   data.DwarvenGoblin += 2;
//   data.save()
// }).setCommandName("goblin")

register("step", () => {
  if (data.first_time) {
    data.first_time = false; 
    data.save();
    ChatLib.chat("");
    new TextComponent(ChatLib.getCenteredText(`${ PREFIX }`)).chat();
    new TextComponent(ChatLib.getCenteredText(`&aDo '/nwjn' For settings!`)).chat();
    new TextComponent(ChatLib.getCenteredText(`&aDo '/nwjn help' For commands!`)).chat();
    new TextComponent(ChatLib.getCenteredText(`&aJoin Our Discord!  &b&nDiscord&r &7(Click)`)).setClickAction("open_url").setClickValue("https://discord.gg/wer8VU5E9P").chat();
    ChatLib.chat("");
  };
}).setFps(1)


import Settings from "./config";
import "./features/general";
import "./features/levels";
import "./features/bestiary";
import "./features/kuudra";
import "./features/events";
import "./utils/api";
import { helpHelper, NwjnAddonsMessage } from "./utils/functions";
import { data, bestiaryDisplay, statsDisplay, consts } from "./utils/constants";

// Credit: HJES for help command inspiration
register("command", (arg) => {
  if (arg == "help") {
    helpMessage = helpHelper({
      '': '__title__',
      '/nwjn best': 'moves bestiary tracker',
      '/nwjn stats': `moves stats tracker`,
      '/clearchat': 'clears the chat',
    });
    ChatLib.chat(helpMessage);
    console.debug(`Executed '/nwjn help'`);
  }
  else if (arg == `stats`) {
    statsDisplay.open();
    console.log(`Opened stats GUI.`);
    ChatLib.chat(ChatLib.getChatBreak("-"));
    ChatLib.chat("&0&l&kO&r &6&lClick anywhere to move and press ESC to save!&r &0&l&kO&r");
    ChatLib.chat(ChatLib.getChatBreak("-"));
  }
  else if (arg == 'best') {
    bestiaryDisplay.open();
    console.log(`Opened stats GUI.`);
    ChatLib.chat(ChatLib.getChatBreak("-"));
    ChatLib.chat("&0&l&kO&r &6&lClick anywhere to move and press ESC to save!&r &0&l&kO&r");
    ChatLib.chat(ChatLib.getChatBreak("-"));
  } 
  else if (!arg) {
    Settings.openGUI()
    console.log("Opened GUI")
  }
  else {
    ChatLib.chat(NwjnAddonsMessage(`${arg} has not been implemented yet. Type '${ consts.cmd }${ consts.baseCmd } help' for help.`))
  }
}).setCommandName(`nwjn`, true);


register("command", () => {
    ChatLib.clearChat()
    console.log("Cleared Chat!")
}).setCommandName("clearchat");

register("chat", () => {
  ChatLib.say("/pc rer dorp? enchintad bonk {23% majik fin]")
}).setChatCriteria("&r&6&lRARE DROP! &r&fEnchanted Book&r").setContains()

register("guiClosed", () => {
  Settings.save();
});

register("command", () => {
  data.HubCryptGhoul += 1
  data.save()
}).setCommandName("testcmd")

// Credit: BetterBestiary for first time msg inspiration
register("step", () => {
  if (data.first_time) {
    data.first_time = false; 
    data.save();
    ChatLib.chat("");
    new TextComponent(ChatLib.getCenteredText(`${ consts.PREFIX }`)).chat();
    new TextComponent(ChatLib.getCenteredText(`&aUse '/nwjn' For settings!`)).chat();
    new TextComponent(ChatLib.getCenteredText(`&aUse '/nwjn help' For commands!`)).chat();
    new TextComponent(ChatLib.getCenteredText(`&aJoin Our &b&nDiscord&r&a!`)).setClickAction("open_url").setClickValue("https://discord.gg/wer8VU5E9P").chat();
    ChatLib.chat("");
  };
}).setFps(1)

// Credit: Miniboss Timer for changing screen color in gui



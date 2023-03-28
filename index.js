import Settings from "./config";
import "./features/general";
import "./features/levels";
import "./features/bestiary";
import "./features/kuudra";
import "./features/events";
import "./utils/api";
import { helpHelper, NwjnAddonsMessage } from "./utils/functions";
import { data, bestiaryDisplay, statsDisplay, consts, version, stunDisplay } from "./utils/constants";
import axios from "./../axios"

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
    console.log(`Opened bestiary GUI.`);
    ChatLib.chat(ChatLib.getChatBreak("-"));
    ChatLib.chat("&0&l&kO&r &6&lClick anywhere to move and press ESC to save!&r &0&l&kO&r");
    ChatLib.chat(ChatLib.getChatBreak("-"));
  } 
  else if (arg == 'stun') {
    stunDisplay.open();
    console.log(`Opened stun GUI.`);
    ChatLib.chat(ChatLib.getChatBreak("-"));
    ChatLib.chat("&0&l&kO&r &6&lClick anywhere to move and press ESC to save!&r &0&l&kO&r");
    ChatLib.chat(ChatLib.getChatBreak("-"));
  }
  else if (!arg) {
    Settings.openGUI()
    console.log("Opened GUI")
  }
  else {
    ChatLib.chat(NwjnAddonsMessage(`${arg} has not been implemented yet. Type '/nwjn help' for help.`))
  }
}).setCommandName(`nwjn`, true).setTabCompletions("help", "best", "stats");


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

register("step", () => {
  username = Player.getName()
  axios.get(`https://api.mojang.com/users/profiles/minecraft/+${username}`)
    .then(res => {
    if (res.data.id != data.uuid) {
      data.uuid = res.data.id
      data.save()
    }
  })
}).setFps(1)

register("worldLoad", () => {
  axios.get(`https://chattriggers.com/api/modules/1528`)
  .then(res => {
    let ctVersionArray = (res.data.releases[0].releaseVersion).split('.'),
    currentVersionArray = version.split('.'),
    newVersion = false

    for(let i = ctVersionArray.length; i >= 0; i--)
    {
      if (ctVersionArray[i] > currentVersionArray[i])
        newVersion = true
      else if (currentVersionArray[i] > ctVersionArray[i])
        newVersion = false
    }

    if(newVersion)
    {
      ChatLib.chat(`${consts.PREFIX}&eYou are using an outdated version of NwjnAddons!`)
      new TextComponent(`${consts.PREFIX}&eClick &3here&e to update!`)
      .setClickAction("run_command")
      .setClickValue(`/ct load`)
      .chat()
      ChatLib.chat("")
    }
  })
    
})

register("step", () => {
  username = Player.getName()
  axios.get(`https://api.mojang.com/users/profiles/minecraft/+${username}`)
    .then(res => {
      if (res.data.id != data.uuid) {
        data.uuid = res.data.id
        data.save()
      }
    })
}).setFps(1)


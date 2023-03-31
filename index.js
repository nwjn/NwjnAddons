import Settings from "./config";
import "./features/general";
import "./features/levels";
import "./features/bestiary";
import "./features/crimson";
import "./features/events";
import "./utils/api";
import { helpHelper, NwjnAddonsMessage, openGuiMessage } from "./utils/functions";
import { data, bestiaryDisplay, statsDisplay, consts, version, champDisplay } from "./utils/constants";
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
  }
  else if (arg == `stats`) {
    statsDisplay.open();
    openGuiMessage()
  }
  else if (arg == 'best') {
    bestiaryDisplay.open();
    openGuiMessage()
  } 
  else if (arg == 'champ') {
    champDisplay.open();
    openGuiMessage()
  }
  else if (!arg) {
    Settings.openGUI()
  }
  else {
    ChatLib.chat(NwjnAddonsMessage(`${arg} has not been implemented yet. Type '/nwjn help' for help.`))
  }
}).setCommandName(`nwjn`, true).setTabCompletions("help", "best", "stats", "champ");


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
  ChatLib.chat(Scoreboard.getLineByIndex(5))
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



import settings from "./config";
import "./features/Bestiary"
import "./features/Beta"
import "./features/Commands"
import "./features/CrimsonIsle"
import "./features/Display"
import "./features/General"
import "./features/Kuudra"
import "./features/QOL"

import "./features/HUD/Blaze"
import "./features/HUD/Champion"
import "./features/HUD/Clock"
import "./features/HUD/FatalTempo"
import "./features/HUD/Minibosses"
import "./features/HUD/Poison"
import "./features/HUD/Widgets"

import { version, consts } from "./utils/constants";
import { data } from "./utils/data";
import { setRegisters } from "./utils/functions"
import { openGUI } from "./utils/overlay"
import axios from "./../axios"
import { setMobHighlight } from "./features/Bestiary";

register("command", (arg) => {  
  if (!arg) {
    settings.openGUI();
    return;
  }
  arg = arg?.toLowerCase()
  
  switch (arg) {
    case "gui":
      openGUI();
      break;
    case "version":
      ChatLib.chat(`${ consts.PREFIX } &bYou are currently on version &e${ version }`);
      break;
    case "changelog":
      ChatLib.chat(`${ consts.PREFIX } &eChangelog:\n&r${ changes }`);
      break;
    case "party":
      ChatLib.chat(`${ consts.PREFIX } &eParty Command List:\n&cNote: run the command by adding the . symbol in front of a party message\n.time => shows the players current time\n.coords => sends the coords of the player\n.stats => sends the stats of the player\n.profile => sends the profile fruit name of the profile\n.wealth => sends the player's current financial status\n.power => sends the players current Accessory Bag power\n.warp => warps party\n.transfer => transfers to sender\n.allinv => sets allinvite\n.pet => sends current pet\n.version => shows current nwjnaddons version\n.raider => puts party into infernal kuudra\n.dropper => puts party into dropper game`);
      break;
    case "commands":
      ChatLib.chat(`&r&d&m--------------&r${ consts.PREFIX }&r&d&m--------------\n/clearchat => clears the chat\n/item => sends info about held item\n/entity => sends info about entity ur looking at\n/rocket => flys you to the moon!\n/fakepb <p1> <p2> <p3> <p4> <tokens> => makes a fake kuudra complete msg\n/calc <equation> => must use spaces but simple calculator with systems of equations\n/deal => trades player in front of you without needing to type name\n/avg <...args> => gets the avg of the numbers after the command`);
      break;
    case "reload":
      setRegisters();
      ChatLib.chat(`${ consts.PREFIX } &aReloaded all registers!`);
      break;
    default:
      ChatLib.chat(`${consts.PREFIX} &r\n/nwjn => opens settings\n/nwjn gui => opens gui mover\n/nwjn version => gets the current nwjnaddons version\n/nwjn changes => see the latest changes\n/nwjn party => see all party commands\n/nwjn commands => see all commands\n/nwjn reload => reloads all registers in case they aren't working`)
  }
}).setCommandName(`nwjn`, true).setAliases("nwjnaddons", "njwn").setTabCompletions("version", "changes", "party", "help", "gui")

if (data.first_time) {
  data.first_time = false; 
  data.save();
  ChatLib.chat("");
  new TextComponent(ChatLib.getCenteredText(`${ consts.PREFIX }`)).chat();
  new TextComponent(ChatLib.getCenteredText(`&aUse '/nwjn' For settings!`)).chat();
  new TextComponent(ChatLib.getCenteredText(`&aUse '/nwjn help' For commands!`)).chat();
  new TextComponent(ChatLib.getCenteredText(`&aDM 'nwjn' on discord for questions!`)).chat()
  ChatLib.chat("");
};

let ctNoti = false
register("worldLoad", () => {
  if (ctNoti) return
  axios.get(`https://chattriggers.com/api/modules/1528`)
  .then(res => {
    let ctVersionArray = (res.data.releases[0].releaseVersion).split('.'),
    currentVersionArray = version.split('.'),
    newVersion = false
    changes = res.data.releases[0].changelog
    for(let i = ctVersionArray.length; i >= 0; i--)
    {
      if (ctVersionArray[i] > currentVersionArray[i])
        newVersion = true
      else if (currentVersionArray[i] > ctVersionArray[i])
        newVersion = false
    }
    if(newVersion)
    {
      ChatLib.chat("");
      ChatLib.chat(`&r&d&m--------------&r${ consts.PREFIX }&r&d&m--------------`)
      ChatLib.chat(`&eNwjnAddons has an available update!`)
      ChatLib.chat("");
      ChatLib.chat(`&eChangelog:&r \n${ changes }`)
      ChatLib.chat("");
      new TextComponent(`&eClick &3here&e to update!`)
      .setClickAction("run_command")
      .setClickValue(`/ct load`)
      .chat()
      ChatLib.chat("")
      ctNoti = true;
    }
  })
})

register("guiClosed", (event) => {
  if (event?.toString()?.includes("vigilance")) {
    setRegisters()
    setMobHighlight()
  }
});


/*
- remove pearlbox size, align display, fresh size, and savehotbar
- added .dropper
- removed .build
- new math commands
- Note: must have spaces between symbols and numbers
- 1: /calc <equation>
- 2: /stacks <num>
- 3: /avg <...nums>
- 4: /deal
- Note: trades player in front of u without having to type ign
*/

// TODO: party and dm message replying using msg id
// TODO: find fix for double death animation?
// TODO: on screen armor and equipment display
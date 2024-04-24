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
import { resetWorld } from "./utils/world";
import "./utils/Party"

let changes;
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
    case "ver":
    case "version":
      ChatLib.chat(`${ consts.PREFIX } &bYou are currently on version &e${ version }`);
      break;
    case "changes":
    case "changelog":
      ChatLib.chat(`${ consts.PREFIX } &eChangelog:\n&r${ changes }`);
      break;
    case "party":
      ChatLib.chat(`${ consts.PREFIX } &eParty Command List:\n&r.time => shows the players current time\n.coords => sends the coords of the player\n.stats => sends the stats of the player\n.profile => sends the profile fruit name of the profile\n.wealth => sends the player's current financial status\n.power => sends the players current Accessory Bag power\n.warp => warps party\n.transfer => transfers to sender\n.allinv => sets allinvite\n.pet => sends current pet\n.version => shows current nwjnaddons version\n.raider => puts party into infernal kuudra\n.dropper => puts party into dropper game`);
      break;
    case "commands":
      ChatLib.chat(`${ consts.PREFIX } &eCommand List:&r\n/clearchat => clears the chat\n/item => sends info about held item\n/entity => sends info about entity ur looking at\n/rocket => flys you to the moon!\n/calc <equation> => calculates\n/deal => trades player in front of you without needing to type name`);
      break;
    case "reload":
      resetWorld()
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
  ChatLib.chat(`&r&d&m--------------&r${ consts.PREFIX }&r&d&m--------------`)
  ChatLib.chat(`&aUse '/nwjn' For settings!`)
  ChatLib.chat(`&aUse '/nwjn commands' For commands!`);
  new TextComponent(`&aClick &3here&a for discord link!`)
    .setClickAction("run_command")
    .setClickValue(`/ct copy https://discord.gg/3S3wXpC4gE`)
    .chat()
  ChatLib.chat("");
};

let ctNoti = false
register("worldLoad", () => {
  if (ctNoti) return
  axios.get(`https://chattriggers.com/api/modules/1528`)
  .then(res => {
    changes = res.data.releases[0].changelog.toString().replaceAll("\r", "")
    if(res.data.releases[0].releaseVersion != version)
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

if (data.version != version) {
  ChatLib.chat("");
  ChatLib.chat(`&r&d&m--------------&r${ consts.PREFIX }&r&d&m--------------`)
  ChatLib.chat(`&eHey, it looks like Chattriggers updated NwjnAddons while you were away.`)
  new TextComponent(`&eClick &3here&e to view what you missed!`)
      .setClickAction("run_command")
      .setClickValue(`/nwjn changelog`)
      .chat()
  ChatLib.chat("");
  data.version = version; data.save();
}

register("serverConnect", () => {
  setTimeout(() => {
    ChatLib.chat("")
    new TextComponent(`${ consts.PREFIX } &4&lPSA&r: For those wondering if &b&ncorpse waypoints&r are legit, the truth is there is no clear line, it uses the &b&nsame method as skytils coreleone waypoint&r so there are big mods that do the same. Of course &call mods are use at your own risk&r, and as always you can turn it off or delete the module. For more questions, join the &ndiscord&r.`)
      .setClickAction("run_command")
      .setHoverValue("Copies the discord link")
      .setClickValue(`/ct copy https://discord.gg/3S3wXpC4gE`)
      .chat()
    ChatLib.chat("")
  }, 3000)
})

register("guiClosed", (event) => {
  if (event?.toString()?.includes("vigilance")) {
    setRegisters()
    setMobHighlight()
  }
});

// TODO: click a dm message to start typing to them
// TODO: find fix for double death animation?
// TODO: on screen armor and equipment display

register("chat", (pet) => {
  data.pet = pet
  data.save()
}).setCriteria("&cAutopet &eequipped your &7[${*}] ${pet}&e! &a&lVIEW RULE&r");

register("chat", (pet) => {
  data.pet = pet
  data.save()
}).setCriteria("&r&aYou summoned your &r${pet}&r&a!&r");

register("chat", () => {
  data.pet = "None"
  data.save()
}).setCriteria("You despawned your ${*}!");

// TODO: timers to use ticks instead of steps
// TODO: uuid prio calculator
// TODO: click in chat to translate
// TODO: add better nausea effect to not be cancer inducing
// TODO: add nick to data if applicable
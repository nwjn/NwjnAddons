import settings from "./config";

import "./features/Commands"
import "./features/CrimsonIsle(Move)"
import "./features/Display"
import "./features/General(Move)"

import "./features/HUD/BlazeTimers"
import "./features/HUD/FlareTracker"
import "./features/HUD/Clock"
import "./features/HUD/FatalTempo"
import "./features/HUD/Minibosses"
import "./features/HUD/Poison"
import "./features/HUD/Widgets"

// Kuudra {
  import kuudraConfig from "./features/Kuudra/kuudraConfig";
  import "./features/Kuudra/KuudraUtil"
  
  // misc
    import "./features/Kuudra/misc/CancelUselessPerk"
    import "./features/Kuudra/misc/KuudraHP"
    import "./features/Kuudra/misc/TeamHighlight"
    
  // P1
    import "./features/Kuudra/Phase1/CustomSupplyMessage"
    import "./features/Kuudra/Phase1/NoSupply"
    import "./features/Kuudra/Phase1/PearlLineups"
    import "./features/Kuudra/Phase1/SupplyDrops"
    import "./features/Kuudra/Phase1/SupplyBeacons"
    
  // P2
    import "./features/Kuudra/Phase2/BuildBuilders"
    import "./features/Kuudra/Phase2/BuildFresh"
    import "./features/Kuudra/Phase2/BuildPercent"
    import "./features/Kuudra/Phase2/BuildPiles"
    import "./features/Kuudra/Phase2/BuildStands"
    import "./features/Kuudra/Phase2/ProgressWithPhase"
    
    import "./features/Kuudra/Phase2/FreshBoxes"
    import "./features/Kuudra/Phase2/FreshMessage"
// Kuudra }

// Bestiary {
  import "./features/Bestiary/Keeper"
  import "./features/Bestiary/Matcho"
  import "./features/Bestiary/MobHighlight"
  import "./features/Bestiary/PlayerHighlight"
  import "./features/Bestiary/StandHighlight"
// Bestiary }

import "./features/QOL/BlockHighlight"
import "./features/QOL/BossCleaner"
import "./features/QOL/DiscordCleaner"
import "./features/QOL/VisitorCleaner"

import "./features/Mining/MineshaftWaypoints"

import "./features/Beta/AgroCircle"
import "./features/Beta/GyroCircle"
import "./features/Beta/TotemCircle"

import "./features/Utilities/Calculator"
import "./features/Utilities/DamageTracker"

import { version, PREFIX } from "./utils/constants";
import { setMobHighlight } from "./features/Bestiary/MobHighlight";
import { data } from "./utils/data";
import { setRegisters } from "./utils/functions"
import { openGUI } from "./utils/overlay"
import axios from "./../axios"
import WorldUtil from "./utils/world"

let changes;
register("command", (arg) => {  
  if (!arg) {
    settings.openGUI();
    return;
  }
  arg = arg.toLowerCase()
  
  switch (arg) {
    case "kuudra":
      kuudraConfig.openGUI();
      break;
    case "gui":
      openGUI();
      break;
    case "ver":
    case "version":
      ChatLib.chat(`${ PREFIX } &bYou are currently on version &e${ version }`);
      break;
    case "changes":
    case "changelog":
      ChatLib.chat(`${ PREFIX } &eChangelog:\n&r${ changes }`);
      break;
    case "party":
      ChatLib.chat(`${ PREFIX } &eParty Command List:\n&r.time => shows the players current time\n.coords => sends the coords of the player\n.power => sends the players current Accessory Bag power\n.warp => warps party\n.transfer => transfers to sender\n.allinv => sets allinvite\n.pet => sends current pet\n.version => shows current nwjnaddons version\n.t5 => puts party into infernal kuudra\n.dropper => puts party into dropper game`);
      break;
    case "commands":
      ChatLib.chat(`${ PREFIX } &eCommand List:&r\n/clearchat => clears the chat\n/item => sends info about held item\n/entity => sends info about entity ur looking at\n/rocket => flys you to the moon!\n/calc <equation> => calculates\n/deal => trades player in front of you without needing to type name`);
      break;
    case "reload":
      WorldUtil.resetWorld();
      ChatLib.chat(`${ PREFIX } &aReloading all triggers...`);
      break;
    default:
      ChatLib.chat(`${PREFIX} &r\n/nwjn => opens settings\n/nwjn gui => opens gui mover\n/nwjn version => gets the current nwjnaddons version\n/nwjn changes => see the latest changes\n/nwjn party => see all party commands\n/nwjn commands => see all commands\n/nwjn reload => reloads all registers in case they aren't working`)
  }
}).setCommandName(`nwjn`, true).setAliases("nwjnaddons", "njwn").setTabCompletions("version", "changes", "party", "help", "gui")

if (data.first_time) {
  data.first_time = false; 
  data.save();

  ChatLib.chat("");
  ChatLib.chat(`&r&d&m--------------&r${ PREFIX }&r&d&m--------------`)
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

    // !!!! HARD CODE FOR PRE RELEASE ONLY
    if (version == "0.10.2") return;


    if(res.data.releases[0].releaseVersion != version)
    {
      ChatLib.chat("");
      ChatLib.chat(`&r&d&m--------------&r${ PREFIX }&r&d&m--------------`)
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
  ChatLib.chat(`&r&d&m--------------&r${ PREFIX }&r&d&m--------------`)
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
    new TextComponent(`${ PREFIX } &d[Broadcast]: &rJoin the &ndiscord&r for any questions.`)
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

    data.standList = settings.stand.split(", ")
    data.playerList = settings.player.split(", ")
    data.save()
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

// TODO: uuid prio calculator
// TODO: add better nausea effect to not be cancer inducing

// // TODO: armor display and equipment display
// register("renderOverlay", () => {
//   Player.armor?.getHelmet()?.draw(50, 50, 1)
//   Player.armor?.getChestplate()?.draw(50, 65, 1)
//   Player.armor?.getLeggings()?.draw(50, 80, 1)
//   Player.armor?.getBoots()?.draw(50, 95, 1)
// })

/*
TODO
const name = Player.getName()
const nick = Player.getDisplayName() == name ? false : Player.getDisplayname()
*/

// try to add custom color code shit
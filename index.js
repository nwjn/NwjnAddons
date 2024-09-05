import { meinConf } from "./settings"

import "./features/CrimsonIsle(Move)"
import "./features/General(Move)"

import "./features/HUD/BlazeTimers"
import "./features/HUD/Clock"
import "./features/HUD/FatalTempo"
import "./features/HUD/Minibosses"
import "./features/HUD/Poison"
import "./features/HUD/Widgets"

// Kuudra {
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
    
  // P3
    import "./features/Kuudra/Phase3/KuudraHitbox"
    
  // P4
    import "./features/Kuudra/Phase4/DrainRange"
    import "./features/Kuudra/Phase4/ManaDrain"
// Kuudra }

// Bestiary {
  import "./features/Bestiary/MobHighlight"
  import "./features/Bestiary/PlayerHighlight"
  import "./features/Bestiary/StandHighlight"
// Bestiary }

import "./features/QOL/BlockHighlight"
import "./features/QOL/DiscordCleaner"

import "./features/Mining/MineshaftWaypoints"

import "./features/Utilities/DamageTracker"
import "./features/Utilities/Commands"

import { version, PREFIX } from "./utils/constants";
import "./utils/data"
import { data } from "./utils/data";
import { openGUI } from "./utils/overlay"
import WorldUtil from "./utils/WorldUtil"

register("command", (...args) => {
  switch (args[0]?.toLowerCase()) {
    case undefined:
      meinConf.openGui()
      break
    case "gui":
      openGUI();
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
}).setCommandName(`nwjn`, true).setAliases("nwjnaddons").setTabCompletions("changes", "party", "help", "gui")

if (data.first_time) {
  data.first_time = false; 
  data.save();

  ChatLib.chat("");
  ChatLib.chat(`&r&d--------------&r${ PREFIX }&r&d--------------`)
  ChatLib.chat(`&aUse '/nwjn' For settings!`)
  ChatLib.chat(`&aUse '/nwjn commands' For commands!`);
  new TextComponent(`&aClick &3here&a for discord link!`)
    .setClickAction("run_command")
    .setClickValue(`/ct copy https://discord.gg/3S3wXpC4gE`)
    .chat()
  ChatLib.chat("");
}

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
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
  
  // General
  import "./features/Kuudra/General/CancelUselessPerk"
  import "./features/Kuudra/General/Kuudra"
  import "./features/Kuudra/General/TeamHighlight"
  
  // P1
  import "./features/Kuudra/Phase1/CustomSupplyMessage"
  import "./features/Kuudra/Phase1/NoSupply"
  import "./features/Kuudra/Phase1/PearlLineups"
  import "./features/Kuudra/Phase1/SupplyDrops"
  import "./features/Kuudra/Phase1/SupplyBeacons"
  
  // P2
  import "./features/Kuudra/Phase2/BuildFresh"
  import "./features/Kuudra/Phase2/BuildPercent"
  import "./features/Kuudra/Phase2/BuildPiles"
  
  // P3
  
  // P4
  import "./features/Kuudra/Phase4/DrainDisplay"
  import "./features/Kuudra/Phase4/ManaDrain"
  // Kuudra }
  
  // Bestiary {
    import "./features/Bestiary/MobHighlight"
    import "./features/Bestiary/PlayerHighlight"
    import "./features/Bestiary/StandHighlight"
    // Bestiary }
    
    import "./features/Mining/MineshaftWaypoints"
    
    import "./features/QOL/BlockHighlight"
    import "./features/QOL/DiscordCleaner"
    import "./features/QOL/FallingBlocks.js"
    
    import "./features/Utilities/Commands"
    import "./features/Utilities/DamageTracker"
    import "./features/Utilities/Dev.js"
    import "./features/Utilities/RendArrows.js"

import "./utils/data/DataWriter.js"
import "./utils/Broadcasting.js"
import "./utils/functions/hotfixes.js"
import { PREFIX } from "./utils/Constants.js";
import "./utils/functions.js"
import Loc from "./utils/Location"
import { openGUI } from "./utils/overlay"
import "./utils/Party.js"
import { meinConf } from "./utils/Settings.js"

register("command", (...args) => {
  switch (args[0]?.toLowerCase()) {
    case undefined:
      meinConf.openGui()
      break
    case "gui":
      openGUI();
      break;
    case "party":
      ChatLib.chat(`${ PREFIX } &eParty Command List:\n&r.time => shows the players current time\n.coords => sends the coords of the player\n.power => sends the players current Accessory Bag power\n.warp => warps party\n.transfer => transfers to sender\n.allinv => sets allinvite\n.pet => sends current pet\n.version => shows current nwjnaddons version\n.t5 => puts party into infernal kuudra\n.dropper => puts party into dropper game`);
      break;
    case "commands":
      ChatLib.chat(`${ PREFIX } &eCommand List:&r\n/clearchat => clears the chat\n/item => sends info about held item\n/entity => sends info about entity ur looking at\n/rocket => flys you to the moon!\n/calc <equation> => calculates\n/deal => trades player in front of you without needing to type name`);
      break;
    case "reload":
      Loc.resetWorld();
      ChatLib.chat(`${ PREFIX } &aReloading all triggers...`);
      break;
    default:
      ChatLib.chat(`${PREFIX} &r\n/nwjn => opens settings\n/nwjn gui => opens gui editor\n/nwjn party => see all party commands\n/nwjn commands => see all commands\n/nwjn reload => reloads all registers in case they aren't working`)
  }
}).setCommandName(`nwjn`, true).setAliases("nwjnaddons").setTabCompletions("party", "help", "gui")
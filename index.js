import settings from "./config";
import "./features/Bestiary"
import "./features/Beta"
import "./features/Commands"
import "./features/CrimsonIsle"
import "./features/General"
import "./features/General"
import "./features/HUD"
import "./features/Kuudra"
import "./features/QOL"
import { version, consts } from "./utils/constants";
import { data } from "./utils/data";
import { setRegisters } from "./utils/functions"
import axios from "./../axios"
data.autosave()

register("command", (args) => {  
  if (!args) {
    settings.openGUI()
  }
  else if (args == "version") {
    ChatLib.chat(`${consts.PREFIX} &bYou are currently on version &e${version}`)
  }
  else if (args == "changes") {
    ChatLib.chat(`${consts.PREFIX} &eChangelog:\n&r${ changes }`)
  }
  else if (args == "party") {
    ChatLib.chat(`${consts.PREFIX} &eParty Command List:\n&cNote: run the command by adding the . symbol in front of a party message, adding a name after the command will make only the person with that name run the command, putting all instead of a name makes everyone including the sender say it\n.follow => clicks the last lobby change message by the player who sent it\n.time => shows the players current time\n.coords => sends the coords of the player\n.stats => sends the stats of the player\n.profile => sends the profile fruit name of the profile\n.wealth => sends the player's current financial status\n.power => sends the players current Accessory Bag power\n.warp => warps party\n.transfer => transfers to sender\n.allinv => sets allinvite\n.slayer => sends how many kills you need for slayer spawn`)
  }
  else {
    ChatLib.chat(`&r&d&m--------------&r${ consts.PREFIX }&r&d&m--------------\n/moveChamp -> moves the champion display\n/moveFt -> move the ft display\n/movePoison -> moves poison display\n/moveBlaze -> moves blaze display\n/moveStats -> moves stats display\n/moveClock -> moves clock display\n/moveRain -> moves rain display\n/rocket -> sends a rocket in party chat\n/clearchat -> clears the chat\n/321 -> counts down from 3\n/54321 -> counts down from 5\n/itemInfo => shows held item's info\n/entityInfo => shows info of entity you are looking at\n/leavePT => transfers to whatever argument you put after the command and then leaves`)
  }
}).setCommandName(`nwjn`, true).setAliases("nwjnaddons").setTabCompletions("version", "changes", "party", "help")

// Credit: BetterBestiary for first time msg inspiration
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

let ctNoti = 0
let githubNoti = 0
register("worldLoad", () => {
  if (ctNoti != 0) return
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
      ChatLib.chat(`&eChangelog:&r ${ changes }`)
      ChatLib.chat("");
      new TextComponent(`&eClick &3here&e to update!`)
      .setClickAction("run_command")
      .setClickValue(`/ct load`)
      .chat()
      ChatLib.chat("")
      ctNoti += 1
    }
  })
  if (githubNoti != 0) return
  axios.get(`https://api.github.com/repos/nwjn/NwjnAddons/releases/latest`)
  .then(res => {
    if (res.data.name != data.version) {
      ChatLib.chat("");
      ChatLib.chat(`&r&d&m--------------&r${ consts.PREFIX }&r&d&m--------------`)
      ChatLib.chat(`&eNwjnAddons has an available github pre-release!`)
      ChatLib.chat("");
      ChatLib.chat(`&eChangelog:&r \n${ res.data.body }`)
      ChatLib.chat("");
      new TextComponent(`&eClick &3here&e for github link!`)
      .setClickAction("run_command")
      .setClickValue(`/ct copy ${res.data.html_url}`)
      .chat()
      ChatLib.chat("")
      githubNoti += 1
    }
  })
});

register("chat", (uuid) => {
  data.uuid = uuid
  data.save()
}).setCriteria("Profile ID: ${uuid}")

register("chat", (pet) => {
  pet = pet.replace(" ✦", "")
  data.pet = pet
  data.save()
}).setCriteria("Autopet equipped your [${*}] ${pet}! VIEW RULE");

register("chat", (pet) => {
  pet = pet.replace(" ✦", "")
  data.pet = pet
  data.save()
}).setCriteria("You summoned your ${pet}!");

register("chat", () => {
  data.pet = ""
  data.save()
}).setCriteria("You despawned your ${*}!");

register("guiClosed", (event) => {
  if (!event.toString().includes("vigilance")) return
  settings.save()
  setRegisters()
});

data.name = Player.getName().toLowerCase()
data.version = version
data.save();

const pc = new KeyBind("Chat Fill /pc .", Keyboard.KEY_PERIOD, "Addons of Nwjn")
pc.registerKeyPress(() => {
  Client.setCurrentChatMessage("/pc .")
})

const nwjn = new KeyBind("Chat Fill /nwjn", Keyboard.KEY_N, "Addons of Nwjn")
nwjn.registerKeyPress(() => {
  Client.setCurrentChatMessage("/nwjn")
})

// Stole some volc code cuz he stole mine! rahhh
// Abusing the magma boss' g spot to kill him slightly faster
// visitor display fix
// changed /54321 && /321 to /countdown 5 && /countdown 3
// Better performance
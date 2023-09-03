import settings from "../config"
import { registerWhen } from "../utils/functions"
import { getWorld } from "../utils/world";
import { data } from "../utils/data";
import RenderLib from "RenderLib"
import renderBeaconBeam from "BeaconBeam";

// Credit: Volcaddons on ct for waypoints
let chatWaypoints = [];
let formatted = [];

register("renderWorld", () => {
  renderWaypoint(formatted);
});

function formatWaypoints(waypoints, r, g, b) {
  if (!waypoints.length) return;
  let x, y, z, distance, xSign, zSign = 0;

  waypoints.forEach((waypoint) => {
    wp = [["", 0, 0, 0], [0, 0, 0], [r, g, b]];
    x = Math.round(waypoint[1]);
    y = Math.round(waypoint[2]);
    z = Math.round(waypoint[3]);
    distance = Math.hypot(Player.getX() - x, Player.getY() - y, Player.getZ() - z);

    if (distance >= 100) {
      x = Player.getX() + (x - Player.getX()) * (100 / distance);
      y = Player.getY() + (y - Player.getY()) * (100 / distance);
      z = Player.getZ() + (z - Player.getZ()) * (100 / distance);
    }

    distance = Math.round(distance) + "m";
    xSign = x == 0 ? 1 : Math.sign(x);
    zSign = z == 0 ? 1 : Math.sign(z);
    wp[0] = [`${waypoint[0]} §b[${distance}]`, x + 0.5*xSign, y - 1, z + 0.5*zSign];

    if (xSign == 1) xSign = 0;
    if (zSign == 1) zSign = 0;
    wp[1] = [x + xSign, y - 1, z + zSign];

    formatted.push(wp);
  });
}

register("step", () => {
  formatted = [];
  formatWaypoints(chatWaypoints, settings.waypointColor.getRed() / 255, settings.waypointColor.getGreen() / 255, settings.waypointColor.getBlue() / 255);
}).setFps(5);

function renderWaypoint(waypoints) {
  if (!waypoints.length) return;

  waypoints.forEach((waypoint) => {
    box = waypoint[0];
    beam = waypoint[1];
    rgb = waypoint[2];

    RenderLib.drawEspBox(box[1], box[2], box[3], 1, 1, rgb[0], rgb[1], rgb[2], 1, true);
    RenderLib.drawInnerEspBox(box[1], box[2], box[3], 1, 1, rgb[0], rgb[1], rgb[2], 0.25, true);
    Tessellator.drawString(box[0], box[1], box[2] + 1.5, box[3], 0xffffff, true);
    renderBeaconBeam(beam[0], beam[1], beam[2], rgb[0], rgb[1], rgb[2], 0.5, false, settings.waypointHeight);
  });
}

registerWhen(register("chat", (player, spacing, x, y, z) => {
  if (settings.waypointFrom == 1 && !player.includes("Party")) return
  const bracketIndex = player.indexOf('[') - 2;
  if (bracketIndex >= 0)
    player = player.replaceAll('&', '§').substring(bracketIndex, player.length);
  else
    player = player.replaceAll('&', '§');

  const spaceIndex = z.indexOf(' ');
  let time = 1000;
  if (spaceIndex != -1) {
    if (z.includes('|'))
      time /= 3;
    z = z.substring(0, spaceIndex);
  }

  chatWaypoints.push([player, x, y, z]);

  setTimeout(() => {
    if (chatWaypoints[0][0].equals(player)) chatWaypoints.shift()
  }, settings.waypoint * time);
}).setCriteria("${player}&f${spacing}x: ${x}, y: ${y}, z: ${z}&r"), () => settings.waypoint != 0);

// register("renderWorld", () => {
//   RenderLib.drawEspBox(-218.5, 89, 33.5, 0.0625 / 2, 0.0625 / 2, 1, 1, 1, 1, true);
// })

// a regular minecraft block is 16 pixels, 1 pixel would be 0.0625 of a block

// Precision waypoints "x: ${x}, y: ${y}, z: ${z}, w: ${w}, h: ${h}"


registerWhen(register("chat", (power) => {
  data.power = power
  data.save()
}).setCriteria("You selected the ${power} power for your Accessory Bag!"), () => settings.party)

registerWhen(register("chat", (player, event) => {
  player = player.removeFormatting()
  let message = new Message(event)
  message.getMessageParts().forEach(part => {
    follow.push(part.getClickValue())
    follow.push(player)
  })
}).setCriteria(" » ${player} is traveling to ${*} FOLLOW"), () => settings.party)

let follow = []
registerWhen(register("chat", (player, command, event) => {
  player = player.removeFormatting().substring(player.indexOf(" ") + 1);
  let chat = new Message(event);
  chat = ChatLib.removeFormatting(chat);
  if (player == data.name && !command.includes("all")) return
  setTimeout(() => {
    if (command == `follow ${ data.name }` || command == "follow") {
      let index = follow.indexOf(player);
      ChatLib.say(follow[index - 1]);
      follow = [];
    }
    else if (command.toLowerCase() == `time ${ data.name }` || command == `time` || command == `time all`) {
      ChatLib.say(`/party chat ${ new Date().getHours() }:${ new Date().getMinutes() }:${ new Date().getSeconds() }`);
    }
    else if (command.toLowerCase() == `coords ${ data.name }` || command == "coords" || command == `coords all`) {
      ChatLib.say(`/party chat x: ${ Math.round(Player.getX())}, y: ${Math.round(Player.getY())}, z: ${Math.round(Player.getZ())}`)
    }
    else if (command.toLowerCase() == `stats ${ data.name }` || command == "stats" || command == `stats all`) {
      let stat = ''
      TabList.getNames().forEach(name => {
        let unformatted = ChatLib.removeFormatting(name)
        if (getWorld() != "The Rift" && getWorld() != "Garden") {
          if (unformatted.includes("Speed: ✦")) stat = name
          if (unformatted.includes("Strength: ❁")) stat = stat + " | " + name
          if (unformatted.includes("Crit Chance: ☣")) stat = stat + " | " + name
          if (unformatted.includes("Crit Damage: ☠")) stat = stat + " | " + name
          if (unformatted.includes("Attack Speed: ⚔")) stat = stat + " | " + name
        }
      })  
      ChatLib.say(`/party chat ${stat.removeFormatting()}`)
    }
    else if (command.toLowerCase() == `profile ${ data.name }` || command == "profile" || command == `profile all`) {
      let profile = ""
      TabList.getNames().forEach(tab => {
        if (tab.includes("Profile: ")) profile = tab
      })
      ChatLib.say(`/party chat ${profile.removeFormatting()}`)
    }
    else if (command.toLowerCase() == `wealth ${ data.name }` || command == "wealth" || command == `wealth all`) {
      let bank = undefined
      let purse = undefined
      TabList.getNames().forEach(tab => {
        if (tab.includes("Bank: ")) bank = tab.removeFormatting()
      })
      Scoreboard.getLines().forEach(line => {
        if (line.toString().includes("Purse: ")) purse = line.toString().removeFormatting()
      })
      ChatLib.say(`/party chat ${bank} | ${purse}`)
    }
    else if (command.toLowerCase() == `power ${ data.name }` || command == "power" || command == `power all`) {
      ChatLib.say(`/party chat ${data.power}`)
    }
    else if (command.toLowerCase() == `warp ${ data.name }` || command == "warp") {
      ChatLib.say(`/p warp`)
    }
    else if (command.toLowerCase() == `transfer ${ data.name }` || command == "transfer") {
      ChatLib.say(`/party transfer ${player}`)
    }
    else if (command.toLowerCase() == `allinv ${ data.name }` || command == "allinv") {
      ChatLib.say(`/p settings allinvite`)
    }
    else if (command.toLowerCase() == `slayer ${ data.name }` || command == "slayer" || command == `slayer all`) {
      let kills = undefined
      Scoreboard.getLines().forEach(line => {
        line = ChatLib.removeFormatting(line)
        if (line.includes(" Ki🎁lls")) {
          kills = line
        }
      })
      ChatLib.say(`/pc Slayer Progress:${kills}`)
    }
    else if (command.toLowerCase() == `pet ${ data.name }` || command == "pet" || command == "pet all") {
      ChatLib.say(`/party chat ${data.pet}`)
    }
  }, 300);
}).setCriteria("Party > ${player}: .${command}"), () => settings.party)

let reaperUsed = 0
registerWhen(register("soundPlay", () => {
  setTimeout(() => {
    let armor = Player.getInventory().getStackInSlot(38)
    armor?.getLore()?.forEach(line => {
      if (line.toString().includes("#FF0000") && armor.getName().includes("Reaper")) {
        reaperUsed = new Date().getTime()
      }
    })
  }, 100);
}).setCriteria("mob.zombie.remedy"), () => settings.reaper);

registerWhen(register("renderWorld", () => {
  World.getAllEntitiesOfType(Java.type("net.minecraft.entity.item.EntityArmorStand").class).forEach(stand => {
    let name = ChatLib.removeFormatting(stand.getName())
    if (Player.asPlayerMP().canSeeEntity(stand)) {
      if (name.includes("҉") && name.includes("Bloodfiend")) RenderLib.drawEspBox(stand.getX(), stand.getY() - 2, stand.getZ(), 1, 2, 1, 0.2, 0.46667, 1, true)
    }
  })
}), () => getWorld() == "The Rift" && settings.steakAble);

registerWhen(register("chat", (killed) => {
  let excuses = ["It was runic, I swear!", "mb was afk", "server?", `Skytils » ${ (3.1415926535 * (Math.random() * 3000)).toFixed(2) } ms`, "I LAGGEDF", "ITS INVIS", "MY MOUSE BROKE"]
  if (killed == "were") ChatLib.say(`/pc ${excuses[Math.trunc(Math.random() * 4)]}`)
  else if (killed == "was") ChatLib.say(`/pc "${excuses[Math.trunc(Math.random() * 4)]}"`)
}).setChatCriteria(" ☠ ${*} ${killed} ${*} by Exalted ${*}"), () => getWorld() == "Hub" && settings.diana);

// http://kaomoji.ru/en/
let names = ["happy", "kiss", "wink", "cute", "love", "shy", "wtf", "evil", "sad", "sob", "dead", "afraid", "shrug", "huh", "yes", "...", "smirk", "wow", "hi", "hug", "typing", "run", "zzz", "cat", "bear", "dog", "rabbit", "pig", "fish", "spider", "sniper", "kill", "drink", "sing", "music", "drown"]

let emoticons = ["٩(◕‿◕｡)۶", "(ﾉ´ з `)ノ", "♡(>ᴗ•)", "(´• ω •`) ♡", "( ˘⌣˘)♡(˘⌣˘ )", "(⁄ ⁄•⁄ω⁄•⁄ ⁄)", "(ᗒᗣᗕ)՞", "ψ( ` ∇ ´ )ψ", "(╥_╥)", "。゜゜(´Ｏ`) ゜゜。", "(×_×)", "\(º □ º l|l)/", "┐(シ)┌", "(•ิ_•ิ)?", "(・・)ゞ", "(¬_¬ )", "(¬‿¬ )", "w(°ｏ°)w", "(*・ω・)ﾉ", "(づ￣ ³￣)づ", "__〆(￣ー￣ )", "ε=ε=ε=ε=┌(;￣▽￣)┘", "[(－_－)]..zzZ", "(=^･ｪ･^=)", "	ʕ ᵔᴥᵔ ʔ", "U・ᴥ・U", "૮₍ ˶• ༝ •˶ ₎ა", "( ´(oo)ˋ ) oink", "<・ )))><<", "/╲/\╭(ఠఠ益ఠఠ)╮/\\/\\", "( ´-ω･)︻┻┳══━一", "✴==≡눈٩(`皿´҂)ง", "( ˘▽˘)っ♨", "ヾ(´〇`)ﾉ♪♪♪", "ヾ(⌐■_■)ノ♪", "‿︵‿︵‿︵‿ヽ(°□° )ノ︵‿︵‿︵‿︵"]

registerWhen(register("messageSent", (message, event) => {
  if (message.includes("*")) {
    names.forEach(name => {
      if (message.includes(`*${ name }`)) {
        cancel(event)
        let index = names.indexOf(name)
        message = message.replace(`*${name}`, emoticons[index])
        ChatLib.say(message)
      }
    })
  }
}), () => settings.emoticons);

registerWhen(register("renderEntity", (entity, position, ticks, event) => {
  if (entity.toString().removeFormatting().includes(["[Lv"]) || entity.toString().includes("Armor Stand")) return
  try {
    let currentHP = entity.getEntity().func_110143_aJ()
    if (currentHP == 0) {
      cancel(event)
    }
  } catch (error) {}
}), () => settings.dead);

let blockBroken = 0
let time = 0
registerWhen(register("blockBreak", (block) => {
  if (!block.toString().includes("type=minecraft:log")) return;
  let holding = Player.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes");
  if (holding?.getString("id") != "TREECAPITATOR_AXE") return;
  if (time <= 0) {
    blockBroken = new Date().getTime()
  }
}), () => settings.treecap && (getWorld() == "Hub" || getWorld() == "The Park"))

registerWhen(register("renderOverlay", () => {
  if (settings.reaper) {
    let reaperTime = new Date().getTime()
    reaperTime = 6 - (reaperTime - reaperUsed) / 1000
    if (reaperTime >= 0) Renderer.drawString(`${ reaperTime.toFixed(3) }`, Renderer.screen.getWidth() / 2 - 13, Renderer.screen.getHeight() / 2 + 10)
  }
  if (settings.treecap) {
    let cd = 2
    if (data.pet == "Monkey") cd = 1
    time = new Date().getTime()
    time = cd - (time - blockBroken) / 1000
    if (time >= 0) Renderer.drawString(`${ time.toFixed(3) }`, Renderer.screen.getWidth() / 2 - 13, Renderer.screen.getHeight() / 2 - 15)
  }
}), () => (settings.treecap && (getWorld() == "Hub" || getWorld() == "The Park")) || (settings.reaper));

let PlayerFirstX = undefined
let PlayerFirstZ = undefined
let PlayerFirstYaw = undefined
let ready = false
registerWhen(register("worldLoad", () => {
  PlayerFirstX = Player.getX()
  PlayerFirstZ = Player.getZ()
  PlayerFirstYaw = Player.getYaw()
}), () => settings.mort)

registerWhen(register("chat", () => {
  ready = true
}).setCriteria(`${Player.getName()} is now ready!`), () => settings.mort && getWorld() != "Kuudra")

registerWhen(register("renderWorld", () => {
  if (Player.asPlayerMP().distanceTo(PlayerFirstX + (15 * Math.cos((PlayerFirstYaw + 90) * (Math.PI / 180))), 72, PlayerFirstZ + (15 * Math.sin((PlayerFirstYaw + 90) * (Math.PI / 180)))) > 18 || ready == false) return
  try {
    Tessellator.drawString(`${data.pet}`, PlayerFirstX + (15 * Math.cos((PlayerFirstYaw + 90) * (Math.PI / 180))), 72, PlayerFirstZ + (15 * Math.sin((PlayerFirstYaw + 90) * (Math.PI / 180))), 0xffaa00, false, 0.05, false)
  } catch (error) {}
}), () => settings.mort);

registerWhen(register("worldUnload", () => {
  PlayerFirstX = undefined
  PlayerFirstZ = undefined
  PlayerFirstYaw = undefined
  ready = false
}), () => settings.mort);

registerWhen(register("actionBar", (event) => {
  let chat = ChatLib.getChatMessage(event, false)
  chat = chat.substring(chat.indexOf("     "), chat.lastIndexOf("     "))
  ChatLib.chat(chat)
  ChatLib.actionBar("&6nom nom xp")
}).setCriteria("+${*} SkyBlock XP").setContains(), () => settings.sbxp);

registerWhen(register("chat", () => {
  if (settings.pWarp == "" || settings.pPlayer == "") return
  setTimeout(() => {
    ChatLib.say(`/party ${settings.pPlayer}`)
  }, 500)
}).setCriteria(`${ settings.pWarp }`).setContains(), () => settings.pWarp != "");

register("chat", (event) => {
  let chat = ChatLib.getChatMessage(event)
  if (!chat.includes(`${settings.pPlayer} `)) return
  setTimeout(() => {
    ChatLib.say(`/p warp`)
    setTimeout(() => {
      ChatLib.say(`/party leave`)
    }, 500);
  }, 500);
}).setCriteria(` joined the party.`).setContains()
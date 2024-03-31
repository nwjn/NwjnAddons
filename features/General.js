import settings from "../config"
import { delay, registerWhen, fixLength } from "../utils/functions"
import { getWorld } from "../utils/world";
import { data } from "../utils/data";
import RenderLib from "RenderLib"
import renderBeaconBeam from "BeaconBeam";
import { EntityArmorStand, version } from "../utils/constants";

// Credit: Volcaddons on ct for waypoints
let chatWaypoints = [];
let formatted = [];

register("worldUnload", () => {
  chatWaypoints = []
  formatted = []
})

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

  delay(() => {
    if (chatWaypoints[0][0].equals(player)) chatWaypoints.shift()
  }, settings.waypoint * time);
}).setCriteria("${player}&f${spacing}x: ${x}, y: ${y}, z: ${z}&r"), () => settings.waypoint != 0);


register("chat", (power) => {
  data.power = power
  data.save()
}).setCriteria("You selected the ${power} power for your Accessory Bag!")

register("chat", (num, enrich) => {
  data.enrich = `${ num } on ${ enrich }`
  data.save()
}).setCriteria("Swapped ${num} enrichments to ${enrich}!")

register("renderSlot", (slot) => {
  if (!slot?.toString().includes("ContainerLocalMenu: Stats Tuning") || !slot?.toString().includes("Slot 4 of")) return
  slot = slot.getItem()?.getLore()
  let tune = ""
  let mp = ""
  slot?.forEach(line => {
    if (line.toString()?.includes("+")) {
      line = ChatLib.removeFormatting(line)
      tune += line.substring(line.indexOf("+") + 1, line.indexOf(" "))
    }
    else if (line.toString()?.includes("Magical Power:")) {
      line = ChatLib.removeFormatting(line)
      mp = line.substring(line.indexOf(":") + 2)
    }
  })
  data.tuning = tune
  data.mp = mp
  data.save()
})

registerWhen(register("chat", (player, command, event) => {
  player = player.removeFormatting().substring(player.indexOf(" ") + 1);
  delay(() => {
    if (command.includes("time")) {
      let hours = new Date().getHours();
      let minutes = new Date().getMinutes();
      let seconds = new Date().getSeconds();
      ChatLib.say(`/party chat ${ fixLength(hours) }:${ fixLength(minutes) }:${ fixLength(seconds) }`);
    }
    else if (command.includes("coords")) {
      ChatLib.say(`/party chat x: ${ Math.round(Player.getX())}, y: ${Math.round(Player.getY())}, z: ${Math.round(Player.getZ())}`)
    }
    else if (command.includes("stats")) {
      if (getWorld() == "The Rift" || getWorld() == "Garden") return
      let stats = "Unknown"
      TabList.getNames().forEach(name => {
        name = ChatLib.removeFormatting(name)
        if (name.includes("Speed: ✦")) stats = `${name.substring(name.lastIndexOf(" ") + 1)}`
        if (name.includes("Strength: ❁")) stats = stats + " | " + `${name.substring(name.lastIndexOf(" ") + 1)}`
        if (name.includes("Crit Chance: ☣")) stats = stats + " | " + `${name.substring(name.lastIndexOf(" ") + 1)}`
        if (name.includes("Crit Damage: ☠")) stats = stats + " | " + `${name.substring(name.lastIndexOf(" ") + 1)}`
        if (name.includes("Attack Speed: ⚔")) stats = stats + " | " + `${name.substring(name.lastIndexOf(" ") + 1)}`
      })
      ChatLib.say(`/party chat ${stats}`)
    }
    else if (command.includes("profile")) {
      let profile = "Unknown"
      TabList.getNames().forEach(tab => {
        if (tab.includes("Profile: ")) profile = tab
      })
      ChatLib.say(`/party chat ${profile.removeFormatting()}`)
    }
    else if (command.includes("wealth")) {
      let bank = "Unknown"
      let purse = "Unknown"
      TabList.getNames().forEach(tab => {
        if (tab.includes("Bank: ")) bank = tab.removeFormatting()
      })
      Scoreboard.getLines().forEach(line => {
        if (line.toString().includes("Purse: ")) purse = line.toString().removeFormatting()
      })
      ChatLib.say(`/party chat ${bank} | ${purse}`)
    }
    else if (command.includes("power")) {
      ChatLib.say(`/party chat Stone: ${data.power} | Tuning: ${data.tuning} | Enrich: ${data.enrich} | MP: ${data.mp}`)
    }
    else if (command.includes("warp")) {
      ChatLib.say(`/p warp`)
    }
    else if (command.includes("transfer")) {
      ChatLib.say(`/party transfer ${player}`)
    }
    else if (command.includes("allinv")) {
      ChatLib.say(`/p settings allinvite`)
    }
    else if (command.includes("pet")) {
      ChatLib.say(`/party chat ${data.pet}`)
    }
    else if (command.includes("version")) {
      ChatLib.say(`/party chat Version: ${version}`)
    }
    else if (command.includes("raider")) {
      ChatLib.command(`joininstance kuudra_infernal`)
    }
    else if (command.includes("dropper")) {
      ChatLib.command(`play arcade_dropper`)
    }
  }, 200);
}).setCriteria("Party > ${player}: .${command}"), () => settings.party)

let reaperUsed = 0
registerWhen(register("soundPlay", () => {
  let armor = Player.getInventory()?.getStackInSlot(38)?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString("id")
  if (armor == "REAPER_CHESTPLATE") reaperUsed = new Date().getTime()
}).setCriteria("mob.zombie.remedy"), () => settings.reaper);

registerWhen(register("renderWorld", () => {
  World.getAllEntitiesOfType(EntityArmorStand.class).forEach(stand => {
    let name = ChatLib.removeFormatting(stand.getName())
    if (Player.asPlayerMP().canSeeEntity(stand) && name.includes("҉") && name.includes("Bloodfiend")) RenderLib.drawEspBox(stand.getX(), stand.getY() - 2, stand.getZ(), 1, 2, 1, 0.2, 0.46667, 1, true)
  })
}), () => getWorld() == "The Rift" && settings.steakAble);

registerWhen(register("renderEntity", (entity, position, ticks, event) => {
  if (entity.getClassName() != "EntityArmorStand" || !entity?.getName()?.removeFormatting()?.includes(" 0/")) return
  cancel(event)
}), () => settings.dead);

registerWhen(register("entityDeath", (entity) => {
  entity.getEntity().func_70106_y()
}), () => settings.dead)

let blockBroken = 0
let time = 0
registerWhen(register("blockBreak", (block) => {
  if (!block.toString().includes("type=minecraft:log") || Player.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString("id") != "TREECAPITATOR_AXE") return;
  if (time <= 0) blockBroken = new Date().getTime()
}), () => settings.treecap && (getWorld() == "Hub" || getWorld() == "The Park"))

registerWhen(register("renderOverlay", () => {
  if (settings.reaper) {
    let reaperTime = new Date().getTime()
    reaperTime = 6 - (reaperTime - reaperUsed) / 1000
    if (reaperTime >= 0) Renderer.drawString(`${ reaperTime.toFixed(3) }`, Renderer.screen.getWidth() / 2 - 13, Renderer.screen.getHeight() / 2 + 10)
  }
  if (settings.treecap) {
    let cd = 2
    if (data.pet.includes("Monkey")) cd = 1
    time = new Date().getTime()
    time = cd - (time - blockBroken) / 1000
    if (time >= 0) Renderer.drawString(`${ time.toFixed(3) }`, Renderer.screen.getWidth() / 2 - 13, Renderer.screen.getHeight() / 2 - 15)
  }
}), () => (settings.treecap && (getWorld() == "Hub" || getWorld() == "The Park")) || (settings.reaper));

let events = []
registerWhen(register("actionBar", (event) => {
  let chat = ChatLib.getChatMessage(event, false)
  chat = chat.substring(chat.indexOf("     "), chat.lastIndexOf("     "))
  if (events.includes(chat)) return
  events.push(chat)
  ChatLib.chat(chat)
}).setCriteria("+${*} SkyBlock XP").setContains(), () => settings.sbxp);

register("worldUnload", () => {
  events = []
})

let warp = false
registerWhen(register("chat", () => {
  if (settings.pWarp == "" || settings.pPlayer == "") return
  delay(() => {
    ChatLib.say(`/party ${ settings.pPlayer }`)
    warp = true
    delay(() => {
      warp = false
    }, 60000);
  }, 500)
}).setCriteria(`${ settings.pWarp }`).setContains(), () => settings.pWarp != "");

registerWhen(register("chat", (event) => {
  if (settings.pWarp == "" || settings.pPlayer == "") return
  let chat = ChatLib.getChatMessage(event)
  if (!chat.includes(`${ settings.pPlayer } `)) return
  if (warp == true) {
    delay(() => {
      ChatLib.say(`/p warp`)
      delay(() => {
        ChatLib.say(`/party leave`)
      }, 500);
    }, 500);
  }
}).setCriteria(` joined the party.`).setContains(), () => settings.pWarp != "");

let rendArrows = 0
registerWhen(register("soundPlay", () => {
  const holding = Player.getHeldItem().getRegistryName()
  if (holding != "minecraft:bow" && holding != "minecraft:bone") return
  rendArrows++;
  if (rendArrows > 1) return;
  setTimeout(() => {
    ChatLib.chat(`Rend Arrows: ${ rendArrows - 1 }`);
    rendArrows = 0;
  }, 300);
}).setCriteria("game.neutral.hurt"), () => settings.rendArrows)
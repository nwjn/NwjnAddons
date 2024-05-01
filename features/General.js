import settings from "../config"
import WorldUtil from "../utils/world"
import { delay, registerWhen, getRGB1 } from "../utils/functions"
import { data } from "../utils/data";
import RenderLib from "RenderLib"
import renderBeaconBeam from "BeaconBeam";
import { EntityArmorStand, SMA } from "../utils/constants";
import { getIsLeader } from "../utils/Party";

// Credit: My father, Volcaronitee
let chatWaypoints = [];
let formatted = [];

registerWhen(register("worldUnload", () => {
  chatWaypoints = []
  formatted = []
}), () => settings.waypoint != 0)

registerWhen(register("renderWorld", () => {
  renderWaypoint(formatted);
}), () => settings.waypoint != 0);

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
  formatWaypoints(chatWaypoints, ...getRGB1(settings.waypointColor));
}).setFps(2);

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
  // todo: allow for info after waypoint
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

registerWhen(register("chat", (player, command) => {
  player = player.removeFormatting().substring(player.indexOf(" ") + 1).replace(/[^A-Za-z0-9_]/g, "");
  let CommandMsg;
  delay(() => {
    command = command.toLowerCase()
    switch (command) {
      case "time":
        ChatLib.command(`pc ${ new Date().toLocaleTimeString() }`); break;
      case "coord":
      case "loc":
      case "location":
      case "coords":
        ChatLib.command(`pc x: ${ ~~Player.getX() }, y: ${ ~~Player.getY() }, z: ${ ~~Player.getZ() }`); break;
      case "server":
      case "area":
      case "world":
        ChatLib.command(`pc ${WorldUtil.toString()}`); break;
      case "pow":
      case "power":
        ChatLib.command(`pc Stone: ${ data.power } | Tuning: ${ data.tuning } | Enrich: ${ data.enrich } | MP: ${ data.mp }`); break;
      case "pet":
        ChatLib.command(`pc ${ data.pet.removeFormatting() }`); break;
      case "build":
        ChatLib.command(`pc https://i.imgur.com/tsg6tx5.jpg`); break;
      case "t5":
      case "raider":
        CommandMsg = `joininstance kuudra_infernal`; break;
      case "dropper":
        CommandMsg = `play arcade_dropper`; break;
      case "pw":
      case "warp":
        CommandMsg = `p warp`; break;
      case "transfer":
      case "pt":
      case "ptme":
        CommandMsg = `party transfer ${ player }`; break;
      case "allinvite":
      case "allinv":
      case "invite":
      case "inv":
        CommandMsg = `p settings allinvite`; break;
      default: return;
    }
    if (getIsLeader()) {
      if (settings.leader && CommandMsg) {
        new TextComponent(`&a&l[CONFIRM]`).setHoverValue(`Runs /${ CommandMsg }`).setClickAction("run_command").setClickValue(`/${ CommandMsg }`).chat()
        ChatLib.addToSentMessageHistory(-1, `/${CommandMsg}`)
      }
      else {
        ChatLib.command(CommandMsg)
      }
    }
  }, 200);
}).setCriteria("Party > ${player}: .${command}"), () => settings.party)

let reaperUsed = 0
registerWhen(register("soundPlay", () => {
  const armor = Player.armor?.getChestplate()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString("id")
  if (armor == "REAPER_CHESTPLATE") reaperUsed = Date.now()
}).setCriteria("mob.zombie.remedy"), () => settings.reaper);

registerWhen(register("entityDeath", (entity) => {
  entity = entity.getEntity()
  const hp = entity.func_110148_a(SMA.field_111267_a).func_111125_b();
  entity.func_70106_y()

  // todo: test
  const tag = World.getWorld().func_72872_a(EntityArmorStand.class, entity.func_174813_aQ().func_72314_b(0.5, 0.5, 0.5)).filter(e => e.toString().removeFormatting().includes(`${hp}❤`))
  tag.forEach(tag => tag.func_70106_y())
}), () => settings.dead)

let blockBroken = 0
let time = 0
registerWhen(register("blockBreak", (block) => {
  // todo:test
  const holding = Player.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString("id");
  if (block.toString().includes("type=minecraft:log") && holding == "TREECAPITATOR_AXE" && time <= 0) blockBroken = Date.now();
}), () => settings.treecap && WorldUtil.worldIs(["Hub", "The Park"]))

registerWhen(register("renderOverlay", () => {
  if (settings.reaper) {
    const reaperTime = 6 - (Date.now() - reaperUsed) / 1000
    if (reaperTime >= 0) Renderer.drawString(`${ reaperTime.toFixed(3) }`, Renderer.screen.getWidth() / 2 - 13, Renderer.screen.getHeight() / 2 + 10)
  }
  if (settings.treecap) {
    const cd = data.pet.includes("Monkey") ? 1 : 2
    time = cd - (Date.now() - blockBroken) / 1000
    if (time >= 0) Renderer.drawString(`${ time.toFixed(3) }`, Renderer.screen.getWidth() / 2 - 13, Renderer.screen.getHeight() / 2 - 15)
  }
}), () => (settings.treecap && WorldUtil.worldIs(["Hub", "The Park"]) || (settings.reaper)));

// let events = []
// registerWhen(register("actionBar", (event) => {
//   let chat = ChatLib.getChatMessage(event, false)
//   chat = chat.substring(chat.indexOf("     "), chat.lastIndexOf("     "))
//   if (events.includes(chat)) return
//   events.push(chat)
//   ChatLib.chat(chat)
// }).setCriteria("+${*} SkyBlock XP").setContains(), () => settings.sbxp);

// register("worldUnload", () => {
//   events = []
// })
// /*
// todo: test & replace
let lastBar = "";
  registerWhen(register("actionBar", (event) => {
  let chat = ChatLib.getChatMessage(event, false)
  chat = chat.substring(chat.indexOf("     "), chat.lastIndexOf("     "))
  if (lastBar == chat) return
  ChatLib.chat(chat)
  lastBar = chat
}).setCriteria("+${*} SkyBlock XP").setContains(), () => settings.sbxp);
// */

let rendArrows = 0
registerWhen(register("soundPlay", () => {
  const holding = Player.getHeldItem()?.getRegistryName()
  if (holding != "minecraft:bow" && holding != "minecraft:bone") return
  rendArrows++;
  if (rendArrows > 1) return;
  setTimeout(() => {
    ChatLib.chat(`Rend Arrows: ${ rendArrows - 1 }`);
    rendArrows = 0;
  }, 300);
}).setCriteria("game.neutral.hurt"), () => settings.rendArrows)
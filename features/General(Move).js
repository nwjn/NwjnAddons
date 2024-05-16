import settings from "../config"
import WorldUtil from "../utils/world"
import { delay, registerWhen, getRGB1, onWorldLeave, extractFormatIGN } from "../utils/functions"
import { data } from "../utils/data";
import RenderLib from "RenderLib"
import renderBeaconBeam from "BeaconBeam";
import { EntityArmorStand, version } from "../utils/constants";

// Credit: My father, Volcaronitee

let formatted = []
let chatWaypoints = []

register("tick", () => {
  formatWaypoints()
})
register("renderWorld", () => {
  renderWaypoints()
})

/**
 * Functions to format waypoints into the above variables to reduce renderOverlay load.
 */
function formatWaypoints() {
  let i = chatWaypoints.length
  formatted = new Array(i)

  while (i--) {
    let waypoint = chatWaypoints[i]
    let wp = [["", 0, 0, 0], [0, 0, 0]];
    let [x, y, z] = [waypoint[1], waypoint[2], waypoint[3]];
    let distance = Player.asPlayerMP().distanceTo(x, y, z)

    if (distance >= 100) {
      x = Player.getX() + (x - Player.getX()) * (100 / distance);
      z = Player.getZ() + (z - Player.getZ()) * (100 / distance);
    }

    let xSign = x === 0 ? 1 : Math.sign(x);
    let zSign = z === 0 ? 1 : Math.sign(z);
    wp[0] = [`${waypoint[0]} §b[${~~distance}m]`, x + 0.5*xSign, y - 1, z + 0.5*zSign];

    if (xSign === 1) xSign = 0;
    if (zSign === 1) zSign = 0;
    wp[1] = [x + xSign, y - 1, z + zSign];

    formatted[i] = wp
  }
}

function renderWaypoints() {
  let i = formatted.length
  while (i--) {
    let waypoint = formatted[i]
    let box = waypoint[0];
    let beam = waypoint[1];
    let rgb = getRGB1(settings.waypointColor);

    RenderLib.drawEspBox(box[1], box[2], box[3], 1, 1, rgb[0], rgb[1], rgb[2], 1, true);
    RenderLib.drawInnerEspBox(box[1], box[2], box[3], 1, 1, rgb[0], rgb[1], rgb[2], 0.25, true);
    Tessellator.drawString(box[0], box[1], box[2] + 1.5, box[3], 0xffffff, true);
    renderBeaconBeam(beam[0], beam[1], beam[2], rgb[0], rgb[1], rgb[2], 0.5, false);
  }
}

registerWhen(register("chat", (player, _, x, y, z) => {
  // Gets colors and titles in name
  player = ChatLib.addColor(player.split("> ").slice(-1).toString())

  // Remove anything after z coords
  z = z.split(" ")[0]
  
  chatWaypoints.push([player, parseInt(x), parseInt(y), parseInt(z)]);

  // Delete waypoint after 'X' seconds
  delay(() => { if (chatWaypoints.length) chatWaypoints.shift(); }, settings.waypoint * 1000);
  
  // &r&9Party &8> &6[MVP&8++&6] nwjn&f: &rx: -363, y: 63, z: -846 &r
}).setCriteria("${player}:${spacing}x: ${x}, y: ${y}, z: ${z}&r"), () => settings.waypoint != 0);


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

  command = command.toLowerCase()
  setTimeout(() => {
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
        ChatLib.command(`pc ${ WorldUtil.toString() }`); break;
      case "pow":
      case "power":
        ChatLib.command(`pc Stone: ${ data.power } | Tuning: ${ data.tuning } | Enrich: ${ data.enrich } | MP: ${ data.mp }`); break;
      case "pet":
        ChatLib.command(`pc ${ data.pet.removeFormatting() }`); break;
      case "build":
        ChatLib.command(`pc https://i.imgur.com/tsg6tx5.jpg`); break;
      case "ver":
      case "version":
        ChatLib.command(`pc ${version}`)
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
    if (settings.leader && CommandMsg) {
      ChatLib.command(CommandMsg);
    }
  }, 300)
}).setCriteria(/Party > (.+): [.?!](.+)/), () => settings.party)

let reaperUsed = 0
registerWhen(register("soundPlay", () => {
  const armor = Player.armor?.getChestplate()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString("id")
  if (armor == "REAPER_CHESTPLATE") reaperUsed = Date.now()
}).setCriteria("mob.zombie.remedy"), () => settings.reaper);

registerWhen(register("entityDeath", (entity) => {
  const mcEntity = entity.getEntity()
  mcEntity.func_70106_y()

  Client.scheduleTask(1, () => {
    const stands = World.getWorld().func_72872_a(EntityArmorStand.class, mcEntity.func_174813_aQ().func_72314_b(3, 3, 3)).filter(e => e.toString().match(/§r §[^a]0§f\//g))
    stands.forEach(stand => stand.func_70106_y())
  })
}), () => settings.dead)

let blockBroken = 0
let time = 0
registerWhen(register("blockBreak", (block) => {
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

let lastBar = "";
  registerWhen(register("actionBar", (event) => {
  let chat = ChatLib.getChatMessage(event, false)
  chat = chat.substring(chat.indexOf("     "), chat.lastIndexOf("     "))
  if (lastBar == chat) return
  ChatLib.chat(chat)
  lastBar = chat
}).setCriteria("+${*} SkyBlock XP").setContains(), () => settings.sbxp);

let rendArrows = 0
registerWhen(register("soundPlay", () => {
  const holding = Player.getHeldItem()?.getRegistryName()
  if (!["minecraft:bone", "minecraft:bow"].includes(holding)) return
  rendArrows++;
  if (rendArrows > 1) return;
  setTimeout(() => {
    ChatLib.chat(`Rend Arrows: ${ rendArrows - 1 }`);
    rendArrows = 0;
  }, 300);
}).setCriteria("game.neutral.hurt"), () => settings.rendArrows)
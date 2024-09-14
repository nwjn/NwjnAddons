import Settings from "../utils/Settings"
import Loc from "../utils/Location.js"
import { delay, registerWhen, getRGB } from "../utils/functions.js"
import { data } from "../utils/data/DataWriter.js"
import RenderLib from "RenderLib"
import renderBeaconBeam from "BeaconBeam";
import { EntityArmorStand, version } from "../utils/constants";

// Credit: My father, Volcaronitee

let formatted = []
let chatWaypoints = []

registerWhen(register("step", () => {
  formatted = chatWaypoints.map(waypoint => {
    let wp = [["", 0, 0, 0], [0, 0, 0]]
    let [name, x, y, z] = waypoint
    const distance = Player.asPlayerMP().distanceTo(x, y, z)

    if (distance >= 100) {
      x = Player.getX() + (x - Player.getX()) * (100 / distance);
      z = Player.getZ() + (z - Player.getZ()) * (100 / distance);
    }

    let xSign = x === 0 ? 1 : Math.sign(x);
    let zSign = z === 0 ? 1 : Math.sign(z);
    wp[0] = [`${name} §b[${~~distance}m]`, x + 0.5*xSign, y - 1, z + 0.5*zSign];

    if (xSign === 1) xSign = 0;
    if (zSign === 1) zSign = 0;
    wp[1] = [x + xSign, y - 1, z + zSign];

    return wp
  })
}).setFps(2), () => Settings().waypoint)

registerWhen(register("renderWorld", () => {
  let i = formatted.length
  while (i--) {
    let waypoint = formatted[i]
    let box = waypoint[0];
    let beam = waypoint[1];
    let rgb = getRGB(Settings().wpColor);

    RenderLib.drawEspBox(box[1], box[2], box[3], 1, 1, rgb[0], rgb[1], rgb[2], 1, true);
    RenderLib.drawInnerEspBox(box[1], box[2], box[3], 1, 1, rgb[0], rgb[1], rgb[2], 0.25, true);
    Tessellator.drawString(box[0], box[1], box[2] + 1.5, box[3], 0xffffff, true);
    renderBeaconBeam(beam[0], beam[1], beam[2], rgb[0], rgb[1], rgb[2], 0.5, false, 150);
  }
}), () => Settings().waypoint)

registerWhen(register("chat", (player, _, x, y, z) => {
  // Gets colors and titles in name
  player = player.split("> ").slice(-1).toString().addColor()

  // Remove anything after z coords
  z = z.split(" ")[0]
  
  chatWaypoints.push([player, parseInt(x), parseInt(y), parseInt(z)]);

  // Delete waypoint after 'X' seconds
  delay(() => { chatWaypoints.shift(); }, Settings().wpTime * 1000);
  
  // &r&9Party &8> &6[MVP&8++&6] nwjn&f: &rx: -363, y: 63, z: -846 &r
}).setCriteria("${player}:${spacing}x: ${x}, y: ${y}, z: ${z}&r"), () => Settings().waypoint != 0);

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
        ChatLib.command(`pc ${ Loc.toString() }`); break;
      case "pow":
      case "power":
        ChatLib.command(`pc Power: ${ data.power } | Tuning: ${ data.tuning } | Enrich: ${ data.enrich } | MP: ${ data.mp }`); break;
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
        CommandMsg = `p Settings allinvite`; break;
      default: return;
    }
    if (Settings().leader && CommandMsg) {
      ChatLib.command(CommandMsg);
    }
  }, 300)
}).setCriteria(/Party > (.+): [,.?!](.+)/), () => Settings().party)

registerWhen(register("entityDeath", (entity) => {
  const mcEntity = entity.getEntity()
  mcEntity.func_70106_y()

  Client.scheduleTask(1, () => {
    const stands = World.getWorld().func_72872_a(EntityArmorStand.class, mcEntity.func_174813_aQ().func_72314_b(3, 3, 3)).filter(e => e.toString().match(/§r §[^a]0§f\//g))
    stands.forEach(stand => stand.func_70106_y())
  })
}), () => Settings().dead)

let reaperUsed = 0
registerWhen(register("soundPlay", () => {
  const armor = Player.armor.getChestplate()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString("id")
  if (armor == "REAPER_CHESTPLATE") reaperUsed = Date.now()
}).setCriteria("mob.zombie.remedy"), () => Settings().reaper);

registerWhen(register("renderOverlay", () => {
  const reaperTime = 6 - (Date.now() - reaperUsed) / 1000
  if (reaperTime >= 0) Renderer.drawString(`${ reaperTime.toFixed(3) }`, Renderer.screen.getWidth() / 2 - 13, Renderer.screen.getHeight() / 2 + 10)
}), () => Settings().reaper);

let lastBar = "";
  registerWhen(register("actionBar", (event) => {
  let chat = ChatLib.getChatMessage(event, false)
  chat = chat.substring(chat.indexOf("     "), chat.lastIndexOf("     "))
  if (lastBar == chat) return
  ChatLib.chat(chat)
  lastBar = chat
}).setCriteria("+${*} SkyBlock XP").setContains(), () => Settings().sbxp);
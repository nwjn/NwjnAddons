import settings from "../config";
import { registerWhen } from "../utils/functions";
import RenderLib from "../../RenderLib";

let alerted = 0
registerWhen(register("step", () => {
  let memory = Client.getMemoryUsage()
  if (settings.memory != 0 && settings.memory > Client.getMemoryUsage()) return
  if (settings.memory >= Client.getMemoryUsage() && alerted == 0) {
    alerted += 1
    Client.showTitle(`&4${memory}% MEMORY`, "", 15, 60, 60)
  }
}).setDelay(3), () => settings.memory != 0);

registerWhen(register("chat", (msg) => {
  let chat = ChatLib.getChatMessage(msg, true)
  cancel(msg)
  chat = chat.replace("&r&cPlease be mindful of Discord links in chat as they may pose a security risk&r", "")
  chat = chat.substring(-1, chat.length - 1)
  ChatLib.chat(chat)
}).setChatCriteria("&r&cPlease be mindful of Discord links in chat as they may pose a security risk&r").setContains(), () => settings.discord);

// Credit: Block Highlight on ct
var block;
const values = {
  width: [
    1.009, // carpet
    1.009, // redstone_wire
    1.009, // unpowered_repeater
    1.009, // powered_repeater
    0.909, // chest
    // 0.509, // skull
    1.009, // end portal frame
    // 1.009 // stone_slab
  ],
  height: [
    0.109, // carpet
    0.109, // redstone_wire
    0.209, // unpowered_repeater
    0.209, // unpowered_repeater
    0.909, // chest
    // 0.509, // skull
    0.809, // end portal frame,
    // 0.509, // stone_slab 
  ],
  names: [
    'minecraft:carpet',
    'minecraft:redstone_wire',
    'minecraft:unpowered_repeater',
    'minecraft:powered_repeater',
    'minecraft:chest',
    'minecraft:end_portal_frame'
  ]
}

registerWhen(register('drawBlockHighlight', (pos, event) => {
  block = World.getBlockAt(pos.x, pos.y, pos.z)
  if (block.toString().startsWith('Block{type=minecraft:air')) block = null
  return cancel(event)
}), () => settings.highlight)

registerWhen(register('renderWorld', (pticks) => {
  if (block === null || block === undefined) return
  try {
    if (['Water', 'Lava'].includes(block.type.getName())) return
    RenderLib.drawEspBox(block.x + .5, block.y, block.z + .5, getSize('width'), getSize('height'), settings.highlightColor.getRed() / 255, settings.highlightColor.getGreen() / 255, settings.highlightColor.getBlue() / 255, 1, false)
    block = null
  } catch(error) {}
}), () => settings.highlight)

function getSize(type) {
  if (type === 'width') {
    if (!values.names.includes(block.type.getRegistryName())) return 1.009
    let index = values.names.indexOf(block.type.getRegistryName()) 
    return values.width[index]
  } else if (type === 'height') {
    if (!values.names.includes(block.type.getRegistryName())) return 1.009
    let index = values.names.indexOf(block.type.getRegistryName()) 
    return values.height[index]
  }
}

registerWhen(register("renderArmor", (event) => {
  cancel(event)
}), () => settings.armor);

registerWhen(register("renderFood", (event) => {
  cancel(event)
}), () => settings.food);
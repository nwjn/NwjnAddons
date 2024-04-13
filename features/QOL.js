import settings from "../config";
import { registerWhen, getRGB1 } from "../utils/functions";
import RenderLib from "../../RenderLib";

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

// todo: figure out why this shits on performance
registerWhen(register('renderWorld', () => {
  if (!block) return
  try {
    if (['Water', 'Lava'].includes(block.type.getName())) return
    RenderLib.drawEspBox(block.x + .5, block.y, block.z + .5, getSize('width'), getSize('height'), ...getRGB1(settings.highlightColor), 1, false)
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

// // TODO: armor display and equipment display
// register("renderOverlay", () => {
//   Player.armor?.getHelmet()?.draw(50, 50, 1)
//   Player.armor?.getChestplate()?.draw(50, 65, 1)
//   Player.armor?.getLeggings()?.draw(50, 80, 1)
//   Player.armor?.getBoots()?.draw(50, 95, 1)
// })
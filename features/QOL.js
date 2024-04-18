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

// Credit: Adapted from Block Highlight on ct
let block;
registerWhen(register('drawBlockHighlight', (pos, event) => {
  block = block.toString().startsWith('Block{type=minecraft:air') ? block = null : World.getBlockAt(pos.x, pos.y, pos.z)
  return cancel(event)
}), () => settings.highlight)

// todo: figure out why this shits on performance
registerWhen(register('renderWorld', () => {
  if (block == null) return
  RenderLib.drawEspBox(block.x + .5, block.y, block.z + .5, 1, 1, ...getRGB1(settings.highlightColor), 1, false)
}), () => settings.highlight)

// // TODO: armor display and equipment display
// register("renderOverlay", () => {
//   Player.armor?.getHelmet()?.draw(50, 50, 1)
//   Player.armor?.getChestplate()?.draw(50, 65, 1)
//   Player.armor?.getLeggings()?.draw(50, 80, 1)
//   Player.armor?.getBoots()?.draw(50, 95, 1)
// })
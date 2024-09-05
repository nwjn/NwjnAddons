import settings from "../settings"
import { registerWhen, clamp } from "../utils/functions";
import WorldUtil from "../utils/WorldUtil"

/*
todo: add input for messages to send and create;

Input:
• criteria
• spawn name
• chat to say in
import {chatType} from "./utils/Enums.js"

settings().forEach()
register("chat", () => {
  ChatLib.say(`/${chatType[settings().chatType]} x: ${ ~~Player.getX() }, y: ${~~Player.getY()}, z: ${~~Player.getZ()} [NwjnAddons] Vanquisher!`)
}).setCriteria(settings().criteria)
*/
registerWhen(register("chat", () => {
  ChatLib.say(`/pc x: ${ ~~Player.getX() }, y: ${~~Player.getY()}, z: ${~~Player.getZ()} [NwjnAddons] Vanquisher!`)
}).setCriteria("A Vanquisher is spawning nearby!"), () => settings().announceVanqs && WorldUtil.isWorld("Crimson Isle"));

let totalDamage = 0
registerWhen(register("step", () => {
  const line = Scoreboard?.getLines()?.find(l => l.toString().removeFormatting().includes("Boss: "))
  if (line) totalDamage = parseInt(line.toString().removeFormatting().replace(/[^0-9]/g, ""))
}).setDelay(5), () => settings().magma)

registerWhen(register('chat', (damage, event) => {
  totalDamage = clamp(totalDamage + parseInt(damage), 0, 100)

  cancel(event)
  ChatLib.chat(`&4&lMagma Boss&r &8> &c+${ damage }% &7(${ totalDamage }%)`)
  
  if (totalDamage === 100) totalDamage = 0
}).setCriteria("The Magma Boss angers! (+${damage}% Damage)"), () => settings().magma && WorldUtil.isWorld("Crimson Isle"))
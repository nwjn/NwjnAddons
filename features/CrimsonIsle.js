import settings from "../config";
import { registerWhen } from "../utils/functions";
import { getWorld } from "../utils/world";
import { consts } from "../utils/constants";

registerWhen(register("chat", () => {
  ChatLib.say(`/pc x: ${ Math.round(Player.getX())}, y: ${Math.round(Player.getY())}, z: ${Math.round(Player.getZ())} [NwjnAddons] Lord Jawbus!!!`)
}).setCriteria("You have angered a legendary creature... Lord Jawbus has arrived."), () => getWorld() == "Crimson Isle" && settings.jawbus);

registerWhen(register("chat", () => {
  ChatLib.say(`/pc x: ${ Math.round(Player.getX())}, y: ${Math.round(Player.getY())}, z: ${Math.round(Player.getZ())} [NwjnAddons] Thunder!!!`)
}).setCriteria("You hear a massive rumble as Thunder emerges."), () => getWorld() == "Crimson Isle" && settings.thunder);

registerWhen(register("chat", () => {
  ChatLib.say(`/pc x: ${ Math.round(Player.getX())}, y: ${Math.round(Player.getY())}, z: ${Math.round(Player.getZ())} [NwjnAddons] Plhlegblast!!!`)
}).setCriteria("WOAH! A Plhlegblast appeared."), () => getWorld() == "Crimson Isle" && settings.plhlegblast);

registerWhen(register("chat", () => {
  ChatLib.say(`/pc x: ${ Math.round(Player.getX())}, y: ${Math.round(Player.getY())}, z: ${Math.round(Player.getZ())} [NwjnAddons] Vanquisher!!!`)
}).setCriteria("A Vanquisher is spawning nearby!"), () => settings.announceVanqs && getWorld() == "Crimson Isle");


let totalDamage = 0
registerWhen(register("step", () => {
  if (!World.isLoaded()) return
  Scoreboard.getLines().forEach(line => {
    line = ChatLib.removeFormatting(line.toString());
    if (line.includes("Boss: ")) {
      line = line.replace(/(\W|[a-zA-Z]+)/g, "")
      totalDamage = parseInt(line)
    }
  })
}).setDelay(1), () => settings.magma)

registerWhen(register('chat', (damage, event) => {
  totalDamage = totalDamage + parseInt(damage)
  cancel(event)
  if (totalDamage > 100) totalDamage = 100
  ChatLib.chat(`${consts.PREFIX} &c+${damage}% &7(${totalDamage}%)`)
}).setCriteria("The Magma Boss angers! (+${damage}% Damage)"), () => settings.magma && getWorld() == "Crimson Isle")

register('worldUnload', () => {
  totalDamage = 0
});
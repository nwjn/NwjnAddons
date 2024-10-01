// import Settings from "../Settings.js";
// import { registerWhen, clamp } from "../utils/functions.js";
// import Loc from "../utils/Location.js"

// /*
// todo: add input for messages to send and create;

// Input:
// • criteria
// • spawn name
// • chat to say in
// import {chatType} from "./utils/Enums.js"

// Settings().forEach()
// register("chat", () => {
//   ChatLib.say(`/${chatType[Settings().chatType]} x: ${ ~~Player.getX() }, y: ${~~Player.getY()}, z: ${~~Player.getZ()} [NwjnAddons] Vanquisher!`)
// }).setCriteria(Settings().criteria)
// */
// registerWhen(register("chat", () => {
//   ChatLib.say(`/pc x: ${ ~~Player.getX() }, y: ${~~Player.getY()}, z: ${~~Player.getZ()} [NwjnAddons] Vanquisher!`)
// }).setCriteria("A Vanquisher is spawning nearby!"), () => Settings().announceVanqs && Loc.inWorld("Crimson Isle"));

// let totalDamage = 0
// registerWhen(register("step", () => {
//   const line = Scoreboard.getLines()?.find(l => l.getName().removeFormatting().includes("Boss: "))
//   if (line) totalDamage = parseInt(line.toString().removeFormatting().replace(/[^0-9]/g, ""))
// }).setDelay(5), () => Settings().magma && Loc.inWorld("Crimson Isle"))

// registerWhen(register('chat', (damage, event) => {
//   totalDamage = clamp(totalDamage + parseInt(damage), 0, 100)

//   cancel(event)
//   ChatLib.chat(`&4&lMagma Boss&r &8> &c+${ damage }% &7(${ totalDamage }%)`)
// }).setCriteria("The Magma Boss angers! (+${damage}% Damage)"), () => Settings().magma && Loc.inWorld("Crimson Isle"))

// Credit: Volcaronitee

/**
 * Variables used to store world data.
*/
let world = undefined;
export function getWorld() { return world; };
let game = undefined
export function getGame() { return game }
let noFind = 0;

import { delay, setRegisters } from "./functions";

/**
 * Identifies the current world the player is in based on the tab list.
 */
function findWorld() {
    if (!World.isLoaded()) return;

    // Infinite loop prevention
    if (noFind === 10) return;
    noFind++;

    // Get world from tab list
  world = TabList.getNames().find(tab => tab.match(/(Area|Dungeon):/g));
  game = Scoreboard.getTitle()

  if (world === undefined) {
    // If the world is not found, try again after a delay
    delay(() => findWorld(), 1000);

  } else {
    // Get world formatted
    world = world.removeFormatting().split(": ").slice(-1).toString();
    game = game.removeFormatting()

    delay(() => setRegisters(), 500);
  }
}

import { onWorldJoin, onWorldLeave } from "./functions";
/**
 * Set and reset world on world change.
 */
onWorldJoin(() => {
  noFind = 0;
  findWorld();
})

onWorldLeave(() => {
  world = undefined;
  game = undefined;
  setRegisters();
});
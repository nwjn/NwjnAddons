import { onWorldJoin, onWorldLeave, delay, setRegisters } from "./functions";
import { PREFIX } from "./constants";

// Credit: Inspired by My father, Volcaronitee
class WorldUtil {
  constructor() {
    onWorldJoin(() => {
      this.findWorld()
    })

    onWorldLeave(() => {
      this.reset()
    })
  }
  
  reset() {
    this.world = undefined
    this.server = undefined
    this.spawn = undefined
  }
  
  findWorld(tries = 10) {
    if (!tries) {
      ChatLib.chat(`${ PREFIX }: &cCouldn't find world. Run '/nwjn reload' to try again.`)
      return;
    };
    tries--;

    const TABLIST = TabList.getNames()
    const areaIdx = TABLIST.findIndex(e => e.match(/(Area|Dungeon):/g));

    if (!(~areaIdx)) {
      delay(() => this.findWorld(tries), 1000);
      return;
    }

    this.world = TABLIST[areaIdx].removeFormatting().split(": ").slice(-1).toString()
    this.server = TABLIST[areaIdx + 1].removeFormatting().split(": ").slice(-1).toString()
    
    const spawn = World.spawn
    this.spawn = [spawn.getX(), spawn.getY(), spawn.getZ()]

    delay(() => setRegisters(), 500);
  }

  /**
   * Resets variables and looks for the world again
   */
  resetWorld() {
    this.reset()
    this.findWorld()
  }

  /**
   * Checks if the player is in Skyblock
   * @returns {Boolean}
   */
  isSkyblock() {
    return Boolean(this.world)
  }

  /**
   * Tests if current world name matches test world name
   * @param {String} world - test world name
   * @returns {Boolean}
   */
  worldIs(world) {
    return (world === this.world)
  }

  /**
   * Overload tests if current world name matches test world names
   * @param {String[]} world - test world names
   * @returns {Boolean}
   */
  worldIs(world) {
    return world.includes(this.world)
  }

  /**
   * A string representation of the current World and Server
   * @returns {String}
   */
  toString() {
    return `${ this.world } | ${ this.server }`
  }
}

export default new WorldUtil;

// Credit: Volcaronitee

/**
 * Variables used to store world data.
*/
let world = undefined;
export function getWorld() { return world; };

/**
 * Identifies the current world the player is in based on the tab list.
 */
function findWorld(tries = 10) {
  if (!World.isLoaded() || !tries) return;
  tries--;

  const worldLine = TabList.getNames().find(tab => tab.match(/(Area|Dungeon):/g));

  if (!worldLine) {
    delay(() => findWorld(tries), 1000);

  } else {
    world = worldLine.removeFormatting().split(": ").slice(-1).toString();

    delay(() => setRegisters(), 500);
  }
}

/**
 * Set and reset world on world change.
 */
onWorldJoin(() => {
  noFind = 0;
  findWorld();
})

onWorldLeave(() => {
  world = undefined;
  setRegisters();
});
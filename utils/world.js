import { onWorldJoin, onWorldLeave, delay, setRegisters } from "./functions";

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
    if (!tries) return;
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
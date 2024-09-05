import { delay, setRegisters } from "./functions";
import { PREFIX } from "./constants";

// @Volcaronitee
class WorldUtil {
  #world = undefined
  #server = undefined
  #zone = undefined

  constructor() {
    register("chat", (id) => this.#server = id).setCriteria("Sending to server ${id}...");

    register("step", () =>
      Scoreboard?.getLines()?.find(line => {
        const zone = line.getName().match(/^ §[a-f0-9](⏣|ф) (.+)$/)
        if (zone) return this.#zone = zone[2].removeFormatting()
      })
    ).setDelay(1)

    register("worldLoad", () => this._findWorld()).setPriority(Priority.LOWEST)
    register("worldUnload", () => this._reset()).setPriority(Priority.LOWEST)
    register("serverDisconnect", () => this._reset()).setPriority(Priority.LOWEST)

    register("command", () => ChatLib.chat(`${PREFIX} ${this.toString()}`)).setName("nwjnWorld")
  }
  
  _reset() {
    this.#world = undefined
    this.#server = undefined
    this.#zone = undefined
  }
  
  _findWorld(recurse = 10) {
    if (!recurse) return;

    TabList?.getNames()?.find(tab => {
      const world = tab.match(/^§r§b§l(Area|Dungeon): (.+)$/)
      if (world) {
        this.#world = world[2].removeFormatting()
        return delay(() => setRegisters(), 500)
      }
    }) || delay(() => this._findWorld(recurse - 1), 1000);
  };

  /**
   * Resets variables and looks for the world again
   */
  resetWorld() {
    this._reset()
    this._findWorld()
  }

  /**
   * Checks if the player is in Skyblock
   * @returns {Boolean}
   */
  isSkyblock() {
    return Boolean(this.#world)
  }

  /**
   * Tests if current world name matches test world name
   * @param {String|String[]} world - test world name
   * @returns {Boolean}
   */
  isWorld(world) {
    if (typeof (world) == "string") return (world === this.#world)
    return world.includes(this.#world)
  }

  getWorld() {
    return this.#world
  }

  /**
   * A string representation of the current World and Server
   * @returns {String}
   */
  toString() {
    return `${ this.#world } | ${ this.#server }`
  }
}

export default new WorldUtil()
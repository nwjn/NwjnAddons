import { delay, setRegisters } from "./functions.js";

// @https://github.com/zhenga8533/VolcAddons/blob/main/utils/Location.js
class Loc {
  #world;
  #zone;
  #instance;
  #spawn;

  constructor() {
    register("worldLoad", () => this._findWorld()).setPriority(Priority.LOWEST)
    register("worldUnload", () => this._reset()).setPriority(Priority.LOWEST)
  }
  
  _reset() {
    this.#zone = undefined
    this.#world = undefined
    this.#instance = undefined
    this.#spawn = undefined
  }
  
  _findWorld(recurse = 10) {
    if (!recurse) return;

    const tab = TabList?.getNames()?.find(tab => tab.match(/^§r§b§l(Area|Dungeon):/))
    this.#world = tab?.removeFormatting()?.match(/: (.+)$/)?.[1]

    if (!this.#world) return delay(() => this._findWorld(recurse - 1), 1000)

    this.#spawn = [World.spawn.getX(), World.spawn.getY(), World.spawn.getZ()]
    delay(() => setRegisters(), 500)
    this._findZone()
  };

  _findZone() {
    const line = Scoreboard?.getLines()?.find(line => line.getName().match(/^ §[57][⏣ф]/))
    this.#zone = line?.getName()?.removeFormatting()?.match(/ [⏣ф] (.+)/)?.[1]?.replace(/[^\x0-\xFF]/g, "")?.trim()

    if (this.#zone) this.#instance = this.#zone?.match(/\([FMT][1-7]\)$/)?.[1]

    delay(() => {
      if (this.#world) this._findZone()
    }, 3000)
  }
  /**
   * Resets variables and looks for the world again
   */
  resetWorld() {
    this._reset()
    this._findWorld()
  }

  /**
   * Checks if the player is in Skyblock
   * @returns {Boolean} true if world exists
   */
  inSkyblock() {
    return Boolean(this.#world)
  }

  /**
   * Checks if input is current world
   * @param {String|String[]} world - test world name
   * @returns {Boolean} Whether or not in this world
   */
  inWorld(world) {
    return world.includes(this.#world)
  }

  /**
   * Checks if input is current zone
   * @param {String|String[]} zone - test zone name
   * @returns {Boolean} Whether or not in this zone
   */
  inZone(zone) {
    return zone.includes(this.#zone)
  }

  /**
   * Checks if input is current instance
   * @param {String|String[]} instance - test instance name
   * @returns {Boolean} Whether or not in this instance
   */
  inInstance(instance) {
    return instance.includes(this.#instance)
  }

  get World() {
    return this.#world ?? "None"
  }

  get Zone() {
    return this.#zone ?? "None"
  }

  get Instance() {
    return this.#instance ?? "None"
  }

  get Spawn() {
    return this.#spawn ?? "None"
  }

  get Data() {
    return `World: ${this.World} | Zone: ${this.Zone} | Instance: ${this.Instance}`
  }
}

export default new Loc();
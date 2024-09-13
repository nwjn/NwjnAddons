import { delay, setRegisters } from "./functions.js";

// @Volcaronitee
class Loc {
  #world;
  #zone;
  #instance

  constructor() {
    register("step", () => this._findZone()).setDelay(3)

    register("worldLoad", () => this._findWorld()).setPriority(Priority.LOWEST)
    register("worldUnload", () => this._reset()).setPriority(Priority.LOWEST)
  }
  
  _reset() {
    this.#zone = undefined
    this.#world = undefined
  }
  
  _findWorld(recurse = 10) {
    if (!recurse) return;

    const tab = TabList?.getNames()?.find(tab => tab.match(/^§r§b§l[AreaDungeon]:/))
    this.#world = tab?.removeFormatting()?.match(/: (.+)$/)?.[1]

    if (this.#world) return delay(() => setRegisters(), 500)
    delay(() => this._findWorld(recurse - 1), 1000)
  };

  _findZone() {
    const line = Scoreboard?.getLines()?.find(line => line.getName().match(/^ §[57][⏣ф]/))
    this.#zone = line?.getName()?.removeFormatting()?.match(/ [⏣ф] (.+)/)?.[1]?.replace(/[^\x0-\xFF]/g, "")?.trim()

    this.#instance = this.#zone?.match(/\(([FMT][1-7])\)$/)?.[1]
  }
  /**
   * Resets variables and looks for the world again
   */
  resetWorld() {
    this._reset()
    this._findZone()
    this._findWorld()
  }

  /**
   * Checks if the player is in Skyblock
   * @returns {Boolean} true if world exists
   */
  isSkyblock() {
    return Boolean(this.#world)
  }

  /**
   * Checks if input is current world
   * @param {String|String[]} world - test world name
   * @returns {Boolean} Whether or not in this world
   */
  isWorld(world) {
    return world.includes(this.#world)
  }

  /**
   * Checks if input is current zone
   * @param {String|String[]} zone - test zone name
   * @returns {Boolean} Whether or not in this zone
   */
  isZone(zone) {
    return zone.includes(this.#zone)
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

  get Data() {
    return `World: ${this.World} | Zone: ${this.Zone}`
  }
}

export default new Loc();
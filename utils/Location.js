import { delay, setRegisters } from "./functions.js";

// @Volcaronitee
class Loc {
  #world = undefined
  #server = undefined
  #zone = undefined

  constructor() {
    register("chat", (id) => this.#server = id).setCriteria("Sending to server ${id}...");

    register("step", () => this._findZone()).setDelay(2)

    register("worldLoad", () => this._findWorld()).setPriority(Priority.LOWEST)
    register("worldUnload", () => this._reset()).setPriority(Priority.LOWEST)
  }
  
  _reset() {
    this.#world = undefined
    this.#server = undefined
    this.#zone = undefined
  }
  
  _findWorld(recurse = 10) {
    if (!recurse) return;

    TabList?.getNames()?.find(tab => {
      this.#world = tab.removeFormatting().match(/(Area|Dungeon): (.+)/)?.[2]
      if (this.#world) return delay(() => setRegisters(), 500)
    }) || delay(() => this._findWorld(recurse - 1), 1000)
  };

  _findZone() {
    Scoreboard?.getLines()?.find(line => {
      this.#zone = line.getName().removeFormatting().match(/ [⏣ф] (.+)/)?.[2]?.replace(/[^\x0-\xFF]/g, "").trim()
      if (this.#zone) return
    })
  }

  /**
   * Resets variables and looks for the world again
   */
  resetWorld() {
    this._reset()
    this._findWorld()
    this._findZone()
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
   * @returns {Boolean}
   */
  isWorld(world) {
    return world.includes(this.#world)
  }

  get World() {
    return this.#world ?? "None"
  }

  get Server() {
    return this.#server ?? "None"
  }

  get Zone() {
    return this.#zone ?? "None"
  }

  get Data() {
    return `World: ${this.World} | Server: ${this.Server} | Zone: ${this.Zone}`
  }
}

export default new Loc();
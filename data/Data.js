import PogOject from "../../PogData/index.js";

export let data = new PogOject("NwjnAddons", {
  "newUser": true,
  "newMsg": "",

  "power": "Unknown",
  "tuning": "Unknown",
  "enrich": "Unknown",
  "mp": "Unknown",

  "gummy": 0,
  "wisp": 0,
  "lastMini": [],
  "blacklist": []
}, "/data/User.json");
data.autosave(3)

// [Player Stat Data]
register("chat", (power) => {
  data.power = power
}).setCriteria("You selected the ${power} power for your Accessory Bag!")

register("chat", (num, stat) => {
  data.enrich = `${ num } ${ stat }`
}).setCriteria("Swapped ${num} enrichments to ${stat}!")

register("guiMouseRelease", () => {
  const container = Player.getContainer()
  if (container?.getName() !== "Stats Tuning") return

  Client.scheduleTask(1, () => {
    const itemLore = container.getStackInSlot(4)?.getLore()
      
    data.tuning = itemLore?.reduce(
      (acum, val) => 
        acum + (val.removeFormatting().match(/^\+(\d+.)/)?.[1] ?? ""),
      "",
    ) || "Unknown"
  
    data.mp = itemLore?.reduce(
      (acum, val) => 
        acum || val.removeFormatting().match(/^Magical Power: (.+)$/)?.[1],
      "",
    ) || "Unknown"
  })
});

import { addCommand } from "../utils/Command.js"
import TextUtil from "../core/static/TextUtil.js";
const INVALID = () => ChatLib.chat(`${ TextUtil.NWJNADDONS } &cInvalid. &aAdd and remove need name entry. List and clear do not.`)

// Credit: DocilElm
addCommand("bl", "Blacklist <add, remove, list, clear> <name?>", (type, name) => {
  if (!type) return INVALID()
  if (name) name = name.toLowerCase()
  
  switch (type?.toLowerCase()) {
    case "add":
      if (!name) return INVALID()
      data.blacklist.push(name)

      ChatLib.chat(`${ TextUtil.NWJNADDONS } &aAdded &c${name} &ato your blacklist`)
      break
      
    case "remove": {
      if (!name) return INVALID()
      data.blacklist.splice(
        data.blacklist.indexOf(name.toLowerCase()),
        1
      )

      ChatLib.chat(`${ TextUtil.NWJNADDONS } &aRemoved &c${name} &afrom your blacklist.`)
      break
    }
      
    case "list": {
      ChatLib.chat(`${ TextUtil.NWJNADDONS } &aBlacklist:`)
      data.blacklist.forEach((ign, idx) => ChatLib.chat(` ${ idx+1 }: ${ ign }`))
      break
    }  
      
    case "clear": {
      data.blacklist = []
      ChatLib.chat(`${ TextUtil.NWJNADDONS } &aCleared your blacklist.`)
      break
    }
      
    default:
      return INVALID()
  }
})
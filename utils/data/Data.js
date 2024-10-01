import PogOject from "../../../PogData";

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
}, "/utils/data/User.json");
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

import { addCommand } from "../Command.js"
import { TextHelper } from "../TextHelper.js";
const INVALID = () => ChatLib.chat(`${ TextHelper.NAME } &cInvalid. &aAdd and remove need name entry. List and clear do not.`)
addCommand("bl", "Blacklist <add, remove, list, clear> <name?>", (type, name) => {
  if (!type) return INVALID()
  if (name) name = name.toLowerCase()
  
  switch (type?.toLowerCase()) {
    case "add":
      if (!name) return INVALID()
      data.blacklist.push(name)

      ChatLib.chat(`${ TextHelper.NAME } &aAdded &c${name} &ato your blacklist`)
      break
      
    case "remove": {
      if (!name) return INVALID()
      data.blacklist.splice(
        data.blacklist.indexOf(name.toLowerCase()),
        1
      )

      ChatLib.chat(`${ TextHelper.NAME } &aRemoved &c${name} &afrom your blacklist.`)
      break
    }
      
    case "list": {
      ChatLib.chat(`${ TextHelper.NAME } &aBlacklist:`)
      data.blacklist.forEach((ign, idx) => ChatLib.chat(` ${ idx+1 }: ${ ign }`))
      break
    }  
      
    case "clear": {
      data.blacklist = []
      ChatLib.chat(`${ TextHelper.NAME } &aCleared your blacklist.`)
      break
    }
      
    default:
      return INVALID()
  }
})
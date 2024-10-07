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
  "blacklist": [],

  "clock": {
      "x": 50,
      "y": 50,
      "scale": 1.5,
      "bg": true
    }
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
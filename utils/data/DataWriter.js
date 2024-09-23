// @PogData
class DataWriter {
  constructor(module, path, defaultObj = {}) {
    let data = {}
    try {
      data = JSON.parse(FileLib.read(module, path))
    } catch (err) {
      console.error(err)
    }
    register("gameUnload", () => {
      FileLib.write(
        module,
        path,
        JSON.stringify(this, null, 4),
        true
      )
    })

    Object.assign(this, defaultObj, data)
  }
}

export let data = new DataWriter("NwjnAddons", "/utils/data/User.json", {
  "newUser": true,
  "newMsg": "",

  "power": "Unknown",
  "tuning": "Unknown",
  "enrich": "Unknown",
  "mp": "Unknown",
  "gummy": 0,
  "wisp": 0,
  
  "lastMini": [],
  "ftL": [80, 250, 1, false],
  "poisonL": [300, 300, 1, false],
  "blazeL": [90, 300, 1, false],
  "clockL": [10, 350, 1, false],
  "miniL": [125, 125, 1, false],
  "manaL": [100, 100, 1, false],
  "pityL": [220, 120, 1, false],

  "statsL": [15, 250, 1, false],
  "petL": [15, 250, 1, false],
  "bestiaryL": [15, 250, 1, false],
  "cropL": [15, 250, 1, false],
  "visitorL": [15, 250, 1, false],
  "commL": [15, 250, 1, false],
  "powderL": [15, 250, 1, false],
  "corpseL": [15, 250, 1, false],

  "customL": [15, 250, 1, false]
});

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

import { setRegisters, delay } from "../functions.js";
import { setMobHighlight } from "../../features/Bestiary/MobHighlight";
import { setPlayerHighlight } from "../../features/Bestiary/PlayerHighlight";
import { setStandHighlight } from "../../features/Bestiary/StandHighlight";
import { meinConf } from "../Settings.js"
// sets data when settings is closed and after init
function setData() {
  setRegisters()
  setMobHighlight()
  setPlayerHighlight()
  setStandHighlight()
}
delay(() => setData(), 3000);
meinConf.onCloseGui(() => setData());
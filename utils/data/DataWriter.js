// @PogData
class DataWriter {
  constructor(module, path, defaultObj = {}, errMsg = `&l${ module }-${ fileName } &cData reset.`) {
    let data = {}
    try {
      data = JSON.parse(FileLib.read(module, path))
    } catch (err) {
      console.error(err)
      ChatLib.chat(errMsg)
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

import { PREFIX } from "../constants.js"
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
  "ftL": [80, 250, 1],
  "poisonL": [300, 300, 1],
  "blazeL": [90, 300, 1],
  "clockL": [10, 350, 1],
  "miniL": [125, 125, 1],
  "manaL": [100, 100, 1],
  "pityL": [220, 120, 1],

  "statsL": [15, 250, 1],
  "petL": [15, 250, 1],
  "bestiaryL": [15, 250, 1],
  "cropL": [15, 250, 1],
  "visitorL": [15, 250, 1],
  "commL": [15, 250, 1],
  "powderL": [15, 250, 1],
  "corpseL": [15, 250, 1],

  "customL": [15, 250, 1]
}, `${PREFIX} &cReset user data due to error. Sorry for the inconvenience.`);

// [Player Stat Data]
register("chat", (power) => {
  data.power = power
}).setCriteria("You selected the ${power} power for your Accessory Bag!")

register("chat", (num, enrich) => {
  data.enrich = `${ num } on ${ enrich }`
}).setCriteria("Swapped ${num} enrichments to ${enrich}!")

register("guiMouseRelease", () => {
  const container = Player.getContainer()
  if (container?.getName() !== "Stats Tuning") return

  const itemLore = container.getStackInSlot(4)?.getLore()
    
  const tunings = itemLore?.forEach(l => {
    l.removeFormatting().match();
  })
  while (i--) {
    let line = itemLore[i].removeFormatting()
    if (line.startsWith("+")) {
      tunings.push(
        line.substring(1, line.indexOf(" "))
      )
    }
    else if (line.startsWith("Magical Power: ")) {
      mp = line.split(": ").slice(-1).toString()
    }
  }

  data.tuning = tunings ? tunings.join(" ") : "Unknown"
  data.mp = mp ?? "Unknown"
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
meinConf.onCloseGui(() => setData())
import PogObject from "PogData"

export let data = new PogObject("NwjnAddons", {
  "first_time": true,
  "version": "0.11.6",
  "power": "Unknown",
  "tuning": "Unknown",
  "enrich": "Unknown",
  "mp": "Unknown",
  "pet": "Unknown",
  "gummy": 0,
  "wisp": 0,
  "mobsHighlight": [],
  "standList": [],
  "playerList": [],
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
}, "data.json");


register("chat", (power) => {
  data.power = power
  data.save()
}).setCriteria("You selected the ${power} power for your Accessory Bag!")

register("chat", (num, enrich) => {
  data.enrich = `${ num } on ${ enrich }`
  data.save()
}).setCriteria("Swapped ${num} enrichments to ${enrich}!")

register("guiMouseRelease", () => {
  const container = Player.getContainer()
  if (container?.getName() !== "Stats Tuning") return

  const itemLore = container.getStackInSlot(4)?.getLore()
  let tunings = []
  let mp;

  let i = itemLore?.length ?? 0
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
  data.save()
});

import { setRegisters } from "./functions";
import { meinConf } from "../settings";
import { setMobHighlight } from "../features/Bestiary/MobHighlight";
import { setPlayerHighlight } from "../features/Bestiary/PlayerHighlight";
import { setStandHighlight } from "../features/Bestiary/StandHighlight";
import { delay } from "./functions";

const setData = () => {
  setRegisters()
  setMobHighlight()
  setPlayerHighlight()
  setStandHighlight()

  data.save()
}

meinConf.onCloseGui(setData)

delay(setData, 3000);

import { onWorldLeave } from "./functions";
onWorldLeave(() => data.save())
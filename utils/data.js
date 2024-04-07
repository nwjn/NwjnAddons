import PogObject from "PogData"

export let data = new PogObject("NwjnAddons", {
  "first_time": true,
  "modVer": "0.8.0",
  "power": "Unknown",
  "tuning": "Unknown",
  "enrich": "Unknown",
  "mp": "Unknown",
  "pet": "Unknown",
  "gummy": 0,
  "wisp": 0,
  "mobsHighlight": {},
  "standList": [],
  "playerList": [],
  "lastMinis": [],
  "flare": {
    "kills": 0,
    "xp": 0,
    "vanqs": 0
  },
  "ftL": [15, 250, 1],
  "champL": [15, 250, 1],
  "poisonL": [15, 250, 1],
  "blazeL": [15, 250, 1],
  "clockL": [15, 250, 1],
  "visitorL": [15, 250, 1],
  "miniL": [15, 250, 1],
  "legionL": [15, 250, 1],
  "gyroL": [15, 250, 1],
  "keyGuardL": [15, 250, 1],
  "manaL": [15, 250, 1],
  "mobCountL": [15, 250, 1],

  "statsL": [15, 250, 1],
  "petL": [15, 250, 1],
  "bestiaryL": [15, 250, 1],
  "cropL": [15, 250, 1],
  "pestL": [15, 250, 1],
  "visitorL": [15, 250, 1],
  "contestL": [15, 250, 1],
  "commL": [15, 250, 1],
  "powderL": [15, 250, 1],
  "trophyL": [15, 250, 1],

  "customL": [15, 250, 1]
}, "data.json");

register("gameUnload", () => {
  data.save();
});

import PogObject from "PogData"

export let data = new PogObject("NwjnAddons", {
  "first_time": true,
  "name": undefined,
  "power": undefined,
  "version": 0,
  "gummyTimeLeft": 0,
  "wispTimeLeft": 0,
  "api_key": "",
  "uuid": "",
  "pet": "",
  "lastMini": [],
  "ftL": [15, 250, 1],
  "champL": [15, 250, 1],
  "poisonL": [15, 250, 1],
  "statsL": [15, 250, 1],
  "blazeL": [15, 250, 1],
  "clockL": [15, 250, 1],
  "rainL": [15, 250, 1],
  "visitorL": [15, 250, 1],
  "miniL": [15, 250, 1],
  "legionL": [15, 250, 1],
  "bobbinL": [15, 250, 1],
  "gyroL": [15, 250, 1],
  "alignL": [15, 250, 1],
  "keyGuardL": [15, 250, 1]
}, "data.json");

register("gameUnload", () => {
  data.save();
});

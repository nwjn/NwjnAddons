import { consts, data } from "./constants"
import axios from "axios"


if (data.api_key == "") {
  ChatLib.chat(`${consts.PREFIX} &6Please run '/api new'`)
}

register("chat", (key) => {
  axios.get(`https://api.hypixel.net/key?key=${key}`)
  .then(res => {
    if (res.data.success == true) {
      data.api_key = key;
      data.uuid = res.data.record.owner
      data.save();
      ChatLib.chat(`${ consts.PREFIX } &aSuccsessfully set api key!`);
    }
    else {
      ChatLib.chat(`${ consts.PREFIX } &eKey is not valid!`);
    }
  })
  .catch(err => {
    ChatLib.chat(`${consts.PREFIX} &eKey is not valid!`)
  })
  ChatLib.chat(`${consts.PREFIX} &aApi Key Successfully Set!`)
}).setCriteria(/Your new API key is (.+)/)

import Feature from "../../core/Feature";
import { Event } from "../../core/Event";
import EventEnums from "../../core/EventEnums";
import Party from "../../utils/Party";
import { getPlayerName } from "../../utils/functions";
import { data } from "../../utils/data/Data";
import { TextHelper } from "../../utils/TextHelper";
import { scheduleTask } from "../../core/CustomRegisters";
import Settings from "../../Settings";

const member = [
  [
    ["time"],
    () => {
      const date = new Date()
      const [h, m, s] = [date.getHours(), date.getMinutes(), date.getSeconds()]
      return `${h%12}:${m}:${s} ${h<12?"AM":"PM"}`
    }
  ],
  [
    ["coords", "loc", "xyz"],
    () => `x: ${ ~~Player.getX() }, y: ${ ~~Player.getY() }, z: ${ ~~Player.getZ() }`
  ],
  [
    ["power", "pow"],
    () => `Power: ${data.power} | Tuning: ${data.tuning} | Enrich: ${data.enrich} | MP: ${data.mp}`
  ],
  [
    ["stats"],
    () => "" // todo
  ],
  [
    ["build"],
    () => "https://i.imgur.com/tsg6tx5.jpg" //todo
  ]
]
const leader = [
  [
    ["allinv", "allinvite"],
    () => "p settings allinvite"
  ],
  [
    ["warp"],
    () => "p warp"
  ],
  [
    ["transfer", "pt", "ptme"],
    (player) => `p transfer ${player}`
  ],
  [
    ["dropper"],
    () => "play arcade_dropper"
  ]
]
const instance = {
  f: TextHelper.floors(),
  m: TextHelper.floors(),
  t: TextHelper.tiers(),
  cmd: {
    f: "catacombs_floor_",
    m: "master_catacombs_floor_",
    t: "kuudra_"
  }
}
const help =
  "NwjnAddons Cmds > "
  +
  member.concat(leader).map(([key, _]) => `.${ key[0] }`).join(" | ")
  +
  " | .m1-7 | .f1-7 | .t1-5"

new Feature("party")
  .addEvent(
    new Event(EventEnums.CHAT, (player, cmd) => {
      player = getPlayerName(player).toLowerCase()
      ChatLib.chat(data.blacklist.toString())
      if (data.blacklist.includes(player)) return scheduleTask(() => ChatLib.chat(`${ TextHelper.PREFIX } &4Blacklisted command from &c${ player }`))
      
      cmd = cmd.toLowerCase()
      if (cmd === "help") return scheduleTask(() => ChatLib.chat(`pc ${ help }`), 5) 
      
      let response = null
      member.find(([keys, fn]) => { if (~keys.indexOf(cmd)) return response = fn(player, cmd) })
      
      if (response) return scheduleTask(() => ChatLib.chat(`pc ${ response }`), 5) 
      if (!Party.amILeader()) return
      
      leader.find(([keys, fn]) => { if (~keys.indexOf(cmd)) return response = fn(player, cmd); })
      
      if (/[fmt][1-7]/.test(cmd)) {
        const match = cmd.match(/([fmt])([1-7])/)
        response = `joininstance ${ instance.cmd[match[1]] }${ instance[match[1]][match[2]] }`
      }
      
      if (response) scheduleTask(() => ChatLib.chat(response), 5)
    }, /Party > (.+): [,.?!](.+)/)
  )
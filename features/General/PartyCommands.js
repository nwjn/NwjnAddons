import Feature from "../../core/Feature";
import { Event } from "../../core/Event";
import EventEnums from "../../core/EventEnums";
import Party from "../../utils/Party";
import PlayerUtil from "../../core/static/PlayerUtil";
import { data } from "../../data/Data";
import TextUtil from "../../core/static/TextUtil";
import MathUtil from "../../core/static/MathUtil";
import { scheduleTask } from "../../core/CustomRegisters";
// todo for individual settings
import Settings from "../../data/Settings";

const member = [
  [
    ["time"],
    () => {
      const date = new Date()
      const [h, m, s] = [date.getHours(), date.getMinutes(), date.getSeconds()]
      return `${(h%12) || 12}:${MathUtil.timeFormat(m)}:${MathUtil.timeFormat(s)} ${h<12?"AM":"PM"}`
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
const joinInstance = {
  f: "catacombs_floor_",
  m: "master_catacombs_floor_",
  t: "kuudra_"
}
const help =
  "NwjnAddons Cmds > "
  +
  member.concat(leader).map(([key, _]) => `.${ key[0] }`).join(" | ")
  +
  " | .m1-7 | .f1-7 | .t1-5"

new Feature("party")
  .addEvent(
    new Event(EventEnums.CLIENT.CHAT, (player, cmd) => {
      player = PlayerUtil.getPlayerName(player).toLowerCase()

      if (data.blacklist.includes(player)) return scheduleTask(() => ChatLib.chat(`${ TextUtil.NWJNADDONS } &4Blacklisted command from &c${ player }`))
      
      cmd = cmd.toLowerCase()
      if (cmd === "help") return scheduleTask(() => ChatLib.command(`pc ${ help }`), 5) 
      
      let response
      member.find(([keys, fn]) => { if (~keys.indexOf(cmd)) return response = fn(player, cmd) })
      
      if (response) return scheduleTask(() => ChatLib.command(`pc ${ response }`), 5) 
      if (!Party.amILeader()) return
      
      leader.find(([keys, fn]) => { if (~keys.indexOf(cmd)) return response = fn(player, cmd) })
      
      if (/[fmt][1-7]/.test(cmd)) {
        const match = cmd.match(/([fmt])([1-7])/)
        const command = joinInstance[match[1]]
        const number = match[2]
        const word = ["f", "m"].includes(match[1]) ? TextUtil.getFloorWord(number) : TextUtil.getTierWord(number)
        response = `joininstance ${ command }${ word }`
      }
      
      if (response) scheduleTask(() => ChatLib.command(response), 5)
    }, /Party > (.+): [,.?!](.+)/)
  )
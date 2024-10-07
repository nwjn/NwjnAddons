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
  [["time"], () =>
      `pc ${MathUtil.getTime()}`
    ],
  [["coords", "loc", "xyz"], () =>
      `pc x: ${ ~~Player.getX() }, y: ${ ~~Player.getY() }, z: ${ ~~Player.getZ() }`
    ],
  [
    ["power", "pow"],
    () => `pc Power: ${data.power} | Tuning: ${data.tuning} | Enrich: ${data.enrich} | MP: ${data.mp}`
  ],
  [
    ["stats"],
    () => "" // todo
  ],
  [
    ["build"],
    () => "pc https://i.imgur.com/tsg6tx5.jpg" //todo
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
    (ign, cmd) => cmd.includes(" ") ? `p transfer ${cmd.split(" ").slice(-1)[0]}` : `p transfer ${ign}`
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
    new Event(EventEnums.SERVER.CHAT, (player, cmd, event) => {
      const ign = PlayerUtil.getPlayerName(player).toLowerCase()
      cmd = cmd.toLowerCase()

      if (data.blacklist.includes(ign)) return TextUtil.append(event.func_148915_c(), "&cBlacklisted")
      
      if (cmd === "help") return scheduleTask(() => ChatLib.command(`pc ${ help }`), 5) 
      
      let response
      member.find(([keys, fn]) => { if (~keys.indexOf(cmd)) return response = fn() })

      if (response) return scheduleTask(() => ChatLib.command(response), 5) 
      if (!Party.amILeader()) return
      
      leader.find(([keys, fn]) => { if (~keys.indexOf(cmd.split(" ")[0])) return response = fn(ign, cmd) })
        ||
      TextUtil.matchesCriteria(
        (type, number) => {
          const word = ["f", "m"].includes(type) ? TextUtil.getFloorWord(number) : TextUtil.getTierWord(number)
          const command = joinInstance[type]
          response = `joininstance ${ command }${ word }`
        }, /([fmt]) ?([1-7])/, cmd
      )
      
      if (response) scheduleTask(() => ChatLib.command(response), 5)
    }, /^Party > (.+): [,.?!](.+)$/)
)
  
register("chat", () => {
  ChatLib.command("lobby")
}).setCriteria(/Party > (.+): [,.?!]lobby/);
import Feature from "../../core/Feature";
import { Event } from "../../core/Event";
import EventEnums from "../../core/EventEnums";
import Party from "../../utils/Party";
import { data } from "../../data/Data";
import TextUtil from "../../core/static/TextUtil";
import MathUtil from "../../core/static/MathUtil";
import { getTPS, scheduleTask } from "../../utils/Ticker";
import Location from "../../utils/Location";
import Settings from "../../data/Settings";

const commands = {
  "help": {
    matches: /^help$/,
    access: () => true,
    fn: () => 
      "pc NwjnAddons Cmds > " + Object.keys(commands).map(key => `.${ key }`).join(" | ")
  },

  "time": {
    matches: /^time$/,
    access: () => Settings().pcTime,
    fn: () => "pc " + MathUtil.getTime()
  },
  
  "coords": {
    matches: /^coord(s)?|loc|xyz$/,
    access: () => Settings().pcCoords,
    fn: () => `pc x: ${ ~~Player.getX() }, y: ${ ~~Player.getY() }, z: ${ ~~Player.getZ() } [${Location.area}]`
  },
  
  "power": {
    matches: /^pow(er)?$/,
    access: () => Settings().pcPower,
    fn: () => `pc Power: ${ data.power } | Tuning: ${ data.tuning } | Enrich: ${ data.enrich } | MP: ${ data.mp }`
  },

  "stats": {
    matches: /^stats$/,
    access: () => Settings().pcStats,
    fn: () => 
      "pc " +
      TextUtil.getTabBlock(
        TabList.getNames()
          .map(it => it.removeFormatting()),
        Location.inWorld("catacombs") ? /Skills:/ : /Stats:/
      )
        ?.map(it => it.match(/: (.[\d]+)$/)?.[1])
        ?.join(" | ")
          ?? "Me no have stat widget"
  },

  "tps": {
    matches: /^tps$/,
    access: () => Settings().pcTps,
    fn: () =>
      "pc TPS: " + getTPS()
  },

  "build": {
    matches: /^build$/,
    access: () => Settings().pcBuild,
    fn: () => "pc https://i.imgur.com/tsg6tx5.jpg"
  },

  "allinvite": {
    matches: /^allinv(ite)?$/,
    access: () => Settings().pcAllinvite && Party.amILeader(),
    fn: () => "p settings allinvite"
  },

  "invite": {
    matches: /^inv(ite)?$/,
    access: () => Settings().pcInvite && Party.amILeader(),
    fn: (_, cmd) => `p ${cmd.split(" ").slice(-1)[0]}`
  },

  "warp": {
    matches: /^warp$/,
    access: () => Settings().pcWarp && Party.amILeader(),
    fn: () => "p warp"
  },

  "transfer": {
    matches: /^transfer|pt(me)?$/,
    access: () => Settings().pcTransfer && Party.amILeader(),
    fn: (ign, cmd) => cmd.includes(" ") ? `p transfer ${ cmd.split(" ").slice(-1)[0] }` : `p transfer ${ ign }`
  },

  "f1-7 | .m1-7 | .t1-5": {
    matches: /^([fmt]) ?([1-7])$/,
    access: () => Settings().pcInstance && Party.amILeader(),
    fn: (_, cmd) => {
      const [type, number] = TextUtil.getMatches(/^([fmt]) ?([1-7])$/, cmd)

      switch (type) {
        case "f":
          return `joininstance catacombs_floor_${ TextUtil.getFloorWord(number) }`;
        case "m":
          return `joininstance master_catacombs_floor_${ TextUtil.getFloorWord(number) }`;
        case "t":
          return `joininstance kuudra_${ TextUtil.getTierWord(number) }`;
      }
    }
  }
}

new Feature("partyCommands")
  .addEvent(
    new Event(EventEnums.SERVER.CHAT, (player, command, event) => {
      const ign = TextUtil.getSenderName(player).toLowerCase()
      const cmd = command.toLowerCase()

      if (data.blacklist.includes(ign)) return TextUtil.append(event.func_148915_c(), "&cBlacklisted")
      
      const response = Object.values(commands).find(obj => obj.matches.test(cmd) && obj.access())

      if (response) scheduleTask(() => ChatLib.command(response.fn(ign, cmd)), 4)
    }, /^Party > (.+): [,.?!](.+)$/)
)
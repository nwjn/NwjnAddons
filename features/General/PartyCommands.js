import Feature from "../../libs/Features/Feature"
import Party from "../../utils/Party"
import Data from "../../data/Data"
import TextUtil from "../../libs/Helper/TextUtil"
import Location from "../../utils/Location"
import Settings from "../../data/Settings"
import { getTPS, scheduleTask } from "../../libs/Time/ServerTime"
import Nwjn from "../../libs/Helper/Nwjn"

class PartyCommand {
    constructor(pattern, access, runnable) {
        this.pattern = pattern
        this.access = access
        this.runnable = runnable
    }

    isAllowed(cmd) {
        if (!this.pattern.test(cmd)) return false
        if (!this.access()) return false

        return true
    }

    run(sender, args) {
        this.runnable(sender, args)
    }
}

new class PartyCommands extends Feature {
    constructor() {
        super({setting: this.constructor.name})

        this.commandList = []
        this.helpMessage = []

        this.initCommands()

        this.addEvent(
            "serverChat", 
            this.onPartyCommandSent.bind(this), 
            /^Party > ([^:]+): [_,.?!]([^\s]+)(.+)?$/
        )

        this.init()
    }

    onPartyCommandSent(player, command, arg, event) {
        const sender = TextUtil.getSenderName(player).toLowerCase()
        if (sender in Data.blacklist) return Nwjn.append(event./* getChatComponent */func_148915_c(), "§cBlacklisted")

        const cmd = command.toLowerCase()
        if (cmd === "help") return this.helpMessage()

        for (let i = 0; i < this.commandList.length; i++) {
            let pc = this.commandList[i]
            
            if (!pc.isAllowed(cmd)) continue

            scheduleTask(() => pc.run(sender, arg, cmd))
            break
        }
    }

    addCommand({usage, pattern, access, runnable}) {
        this.commandList.push(new PartyCommand(pattern, access, runnable))
        this.helpMessage.push(usage)
    }

    initCommands() {
        this.addCommand({
            usage: ".time",
            pattern: /^time$/,
            access: () => Settings.PartyCommandsTime,
            runnable() {
                const formatter = new java.text.SimpleDateFormat("E hh:mm:ss a z", java.util.Locale.US)
                const response = formatter.format(Date.now())

                ChatLib.say(`/pc ${response}`)
            }
        })

        this.addCommand({
            usage: ".coords",
            pattern: /^coords?|loc|xyz$/,
            access: () => Settings.PartyCommandsCoords,
            runnable() {
                const response = `x: ${~~Player.getX()}, y: ${~~Player.getY()}, z: ${~~Player.getZ()} [${Location.world} - ${Location.zone}]`

                ChatLib.say(`/pc ${response}`)
            }
        })

        this.addCommand({
            usage: ".power",
            pattern: /^pow(er)?$/,
            access: () => Settings.PartyCommandsPower,
            runnable() {
                const response = `Power: ${ Data.power } | Tuning: ${ Data.tuning } | Enrich: ${ Data.enrich } | MP: ${ Data.mp }`

                ChatLib.say(`/pc ${response}`)
            }
        })

        this.addCommand({
            usage: ".stats",
            pattern: /^stats?$/,
            access: () => Settings.PartyCommandsStats,
            runnable() {
                const hypixelMoment = Location.inWorld("Catacombs") ? /Skills:/ : /Stats:/
                const widget = TextUtil.getTabBlock(TabList.getNames(), hypixelMoment)
                if (!widget) return Nwjn.chat("Cannot find stats widget in tab")

                const stats = widget.map(it => it.removeFormatting().match(/: (.[\d]+)$/)?.[1])
                const response = stats.join(" | ")

                ChatLib.say(`/pc ${response}`)
            }
        })

        this.addCommand({
            usage: ".tps",
            pattern: /^tps$/,
            access: () => Settings.PartyCommandsTPS,
            runnable() {
                const tps = getTPS()
                const response = `TPS: ${tps}`

                ChatLib.say(`/pc ${response}`)
            }
        })

        this.addCommand({
            usage: ".allinv",
            pattern: /^allinv(ite)?$/,
            access: () => Settings.PartyCommandsAllInvite && Party.amILeader(),
            runnable: () => ChatLib.say("/p settings allinvite")
        })

        this.addCommand({
            usage: ".inv <ign>",
            pattern: /^inv(ite)?$/,
            access: () => Settings.PartyCommandsInvite && Party.amILeader(),
            runnable: (_, invitee) => ChatLib.say(`/p ${invitee}`)
        })

        this.addCommand({
            usage: ".warp",
            pattern: /^warp$/,
            access: () => Settings.PartyCommandsWarp && Party.amILeader(),
            runnable: () => ChatLib.say("/p warp")
        })

        this.addCommand({
            usage: ".pt <ign?>",
            pattern: /^transfer|pt(me)?$/,
            access: () => Settings.PartyCommandsTransfer && Party.amILeader(),
            runnable(sender, ign) {
                const target = ign ?? sender
                ChatLib.say(`/p transfer ${target}`)
            }
        })
        
        this.addCommand({
            usage: ".f1-7 | .m1-7 | .t1-5",
            pattern: /^(f|m) ?[1-7]|t ?[1-5]$/,
            access: () => Settings.PartyCommandsInstance && Party.amILeader(),
            runnable(_, __, cmd) {
                const [type, number] = TextUtil.getMatches(/^(f|m) ?[1-7]|t ?[1-5]$/, cmd)

                switch (type) {
                    case 'f': return ChatLib.say(`/joininstance catacombs_floor_${TextUtil.getFloorWord(number)}`)
                    case 'm': return ChatLib.say(`/joininstance master_catacombs_floor_${TextUtil.getFloorWord(number)}`)
                    case 't': return ChatLib.say(`/joininstance kuudra_${TextUtil.getTierWord(number)}`)
                    default:  return ChatLib.say("/pc Invalid instance?")
                }
            }
        })

        this.helpMessage = () => Nwjn.say(this.helpMessage.join(" | "))
        delete this.addCommand
        delete this.initCommands
    }
}
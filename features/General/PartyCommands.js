import Data from "../../data/Data"
import ConfigProperty from "../../data/ConfigProperty"

import Nwjn from "../../libs/Helper/Nwjn"
import Party from "../../libs/Hypixel/Party"
import Feature from "../../libs/Features/Feature"
import TextUtil from "../../libs/Helper/TextUtil"

import Location from "../../../tska/skyblock/Location"
import { getServerTPS } from "../../../tska/shared/ServerTick"

void new class extends Feature {
    constructor() {
        super({
            setting: new ConfigProperty("Switch", {
                category: "General",
                subcategory: "Party Commands",
                configName: "PartyCommands",
                title: "Party Commands",
                description: "Enables party commands, universally triggers on [.,!?] commands"
            }),
        
            options: new ConfigProperty("MultiCheckbox", {
                category: "General",
                subcategory: "Party Commands",
                configName: "PartyCommandToggles",
                title: "➤ Party Command Toggles",
                description: "     Toggles for various party commands",
                placeHolder: "Click",
                options: [
                    { title: "Join Instance", configName: "PartyCommandsInstance", value: true },
                    { title: "Party Transfer <?ign>", configName: "PartyCommandsTransfer", value: true },
                    { title: "Warp", configName: "PartyCommandsWarp", value: true },
                    { title: "Invite <ign>", configName: "PartyCommandsInvite", value: true },
                    { title: "All Invite", configName: "PartyCommandsAllInvite", value: true },
                    { title: "Server TPS", configName: "PartyCommandsTPS", value: "true" },
                    { title: "Tab Stats", configName: "PartyCommandsStats", value: true },
                    { title: "Power, Tuning, Enrich, MP Data", configName: "PartyCommandsPower", value: true },
                    { title: "Send Coords", configName: "PartyCommandsCoords", value: true },
                    { title: "Your Current Time", configName: "PartyCommandsTime", value: true }
                ],
                shouldShow: data => data.PartyCommands
            }),
        
            COMMAND_SENT_REGEX: /^Party > ([^:]+): [_,.?!]([^\s]+)(.+)?$/,
        
            commandList: [],
            helpMessage: []
        })

        this.addEvent("ServerChat", this.onPartyCommandSent.bind(this), { setCriteria: this.COMMAND_SENT_REGEX })
    }

    onPartyCommandSent(player, command, arg, event) {
        const sender = TextUtil.getSenderName(player).toLowerCase()
        if (sender in Data.blacklist) return Nwjn.append(event./* getChatComponent */func_148915_c(), "§cBlacklisted")

        const cmd = command.toLowerCase()
        if (cmd === "help") return Nwjn.say(this.helpMessage)

        for (let partyCommand of this.commandList) {
            if (partyCommand.pattern.test(cmd)) 
                return Client.scheduleTask(5, () => partyCommand.runnable(sender, arg, cmd))
        }
    }

    addCommand({ usage, pattern, runnable }) {
        this.commandList.push({ pattern, runnable })
        this.helpMessage.push(usage)
    }

    postInit() {
        this.addCommand({
            usage: ".time",
            pattern: /^time$/,
            runnable: () => {
                if (!this.options.PartyCommandsTime.value) return

                const formatter = new java.text.SimpleDateFormat("E hh:mm:ss a z", java.util.Locale.US)
                
                Nwjn.say(formatter.format(Date.now()))
            }
        })

        this.addCommand({
            usage: ".coords",
            pattern: /^coords?|loc|xyz$/,
            runnable: () => {
                if (!this.options.PartyCommandsCoords.value) return

                Nwjn.sendCoords(`[${Location.area} - ${Location.subarea}]`)
            }
        })

        this.addCommand({
            usage: ".power",
            pattern: /^pow(er)?$/,
            runnable: () => {
                if (!this.options.PartyCommandsPower.value) return

                Nwjn.say(`Power: ${ Data.power } | Tuning: ${ Data.tuning } | Enrich: ${ Data.enrich } | MP: ${ Data.mp }`)
            }
        })

        this.addCommand({
            usage: ".stats",
            pattern: /^stats?$/,
            runnable: () => {
                if (!this.options.PartyCommandsStats.value) return

                const hypixelMoment = Location.inWorld("Catacombs") ? /Skills:/ : /Stats:/
                const widget = TextUtil.getTabBlock(TabList.getNames(), hypixelMoment)
                if (!widget) return Nwjn.chat("Cannot find stats widget in tab")

                const stats = widget.map(it => it.removeFormatting().match(/: (.[\d]+)$/)?.[1])
                const response = stats.join(" | ")

                Nwjn.say(response)
            }
        })

        this.addCommand({
            usage: ".tps",
            pattern: /^tps$/,
            runnable: () => {
                if (!this.options.PartyCommandsTPS.value) return

                Nwjn.say(`TPS: ${getServerTPS().toFixed(3)}`)
            }
        })

        this.addCommand({
            usage: ".allinv",
            pattern: /^allinv(ite)?$/,
            runnable: () => {
                if (!this.options.PartyCommandsAllInvite.value || !Party.isLeader) return

                Nwjn.partyCommand("settings allinvite")
            }
        })

        this.addCommand({
            usage: ".inv <ign>",
            pattern: /^inv(ite)?$/,
            runnable: (_, invitee) => {
                if (!this.options.PartyCommandsInvite.value || !Party.isLeader) return

                Nwjn.partyCommand(invitee)
            }
        })

        this.addCommand({
            usage: ".warp",
            pattern: /^warp$/,
            runnable: () => {
                if (!this.options.PartyCommandsWarp.value || !Party.isLeader) return

                Nwjn.partyCommand("warp")
            }
        })

        this.addCommand({
            usage: ".pt <ign?>",
            pattern: /^transfer|pt(me)?$/,
            runnable: (sender, ign) => {
                if (!this.options.PartyCommandsTransfer.value || !Party.isLeader) return

                Nwjn.partyCommand(`transfer ${ign ?? sender}`)
            }
        })
        
        this.addCommand({
            usage: ".f1-7 | .m1-7 | .t1-5",
            pattern: /^(f|m) ?[1-7]|t ?[1-5]$/,
            runnable: (_, __, cmd) => {
                if (!this.options.PartyCommandsInstance.value || !Party.isLeader) return
                
                const match = cmd.match(/^(f|m) ?[1-7]|t ?[1-5]$/)
                if (!match) return

                const [_, type, number] = match

                switch (type) {
                    case 'f': return ChatLib.say(`/joininstance catacombs_floor_${TextUtil.getFloorWord(number)}`)
                    case 'm': return ChatLib.say(`/joininstance master_catacombs_floor_${TextUtil.getFloorWord(number)}`)
                    case 't': return ChatLib.say(`/joininstance kuudra_${TextUtil.getTierWord(number)}`)
                    default:  return ChatLib.say("/pc Invalid instance?")
                }
            }
        })

        this.helpMessage = this.helpMessage.join(" | ")
    }
}
import Nwjn from "./Nwjn"
import ConfigProperty from "../../data/ConfigProperty"
import { CommandHandler } from "../../../tska/command/CommandHandler"

// const myCommands = new CommandHandler("Nwjn")

//     // Default setup to open module gui
//     .setName("Nwjn", (arg) => !arg && !!ConfigProperty.getConfig()?.openGui())

//     // Add custom formatting
//     .setCommandFormat("  • §n§b${name}§r§f: §7${description}")
//     .setErrorFormat(`${Nwjn.LOGO}§cCommand §b§l/\$\{arg\}§r§c is unknown. Run §a§l/nwjn help§r§c.`)
//     Object.defineProperty(myCommands, "titleFormat", { get: () => ChatLib.getCenteredText(Nwjn.BANNER) })

// export function addCommand({ name, aliases, description, run, tabCompletions = null, clickAction = "suggest" }) {
//     if (clickAction === "suggest") {
//         let cb = run

//         run = (...args) => {
//             if (!args?.[0]) return Client.scheduleTask(() => Client.setCurrentChatMessage(`/nwjn ${name} `))
//             cb(...args)
//         }
//     }

//     myCommands.pushWithAlias(name, aliases, description, run)

//     if (tabCompletions) myCommands.setTabCompletion(name, tabCompletions)
// }

export default new class extends CommandHandler {
    constructor() {
        super("Nwjn")

        // Default setup to open module gui
        this.setName("Nwjn", (arg) => !arg && !!ConfigProperty.getConfig()?.openGui())

        // Add custom formatting
        this.setCommandFormat("  • §n§b${name}§r§f: §7${description}")
        this.setErrorFormat(`${Nwjn.LOGO}§cCommand §b§l/\$\{arg\}§r§c is unknown. Run §a§l/nwjn help§r§c.`)

        this.ACTION = { SUGGEST: 0, RUN: 1 }
    }

    get titleFormat() {
        return ChatLib.getCenteredText(Nwjn.BANNER)
    }

    addCommand({ name, aliases, description, run, tabCompletions = null, clickAction = this.ACTION.SUGGEST }) {
        if (clickAction === this.ACTION.SUGGEST) {
            let cb = run

            run = (...args) => {
                if (!args?.[0]) return Client.scheduleTask(() => Client.setCurrentChatMessage(`/nwjn ${name} `))
                cb(...args)
            }
        }

        this.pushWithAlias(name, aliases, description, run)

        if (tabCompletions) this.setTabCompletion(name, tabCompletions)
    }
    }
import Nwjn from "./Nwjn"
import Config from "../../data/Config"
import { CommandHandler } from "../../../tska/command/CommandHandler"

export default new class extends CommandHandler {
    constructor() {
        super("Nwjn")

        // Default setup to open module gui
        this.setName("Nwjn", (arg) => !arg && !!Config.getConfig()?.openGui())

        // Add custom formatting
        this.setCommandFormat("  • §n§b${name}§r§f: §7${description}")
        this.setErrorFormat(`${Nwjn.LOGO}§cCommand §b§l/\$\{arg\}§r§c is unknown. Run §a§l/nwjn help§r§c.`)
        Object.defineProperty(this, "titleFormat", { get: () => ChatLib.getCenteredText(Nwjn.BANNER) })
    }

    addCommand({ name, aliases, description, run, tabCompletions = null, clickAction = "run_command", asOwnCommand = false }) {
        if (asOwnCommand) {
            register("command", (...args) => 
                this.commands[name].cb(...args)
            ).setName(name).setAliases(aliases)
        }

        this.pushWithAlias(name, aliases, description, run, clickAction)

        if (tabCompletions) this.setTabCompletion(name, tabCompletions)
    }

    addEntryListCommand({ name, aliases, description, entryFuncs }) {
        const tabCompletions = Object.keys(entryFuncs)

        const run = (...args) => {
            const action = args?.shift()?.toLowerCase()
            const fn = entryFuncs[action]
            if (!fn) return

            fn(args)
        }

        this.addCommand({ name, aliases, description, run, tabCompletions: () => tabCompletions, clickAction: "suggest_command", asOwnCommand: false})
    }
}
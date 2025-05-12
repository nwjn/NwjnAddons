import Nwjn from "./Nwjn"
import ConfigProperty from "../../data/ConfigProperty"
import { CommandHandler } from "../../../tska/command/CommandHandler"

const myCommands = new CommandHandler("Nwjn")

    // Default setup to open module gui
    .setName("Nwjn", (arg) => !arg && !!ConfigProperty.getConfig()?.openGui())

    // Add custom formatting
    .setCommandFormat("  • §n§b${name}§r§f: §7${description}")
    .setErrorFormat(`${Nwjn.LOGO}§cCommand §b§l/\$\{arg\}§r§c is unknown. Run §a§l/nwjn help§r§c.`)
    Object.defineProperty(myCommands, "titleFormat", { get: () => ChatLib.getCenteredText(Nwjn.BANNER) })

export function addCommand({ name, aliases, description, run, tabCompletions = null, clickAction = "suggest" }) {
    if (clickAction === "suggest") {
        let cb = run

        run = (...args) => {
            if (!args?.[0]) return Client.scheduleTask(() => Client.setCurrentChatMessage(`/nwjn ${name} `))
            cb(...args)
        }
    }

    myCommands.pushWithAlias(name, aliases, description, run)

    if (tabCompletions) myCommands.setTabCompletion(name, tabCompletions)
}
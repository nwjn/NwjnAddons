import Nwjn from "./Nwjn"
import ConfigProperty from "../../data/ConfigProperty"
import { CommandHandler } from "../../../tska/command/CommandHandler"

const myCommands = new CommandHandler("Nwjn")

    // Default setup to open module gui
    .setName("Nwjn", (arg) => !arg && ConfigProperty.getConfig()?.openGui() && 1)

    // Add custom formatting
    .setCommandFormat("  • §n§b/${name}§r§f: §7${description}")
    .setErrorFormat(Nwjn.LOGO + "§cCommand §b§l/${arg}§r§c is unknown. Run §a§l/nwjn help§r§c.")
    Object.defineProperty(myCommands, "titleFormat", {get: () => ChatLib.getCenteredText(Nwjn.BANNER)})

export function addCommand(command, description, cb) {
    myCommands.push(command, description, cb)
}
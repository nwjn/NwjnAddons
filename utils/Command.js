import Settings from "../data/Settings"
import { CommandHandler } from "../../tska/command/CommandHandler"

const myCommands = new CommandHandler("Nwjn")

    // Default setup to open module gui
    .setName("Nwjn", (arg) => !arg && Settings.getConfig().openGui() && 1)

    // Add custom formatting
    .setTitleFormat(ChatLib.getCenteredText("§0§m§l---------§r§0§l 【§r §c§lNwjn§0§l 】§r§0§m§l---------"))
    .setCommandFormat("  • §n§b/${name}§r§f: §7${description}")
    .setErrorFormat("§r§0§l【§r§c§lNwjn§0§l】§r§cCommand §b§l/${arg}§r§c is unknown. Run §a§l/nwjn help§r§c.")


export function addCommand(command, description, cb) {
    myCommands.push(command, description, cb)
}

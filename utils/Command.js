import Settings from "../data/Settings"
import { CommandHandler } from "../../tska/command/CommandHandler"

const myCommands = new CommandHandler("Nwjn")
    // Default setup to open module gui
    .setName("nwjn", () => Settings.getConfig().openGui() && 1)
    // Add custom formatting
    .setTitleFormat("§0§l[§c§l${name}§0§l]§r §6Commands:")
    .setCommandFormat("   [§n§b/${name}§r]§f: §7${description}")

export function addCommand(command, description, cb) {
    myCommands.push(command, description, cb)
}
import { DataStore } from "../../../tska/storage/DataStore"
import ConfigProperty from "../../data/ConfigProperty"

export default new class {
    constructor() {
        let { version, requires } = this.parse("metadata.json")
        
        this.VERSION = version
        this.DEPENDENCIES = requires.map(lib => [lib, DataStore.fromFile(lib, "metadata.json").version])
        
        this.API = DataStore.fromUrl("https://chattriggers.com/api/modules/NwjnAddons")

        this.BANNER = "§r§0§m§l---------§r§0§l 【§r §c§lNwjn§0§l 】§r§0§m§l---------§r"
        this.STAMP = "【Nwjn】"
        this.LOGO = "§r§0§l【§r§c§lNwjn§0§l】§r"

        new ConfigProperty("TextParagraph", {
            category: "Home",
            subcategory: "Info",
            configName: "dependencies",
            title: "§6§lPowered by:§r",
            description: "\n" + this.DEPENDENCIES.map(([lib, ver], idx) => `§r§${(idx + 10).toString(16)}${lib}-${ver}§r`).join("\n"),
            centered: true
        })

        new ConfigProperty("Button", {
            category: "Home",
            subcategory: "Info",
            configName: "github",
            title: "Github",
            description: "Contribute to, or track this project's progress and pre-releases!",
            onClick: () => this.openLink("https://github.com/nwjn")
        })

        new ConfigProperty("Button", {
            category: "Home",
            subcategory: "Info",
            configName: "discord",
            title: "Discord",
            description: "Send feedback including suggestions and bug-reports!",
            onClick: () => this.openLink("https://discord.com/invite/3S3wXpC4gE")
        })
    }

    chatComponent(message) {
        return new TextComponent(`${this.LOGO}§7>§r ${message}`)
    }

    chat(message) {
        ChatLib.chat(`${this.LOGO}§7>§r ${message}`)
    }

    from(message) {
        ChatLib.chat(`${this.LOGO}§dFrom §6nwjn§r: ${message}`)
    }

    say(message) {
        this.partyChat(this.STAMP + message)
    }

    sendCoords(message) {
        this.partyChat(`x: ${~~Player.getX()}, y: ${~~Player.getY()}, z: ${~~Player.getZ()}${this.STAMP}${message}`)
    }

    partyCommand(message) {
        ChatLib.command(`p ${message}`, false)
    }

    partyChat(message) {
        ChatLib.command(`pc ${message}`, false)
    }

    addToSendHistory(message) {
        ChatLib.addToSentMessageHistory(-1, message)
    }

    edit(message, id) {
        if (!World.isLoaded()) return
        ChatLib.deleteChat(id)
        new Message(`${this.LOGO}§7>§r ${message}`).setChatLineId(id).chat()
    }

    append(textComponent, message) {
        return textComponent./* appendText */func_150258_a(`${this.LOGO}${message}`)
    }

    write(path, object) {
        DataStore.saveTo("Nwjn", path, object)
    }

    parse(path) {
        return DataStore.fromFile("Nwjn", path, true)
    }

    openLink(url) {
        java.awt.Desktop.getDesktop().browse(java.net.URI.create(url))
        this.chat(`Link opened: ${url}`)
    }
}
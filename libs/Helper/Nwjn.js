import { DataStore } from "../../../tska/storage/DataStore"

export default new class Nwjn {
    constructor() {
        const { version, requires } = this.parse("metadata.json")
        
        this.VERSION = version
        this.DEPENDENCIES = requires.map(lib => [lib, DataStore.fromFile(lib, "metadata.json").version])
        
        this.API = DataStore.fromUrl("https://chattriggers.com/api/modules/NwjnAddons")

        this.BANNER = "§r§0§m§l---------§r§0§l 【§r §c§lNwjn§0§l 】§r§0§m§l---------§r"
        this.STAMP = "【Nwjn】"
        this.LOGO = "§r§0§l【§r§c§lNwjn§0§l】§r"
    }

    chat(message) {
        ChatLib.chat(`${this.LOGO}§7>§r ${message}`)
    }

    from(message) {
        ChatLib.chat(`${this.LOGO}§dFrom §6nwjn§r: ${message}`)
    }

    say(message) {
        ChatLib.command(`pc ${this.STAMP}${message}`, false)
    }

    sendCoords(message) {
        ChatLib.command(`pc x: ${~~Player.getX()}, y: ${~~Player.getY()}, z: ${~~Player.getZ()}${this.STAMP}${message}`, false)
    }

    partyCommand(message) {
        ChatLib.command(`p ${message}`)
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
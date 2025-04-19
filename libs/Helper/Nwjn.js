import { DataStore } from "../../../tska/storage/DataStore"

const { version, requires } = JSON.parse(FileLib.read("Nwjn", "metadata.json"))
const dependencies = requires.map(lib => [lib, JSON.parse(FileLib.read(lib, "metadata.json")).version])

export default class Nwjn {
    static BANNER = "§r§0§m§l---------§r§0§l 【§r §c§lNwjn§0§l 】§r§0§m§l---------§r"
    static STAMP = "【Nwjn】"
    static LOGO = "§r§0§l【§r§c§lNwjn§0§l】§r"
    static VERSION = version
    static DEPENDENCIES = dependencies

    static chat(message) {
        ChatLib.chat(`${Nwjn.LOGO}§7>§r ${message}`)
    }

    static say(message) {
        ChatLib.say(`/pc ${Nwjn.STAMP}${message}`)
    }

    static sendCoords(message) {
        ChatLib.say(`/pc x: ${~~Player.getX()}, y: ${~~Player.getY()}, z: ${~~Player.getZ()}${Nwjn.STAMP}${message}`)
    }

    static edit(message, id) {
        if (!World.isLoaded()) return
        ChatLib.deleteChat(id)
        new Message(`${Nwjn.LOGO}§7>§r ${message}`).setChatLineId(id).chat()
    }

    static append(textComponent, message) {
        return textComponent./* appendText */func_150258_a(`${Nwjn.LOGO}${message}`)
    }

    static write(path, object) {
        DataStore.saveTo("Nwjn", path, object)
    }

    static parse(path) {
        return DataStore.fromFile("Nwjn", path, true)
    }

    static openLink(url) {
        java.awt.Desktop.getDesktop().browse(java.net.URI.create(url))
        Nwjn.chat(`Link opened: ${url}`)
    }
}
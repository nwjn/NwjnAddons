export default class Nwjn {
    static BANNER = "§r§0§m§l---------§r§0§l 【§r §c§lNwjn§0§l 】§r§0§m§l---------§r"
    static LOGO = "§r§0§l【§r§c§lNwjn§0§l】§r"
    static STAMP = "【Nwjn】"
    static VERSION = JSON.parse(FileLib.read("Nwjn", "metadata.json")).version

    static chat(message) {
        ChatLib.chat(`${this.LOGO}§7>§r ${message}`)
    }

    static say(message) {
        ChatLib.say(`/pc ${this.STAMP}${message}`)
    }

    static sendCoords(message) {
        ChatLib.say(`/pc x: ${~~Player.getX()}, y: ${~~Player.getY()}, z: ${~~Player.getZ()}${this.STAMP}${message}`)
    }

    static edit(message, id) {
        ChatLib.deleteChat(id)
        new Message(`${this.LOGO}§7>§r ${message}`).setChatLineId(id).chat()
    }

    static append(textComponent, message) {
        return textComponent./* appendText */func_150258_a(`${this.LOGO}${message}`)
    }
}
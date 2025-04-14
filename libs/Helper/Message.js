export default class Nwjn {
    static VERSION = JSON.parse(FileLib.read("Nwjn", "metadata.json")).version

    static chat(message) {
        ChatLib.chat(`${NWJN} §7>§r ${message}`)
    }

    static say(message) {
        ChatLib.say(`/pc【Nwjn】${message}`)
    }

    static sendCoords(message) {
        ChatLib.say(`/pc x: ${~~Player.getX()}, y: ${~~Player.getY()}, z: ${~~Player.getZ()}【 Nwjn 】${message}`)
    }

    static edit(message, id) {
        ChatLib.deleteChat(id)
        new Message(`${NWJN} §7>§r ${message}`).setChatLineId(id).chat()
    }

    static append(textComponent, message) {
        return textComponent./* appendText */func_150258_a(`${NWJN} ${message}`)
    }
}
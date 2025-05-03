import Data from "../../data/Data"
import { DataStore } from "../../../tska/storage/DataStore"

const { version, requires } = Nwjn.parse("metadata.json")
const dependencies = requires.map(lib => [lib, DataStore.fromFile(lib, "metadata.json").version])
const api = DataStore.fromUrl("https://chattriggers.com/api/modules/NwjnAddons")

export default class Nwjn {
    static BANNER = "§r§0§m§l---------§r§0§l 【§r §c§lNwjn§0§l 】§r§0§m§l---------§r"
    static STAMP = "【Nwjn】"
    static LOGO = "§r§0§l【§r§c§lNwjn§0§l】§r"
    static VERSION = version
    static DEPENDENCIES = dependencies
    static API = api

    static chat(message) {
        ChatLib.chat(`${Nwjn.LOGO}§7>§r ${message}`)
    }

    static from(message) {
        ChatLib.chat(`${Nwjn.LOGO} §dFrom §6nwjn§r: ${message}`)
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

    /** @private */
    static checkNewUser() {
        if (!Data.newUser) return

        const welcome = register("worldLoad", () => {
            welcome.unregister()
            Data.newUser = false

            Nwjn.from("Welcome! Open settings with '/nwjn'. Official Discord: https://discord.gg/3S3wXpC4gE")
        })
    }
    
    /** @private */
    checkMessenger() {
        const messenger = register("worldLoad", () => {
            messenger.unregister()
            
            const match = api?.description?.match(/\[(.+)\]: # $/)
            const message = match?.[1]
            if (!message) return

            if (message !== "Nothing Here Yet" && message !== Data.newMsg) {
                Nwjn.from(message)
                Data.newMsg = message
            }
        });
    }
    
    /** @private */
    static checkModVersion() {
        const version = register("worldLoad", () => {
            version.unregister()

            const latestRelease = api?.releases?.[0]
            if (!latestRelease) return

            const { releaseVersion, modVersion } = latestRelease
            const rel = Nwjn.compareVersions(Nwjn.VERSION, releaseVersion)
            const mod = Nwjn.compareVersions(ChatTriggers.MODVERSION, modVersion)
    
            if (rel === 0 && mod === -1) 
                Nwjn.chat(`Please use Chattriggers-v${modVersion} to run this module most efficiently. https://github.com/ChatTriggers/ChatTriggers/releases/tag/${modVersion}`)
        })
    }
    
    /** @private */
    static compareVersions(current, compareTo) {
        const v1 = current.split(".")
        const v2 = compareTo.split(".")
    
        for (let i = 0; i < 3; i++) {
            let p1 = ~~v1[i]
            let p2 = ~~v2[i]
            if (p1 === p2) continue
    
            else if (p1 > p2) return 1
            else return -1
        }
    
        return 0
    }
}

Nwjn.checkNewUser()
Nwjn.checkMessenger()
Nwjn.checkModVersion()
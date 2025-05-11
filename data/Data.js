import Nwjn from "../libs/Helper/Nwjn"
import Event from "../libs/Events/Event"
import Ticks from "../libs/Time/Ticks"
import { addCommand } from "../libs/Helper/Command"
import { scheduleTask } from "../libs/Time/Scheduler"
import { LocalStore } from "../../tska/storage/LocalStore"

new class Data {
    static data = new LocalStore("Nwjn", {
        "newUser": true,
        "newMsg": "",
        "power": "Unknown",
        "tuning": "Unknown",
        "enrich": "Unknown",
        "mp": "Unknown",
        "gummy": 0,
        "lastMini": {},
        "blacklist": {}
    }, "data/.User.json")

    constructor() {
        new Event("ServerChat", this.onPowerChange.bind(this), { setCriteria: /^You selected the (.+) power for your Accessory Bag!$/ })
        new Event("ServerChat", this.onSwapEnrich.bind(this), { setCriteria: /^Swapped (\d+) enrichments to (.+)!$/ })
        new Event("ContainerClick", this.onStatTuning.bind(this), { setCriteria: /$Stats Tuning^/ })

        addCommand("bl", "Blacklist <add, remove, list, clear> <name?> <reason?>", this.blacklist.bind(this))

        this.checkNewUser()
        this.checkMessenger()
        this.checkModVersion()
    }

    onPowerChange(powerStone) {
        Data.data.power = powerStone
    }

    onSwapEnrich(volume, stat) {
        Data.data.enrich = `${volume} ${stat}`
    }

    onStatTuning() {
        scheduleTask(() => {
            const lore = Player.getContainer()?.getStackInSlot(4)?.getLore()?.join("\n")?.removeFormatting()
            if (!lore) return
    
            const tuning = lore.match(/\+(\d+.) /g)
            Data.data.tuning = tuning?.join(" ") ?? "Unknown"
    
            const magPow = lore.match(/Magical Power: ([\d,]+)/g)
            Data.data.mp = magPow ?? "Unknown"
        }, Ticks.of(2))
    }

    blacklist(type, name, reason = "No reason given.") {
        name = name?.toLowerCase()
        type = type?.toLowerCase()

        switch (type) {
            case "add" && name: {
                Data.data.blacklist[name] = reason
                return Nwjn.chat(`§aAdded §c${name} §ato your blacklist.`)
            }

            case "remove" && name: {
                delete Data.data.blacklist[name]
                return Nwjn.chat(`§aRemoved §c${name} §afrom your blacklist.`)
            }
            
            case "list": {
                Nwjn.chat("§cBlacklist:")
                return Object.entries(Data.data.blacklist).forEach(([ign, reason]) => 
                    new TextComponent(`  - &a${ign}&f: &c${reason}`)
                        .setHover("show_text", `Click to run "/nwjn bl remove ${ign}" to remove ${ign} from the blacklist.`)
                        .setClick("run_command", `/nwjn bl remove ${ign}`)
                        .chat()
                )
            }
        
            case "clear": {
                Data.data.blacklist = {}
                return Nwjn.chat("§cCleared your blacklist.")
            }
            
            default: {
                return Nwjn.chat("§cInvalid. §a[Add] and [remove] need a name entry. [List] and [clear] do not.")
            }
        }
    }

    checkNewUser() {
        if (!Data.data.newUser) return

        const welcome = register("worldLoad", () => {
            welcome.unregister()
            Data.data.newUser = false

            Nwjn.from("Welcome! Open settings with '/nwjn'. Official Discord: https://discord.gg/3S3wXpC4gE")
        })
    }

    checkMessenger() {
        const messenger = register("worldLoad", () => {
            messenger.unregister()
            
            const match = Nwjn.API?.description?.match(/\[(.+)\]: # $/)
            const message = match?.[1]
            if (!message) return

            if (message !== "Nothing" && message !== Data.data.newMsg) {
                Nwjn.from(message)
                Data.data.newMsg = message
            }
        });
    }

    checkModVersion() {
        const version = register("worldLoad", () => {
            version.unregister()

            const latestRelease = Nwjn.API?.releases?.[0]
            if (!latestRelease) return

            const { releaseVersion, modVersion } = latestRelease
            const rel = this.compareVersions(Nwjn.VERSION, releaseVersion)
            const mod = this.compareVersions(ChatTriggers.MODVERSION, modVersion)
    
            if (rel === 0 && mod === -1) 
                Nwjn.chat(`Please use Chattriggers-v${modVersion} to run this module most efficiently. https://github.com/ChatTriggers/ChatTriggers/releases/tag/${modVersion}`)
        })
    }

    compareVersions(current, compareTo) {
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

export default Data.data
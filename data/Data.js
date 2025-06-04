import Nwjn from "../libs/Helper/Nwjn"
import Event from "../libs/Events/Event"
import Ticks from "../libs/Time/Ticks"
import Command from "../libs/Helper/Command"
import { scheduleTask } from "../libs/Time/Scheduler"
import { LocalStore } from "../../tska/storage/LocalStore"

const Data = new LocalStore("Nwjn", {
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

new class {
    constructor() {
        new Event("ServerChat", this.onPowerChange.bind(this), { setCriteria: /^You selected the (.+) power for your Accessory Bag!$/ })
        new Event("ServerChat", this.onSwapEnrich.bind(this), { setCriteria: /^Swapped (\d+) enrichments to (.+)!$/ })
        new Event("ContainerClick", this.onStatTuning.bind(this), { setCriteria: /$Stats Tuning^/ })

        this.setupBlacklist()

        this.checkNewUser()
        this.checkMessenger()
        this.checkModVersion()
    }

    onPowerChange(powerStone) {
        Data.power = powerStone
    }

    onSwapEnrich(volume, stat) {
        Data.enrich = `${volume} ${stat}`
    }

    onStatTuning() {
        scheduleTask(() => {
            const lore = Player.getContainer()?.getStackInSlot(4)?.getLore()?.join("\n")?.removeFormatting()
            if (!lore) return
    
            const tuning = lore.match(/\+(\d+.) /g)
            Data.tuning = tuning?.join(" ") ?? "Unknown"
    
            const magPow = lore.match(/Magical Power: ([\d,]+)/g)
            Data.mp = magPow ?? "Unknown"
        }, Ticks.of(2))
    }

    setupBlacklist() {
        Command.addEntryListCommand({
            name: "blacklist",
            aliases: ["bl"], 
            description: "Blacklist from party commands and waypoints",
            clickAction: "suggest_command",
            entryFuncs: {
                "add": (name, reason = "No reason given.") => {
                    if (!name?.trim()) return Nwjn.chat("§cInvalid Usage. §aUse /nwjn bl add <name> <reason?>")
                    Data.blacklist[name] = reason
                    return Nwjn.chat(`§aAdded §c${name} §ato your blacklist.`)
                },

                "remove": (name) => {
                    if (!name?.trim()) return Nwjn.chat("§cInvalid Usage. §aUse /nwjn bl remove <name> <reason?>")
                    delete Data.blacklist[name]
                    return Nwjn.chat(`§aRemoved §c${name} §afrom your blacklist.`)
                },

                "list": () => {
                    Nwjn.chat("§cBlacklist:")
                    return Object.entries(Data.blacklist).forEach(([ign, reason]) => 
                        new TextComponent(`  - &a${ign}&f: &c${reason}`)
                            .setHover("show_text", `Click to run "/nwjn bl remove ${ign}" to remove ${ign} from the blacklist.`)
                            .setClick("run_command", `/nwjn bl remove ${ign}`)
                            .chat()
                    )
                },

                "clear": () => {
                    Data.blacklist = {}
                    return Nwjn.chat("§cCleared your blacklist.")
                }
            }
        })
    }

    checkNewUser() {
        if (!Data.newUser) return

        const welcome = register("worldLoad", () => {
            welcome.unregister()
            Data.newUser = false

            Nwjn.from("Welcome! Open settings with '/nwjn'. Official Discord: https://discord.gg/3S3wXpC4gE")
        })
    }

    checkMessenger() {
        const messenger = register("worldLoad", () => {
            messenger.unregister()
            
            const match = Nwjn.API?.description?.match(/\[(.+)\]: # $/)
            const message = match?.[1]
            if (!message) return

            if (message !== "Nothing" && message !== Data.newMsg) {
                Nwjn.from(message)
                Data.newMsg = message
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

export default Data
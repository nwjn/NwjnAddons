import Nwjn from "../libs/Helper/Nwjn"
import Event from "../libs/Events/Event"
import Ticks from "../libs/Time/Units/Ticks"
import { addCommand } from "../libs/Helper/Command"
import { scheduleTask } from "../libs/Time/ServerTime"
import { LocalStore } from "../../tska/storage/LocalStore"

const Data = new LocalStore("Nwjn", {
  "newUser": true,
  "newMsg": "",

  "power": "Unknown",
  "tuning": "Unknown",
  "enrich": "Unknown",
  "mp": "Unknown",

  "gummy": 0,
  "wisp": 0,
  "lastMini": {},
  "blacklist": {}
}, "data/.User.json")

export default Data

new class {
    constructor() {
        new Event("ServerChat", this.onPowerChange.bind(this), { setCriteria: /^You selected the (.+) power for your Accessory Bag!$/ })
        new Event("ServerChat", this.onSwapEnrich.bind(this), { setCriteria: /^Swapped (\d+) enrichments to (.+)!$/ })
        new Event("ContainerClick", this.onStatTuning.bind(this), { setCriteria: /$Stats Tuning^/ })

        addCommand("bl", "Blacklist <add, remove, list, clear> <name?> <reason?>", this.blacklist.bind(this))
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

    blacklist(type, name, reason = "No reason given.") {
        name = name?.toLowerCase()
        type = type?.toLowerCase()

        switch (type) {
            case "add" && name: {
                Data.blacklist[name] = reason
                return Nwjn.chat(`§aAdded §c${name} §ato your blacklist.`)
            }

            case "remove" && name: {
                delete Data.blacklist[name]
                return Nwjn.chat(`§aRemoved §c${name} §afrom your blacklist.`)
            }
            
            case "list": {
                Nwjn.chat("§cBlacklist:")
                return Object.entries(Data.blacklist).forEach(([ign, reason]) => 
                    new TextComponent(`  - &a${ign}&f: &c${reason}`)
                        .setHover("show_text", `Click to run "/nwjn bl remove ${ign}" to remove ${ign} from the blacklist.`)
                        .setClick("run_command", `/nwjn bl remove ${ign}`)
                        .chat()
                )
            }
        
            case "clear": {
                Data.blacklist = {}
                return Nwjn.chat("§cCleared your blacklist.")
            }
            
            default: {
                return Nwjn.chat("§cInvalid. §a[Add] and [remove] need a name entry. [List] and [clear] do not.")
            }
        }
    }
}
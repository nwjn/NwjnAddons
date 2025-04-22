import TextUtil from "../libs/Helper/TextUtil"
import Event from "../libs/Events/Event"
import Data from "../data/Data"
import { scheduleTask } from "../libs/Time/ServerTime"
import Ticks from "../libs/Time/Units/Ticks"
import { addCommand } from "../libs/Helper/Command"
import Nwjn from "../libs/Helper/Nwjn"

// [Power Stone]
new Event(
    "serverChat", 
    (stone) => Data.power = stone, 
    /^You selected the (.+) power for your Accessory Bag!$/,
    true
)

// [Enrichments]
new Event(
    "serverChat", 
    (volume, stat) => Data.enrich = `${volume} ${stat}`, 
    /^Swapped (\d{1,3}) enrichments to (.+)!$/,
    true
)

// [Tunings + Magical Power]
new Event("containerClick", (window) => {
    if (window !== "Stats Tuning") return

    scheduleTask(() => {
        const lore = Player.getContainer()?.getStackInSlot(4)?.getLore()?.join("\n")?.removeFormatting()
        if (!lore) return

        const tuning = lore.match(/\+(\d+.) /g)
        Data.tuning = tuning?.join(" ") ?? "Unknown"

        const [magPow] = TextUtil.getMatches(/Magical Power: (.+)/, lore)
        Data.mp = magPow ?? "Unknown"
    }, Ticks.of(2))
}, null, true)

// Credit: DocilElm for blacklist
const INVALID = () => Nwjn.chat("&cInvalid. &a[Add] and [remove] need a name entry. [List] and [clear] do not.")

addCommand("bl", "Blacklist <add, remove, list, clear> <name?> <reason?>", (type, name, reason) => {
    if (!type) return INVALID()
    name = name?.toLowerCase()

    switch (type.toLowerCase()) {
        case "add": {
            if (!name) return INVALID()

            Data.blacklist[name] = reason ?? "No reason given."
            return Nwjn.chat(`&aAdded &c${name} &ato your blacklist`)
        }
            
        case "remove": {
            if (!name) return INVALID()
            
            delete Data.blacklist[name]
            return Nwjn.chat(`&aRemoved &c${name} &afrom your blacklist.`)
        }
        
        case "list": {
            Nwjn.chat("&cBlacklist:")
            return Object.entries(Data.blacklist).forEach(([ign, reason]) => 
                new TextComponent(`  - &a${ign}&f: &c${reason}`)
                    .setHover("show_text", `Click to run "/nwjn bl remove ${ign}" to remove ${ign} from the blacklist.`)
                    .setClick("run_command", `/nwjn bl remove ${ign}`)
                    .chat()
            )
        }  
    
        case "clear": {
            Data.blacklist = {}
            return Nwjn.chat("&aCleared your blacklist.")
        }
        
        default: {
            return INVALID()
        }
    }
})
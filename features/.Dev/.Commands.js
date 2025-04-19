import MobUtil from "../../libs/Helper/MobUtil"
import NumUtil from "../../libs/Helper/NumUtil"
import ItemUtil from "../../libs/Helper/ItemUtil"
import Nwjn from "../../libs/Helper/Nwjn"
import { addCommand } from "../../utils/Command"
import Settings from "../../data/Settings"

console.log("Console Ready")

addCommand(
    "Entity",
    "(Dev) Get data of entities in world",
    () => {
        const res = []
        World.getAllEntities().forEach(it => {
            res.push({
                name: it.getName(),
                clazz: it.getClassName(),
                currentHealth: NumUtil.formatGrouped(MobUtil.getHP(it)),
                maxHealth: NumUtil.formatGrouped(MobUtil.getMaxHP(it))
            })
        })

        Nwjn.write("features/.Dev/.Entity.json", res)
    }
)

addCommand(
    "Item",
    "(Dev) Get held item data",
    () => {
        const holding = Player.getHeldItem()
        if (!holding) return
        const rarity = holding.getLore().find(l => /COMMON|RARE|EPIC|LEGENDARY|MYTHIC|DIVINE|SPECIAL/.test(l.removeFormatting()))
        
        ChatLib.chat(ChatLib.getChatBreak("-"))
        ChatLib.chat(`Name: ${ holding.getName() }`)
        ChatLib.chat(`Registry: ${ holding.getRegistryName() }`)
        ChatLib.chat(`ID: ${ ItemUtil.getSkyblockItemID(holding) }`)
        ChatLib.chat(`Rarity: ${rarity}`)
        ChatLib.chat(ChatLib.getChatBreak("-"))

        Nwjn.write("features/.Dev/.Item.json", holding.getNBT().toObject())
    }
)

addCommand(
    "Versions",
    "(Dev) Module and dependency versions",
    () => {
        ChatLib.chat(ChatLib.getChatBreak("-"))

        Nwjn.chat(`&bYou are currently on version ${ TextUtil.VERSION }`)
        ChatLib.chat(`Dependencies:`)

        Nwjn.DEPENDENCIES.forEach(([lib, ver]) => 
            ChatLib.chat(`  &b${ lib }&r: &e${ ver }`)
        )

        ChatLib.chat(ChatLib.getChatBreak("-"))
    }
)

addCommand(
    "Apply",
    "(Dev) Apply scheme setting changes",
    () =>
        Settings.getConfig().apply()
)

// Does mem leak exist
// register("gameLoad", () => {
//     ChatLib.simulateChat("loaded +1")
//     java.lang.System.gc()
//     ChatTriggers.reloadCT()
// })
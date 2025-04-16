/** 
 * Virtually entire file taken from:
 * @author DocilElm
 * @license {GNU-GPL-3} https://github.com/DocilElm/Doc/blob/main/LICENSE
 * @credit https://github.com/DocilElm/Doc/blob/main/core/EventEnums.js
 */

import TextUtil from "../Helper/TextUtil"
import Seconds from "../Time/Units/Seconds"

const S38PacketPlayerListItem = net.minecraft.network.play.server.S38PacketPlayerListItem

/** @type {HashMap<String, Function>} */
const map = new HashMap()

const createEvent = (triggerType, method) => map.put(triggerType.toUpperCase(), method)

createEvent("interval", (fn, interval) => {
    const reg = register("step", fn)

    const normal = interval instanceof Seconds ? interval.getValue() : interval.toSeconds()

    if (normal < 1) return reg.setFps(~~(1 / normal))
    return reg.setDelay(normal)
})

createEvent("packetSent", (fn, clazz) => register("packetSent", fn).setFilteredClass(clazz))
createEvent("packetReceived", (fn, clazz) => register("packetReceived", fn).setFilteredClass(clazz))

createEvent("serverTick", (fn) => 
    register("packetReceived", (packet) => packet./* getActionNumber */func_148890_d() <= 0 && fn())
        .setFilteredClass(net.minecraft.network.play.server.S32PacketConfirmTransaction)
)

createEvent("spawnObject", (fn) =>
    register("packetReceived", (packet, event) => 
        fn(packet./* getType */func_148993_l(), event)
    ).setFilteredClass(net.minecraft.network.play.server.S0EPacketSpawnObject)
)

createEvent("serverChat", (fn, criteria = "") => 
    register("packetReceived", (packet, event) => {
        // Check if the packet is for the actionbar
        if (packet./* isChat */func_148916_d()) return

        const chatComponent = packet./* getChatComponent */func_148915_c()        
        const formatted = chatComponent?./* getFormattedText */func_150254_d()
        const unformatted = formatted?.removeFormatting()
    
        if (!unformatted) return
        
        TextUtil.matchesCriteria(fn, criteria, unformatted, event, formatted, chatComponent)
    }).setFilteredClass(net.minecraft.network.play.server.S02PacketChat)
)

createEvent("actionBarChange", (fn, criteria) => 
    register("packetReceived", (packet, event) => {
        if (!packet./* isChat */func_148916_d()) return

        const chatComponent = packet./* getChatComponent */func_148915_c()
        const formatted = chatComponent./* getFormattedText */func_150254_d()
        const unformatted = formatted.removeFormatting()
        
        if (!unformatted) return
        
        TextUtil.matchesCriteria(fn, criteria, unformatted, event, formatted, chatComponent)
    }).setFilteredClass(net.minecraft.network.play.server.S02PacketChat)
)

createEvent("sideBarChange", (fn, criteria) => 
    register("packetReceived", (packet, event) => {
        const channel = packet./* getAction */func_149307_h()

        if (channel !== 2) return

        const teamStr = packet./* getName */func_149312_c()
        const teamMatch = teamStr.match(/^team_(\d+)$/)

        if (!teamMatch) return

        const formatted = packet./* getPrefix */func_149311_e().concat(packet./* getSuffix */func_149309_f())
        const unformatted = formatted.removeFormatting()

        if (!unformatted) return
        
        TextUtil.matchesCriteria(fn, criteria, unformatted, event, formatted)
    }).setFilteredClass(net.minecraft.network.play.server.S3EPacketTeams)
)

createEvent("tabAdd", (fn, criteria) => 
    register("packetReceived", (packet, event) => {
        const players = packet./* getEntries */func_179767_a()
        const action = packet./* getAction */func_179768_b()

        if (action !== S38PacketPlayerListItem.Action.ADD_PLAYER) return

        players.forEach(addPlayerData => {
            const name = addPlayerData./* getDisplayName */func_179961_d()
            
            if (!name) return
            const formatted = name./* getFormattedText */func_150254_d()
            const unformatted = formatted.removeFormatting()
        
            if (action !== S38PacketPlayerListItem.Action.ADD_PLAYER) return

            TextUtil.matchesCriteria(fn, criteria, unformatted, event, formatted)
        })
    }).setFilteredClass(S38PacketPlayerListItem)
)

createEvent("worldSound", (fn, criteria) => 
    register("packetReceived", (packet, event) => {
        const name = packet./* getSoundName */func_149212_c()

        TextUtil.matchesCriteria(fn, criteria, name, event)
    }).setFilteredClass(net.minecraft.network.play.server.S29PacketSoundEffect)
)

createEvent("containerClick", (fn) => 
    register("packetSent", (packet) => {
        // Container name, Slot clicked
        fn(Player.getContainer().getName(), packet./* getSlotId */func_149544_d())
    }).setFilteredClass(net.minecraft.network.play.client.C0EPacketClickWindow)
)

export const getEvent = (triggerType, method, args) => {
    if (triggerType instanceof com.chattriggers.ctjs.triggers.Trigger) return triggerType.unregister()

    const type = typeof(triggerType) === "string" ? triggerType.toUpperCase() : triggerType

    const trigger =
        map.containsKey(type) ?
        map.get(type)(method, args) :
        register(type, method)
    
    return trigger.unregister()
}
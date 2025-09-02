/** 
 * Modified from:
 * @author DocilElm
 * @credit https://github.com/DocilElm/tska/blob/main/event/CustomEvents.js
 * @license {GNU-GPL-3} https://github.com/DocilElm/tska/blob/main/LICENSE
 */

import { isInView } from "../../../Apelles"
import { getEntity, getPacket, getForgeEvent } from "../Helper/ClassReference"

/** @type {HashMap<string, () => Trigger>} */
const map = new HashMap()

export function createEvent(triggerType, method) {
    map.put(triggerType, method)
}

export function matchCriteria(fn, string, criteria, properties) {
    const match = string?.match(criteria)
    if (!match) return

    match.shift()
    fn(...match, properties)
}

export function setFilter(clazz, isPacket, clientPacket) {
    return isPacket ? getPacket(clazz, clientPacket) : getEntity(clazz)
}

createEvent("MessageSent", (fn, { setCriteria }) =>
    register("MessageSent", (message, event) => 
        matchCriteria(fn, message, setCriteria, { message, event })
    )
)

createEvent("ServerTick", (fn) => 
    register("PacketReceived", (packet, event) => {
        if (packet./* getActionNumber */func_148890_d() <= 0) fn({packet, event})
    }).setFilteredClass(setFilter("ConfirmTransaction", true, false))
)

createEvent("ServerChat", (fn, { setCriteria }) => 
    register("PacketReceived", (packet, event) => {
        if (packet./* isChat */func_148916_d()) return

        const chatComponent = packet./* getChatComponent */func_148915_c()        
        const formatted = chatComponent?./* getFormattedText */func_150254_d()
        const unformatted = formatted?.removeFormatting()
        
        matchCriteria(fn, unformatted, setCriteria, {packet, event, chatComponent, formatted, unformatted})
    }).setFilteredClass(setFilter("Chat", true, false))
)

createEvent("EntityUpdate", fn => 
    register(getForgeEvent("LivingEvent$LivingUpdateEvent"), ({ entity }) => 
        isInView(entity.field_70165_t, entity.field_70163_u, entity.field_70161_v) && fn(entity)
    )
)

createEvent("EntityJoin", (fn) => 
    register(getForgeEvent("EntityJoinWorldEvent"), (event) => {        
        const entity = event.entity
        fn({ event, entity })
    })
)

createEvent("EntityDeath", (fn) =>
    register(getForgeEvent("LivingDeathEvent"), (event) => {
        const entity = event.entity
        fn({ event, entity })
    })
)

createEvent("ActionBarChange", (fn, { setCriteria }) => 
    register("PacketReceived", (packet, event) => {
        if (!packet./* isChat */func_148916_d()) return

        const chatComponent = packet./* getChatComponent */func_148915_c()
        const formatted = chatComponent?./* getFormattedText */func_150254_d()
        const unformatted = formatted?.removeFormatting()
        
        matchCriteria(fn, unformatted, setCriteria, {packet, event, chatComponent, formatted, unformatted})
    }).setFilteredClass(setFilter("Chat", true, false))
)

createEvent("SideBarChange", (fn, { setCriteria }) => 
    register("PacketReceived", (packet, event) => {
        const channel = packet./* getAction */func_149307_h()
        if (channel !== 2) return

        const teamStr = packet./* getName */func_149312_c()
        const teamMatch = teamStr.match(/^team_(\d+)$/)
        if (!teamMatch) return

        const formatted = packet./* getPrefix */func_149311_e().concat(packet./* getSuffix */func_149309_f())
        const unformatted = formatted?.removeFormatting()
        
        matchCriteria(fn, unformatted, setCriteria, {packet, event, formatted, unformatted})
    }).setFilteredClass(setFilter("Teams", true, false))
)

createEvent("TabAdd", (fn, { setCriteria }) => 
    register("PacketReceived", (packet, event) => {
        const players = packet./* getEntries */func_179767_a()
        const action = packet./* getAction */func_179768_b()
        if (action.toString() !== "ADD_PLAYER") return

        players.forEach(addPlayerData => {
            const name = addPlayerData?./* getDisplayName */func_179961_d()
            if (!name) return

            const formatted = name./* getFormattedText */func_150254_d()
            const unformatted = formatted.removeFormatting()

            matchCriteria(fn, unformatted, setCriteria, {packet, event, formatted, unformatted})
        })
    }).setFilteredClass(setFilter("PlayerListItem", true, false))
)

createEvent("WorldSound", (fn, { setCriteria }) => 
    register("PacketReceived", (packet, event) => {
        const name = packet./* getSoundName */func_149212_c()

        matchCriteria(fn, name, setCriteria, {packet, event})
    }).setFilteredClass(setFilter("SoundEffect", true, false))
)

createEvent("ContainerClick", (fn, { setCriteria }) => 
    register("PacketSent", (packet, event) => {
        const containerName = Player.getContainer().getName()
        matchCriteria(fn, containerName, setCriteria, {packet, event, slotId: packet./* getSlotId */func_149544_d()})
    }).setFilteredClass(setFilter("ClickWindow", true, true))
)

export const getEvent = (triggerType, method, modifiers) => {
    if (triggerType instanceof com.chattriggers.ctjs.triggers.Trigger) return triggerType.unregister()
    
    // Custom Events
    if (map.containsKey(triggerType))
        return map.get(triggerType)(method, modifiers).unregister()

    triggerType = `register${triggerType}` in TriggerRegister 
        ? triggerType 
        : getForgeEvent(triggerType)
        ?? triggerType
        
    const trigger = register(triggerType, method)
    
    // Modify modifiers for class filter events
    if ("setFilteredClass" in trigger) {
        const isPacket = /^Packet/.test(triggerType)
        const isClient = triggerType === "PacketSent"

        if ("setFilteredClass" in modifiers) modifiers.setFilteredClass = setFilter(modifiers.setFilteredClass, isPacket, isClient)
        else if ("setFilteredClasses" in modifiers) modifiers.setFilteredClasses = modifiers.setFilteredClasses.map(c => setFilter(c, isPacket, isClient))
    }

    // Apply Modifiers
    if (modifiers) 
        Object.entries(modifiers)
            .forEach(([mod, val]) => trigger[mod](val))

    // Returns UNREGISTERED trigger
    return trigger.unregister()
}
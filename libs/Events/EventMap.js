/** 
 * Modified from:
 * @author DocilElm
 * @credit https://github.com/DocilElm/tska/blob/main/event/CustomEvents.js
 * @license {GNU-GPL-3} https://github.com/DocilElm/tska/blob/main/LICENSE
 */

import { getEntity, getPacket, getForgeEvent } from "../Helper/ClassReference"

/** @type {HashMap<string, () => Trigger>} */
const map = new HashMap()

function createEvent(triggerType, method) { 
    map.put(triggerType.toUpperCase(), method)
}

function matchCriteria(fn, string, criteria, properties) {
    const match = string?.match(criteria)
    if (!match) return

    match.shift()
    fn(...match, properties)
}

function setFilter(clazz, isPacket, isClientBound) {
    return isPacket ? getPacket(clazz, isClientBound) : getEntity(clazz)
}

createEvent("MessageSent", (fn, { setCriteria }) =>
    register("MessageSent", (message, event) => 
        matchCriteria(fn, message, setCriteria, { message, event })
    )
)

createEvent("ServerTick", (fn) => 
    register("PacketReceived", (packet, event) => {
        if (packet./* getActionNumber */func_148890_d() === 0) fn({packet, event})
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

createEvent("EntityJoin", (fn, { setFilteredClass, setFilteredClasses }) => 
    register(getForgeEvent("EntityJoinWorld"), (event) => {
        const entity = event.entity
        
        if (
            (!setFilteredClass && !setFilteredClasses)
            || (setFilteredClass && entity instanceof setFilteredClass)
            || (setFilteredClasses.some(e => entity instanceof e))
        ) fn({event, entity})
    })
)

createEvent("EntityDeath", (fn, { setFilteredClass, setFilteredClasses }) =>
    register(getForgeEvent("LivingDeath"), (event) => {
        const entity = event.entity

        if (
            (!setFilteredClass && !setFilteredClasses)
            || (setFilteredClass && entity instanceof setFilteredClass)
            || (setFilteredClasses.some(e => entity instanceof e))
        ) fn({event, entity})
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

    const type = triggerType.toUpperCase()
    let trigger
    
    if (type === "PACKETRECEIVED") {
        if ("setFilteredClass" in modifiers) modifiers.setFilteredClass = setFilter(modifiers.setFilteredClass, true, false)
        else if ("setFilteredClasses" in modifiers) modifiers.setFilteredClasses = modifiers.setFilteredClasses.map(c => setFilter(c, true, false))
    }
    else if (type === "PACKETSENT") {
        if ("setFilteredClass" in modifiers) modifiers.setFilteredClass = setFilter(modifiers.setFilteredClass, true, true)
        else if ("setFilteredClasses" in modifiers) modifiers.setFilteredClasses = modifiers.setFilteredClasses.map(c => setFilter(c, true, true))
    }

    const eventOrNull = getForgeEvent(triggerType)
    if (map.containsKey(type)) {
        trigger = map.get(type)(method, modifiers)
    }
    else if (eventOrNull) {
        trigger = register(eventOrNull, method)
    }
    else if (`register${triggerType}` in TriggerRegister) {
        trigger = register(type, method)
        modifiers && Object.entries(modifiers).forEach(([mod, val]) => mod in trigger && trigger[mod](val))
    }
    else {
        trigger = register(type, method)
    }
    
    return trigger.unregister()
}
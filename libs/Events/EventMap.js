/** 
 * Modified from:
 * @author DocilElm
 * @credit https://github.com/DocilElm/tska/blob/main/event/CustomEvents.js
 * @license {GNU-GPL-3} https://github.com/DocilElm/tska/blob/main/LICENSE
 */

const matchCriteria = (fn, string, criteria, properties) => {
    const match = string?.match(criteria)
    if (!match) return

    match.shift()
    fn(...match, properties)
}

/** @type {HashMap<string, Function>} */
const map = new HashMap()

const createEvent = (triggerType, method) => map.put(triggerType.toUpperCase(), method)

createEvent("messageSent", (fn, { setCriteria }) =>
    register("messageSent", (message, event) => 
        matchCriteria(fn, message, setCriteria, { message, event })
    )
)

createEvent("serverTick", (fn) => 
    register("packetReceived", (packet, event) => {
        if (packet./* getActionNumber */func_148890_d() === 0) fn({packet, event})
    }).setFilteredClass(net.minecraft.network.play.server.S32PacketConfirmTransaction)
)

createEvent("serverChat", (fn, { setCriteria }) => 
    register("packetReceived", (packet, event) => {
        if (packet./* isChat */func_148916_d()) return

        const chatComponent = packet./* getChatComponent */func_148915_c()        
        const formatted = chatComponent?./* getFormattedText */func_150254_d()
        const unformatted = formatted?.removeFormatting()
        
        matchCriteria(fn, unformatted, setCriteria, {packet, event, chatComponent, formatted, unformatted})
    }).setFilteredClass(net.minecraft.network.play.server.S02PacketChat)
)

createEvent("entityJoin", (fn, { setFilteredClass, setFilteredClasses }) => 
    register(net.minecraftforge.event.entity.EntityJoinWorldEvent, (event) => {
        const entity = event.entity
        
        if (
            (!setFilteredClass && !setFilteredClasses)
            || (setFilteredClass && entity instanceof setFilteredClass)
            || (setFilteredClasses.some(e => entity instanceof e))
        ) fn({event, entity})
    })
)

createEvent("entityDeath", (fn, { setFilteredClass, setFilteredClasses }) =>
    register(net.minecraftforge.event.entity.living.LivingDeathEvent, (event) => {
        const entity = event.entity

        if (
            (!setFilteredClass && !setFilteredClasses)
            || (setFilteredClass && entity instanceof setFilteredClass)
            || (setFilteredClasses.some(e => entity instanceof e))
        ) fn({event, entity})
    })
)

createEvent("actionBarChange", (fn, { setCriteria }) => 
    register("packetReceived", (packet, event) => {
        if (!packet./* isChat */func_148916_d()) return

        const chatComponent = packet./* getChatComponent */func_148915_c()
        const formatted = chatComponent?./* getFormattedText */func_150254_d()
        const unformatted = formatted?.removeFormatting()
        
        matchCriteria(fn, unformatted, setCriteria, {packet, event, chatComponent, formatted, unformatted})
    }).setFilteredClass(net.minecraft.network.play.server.S02PacketChat)
)

createEvent("sideBarChange", (fn, { setCriteria }) => 
    register("packetReceived", (packet, event) => {
        const channel = packet./* getAction */func_149307_h()
        if (channel !== 2) return

        const teamStr = packet./* getName */func_149312_c()
        const teamMatch = teamStr.match(/^team_(\d+)$/)
        if (!teamMatch) return

        const formatted = packet./* getPrefix */func_149311_e().concat(packet./* getSuffix */func_149309_f())
        const unformatted = formatted?.removeFormatting()
        
        matchCriteria(fn, unformatted, setCriteria, {packet, event, formatted, unformatted})
    }).setFilteredClass(net.minecraft.network.play.server.S3EPacketTeams)
)

createEvent("tabAdd", (fn, { setCriteria }) => 
    register("packetReceived", (packet, event) => {
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
    }).setFilteredClass(net.minecraft.network.play.server.S38PacketPlayerListItem)
)

createEvent("worldSound", (fn, { setCriteria }) => 
    register("packetReceived", (packet, event) => {
        const name = packet./* getSoundName */func_149212_c()

        matchCriteria(fn, name, setCriteria, {packet, event})
    }).setFilteredClass(net.minecraft.network.play.server.S29PacketSoundEffect)
)

createEvent("containerClick", (fn, { setCriteria }) => 
    register("packetSent", (packet, event) => {
        const containerName = Player.getContainer().getName()
        matchCriteria(fn, containerName, setCriteria, {packet, event, slotId: packet./* getSlotId */func_149544_d()})
    }).setFilteredClass(net.minecraft.network.play.client.C0EPacketClickWindow)
)

export const getEvent = (triggerType, method, modifiers) => {
    if (triggerType instanceof com.chattriggers.ctjs.triggers.Trigger) return triggerType.unregister()

    const type = typeof(triggerType) === "string" ? triggerType.toUpperCase() : triggerType

    const trigger =
        map.containsKey(type) ?
        map.get(type)(method, modifiers) :
        register(type, method)
    
    Object.entries(modifiers).forEach(([mod, val]) => {
        if (mod in trigger) trigger[mod](val)
    })

    return trigger.unregister()
}
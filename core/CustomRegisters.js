// Adaptation of Doc
import { TextHelper } from "../utils/TextHelper";
import EventEnums from "./EventEnums"

export const customTriggers = new Map()

const createCustomEvent = (id, invokeFn) => customTriggers.set(id, invokeFn)

// Constant used to get the packet's ENUMS
// and also filter the class in packetRecieved event
const S38PacketPlayerListItem = net.minecraft.network.play.server.S38PacketPlayerListItem

// [Interval]
createCustomEvent(EventEnums.INTERVAL.FPS, (fn, fps) => register("step", fn).setFps(fps).unregister())

createCustomEvent(EventEnums.INTERVAL.SECONDS, (fn, sec) => register("step", fn).setDelay(sec).unregister())

createCustomEvent(EventEnums.INTERVAL.TICK, (fn) =>
    register("packetReceived", (packet) => {
        if (packet.func_148890_d() <= 0) fn()
    }).setFilteredClass(net.minecraft.network.play.server.S32PacketConfirmTransaction).unregister()
)

// [Entity]
createCustomEvent(EventEnums.ENTITY.RENDER, (fn, clazz) => register("renderEntity", fn).setFilteredClass(clazz).unregister())

// createCustomEvent(EventEnums.ENTITY.POSTRENDER, (fn, clazz) => register("postRenderEntity", fn).setFilteredClass(clazz).unregister())

createCustomEvent(EventEnums.ENTITY.JOINWORLD, (fn, clazz) => 
    // Credits: https://github.com/BetterMap/BetterMap/blob/main/Extra/Events/SecretTracker.js
    register(net.minecraftforge.event.entity.EntityJoinWorldEvent, (event) => {
        if (!(event.entity instanceof clazz)) return
    
        const entity = event.entity
        const entityID = entity.func_145782_y()
        fn(entity, entityID)
    }).unregister()
)

createCustomEvent(EventEnums.ENTITY.SPAWNMOB, (fn, clazz) =>
    register("packetReceived", (packet) => {
        scheduleTask(() => {
            const entityID = packet.func_149024_d()
            const entity = World.getWorld().func_73045_a(entityID)
            if (!(entity instanceof clazz)) return

            fn(entity, entityID)
        })
    }).setFilteredClass(net.minecraft.network.play.server.S0FPacketSpawnMob).unregister()
)

// createCustomEvent(EventEnums.ENTITY.SPAWNPARTICLE, (fn, type) =>
//     register("packetReceived", (packet, event) => {
//         const particleType = packet.func_179749_a()
//         if (particleType !== type) return

//         const [ x, y, z ] = [
//             packet.func_149220_d(), // getXCoordinate
//             packet.func_149226_e(), // getYCoordinate
//             packet.func_149225_f() // getZCoordinate
//         ]

//         fn(particleType, [x, y, z], event)
//     }).setFilteredClass(net.minecraft.network.play.server.S2APacketParticles).unregister()
// )

createCustomEvent(EventEnums.ENTITY.DEATH, (fn, clazz) =>
    register("entityDeath", (entity) => {
        if (clazz && !(entity.entity instanceof clazz)) return

        fn(entity)
    }).unregister()
)

// [Client]
createCustomEvent(EventEnums.CLIENT.CHAT, (fn, criteria = "") => register("chat", fn).setCriteria(criteria).unregister())

createCustomEvent(EventEnums.CLIENT.COMMAND, (fn, name) => register("command", fn).setName(name).unregister())

createCustomEvent(EventEnums.CLIENT.SOUNDPLAY, (fn, criteria) => register("soundPlay", fn).setCriteria(criteria).unregister())

createCustomEvent(EventEnums.CLIENT.HELDITEMCHANGE, (fn, ids = []) => 
    register("packetSent", (packet) => {
        const sbID = TextHelper.getSkyblockItemID(Player.getHeldItem())
        if (!ids.includes(sbID)) return
        
        fn(packet.func_149614_c());
    }).setFilteredClass(net.minecraft.network.play.client.C09PacketHeldItemChange).unregister()
)

// createCustomEvent(EventEnums.CLIENT.DIGGING, (fn) =>
//     register("packetSent", (packet, event) =>
//         fn(packet.func_180762_c()?.toString(), event)
//     ).setFilteredClass(net.minecraft.network.play.client.C07PacketPlayerDigging).unregister()
// )

// createCustomEvent(EventEnums.CLIENT.BLOCKPLACEMENT, (fn, wrapBP = true) =>
//     register("packetSent", (packet) => {
//         const position = packet.func_179724_a()
    
//         const [ x, y, z ] = [
//             position.func_177958_n(), // getX()
//             position.func_177956_o(), // getY()
//             position.func_177952_p() // getZ()
//         ]
//         const ctBlock = World.getBlockAt(x, y, z)

//         fn(ctBlock, [x, y, z], wrapBP ? new BlockPos(position) : position)
//     }).setFilteredClass(net.minecraft.network.play.client.C08PacketPlayerBlockPlacement).unregister()
// )

createCustomEvent(EventEnums.CLIENT.PLAYERPOSLOOK, (fn) =>
    register("packetReceived", (packet) => {
        const [ x, y, z ] = [ packet.func_148932_c(), packet.func_148928_d(), packet.func_148933_e() ]
        const [ yaw, pitch ] = [ packet.func_148931_f(), packet.func_148930_g() ]

        fn([x, y, z], yaw, pitch)
    }).setFilteredClass(net.minecraft.network.play.server.S08PacketPlayerPosLook).unregister()
)

// [Server]
createCustomEvent(EventEnums.SERVER.CHAT, (fn, criteria) => 
    register("packetReceived", (packet, event) => {
        // Check if the packet is for the actionbar
        if (packet.func_148916_d()) return

        const chatComponent = packet.func_148915_c()        
        const formatted = chatComponent?.func_150254_d()
        const unformatted = formatted?.removeFormatting()
    
        if (!unformatted) return
        
        TextHelper.matchesCriteria(fn, criteria, unformatted, event, formatted)
    }).setFilteredClass(net.minecraft.network.play.server.S02PacketChat).unregister()
)

createCustomEvent(EventEnums.SERVER.ACTIONBAR, (fn, criteria) => 
    register("packetReceived", (packet, event) => {
        // Check if the packet is for the actionbar
        if (!packet.func_148916_d()) return

        const chatComponent = packet.func_148915_c()        
        const formatted = chatComponent?.func_150254_d()
        const unformatted = formatted?.removeFormatting()
        
        if (!unformatted) return
        
        TextHelper.matchesCriteria(fn, criteria, unformatted, event, formatted)
    }).setFilteredClass(net.minecraft.network.play.server.S02PacketChat).unregister()
)

createCustomEvent(EventEnums.SERVER.SCOREBOARD, (fn, criteria) => 
    register("packetReceived", (packet, event) => {
        const channel = packet.func_149307_h()

        if (channel !== 2) return

        const teamStr = packet.func_149312_c()
        const teamMatch = teamStr.match(/^team_(\d+)$/)

        if (!teamMatch) return

        const formatted = packet.func_149311_e().concat(packet.func_149309_f())
        const unformatted = formatted.removeFormatting()

        if (!unformatted) return
        
        TextHelper.matchesCriteria(fn, criteria, unformatted, event, formatted)
    }).setFilteredClass(net.minecraft.network.play.server.S3EPacketTeams).unregister()
)

createCustomEvent(EventEnums.SERVER.TABUPDATE, (fn, criteria) => 
    register("packetReceived", (packet, event) => {
        const players = packet.func_179767_a() // .getPlayers()
        const action = packet.func_179768_b() // .getAction()

        if (action !== S38PacketPlayerListItem.Action.UPDATE_DISPLAY_NAME) return

        players.forEach(addPlayerData => {
            const name = addPlayerData.func_179961_d() // .getDisplayName()
            
            if (!name) return

            const formatted = name.func_150254_d() // .getFormattedText()
            const unformatted = formatted.removeFormatting()
        
            if (action !== S38PacketPlayerListItem.Action.UPDATE_DISPLAY_NAME) return

            TextHelper.matchesCriteria(fn, criteria, unformatted, event, formatted)
        })
    }).setFilteredClass(S38PacketPlayerListItem).unregister()
)

createCustomEvent(EventEnums.SERVER.TABADD, (fn, criteria) => 
    register("packetReceived", (packet, event) => {
        const players = packet.func_179767_a() // .getPlayers()
        const action = packet.func_179768_b() // .getAction()

        if (action !== S38PacketPlayerListItem.Action.ADD_PLAYER) return

        players.forEach(addPlayerData => {
            const name = addPlayerData.func_179961_d() // .getDisplayName()
            
            if (!name) return
            const formatted = name.func_150254_d() // .getFormattedText()
            const unformatted = formatted.removeFormatting()
        
            if (action !== S38PacketPlayerListItem.Action.ADD_PLAYER) return

            TextHelper.matchesCriteria(fn, criteria, unformatted, event, formatted)
        })
    }).setFilteredClass(S38PacketPlayerListItem).unregister()
)

// createCustomEvent(EventEnums.SERVER.COLLECTITEM, (fn) =>
//     register("packetReceived", (packet) => {
//         const entityID = packet.func_149354_c()
        
//         fn(entityID)
//     }).setFilteredClass(net.minecraft.network.play.server.S0DPacketCollectItem).unregister()
// )

// createCustomEvent(EventEnums.PACKET.SERVER.BLOCKCHANGE, (fn) =>
//     register("packetReceived", (packet) => {
//         const pos = new BlockPos(packet.func_179827_b())
//         const block = World.getBlockAt(pos.x, pos.y, pos.z)
//         const packetBlock = packet.func_180728_a().func_177230_c()

//         fn(block, pos, packetBlock)
//     }).setFilteredClass(net.minecraft.network.play.server.S23PacketBlockChange).unregister()
// )

// createCustomEvent(EventEnums.PACKET.CUSTOM.MULTIBLOCKCHANGE, (fn) =>
//     register("packetReceived", (packet) => {
//         const list = packet.func_179844_a()

//         for (let v of list) {
//             let pos = new BlockPos(v.func_180090_a())
//             let packetBlock = v.func_180088_c().func_177230_c()
//             let block = World.getBlockAt(pos.x, pos.y, pos.z)

//             fn(block, pos, packetBlock)
//         }
//     }).setFilteredClass(net.minecraft.network.play.server.S22PacketMultiBlockChange).unregister()
// )

// [Window]
createCustomEvent(EventEnums.WINDOW.OPEN, (fn) => 
    register("packetReceived", (packet) => {
        const windowTitle = packet.func_179840_c().func_150254_d().removeFormatting()
        const windowID = packet.func_148901_c()
        const hasSlots = packet.func_148900_g()
        const slotCount = packet.func_148898_f()
        const guiID = packet.func_148902_e()
        const entityID = packet.func_148897_h()
    
        fn(windowTitle, windowID, hasSlots, slotCount, guiID, entityID)
    }).setFilteredClass(net.minecraft.network.play.server.S2DPacketOpenWindow).unregister()
)

createCustomEvent(EventEnums.WINDOW.CLOSE, (fn) => {
    return [
        register("packetReceived", fn).setFilteredClass(net.minecraft.network.play.server.S2EPacketCloseWindow).unregister(),
        register("packetSent", fn).setFilteredClass(net.minecraft.network.play.client.C0DPacketCloseWindow).unregister()
    ]
})

createCustomEvent(EventEnums.WINDOW.CLICK, (fn) => 
    register("packetSent", (packet) => {
        // Container name, Slot clicked
        fn(Player.getContainer().getName(), packet.func_149544_d())
    }).setFilteredClass(net.minecraft.network.play.client.C0EPacketClickWindow).unregister()
)

createCustomEvent(EventEnums.WINDOW.ITEMS, (fn) => 
    register("packetReceived", (packet) => {
        fn(packet.func_148910_d())
    }).setFilteredClass(net.minecraft.network.play.server.S30PacketWindowItems).unregister()
)


// Custom functions that require events
let _scheduleTaskList = []
/**
 * - Runs the given function after the delay is done
 * - NOTE: These are server ticks not client ticks for that use ct's one
 * @param {() => void} fn The function to be ran
 * @param {number?} delay The delay in ticks
 */
export const scheduleTask = (fn, delay = 1) => _scheduleTaskList.push([fn, delay])

register("packetReceived", (packet) => {
    if (packet.func_148890_d() > 0) return

    for (let idx = _scheduleTaskList.length - 1; idx >= 0; idx--) {
        let delay = _scheduleTaskList[idx][1]--

        if (delay !== 0) continue

        let fn = _scheduleTaskList[idx][0]
        fn()

        _scheduleTaskList.splice(idx, 1)
    }
}).setFilteredClass(net.minecraft.network.play.server.S32PacketConfirmTransaction)
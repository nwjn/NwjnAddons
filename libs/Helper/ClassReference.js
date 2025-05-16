import { JavaTypeOrNull } from "../../../Apelles/util"
import { Field } from "../../../tska/reflection/Field"

const EVENT_PATH_LIST = [
    "client.event",
    "event.entity.player",
    "event.entity.living",
    "event.world",
    "event.entity",
    "event",
    "event.entity.item",
    "event.brewing",
    "event.terraingen",
    "fml.common.event"
]

const ENTITY_LIST = new HashMap()

const CLIENT_PACKET_LIST = new HashMap()
const SERVER_PACKET_LIST = new HashMap()

/** Remap with uppercase keys and class names */
Field.getFieldValue(net.minecraft.entity.EntityList, /* stringToClassMapping */"field_75625_b")
    .forEach((simpleName, clazz) => {
        ENTITY_LIST.put(simpleName.toLowerCase(), clazz.getName())
    })

Field.getFieldValue(net.minecraft.network.EnumConnectionState, /* STATES_BY_CLASS */"field_150761_f")
    .forEach((clazz, state) => {
        if (state.toString() === "HANDSHAKING") return

        const [ dir, simpleName ] = clazz.getSimpleName().split(/\d[0-9A-F]Packet/)
        const mapFromDir = dir === "C" ? CLIENT_PACKET_LIST : SERVER_PACKET_LIST
        
        // No case protection for you loser
        mapFromDir.put(simpleName, clazz.getName())
    })

export function getForgeEvent(simpleName) {
    let match = simpleName.match(/^([^\.]+)(\..+)?/)
    if (!match) return

    simpleName = match[1] + "Event" + (match[2]?.replace(/\./g, "$") ?? "")

    for (let path of EVENT_PATH_LIST) {
        let clazz = JavaTypeOrNull(`net.minecraftforge.${path}.${simpleName}`)

        if (clazz) return clazz.class
    }
}

export function getPacket(simpleName, isClientBound = false) {
    let mapFromDir = isClientBound ? CLIENT_PACKET_LIST : SERVER_PACKET_LIST
    let lookup = mapFromDir.get(simpleName)

    if (lookup) return JavaTypeOrNull(lookup).class
}

export function getEntity(simpleName) {
    let lookup = ENTITY_LIST.get(simpleName?.toLowerCase())
    
    if (lookup) return JavaTypeOrNull(lookup).class
}

// import { createCustomOutlineTester, createPerEntityOutliner } from "../../../Apelles"
// import MobUtil from "./MobUtil"
// const tester = createCustomOutlineTester((entity) => {
//     ChatLib.chat(MobUtil.getMaxHP(entity))
//     return MobUtil.getMaxHP(entity) == 10
// })
// const outliner = createPerEntityOutliner(tester, 0xffbeefff, 2)
// outliner.register()
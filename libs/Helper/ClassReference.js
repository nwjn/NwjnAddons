import { JavaTypeOrNull } from "../../../Apelles/util"
import { Field } from "../../../tska/reflection/Field"

const EVENT_PATH_LIST = [
    "entity.player",
    "entity.living",
    "world",
    "entity",
    "entity.item",
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
    if (typeof(simpleName) !== "string") return simpleName

    for (let path of EVENT_PATH_LIST) {
        let clazz = JavaTypeOrNull(`net.minecraftforge.event.${path}.${simpleName}`)

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
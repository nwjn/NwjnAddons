import MathUtil from "../../core/static/MathUtil"
import MobUtil from "../../libs/Helper/MobUtil"
import Feature from "../../libs/Features/Feature"
import Settings from "../../data/Settings"
import { Field } from "../../libs/Helper/Reflect"
import Settings from "../../data/Settings"
import RenderHelper from "../../libs/Render/RenderHelper"
import Nwjn from "../../libs/Helper/Nwjn"
import { renderAABBOutline } from "../../../Apelles/index"

new class MobHighlight extends Feature {
    constructor() {
        super({
            setting: this.constructor.name,
            color: this.constructor.name + "Color"
        })

        this.RenderList = new java.util.WeakHashMap()
        this.StringToClassMap = new HashMap()
        this.Whitelist = new HashMap()

        // Make a copy of mappings with modified keys
        Field.getFieldValue(net.minecraft.entity.EntityList, /* stringToClassMapping */"field_75625_b")
            .forEach((str, cls) => this.StringToClassMap.put(str.toLowerCase(), cls))

        this.addEvent(net.minecraftforge.event.entity.EntityJoinWorldEvent, this.onEntityJoin.bind(this))
        this.addEvent("renderWorld", this.onRender.bind(this))
        this.addEvent(net.minecraftforge.event.entity.living.LivingDeathEvent, this.onEntityDeath.bind(this))

        Settings.getConfig().onCloseGui(this.onEnabled.bind(this))

        this.init()
    }

    /** @Event {net.minecraftforge.event.entity.EntityJoinWorldEvent} */
    onEntityJoin({entity}) {
        if (this.RenderList.containsKey(entity)) return

        const entClass = entity.class
        const isWhitelisted = this.Whitelist.containsKey(entClass)
        if (!isWhitelisted) return

        const healthList = this.Whitelist.get(entClass)
        if (typeof(healthList) === "boolean" || healthList?.includes(MobUtil.getMaxHP(entity))) this.RenderList.put(entity, true)
    }

    /** @Event {RenderWorld} */
    onRender() {
        this.RenderList.forEach(entity => {
            if (entity./* isInvisible */func_82150_aj()) return
            const [mX, mY, mZ, MX, MY, MZ] = RenderHelper.getAxisCoords(entity./* getEntityBoundingBox */func_174813_aQ())
            renderAABBOutline(this.Color.rgba1, mX, mY, mZ, MX, MY, MZ, { lw: 1, smooth: true, cull: true })
        })
    }

    /** @Event {net.minecraftforge.event.entity.living.LivingDeathEvent} */
    onEntityDeath({entity}) {
        this.RenderList.remove(entity)
    }
    
    /** @override */
    onEnabled(value = Settings.MobHighlight) {
        this.RenderList.clear()
    
        value.split(/, ?/g).forEach((entry, idx) => {
            const [name, params] = entry.split("-")
    
            if (!name) return
            const clazz = this.StringToClassMap.get(name.toLowerCase())
            if (!clazz) return Nwjn.edit(`§cEntity class called §b§l${name}§r§c is unknown. Read §a§lhttps://github.com/nwjn/NwjnAddons/wiki/Bestiary-Entries`, 28500 + idx)
            ChatLib.deleteChat(28500 + idx)
    
            const hps = params?.split("|")?.map(MathUtil.convertToNumber)
    
            this.Whitelist.put(
                clazz,
                hps ?? true
            )
        })
    
        // Loads pre-existing entities
        World.getAllEntities()?.forEach(this.onEntityJoin.bind(this))
    }

    /** @override */
    onDisabled() {
        this.Whitelist.clear()
        this.RenderList.clear()
    }
}
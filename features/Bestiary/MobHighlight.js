import Nwjn from "../../libs/Helper/Nwjn"
import NumUtil from "../../libs/Helper/NumUtil"
import MobUtil from "../../libs/Helper/MobUtil"
import Feature from "../../libs/Features/Feature"
import RenderHelper from "../../libs/Render/RenderHelper"
import ConfigProperty from "../../data/ConfigProperty"

import { Field } from "../../../tska/reflection/Field"
import { renderAABBOutline } from "../../../Apelles/index"

const setting = new ConfigProperty("TextInput", {
    category: "Bestiary",
    configName: "MobHighlight",
    title: "Mob Highlight",
    description: "Boxes entities by input based on mob class and health\n&bExamples: `Zombie` or `Zombie-100|120|2k|45k` or `Zombie, Skeleton` or `Zombie-100, Cow`",
})

const color = new ConfigProperty("ColorPicker", {
    category: "Bestiary",
    configName: "MobHighlightColor",
    title: "Mob Highlight Color",
    description: "Sets the color for monster hitboxes",
    value: [255, 190, 239, 255],
    shouldShow: data => data.MobHighlight !== ""
})

new class extends Feature {
    constructor() {
        super({setting})

        this.RenderList = new java.util.WeakHashMap()
        this.StringToClassMap = new HashMap()
        this.Whitelist = new HashMap()

        // Make a copy of mappings with modified keys
        Field.getFieldValue(net.minecraft.entity.EntityList, /* stringToClassMapping */"field_75625_b")
            .forEach((str, cls) => this.StringToClassMap.put(str.toLowerCase(), cls))

        this.addEvent("entityJoin", this.onEntityJoin.bind(this))
        this.addEvent(net.minecraftforge.event.entity.living.LivingDeathEvent, this.onEntityDeath.bind(this))
        this.addEvent("worldUnload", () => this.RenderList.clear())

        this.addSubEvent("renderWorld", this.onRender.bind(this), () => !this.RenderList.isEmpty())
    }

    /**
     * @Event net.minecraftforge.event.entity.EntityJoinWorldEvent 
     */
    onEntityJoin({entity}) {
        if (this.RenderList.containsKey(entity)) return

        const entClass = entity.class
        const isWhitelisted = this.Whitelist.containsKey(entClass)
        if (!isWhitelisted) return

        const healthList = this.Whitelist.get(entClass)
        if (typeof(healthList) === "boolean" || healthList?.includes(MobUtil.getMaxHP(entity))) {
            this.RenderList.put(entity, true)
            this.update()
        }
    }

    /**
     * @Event RenderWorld
     */
    onRender() {
        this.RenderList.forEach(entity => {
            if (entity./* isInvisible */func_82150_aj()) return

            const [mX, mY, mZ, MX, MY, MZ] = RenderHelper.getAxisCoords(entity./* getEntityBoundingBox */func_174813_aQ())
            renderAABBOutline(color.packedInt, mX, mY, mZ, MX, MY, MZ, { lw: 1, smooth: true, cull: true })
        })
    }

    /**
     * @Event net.minecraftforge.event.entity.living.LivingDeathEvent
     */
    onEntityDeath({entity}) {
        this.RenderList.remove(entity)
        this.update()
    }
    
    onEnabled(value = setting.value) {
        this.RenderList.clear()
    
        value.split(/, ?/g).forEach((entry, idx) => {
            const [name, params] = entry.split("-")
    
            if (!name) return
            const clazz = this.StringToClassMap.get(name.toLowerCase())
            if (!clazz) return Nwjn.edit(`§cEntity class called §b§l${name}§r§c is unknown. Read https://github.com/nwjn/NwjnAddons/wiki/Bestiary-Entries`, 28500 + idx)
            if (World.isLoaded()) ChatLib.deleteChat(28500 + idx)
    
            const hps = params?.split("|")?.map(NumUtil.parseCompact)
    
            this.Whitelist.put(
                clazz,
                hps ?? true
            )
        })
    
        // Loads pre-existing entities
        World.getAllEntities()?.forEach(this.onEntityJoin.bind(this))

        this.update()
    }

    onDisabled() {
        this.RenderList.clear()
        this.Whitelist.clear()
    }

    postInit() {
        ConfigProperty.getConfig().onCloseGui(this.onEnabled.bind(this))

        color.trackColor()
    }
}
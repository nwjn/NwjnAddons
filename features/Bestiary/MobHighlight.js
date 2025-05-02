import Nwjn from "../../libs/Helper/Nwjn"
import NumUtil from "../../libs/Helper/NumUtil"
import MobUtil from "../../libs/Helper/MobUtil"
import Feature from "../../libs/Features/Feature"
import ConfigProperty from "../../data/ConfigProperty"
import { getEntity } from "../../libs/Helper/ClassReference"
import { renderBoxOutline } from "../../../Apelles"

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
        this.Whitelist = new HashMap()
        this.lastUpdate = Date.now()

        this.addEvent("EntityJoin", this.recordEntities.bind(this))
        this.addEvent("EntityDeath", this.onEntityDeath.bind(this))

        this.addSubEvent("RenderLiving.Pre", this.onRender.bind(this), () => !this.RenderList.isEmpty())
    }

    recordEntities() {
        if (Date.now() - this.lastUpdate < 500) return

        this.lastUpdate = Date.now()
        this.RenderList.clear()

        World.getWorld()./* loadedEntityList */field_72996_f.forEach(entity => {
            if (this.RenderList.containsKey(entity)) return

            const entClass = entity.class
            const isWhitelisted = this.Whitelist.containsKey(entClass)
            if (!isWhitelisted) return
    
            const healthList = this.Whitelist.get(entClass)
            if (typeof(healthList) === "boolean" || healthList?.includes(MobUtil.getMaxHP(entity))) {
                this.RenderList.put(
                    entity, 
                    [
                        Math.max(entity./* width */field_70130_N, 0.3), 
                        Math.max(entity./* height */field_70131_O, 0.3)
                    ]
                )
            }
        })
        
        this.update()
    }

    /**
     * @Event RenderLivingEvent.Pre
     */
    onRender({entity}) {
        if (entity./* isInvisible */func_82150_aj()) return

        const lookup = this.RenderList.get(entity)
        if (!lookup) return

        const [ width, height ] = lookup

        renderBoxOutline(color.packed, entity.field_70165_t, entity.field_70163_u, entity.field_70161_v, width, height, { centered: true, lw: 2, smooth: true, cull: true })
    }

    /**
     * @Event EntityDeath
     */
    onEntityDeath({entity}) {
        this.RenderList.remove(entity)
        this.update()
    }
    
    onEnabled(value = setting.value) {
        this.Whitelist.clear()
        this.RenderList.clear()
    
        value.split(/, ?/g).forEach((entry, idx) => {
            const [name, params] = entry.split("-")
    
            if (!name) return
            const clazz = getEntity(name.toUpperCase())
            if (!clazz) return Nwjn.edit(`§cEntity class called §b§l${name}§r§c is unknown. Read https://github.com/nwjn/NwjnAddons/wiki/Bestiary-Entries`, 28500 + idx)
            if (World.isLoaded()) ChatLib.deleteChat(28500 + idx)
    
            const hps = params ? params.split("|").map(NumUtil.parseCompact) : true
    
            this.Whitelist.put(
                clazz,
                hps
            )
        })

        this.recordEntities()
    }

    onUnregister() {
        this.RenderList.clear()
    }
    
    onDisabled() {
        this.Whitelist.clear()
    }

    postInit() {
        ConfigProperty.getConfig().onCloseGui(this.onEnabled.bind(this))

        color.update()
    }
}
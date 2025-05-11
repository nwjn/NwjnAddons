import Nwjn from "../../libs/Helper/Nwjn"
import NumUtil from "../../libs/Helper/NumUtil"
import MobUtil from "../../libs/Helper/MobUtil"
import Feature from "../../libs/Features/Feature"
import ConfigProperty from "../../data/ConfigProperty"
import { getEntity } from "../../libs/Helper/ClassReference"
import { renderBoxOutline } from "../../../Apelles"

void new class extends Feature {    
    constructor() {        
        super({
            setting: new ConfigProperty("TextInput", {
                category: "Bestiary",
                subcategory: "Highlight",
                configName: "MobHighlight",
                title: "Mob Highlight",
                description: "Boxes entities by input based on mob class and health\n&bExamples: `Zombie` or `Zombie-100|120|2k|45k` or `Zombie, Skeleton` or `Zombie-100, Cow`",
            }),

            color: new ConfigProperty("ColorPicker", {
                category: "Bestiary",
                subcategory: "Highlight",
                configName: "MobHighlightColor",
                title: "➤ Mob Highlight Color",
                description: "     Sets the color for monster hitboxes",
                value: [ 255, 190, 239, 255 ],
                shouldShow: data => data.MobHighlight !== ""
            }),

            renderList: new HashMap(),
            whiteList: new HashMap(),

            system: java.lang.System
        })

        this.addEvent("EntityJoin", this.onEntityJoin.bind(this))
        this.addEvent("EntityDeath", this.onEntityDeath.bind(this))

        this.addSubEvent("RenderLiving.Pre", this.onRender.bind(this), () => !this.renderList.isEmpty())
    }

    /** @Event EntityJoin */
    onEntityJoin({ entity }) {
        const entClass = entity.class
        const isWhitelisted = this.whiteList.containsKey(entClass)
        if (!isWhitelisted) return

        const healthList = this.whiteList.get(entClass)
        if (typeof(healthList) !== "boolean" && !healthList?.includes(MobUtil.getMaxHP(entity))) return

        const width = Math.max(entity./*  width  */field_70130_N, 0.3)
        const height = Math.max(entity./* height */field_70131_O, 0.3)
        
        this.renderList.put(this.system.identityHashCode(entity), [ width, height ])

        this.update()
    }
    
    /** @Event EntityDeath */
    onEntityDeath({ entity }) {
        this.renderList.remove(this.system.identityHashCode(entity))
        this.update()
    }

    /** @Event RenderLivingEvent.Pre */
    onRender({ entity }) {
        const lookup = this.renderList.get(this.system.identityHashCode(entity))
        if (!lookup) return

        const [ width, height ] = lookup

        renderBoxOutline(this.color.packed, entity./* posX */field_70165_t, entity./* posY */field_70163_u, entity./* posZ */field_70161_v, width, height, { centered: true, lw: 2, smooth: true, cull: true })
    }

    recordEntities() {
        this.renderList.clear()

        World.getWorld()./* loadedEntityList */field_72996_f.forEach(entity => this.onEntityJoin({ entity }))
    }
    
    onEnabled(value = this.setting.value) {
        this.whiteList.clear()
    
        value.split(/, ?/g).forEach((entry, idx) => {
            let [ name, params, clazz ] = entry.split("-")
    
            clazz = getEntity(name.toUpperCase())
            if (name && !clazz) return Nwjn.edit(`§cEntity class called §b§l${name}§r§c is unknown. Read https://github.com/nwjn/NwjnAddons/wiki/Bestiary-Entries`, 28500 + idx)
            if (World.isLoaded()) ChatLib.deleteChat(28500 + idx)
    
            params = params?.split("|")?.map(NumUtil.parseCompact) ?? true
    
            this.whiteList.put(clazz, params)
        })

        this.recordEntities()
    }

    onRegister() {
        this.recordEntities()
    }

    onUnregister() {
        this.renderList.clear()
    }

    onDisabled() {
        this.whiteList.clear()
    }

    postInit() {
        ConfigProperty.getConfig().onCloseGui(this.onEnabled.bind(this))

        this.color.update()
    }
}
import Nwjn from "../../libs/Helper/Nwjn"
import NumUtil from "../../libs/Helper/NumUtil"
import MobUtil from "../../libs/Helper/MobUtil"
import Feature from "../../libs/Features/Feature"
import ConfigProperty from "../../data/ConfigProperty"
import { getEntity } from "../../libs/Helper/ClassReference"
import { createSemiAutomaticOutliner, createCustomOutlineTester } from "../../../Apelles"
import Ticks from "../../libs/Time/Ticks"

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

            whiteList: new HashMap(),
            tester: null,
            outliner: null
        })

        this.addEvent("EntityJoin", this.onEntityJoin.bind(this))
        this.addEvent("PacketReceived", this.onStatus.bind(this), { setFilteredClass: "EntityEffect" })
    }

    onEntityJoin({ entity }) {
        const lookup = this.whiteList.get(entity.class)
        if (!lookup) return

        scheduleTask(() => this.outliner.retest(entity), Ticks.of(5))
    }

    onEffect(packet) {
        if (packet./* getEffectId */func_149427_e() !== 14) return
        
        scheduleTask(() => this.outliner.remove(MobUtil.getEntityByID(packet./* getEntityId */func_149426_d())))
    }

    test(entity) {
        if (entity./* isInvisible */func_82150_aj()) return false

        entity = entity?.entity ?? entity
        const entClass = entity.class
        const healthList = this.whiteList.get(entClass)
        if (!healthList) return false

        return healthList?.includes(MobUtil.getMaxHP(entity))
    }

    onEnabled(value = this.setting.value) {
        this.onDisabled()

        value.split(/, ?/g).forEach((entry, idx) => {
            const [ name, params ] = entry.split("-")
    
            const clazz = getEntity(name.toLowerCase())
            if (name && !clazz) return Nwjn.edit(`§cEntity class called §b§l${name}§r§c is unknown. Read https://github.com/nwjn/NwjnAddons/wiki/Bestiary-Entries`, 28500 + idx)
            if (World.isLoaded()) ChatLib.deleteChat(28500 + idx)
    
            const healthList = params?.split("|")?.map(NumUtil.parseCompact) ?? false
    
            if (!healthList) this.tester.addWhitelist(clazz)
            this.whiteList.put(clazz, healthList)

            this.outliner.register()
        })
    }

    onDisabled() {
        this.whiteList.forEach((k, v) => !v && this.tester.removeWhitelist(k))
        this.outliner.clear()
        this.whiteList.clear()
        this.outliner.unregister()
    }

    onUnregister() {
        this.outliner.clear()
    }

    postInit() {
        this.color.update()

        this.tester = createCustomOutlineTester(this.test.bind(this)),
        this.outliner = createSemiAutomaticOutliner(this.tester, this.color.packed, 2)

        this.color._registerListener(() => this.outliner.setColor(this.color.packed))
        
        this.outliner.register()

        ConfigProperty.getConfig().onCloseGui(this.onEnabled.bind(this))
    }
}
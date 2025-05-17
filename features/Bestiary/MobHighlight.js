import Nwjn from "../../libs/Helper/Nwjn"
import NumUtil from "../../libs/Helper/NumUtil"
import MobUtil from "../../libs/Helper/MobUtil"
import Feature from "../../libs/Features/Feature"
import ConfigProperty from "../../data/ConfigProperty"
import { getEntity } from "../../libs/Helper/ClassReference"
import { createPerEntityOutliner, createCustomOutlineTester } from "../../../Apelles"
import { scheduleTask } from "../../libs/Time/Scheduler"

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

        this.addEvent("PacketReceived", this.onStatus.bind(this), { setFilteredClass: "EntityEffect" })
    }

    onEffect(packet) {
        if (packet.func_149427_e() === 14) scheduleTask(() => this.outliner.clear())
    }

    test(entity) {
        if (entity./* isInvisible */func_82150_aj()) return

        entity = entity?.entity ?? entity
        const entClass = entity.class
        const isWhitelisted = this.whiteList.get(entClass)
        if (!isWhitelisted) return

        const healthList = this.whiteList.get(entClass)
        return healthList?.includes(MobUtil.getMaxHP(entity)) || healthList
    }

    onEnabled(value = this.setting.value) {
        this.onDisabled()

        value.split(/, ?/g).forEach((entry, idx) => {
            const [ name, params ] = entry.split("-")
    
            const clazz = getEntity(name.toLowerCase())
            if (name && !clazz) return Nwjn.edit(`§cEntity class called §b§l${name}§r§c is unknown. Read https://github.com/nwjn/NwjnAddons/wiki/Bestiary-Entries`, 28500 + idx)
            if (World.isLoaded()) ChatLib.deleteChat(28500 + idx)
    
            const healthList = params?.split("|")?.map(NumUtil.parseCompact) ?? true
    
            this.whiteList.put(clazz, healthList)
        })
    }

    onDisabled() {
        this.outliner.clear()
        this.whiteList.clear()
    }

    onUnregister() {
        this.outliner.clear()
    }

    postInit() {
        this.color.update()

        this.tester = createCustomOutlineTester(this.test.bind(this)),
        this.outliner = createPerEntityOutliner(this.tester, this.color.packed, 2)

        this.outliner.setColor(this.color.packed)
        this.color._registerListener(() => this.outliner.setColor(this.color.packed))
        
        this.outliner.register()

        ConfigProperty.getConfig().onCloseGui(this.onEnabled.bind(this))
    }
}
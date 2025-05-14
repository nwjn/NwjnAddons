import Nwjn from "../../libs/Helper/Nwjn"
import NumUtil from "../../libs/Helper/NumUtil"
import MobUtil from "../../libs/Helper/MobUtil"
import Feature from "../../libs/Features/Feature"
import ConfigProperty from "../../data/ConfigProperty"
import { getEntity } from "../../libs/Helper/ClassReference"
import { createPerEntityOutliner, createCustomOutlineTester, createManualOutliner } from "../../../Apelles"

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

            outliner: createManualOutliner(0xffbeefff, 2)
        })

        this.addEvent("EntityJoin", this.test.bind(this))
    }

    test(entity) {
        entity = entity?.entity ?? entity
        const entClass = entity.class
        const isWhitelisted = this.whiteList.get(entClass)
        if (!isWhitelisted) return false

        const healthList = this.whiteList.get(entClass)
        if (typeof(healthList) === "boolean" || healthList?.includes(MobUtil.getMaxHP(entity))) this.outliner.add(entity)
    }

    onEnabled(value = this.setting.value) {
        // this.outliner.clear()
        World.getWorld()./* loadedEntityList */field_72996_f.forEach(e => this.outliner.remove(e))
        this.whiteList.clear()
    
        if (!value) return

        value.split(/, ?/g).forEach((entry, idx) => {
            const [ name, params ] = entry.split("-")
    
            const clazz = getEntity(name.toLowerCase())
            if (name && !clazz) return Nwjn.edit(`§cEntity class called §b§l${name}§r§c is unknown. Read https://github.com/nwjn/NwjnAddons/wiki/Bestiary-Entries`, 28500 + idx)
            if (World.isLoaded()) ChatLib.deleteChat(28500 + idx)
    
            const healthList = params?.split("|")?.map(NumUtil.parseCompact) ?? true
    
            this.whiteList.put(clazz, healthList)
        })

        World.getWorld()./* loadedEntityList */field_72996_f.forEach(this.test.bind(this))
    }

    onDisabled() {
        this.onEnabled(false)
    }

    postInit() {
        this.color.update()

        // this.tester = createCustomOutlineTester(this.test.bind(this)),
        // this.outliner = createPerEntityOutliner(this.tester, this.color.packed, 2)
        this.outliner.register()
        // this.outliner.setColor(this.color.packed)
        // this.color._registerListener(() => this.color.packed)
    
        ConfigProperty.getConfig().onCloseGui(this.onEnabled.bind(this))
    }
}
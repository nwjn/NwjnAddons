import Config from "../../data/Config"
import ConfigProperty from "../../data/ConfigProperty"

import Feature from "../../libs/Features/Feature"

import Nwjn from "../../libs/Helper/Nwjn"
import NumUtil from "../../libs/Helper/NumUtil"
import MobUtil from "../../libs/Helper/MobUtil"
import { getEntity } from "../../libs/Helper/ClassReference"

import { createSemiAutomaticOutliner, createCustomOutlineTester } from "../../../Apelles"

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
            insurance: new java.util.WeakHashMap(),

            tester: null,
            outliner: null
        })

        this.addSubEvent("EntityUpdate", this.ensure.bind(this), () => !this.whiteList.isEmpty())
    }

    /** @SubEvent EntityUpdate */
    ensure(entity) {
        const policy = this.insurance.get(entity)
        if (policy === null) return

        const newPolicy = this.updatePolicy(policy, entity.field_70173_aa)
        if (!newPolicy) return this.insurance.remove(entity)
        if (newPolicy === policy) return

        this.insurance.replace(entity, newPolicy)
        this.outliner.retest(entity)
    }

    signPolicy(cycles, stamp) {
        return (0x1000000 * cycles) + stamp
    }

    updatePolicy(policy, newStamp) {
        const cycle = policy >> 24
        if (!cycle) return 0

        const delta = policy - (cycle << 24)

        const covered = newStamp - delta
        if (covered < 20) return policy

        return this.signPolicy(cycle - 1, newStamp)
    }

    test(entity) {
        if (entity./* isInvisible */func_82150_aj()) return false

        const entClass = entity.class
        const healthList = this.whiteList.get(entClass)
        if (!healthList) return false

        const validate = healthList === true || healthList?.includes(MobUtil.getMaxHP(entity))

        if (!validate) {
            const findOrSign = this.insurance.getOrDefault(entity, 
                this.signPolicy(
                    5, // warranty
                    entity.field_70173_aa // stamp
                )
            )

            this.insurance.put(entity, findOrSign)
        }

        return validate
    }

    onEnabled(value = this.setting.value) {
        this.onDisabled()

        value.split(/, ?|\n/g)?.forEach((entry, idx) => {
            const [ name, params ] = entry.split("-")
    
            const clazz = getEntity(name.toLowerCase())
            if (name && !clazz) return Nwjn.edit(`§cEntity class called §b§l${name}§r§c is unknown. Read https://github.com/nwjn/NwjnAddons/wiki/Bestiary-Entries`, 28500 + idx)
            if (World.isLoaded()) ChatLib.deleteChat(28500 + idx)
            if (!clazz) return
    
            const healthList = params?.split("|")?.map(NumUtil.parseCompact) ?? true
    
            this.whiteList.put(clazz, healthList)
        })

        if (this.whiteList.isEmpty()) return
        this.outliner.register()
        this.update()
    }

    onDisabled() {
        this.onUnregister()

        this.whiteList.clear()
        this.outliner.unregister()
    }

    onUnregister() {
        this.insurance.clear()
        this.outliner.clear()
    }

    postInit() {
        this.tester = createCustomOutlineTester(this.test.bind(this)),
        this.outliner = createSemiAutomaticOutliner(this.tester, this.color.packed, 2)
        this.color.addListener(() => this.outliner.setColor(this.color.packed))

        Config.getConfig().onCloseGui(this.onEnabled.bind(this))
    }
}
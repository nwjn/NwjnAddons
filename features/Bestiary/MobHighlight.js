import Config from "../../data/Config"
import ConfigProperty from "../../data/ConfigProperty"

import Feature from "../../libs/Features/Feature"

import Nwjn from "../../libs/Helper/Nwjn"
import NumUtil from "../../libs/Helper/NumUtil"
import MobUtil from "../../libs/Helper/MobUtil"
import Command from "../../libs/Helper/Command"
import { ENTITY_TYPES, getEntity } from "../../libs/Helper/ClassReference"

import Apelles from "../../libs/Helper/Apelley"

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
            attempts: new java.util.WeakHashMap()
        })

        this.addSubEvent("EntityUpdate", this.tryUpdateEntity.bind(this), () => !this.whiteList.isEmpty())

        Command.addCommand({
            name: "highlight",
            aliases: [ "mob" ],
            description: "Modify the highlighting from the chat. To clear entries you need to do it in settings.",
            run: this.onCommand.bind(this),
            clickAction: "run_command",
            tabCompletions: (...entries) => {
                const lastEntry = entries?.slice(-1)?.[0]
                if (!lastEntry) return ENTITY_TYPES

                const test = new RegExp(lastEntry, "i")
                return ENTITY_TYPES.filter(type => test.test(type))
            }
        })
    }

    /** @SubEvent EntityUpdate */
    tryUpdateEntity(entity) {
        const packed = this.attempts.get(entity)
        if (packed === null) return

        const repacked = this.getUpdateTime(packed, entity./* ticksExisted */field_70173_aa)
        if (!repacked) return void this.attempts.remove(entity)
        if (repacked === packed) return

        this.attempts.replace(entity, repacked)
        this.outliner.retest(entity)
    }

    packAttemptData(attempts, ticksExisted) {
        return (attempts << 24) | (ticksExisted & 0xFFFFFF)
    }

    getUpdateTime(packedData, ticksExisted) {
        const attempts = packedData >>> 24
        if (!attempts) return 0

        const lastUpdateTick = packedData & 0xFFFFFF

        const deltaTick = ticksExisted - lastUpdateTick
        if (deltaTick < 10) return packedData

        return this.packAttemptData(packedData - 1, ticksExisted)
    }

    test(entity) {
        const healthList = this.whiteList.get(entity.class)
        if (!healthList) return false

        const validate = healthList === true || healthList?.includes(MobUtil.getMaxHP(entity))

        if (!validate) {
            const getOrPack = this.attempts.getOrDefault(entity, 
                this.packAttemptData(10, entity./* ticksExisted */field_70173_aa)
            )

            this.attempts.put(entity, getOrPack)
        }

        return validate
    }

    onCommand(...args) {
        if (args?.[0]) return this.setting.value = args.join(" ")

        // Modified "suggest_command" if entry is not blank
        if (this.setting.value) return Client.scheduleTask(() => Client.setCurrentChatMessage(`/nwjn mob ${this.setting.value}`))
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
        this.attempts.clear()
        this.outliner.clear()
    }

    postInit() {
        this.tester = Apelles.createCustomOutlineTester(this.test.bind(this)),
        this.outliner = Apelles.createSemiAutomaticOutliner(this.tester, this.color.packed, 1)
        this.color.addListener(() => this.outliner.setColor(this.color.packed))

        Config.getConfig().onCloseGui(this.onEnabled.bind(this))
    }
}
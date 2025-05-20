import Nwjn from "../../libs/Helper/Nwjn"
import NumUtil from "../../libs/Helper/NumUtil"
import MobUtil from "../../libs/Helper/MobUtil"
import Feature from "../../libs/Features/Feature"
import ConfigProperty from "../../data/ConfigProperty"
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
            tester: null,
            outliner: null
        })

        this.addSubEvent("PacketReceived", this.onEffect.bind(this), { setFilteredClass: "EntityEffect" }, () => !this.whiteList.isEmpty())
        this.addSubEvent("PacketReceived", this.onEntityFirstUpdate.bind(this), { setFilteredClass: "EntityMetadata" }, () => !this.whiteList.isEmpty())
    }

    /**
     * @SubEvent PacketReceived
     * @Packet EntityEffect
     */
    onEffect(packet) {
        if (packet.func_149427_e() !== 14) return

        const entity = MobUtil.getEntityByID(packet.func_149426_d())
        if (!entity) return

        const lookup = this.whiteList.containsKey(entity.class)
        if (!lookup) return

        Client.scheduleTask(() => this.outliner.remove(entity))
    }

    /**
     * @SubEvent PacketReceived
     * @Packet EntityMetadata
     */
    onEntityFirstUpdate(packet) {
        const entity = MobUtil.getEntityByID(packet./* getEntityId */func_149375_d())
        if (!entity) return

        const WatchList = packet./* getWatcherList */func_149376_c()
        if (!WatchList) return

        const healthList = this.whiteList.get(entity.class)
        if (!healthList) return
        if (healthList === true) return this.outliner.add(entity)

        for (let watcher of WatchList) {
            let obj = watcher.func_75669_b()
            if (Number.isInteger(obj) && healthList.includes(obj))
                return Client.scheduleTask(() => this.outliner.retest(entity))
        }
    }

    test(entity) {
        if (entity./* isInvisible */func_82150_aj()) return false

        entity = entity?.entity ?? entity
        const entClass = entity.class
        const healthList = this.whiteList.get(entClass)
        if (!healthList) return false

        return healthList === true || healthList?.includes(MobUtil.getMaxHP(entity))
    }

    onEnabled(value = this.setting.value) {
        this.onDisabled()

        value?.split(/, ?|\n/g)?.forEach((entry, idx) => {
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
        this.outliner = createSemiAutomaticOutliner(this.tester, this.color.packed, 2, { renderInvis: false })

        this.color._registerListener(() => this.outliner.setColor(this.color.packed))
        
        this.outliner.register()

        ConfigProperty.getConfig().onCloseGui(this.onEnabled.bind(this))
    }
}
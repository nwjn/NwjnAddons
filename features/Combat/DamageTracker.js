import Nwjn from "../../libs/Helper/Nwjn"
import Feature from "../../libs/Features/Feature"
import ConfigProperty from "../../data/ConfigProperty"
import NumUtil from "../../libs/Helper/NumUtil"

void new class extends Feature {
    constructor() {
        super({
            setting: new ConfigProperty("Switch", {
                category: "Combat",
                configName: "DamageTracker",
                title: "Damage Tracker",
                description: "Displays damage tags in chat"
            }),
            threshold: new ConfigProperty("Slider", {
                category: "Combat",
                configName: "DamageTrackerThreshold",
                title: "Damage Tracker Threshold",
                description: "Only chats damage over the threshold, counted by millions",
                options: [0, 50],
                shouldShow: data => data.DamageTracker
            }),
            
            BLACKLIST_REGEX: /\s|^§\w\D$/,
            THRESHOLD: 0
        })

        this.addEvent("PacketReceived", this.onSkyblockDamageSplash.bind(this), { setFilteredClass: "SpawnMob" })
    }

    /**
     * @Event PacketReceived
     * @Modifier SpawnMob
     */
    onSkyblockDamageSplash(packet) {
        if (packet./* getEntityType */func_149025_e() !== 30) return

        const watchers = packet./* getWatcherList */func_149027_c()
        for (let watcher of watchers) {
            if (watcher./* getObjectType */func_75674_c() !== 4) continue

            let nametag = watcher./* getObject */func_75669_b()
            if (!nametag || this.BLACKLIST_REGEX.test(nametag)) continue

            if (this.THRESHOLD && ~~nametag.removeFormatting().replace(/\D/g, "") < this.THRESHOLD) continue

            return Nwjn.chat(NumUtil.isFormatUS() ? nametag : nametag.replace(",", "."))
        }
    }

    postInit() {
        this.THRESHOLD = this.threshold.value * 1E6
        this.threshold.addListener((_, val) => this.THRESHOLD = val * 1E6)
    }
}
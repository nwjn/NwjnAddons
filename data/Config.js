import Event from "../libs/Events/Event"
import Location from "../libs/Hypixel/Location"
import Settings from "../../Amaterasu/core/Settings"
import DefaultConfig from "../../Amaterasu/core/DefaultConfig"

export default class Config {
    static defCon1 = new DefaultConfig("Nwjn", "data/.Config.json")

    static hasInitialized = false
    static functionQueue = []
    static modules = []

    /**
     * After loading all feature files this will be called from index.js
     * Initializes the settings object
     * By the time default config reaches this point all properties should already be applied
     * @returns {Settings} the settings instance
     */
    static initSettings() {
        // Sort initially instead of on apply call
        const mainCategories = [ "Home", "General", "Bestiary", "Combat", "Performance" ]
        
        const meinConf = new Settings("Nwjn", Config.defCon1, "data/Scheme.json", `              §r§0§m§l---------§r§0§l 【§r §c§lNwjn§0§l 】§r§0§m§l---------§r`)
            .setClickSound(() => World.playSound("gui.button.press", 0.25, 1))

            // If someone decides to fork the module and add their own features, those categories will be pushed to the bottom
            .setCategorySort((a, b) => {
                const idx1 = mainCategories.indexOf(a.category)
                const idx2 = mainCategories.indexOf(b.category)
                return (~idx1 ? idx1 : Infinity) - (~idx2 ? idx2 : Infinity)    
            })

        const { background, descriptionElement, searchBar, apply } = meinConf.AmaterasuGui
    
        background.x = 15
        background.y = 15
        background.width = 70
        background.height = 70
    
        descriptionElement.textWrap.enabled = false
        
        searchBar.x = 84
    
        apply()
    }

    static postInit(fn) {
        if (Config.hasInitialized) return fn()
            
        Config.functionQueue.push(fn)
    }

    static require(feat) {
        Config.modules.push(feat)

        Config.functionQueue.push(feat._postInit.bind(feat))
    }

    /** Creates listeners and events for updating features */
    static load() {
        Config.initSettings()

        const poll = () => { for (let feat of Config.modules) feat._updateRegister() }
        const pollZone = () => { for (let feat of Config.modules) feat.zones && feat._updateRegister() }
        const deReg = () => { for (let feat of Config.modules) feat._unregister() }

        new Event("WorldLoad", poll)

        Location.onWorldChange(world => world ? poll() : deReg())
        Location.onAreaChange(zone => zone && pollZone())

        Config.getConfig().onCloseGui(poll)

        for (let fn of Config.functionQueue) fn()

        Config.hasInitialized = true
        Config.functionQueue = null
    }

    static getConfig() {
        return Config.defCon1?.settingsInstance
    }

    static getSettings() {
        return Config.getConfig()?.settings
    }
}
import DefaultConfig from "../../Amaterasu/core/DefaultConfig"

const defCon1 = new DefaultConfig("Nwjn", "data/.Config.json")

export default class ConfigProperty {
    static getDefaultConfig() {
        return defCon1
    }

    static getConfig() {
        return defCon1?.settingsInstance
    }

    static getSettings() {
        return defCon1?.settingsInstance?.settings
    }

    /**
     * @param {"Button"|"ColorPicker"|"DropDown"|"Keybind"|"MultiCheckbox"|"Selection"|"Slider"|"Switch"|"TextInput"|"TextParagraph"|"Toggle"} type 
     * @param {*} obj 
     */
    constructor (type, obj) {
        this.configName = obj.configName
        defCon1[`add${type}`](obj)
    }

    get value() {
        return ConfigProperty.getSettings()?.[this.configName]
    }

    /**
     * @private
     * Registers a listener, 
     * mainly for internal use,
     * otherwise define it in the initializing object
     * 
     * [Feature] uses this to register a listener after configs have been initialized
     */
    _registerListener(cb) {
        ConfigProperty.getConfig().registerListener(this.configName, cb)
    }
}
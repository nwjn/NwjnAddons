import DefaultConfig from "../../Amaterasu/core/DefaultConfig"
import NumUtil from "../libs/Helper/NumUtil"

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
        if (type) defCon1[`add${type}`](obj)

        if (type === "MultiCheckbox") {
            obj.options.forEach(opt => 
                this[opt.configName] = new this(null, opt)
            )
        }
    }

    get value() {
        return ConfigProperty.getSettings()?.[this.configName]
    }

    /**
     * Call in postInit to track and pack a ColorPicker's value as a packed int
     * @param {?number} scale if specified, also packs a scaled copy of the int
     */
    trackColor(scale = null) {
        this.packedInt = NumUtil.toRGBAHex(this.value)
        if (scale) this.packedIntScaled = NumUtil.scaleAlpha(this.packedInt, scale)

        this._registerListener((_, v) => {
            this.packedInt = NumUtil.toRGBAHex(v)
            if (scale) this.packedIntScaled = NumUtil.scaleAlpha(this.packedInt, scale)
        })
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
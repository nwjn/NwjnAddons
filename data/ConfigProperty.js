import DefaultConfig from "../../Amaterasu/core/DefaultConfig"
import NumUtil from "../libs/Helper/NumUtil"

const defCon1 = new DefaultConfig("Nwjn", "data/.Config.json")
const queueFn = []
let isInit = false

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

    static awaitSettings(fn) {
        isInit ? fn() : queueFn.push(fn)
    }

    static postInit() {
        isInit = true

        let fn
        while (fn = queueFn.pop()) fn()
    }

    /**
     * @param {"Button"|"ColorPicker"|"DropDown"|"Keybind"|"MultiCheckbox"|"Selection"|"Slider"|"Switch"|"TextInput"|"TextParagraph"|"Toggle"} type 
     * @param {*} obj 
     */
    constructor(type, obj) {
        this.type = type
        this.configName = obj.configName
        
        // Custom functionality
        if (type == "ColorPicker") {
            this.packed = 0xffffffff
            this.dulled = 0xffffff33
            this.shifted = 0xffffffff
            
            obj.registerListener = ((_, v) => this.update(v))
        } 
        else delete this.update
        
        if (type === "MultiCheckbox") {
            obj.options.forEach(opt => 
                this[opt.configName] = new ConfigProperty(null, opt)
            )
        }

        if (type) defCon1[`add${type}`](obj)
    }

    get value() {
        return ConfigProperty.getSettings()?.[this.configName]
    }

    update(anyArg) {
        if (this.type == "ColorPicker") {
            const hex = NumUtil.toRGBAHex(anyArg ?? this.value)

            this.packed = hex
            this.dulled = NumUtil.scaleAlphaOffset(hex, 0.2)
            this.shifted = NumUtil.rgbaToARGB(hex)
        }
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
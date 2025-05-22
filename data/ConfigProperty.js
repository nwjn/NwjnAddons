import Config from "./Config"
import Color from "../libs/Helper/Color"

export default class ConfigProperty {
    /**
     * @param {"Button"|"ColorPicker"|"DropDown"|"Keybind"|"MultiCheckbox"|"Selection"|"Slider"|"Switch"|"TextInput"|"TextParagraph"|"Toggle"} type 
     * @param {*} obj 
     */
    constructor(type, obj) {
        this.type = type
        this.configName = obj.configName
        
        // Custom functionality
        if (type === "ColorPicker") {
            this.packed = 0xffffffff
            this.dulled = 0xffffff33
            this.shifted = 0xffffffff
            
            this.listener = (_, value) => {
                const hex = Color.toRGBAHex(value ?? this.value)

                this.packed = hex
                this.dulled = Color.scaleAlphaOffset(hex, 0.2)
                this.shifted = Color.rgbaToARGB(hex)
            }

            Config.postInit(() => {
                this.addListener(this.listener)
                this.listener()
            })
        }
        else if (type === "MultiCheckbox") {
            obj.options.forEach(opt => 
                this[opt.configName] = new ConfigProperty(null, opt)
            )
        }

        if (type) Config.defCon1[`add${type}`](obj)
    }

    get value() {
        return Config.getSettings()?.[this.configName]
    }

    /**
     * Registers a listener, 
     * mainly for internal use,
     * otherwise define it in the initializing object
     * 
     * [Feature] uses this to register a listener after configs have been initialized
     */
    addListener(cb) {
        Config.getConfig().registerListener(this.configName, cb)
    }
}
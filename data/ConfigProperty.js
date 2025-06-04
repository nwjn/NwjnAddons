import Config from "./Config"

export default class ConfigProperty {    
    static TRANSFORMATIONS = {
        COLOR: {
            rgbaArrayToRGBAHex(array) {
                return array[0] * 0x1000000
                     + array[1] * 0x10000
                     + array[2] * 0x100
                     + array[3] * 0x1
            },
        
            copyWithScaledAlpha(hex, scaleFactor) {
                return hex - (hex & 0xff) * (1 - scaleFactor)
            },
        
            rgbaHexToFontHex(hex) {
                return (hex >> 24 & 0xff) * 0x10000
                     + (hex >> 16 & 0xff) * 0x100
                     + (hex >>  8 & 0xff) * 0x1
                     + (hex >>  0 & 0xff) * 0x1000000
            }
        },
        
        ENUM: {
            toEnumOptions(options) {
                return options.reduce((obj, val, idx) => (
                    obj[val] = idx,
                    obj
                ), Object(options))
            }
        }
    }

    /**
     * @param {"Button"|"ColorPicker"|"DropDown"|"Keybind"|"MultiCheckbox"|"Selection"|"Slider"|"Switch"|"TextInput"|"TextParagraph"|"Toggle"} type 
     * @param {{ category, subcategory, title, configName, description, value, shouldShow, registerListener, options }} obj 
     */
    constructor(type, obj) {
        this.type = type
        this.configName = obj.configName
        this.category = obj.category
        
        // Custom functionality
        if (type === "ColorPicker") {
            this.packed = 0xffffffff
            this.damped = 0xffffff99
            this.dulled = 0xffffff33
            this.shifted = 0xffffffff
            
            this.listener = (_, value) => {
                const TransformColor = ConfigProperty.TRANSFORMATIONS.COLOR

                this.packed = TransformColor.rgbaArrayToRGBAHex(value ?? this.value)
                this.damped = TransformColor.copyWithScaledAlpha(this.packed, 0.6)
                this.dulled = TransformColor.copyWithScaledAlpha(this.packed, 0.2)
                this.shifted = TransformColor.rgbaHexToFontHex(this.packed)
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

    set value(value) {
        Config.getConfig().setConfigValue(this.category, this.configName, value)
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
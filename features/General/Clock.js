import GuiFeature from "../../libs/Features/GuiFeature"
import ConfigProperty from "../../data/ConfigProperty"

void new class extends GuiFeature {
    constructor() {
        super({
            setting: new ConfigProperty("Switch", {
                category: "General",
                subcategory: "Clock",
                configName: "Clock",
                title: "Clock Display",
                description: "Stay productive by keeping track of time!"
            }),
        
            color: new ConfigProperty("ColorPicker", {
                category: "General",
                subcategory: "Clock",
                configName: "ClockColor",
                title: "➤ Clock Color",
                description: "     Sets the color for the clock display",
                value: [255, 190, 239, 255],
                shouldShow: data => data.Clock
            }),

            format: new ConfigProperty("DropDown", {
                category: "General",
                subcategory: "Clock",
                configName: "ClockFormat",
                title: "➤ Clock Format",
                description: "     Sets the format for the clock display",
                options: [ "hh:mm:ss a", "HH:mm:ss", "hh:mm a", "HH:mm" ],
                value: 0,
                shouldShow: data => data.Clock
            }),
        
            defaultText: [ "1:23:34 AM" ]
        })

        this.addEvent("Step", this.onInterval.bind(this), { setFps: 1 })
    }

    /**
     * @Event Step
     * @Modifier 1 FPS
     */
    onInterval() {
        const formattedNow = this.formatter.format(Date.now())
        this.setLine(formattedNow)
    }

    onEnabled() {
        this.onInterval()
    }

    setFormat() {
        const format = this.format.enum[this.format.value]
        this.formatter = org.apache.commons.lang3.time.FastDateFormat.getInstance(format, java.util.Locale.US)
    }

    postInit() {
        this.setFormat()
        this.format.addListener(this.setFormat.bind(this))
    }
}
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
        
            defaultText: [ "1:23:34 AM" ]
        })

        this.formatter = new java.text.SimpleDateFormat("hh:mm:ss a", java.util.Locale.US)

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
}
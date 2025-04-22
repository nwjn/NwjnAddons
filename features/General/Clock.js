import GuiFeature from "../../libs/Features/GuiFeature"
import Seconds from "../../libs/Time/Units/Seconds"
import ConfigProperty from "../../data/ConfigProperty"

const category = "General"
const subcategory = "Clock"

const setting = new ConfigProperty("Switch", {
    category,
    subcategory,
    configName: "Clock",
    title: "Clock Display",
    description: "Stay productive by keeping track of time!"
})
const color = new ConfigProperty("ColorPicker", {
    category,
    subcategory,
    configName: "ClockColor",
    title: "➤ Clock Color",
    description: "     Sets the color for the clock display",
    value: [255, 190, 239, 255],
    shouldShow: data => data.Clock
})

new class extends GuiFeature {
    constructor() {
        super({setting, color}, ["1:23 AM"])

        this.formatter = new java.text.SimpleDateFormat("hh:mm a", java.util.Locale.US)

        this.addEvent("step", this.onInterval.bind(this), {
            setDelay: Seconds.of(1).getValue()
        })
    }

    /**
     * @Event Step
     * @Modifier Seconds.of(1)
     */
    onInterval() {
        const formattedNow = this.formatter.format(Date.now())
        this.setLine(formattedNow)
    }

    onEnabled() {
        this.onInterval()
    }
}
import GuiFeature from "../../libs/Features/GuiFeature"
import Seconds from "../../libs/Time/Units/Seconds"

new class Clock extends GuiFeature {
    constructor() {
        super({
            setting: this.constructor.name, 
            color: this.constructor.name + "Color"
        }, ["1:23 AM"])

        this.formatter = new java.text.SimpleDateFormat("hh:mm a", java.util.Locale.US)

        this.addEvent("interval", this.onInterval.bind(this), Seconds.of(1))

        this.init()
    }

    /** @Interval {Seconds.of(1)} */
    onInterval() {
        const formattedNow = this.formatter.format(Date.now())
        this.setLine(formattedNow)
    }

    onEnabled() {
        this.onInterval()
    }
}
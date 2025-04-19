// import Data from "../../data/Data"
// import Seconds from "../../libs/Time/Units/Seconds"
// import GuiFeature from "../../libs/Features/GuiFeature"

// const GUMMY_EATEN_REGEX = /^You ate a Re-heated Gummy Polar Bear\!$/

// new class GummyTimer extends GuiFeature {
//     constructor() {
//         super({setting: this.constructor.name}, "§aGummy§f: §cInactive")

//         this.addEvent("serverChat", this.onServerChat.bind(this), GUMMY_EATEN_REGEX)
//         this.addSubEvent("interval", this.onInterval.bind(this), Seconds.of(1), () => Data.gummy > 0)

//         this.setLine(this.defaultText)
//         this.init()
//     }

//     /** @Event {ServerChat} */
//     onServerChat() {
//         Data.gummy += 3_600
//         this.setLine()
//         this.updateSubEvents()
//     }

//     /** @Interval {Seconds.of(1)} */
//     onInterval() {
//         if (Location.area) this.setLine(this.format(--Data.gummy))
//     }
// }
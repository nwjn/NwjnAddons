// import GuiFeature from "../../libs/Features/GuiFeature"

// new class Poison extends GuiFeature {
//     constructor() {
//         const defaultText = [
//             "0§8x §5Twilight Arrow Poison",
//             "0§8x §rFlint Arrows",
//             "0§8x §aToxic Arrow Poison"
//         ]

//         super({setting: this.constructor.name}, defaultText)
//             .addEvent("interval", () => {
//                 if (!World.isLoaded()) return

//                 const stats = [0, 0, 0]

//                 Player.getInventory().getItems().forEach(item => {
//                     if (!/(dyePowder|arrow)/g.test(item?.toString())) return

//                     const itemName = item.getName().removeFormatting()
//                     const stackSize = item.getStackSize()

//                     switch(itemName) {
//                         case "Twilight Arrow Poison": return stats[0] += stackSize
//                         case "Flint Arrow": return stats[1] += stackSize
//                         case "Toxic Arrow Poison": return stats[2] += stackSize
//                         default: return
//                     }
//                 })

//                 this.setStatistics(stats)
//             }, 1)
//         this.init()
//     }

//     setStatistics([twilight, arrows, toxic]) {
//         this.setLines([
//             `${twilight}§8x §5Twilight Arrow Poison`,
//             `${arrows}§8x §rFlint Arrows`,
//             `${toxic}§8x §aToxic Arrow Poison`
//         ])
//     }
// }
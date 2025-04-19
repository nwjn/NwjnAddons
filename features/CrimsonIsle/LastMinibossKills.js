// import Data from "../../data/Data"
// import GuiFeature from "../../libs/Features/GuiFeature"

// new class LastMinibosses extends GuiFeature {
//     constructor() {
//         super({
//             setting: this.constructor.name,
//             worlds: "Crimson Isle"
//         })

//         this.minibosses = {
//             "BLADESOUL": "§8Bladesoul",
//             "BARBARIAN DUKE X": "§eBarbarian Duke X",
//             "ASHFANG": "§cAshfang",
//             "MAGMA BOSS": "§4Magma Boss",
//             "MAGE OUTLAW": "§5Mage Outlaw"
//         }

//         this.setLine("§6Miniboss History§f:")

//         this.addEvent(
//             "serverChat",
//             this.onMinibossKilled.bind(this),
//             /^\S*([A-Z\s]+) DOWN!$/
//         )
//     }

//     onMinibossKilled(miniboss) {
//         miniboss = this.minibosses[miniboss]
//         if (!miniboss) return

//         if (Data.LastMinibosses.push(miniboss) > 4) Data.LastMinibosses.shift()
            
//         Data.LastMinibosses.forEach((value, index) => {
//             index++

//             this.setLine(`${index}. ${value}`, index)
//         })
//     }
// }
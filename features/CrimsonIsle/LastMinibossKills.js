import ConfigProperty from "../../data/ConfigProperty"
import Data from "../../data/Data"
import GuiFeature from "../../libs/Features/GuiFeature"

void new class extends GuiFeature {
    constructor() {
        super({
            setting: new ConfigProperty("Switch", {
                category: "Crimson Isle",
                configName: "MinibossHistory",
                title: "Miniboss History",
                description: "History log of recent miniboss kills"
            }),

            worlds: [ "Crimson Isle" ],


            MINIBOSSES: {
                "BLADESOUL": "§8Bladesoul",
                "BARBARIAN DUKE X": "§eBarbarian Duke X",
                "ASHFANG": "§cAshfang",
                "MAGMA BOSS": "§4Magma Boss",
                "MAGE OUTLAW": "§5Mage Outlaw"
            },

            title: "§6Miniboss History§f:",

            MINIBOSS_KILLED_REGEX: /^\S*([A-Z\s]+) DOWN!$/
        })


        this.setLine(this.title)

        this.addEvent("ServerChat", this.onMinibossKilled.bind(this), { setCriteria: /^\s*([A-Z\s]+) DOWN!$/ })
    }

    onMinibossKilled(miniboss) {
        miniboss = this.MINIBOSSES[miniboss]
        if (!miniboss) return

        if (Data.LastMinibosses.push(miniboss) > 4) Data.LastMinibosses.shift()
            
        Data.LastMinibosses.forEach((value, index) => {
            index++

            this.setLine(`${index}. ${value}`, index)
        })
    }
}
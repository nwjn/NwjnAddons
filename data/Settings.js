import ConfigProperty from "./ConfigProperty"
import Nwjn from "../libs/Helper/Nwjn"
import Settings from "../../Amaterasu/core/Settings"

new ConfigProperty("TextParagraph", {
    category: "Home",
    configName: "dependencies",
    title: "§6§lPowered by:§r",
    description: "\n" + Nwjn.DEPENDENCIES.map(([lib, ver], idx) => `§r§${(idx + 10).toString(16)}${lib}-${ver}§r`).join("\n"),
    centered: true
})

new ConfigProperty("Button", {
    category: "Home",
    configName: "github",
    title: "Github",
    description: "Contribute to, or track this project's progress and pre-releases!",
    onClick: () => Nwjn.openLink("https://github.com/nwjn")
})

new ConfigProperty("Button", {
    category: "Home",
    configName: "discord",
    title: "Discord",
    description: "Send feedback including suggestions and bug-reports!",
    onClick: () => Nwjn.openLink("https://discord.com/invite/3S3wXpC4gE")
})
// .addSwitch({
//     category: "Combat",
//     configName: "ReaperTimer",
//     title: "Reaper Buff Timer",
//     description: "Displays the time left on your reaper armor buff",
//     value: false
// })
// .addSwitch({
//     category: "Combat",
//     configName: "RendArrows",
//     title: "Rend Arrows",
//     description: "Displays the amount of arrows pulled on rend in chat",
//     value: false
// })
// .addSwitch({
//     category: "Combat",
//     configName: "Poison",
//     title: "Poison Display",
//     description: "Displays amounts of arrows and poisons in inventory",
//     value: false
// })
// .addDropDown({
//     category: "Combat",
//     configName: "FatalTempo",
//     title: "Fatal Tempo Display",
//     description: "Select when to show Fatal Tempo Display -> /moveFT",
//     options: ["Off", "Always", "Over 0%", "At 200%"],
//     value: 0,
//     subcategory: "Fatal Tempo"
// })
// .addMultiCheckbox({
//     category: "Combat",
//     configName: "FatalTempoComponents",
//     title: "Fatal Tempo Components",
//     description: "Toggles for different aspects of this display",
//     placeHolder: "Click",
//     options: [
//         {
//             title: "Prefix",
//             configName: "FatalTempoPrefix",
//             value: true
//         },
//         {
//             title: "Percent",
//             configName: "FatalTempoPercent",
//             value: true
//         },
//         {
//             title: "Time",
//             configName: "FatalTempoTime",
//             value: true
//         }
//     ],
//     shouldShow: data => data.FatalTempo !== 0
// })
// .addTextInput({
//     category: "Bestiary",
//     configName: "StandHighlight",
//     title: "Armor Stand Names Highlight",
//     description: "Draws hitboxes around armor stands that include the inputted name, seperate with '|' character",
//     value: ""
// })
// .addColorPicker({
//     category: "Bestiary",
//     configName: "StandHighlightColor",
//     title: "Armor Stand Highlight Color",
//     description: "Sets the color for armor stand hitboxes",
//     value: [255, 190, 239, 255],
//     shouldShow: data => data.StandHighlight !== ""
// })
// .addTextInput({
//     category: "Bestiary",
//     configName: "PlayerHighlight",
//     title: "Player Highlight",
//     description: "Draws hitboxes around players that include the inputted name, seperate with '|' character\nInput `Player` to show all real players",
//     value: ""
// })
// .addColorPicker({
//     category: "Bestiary",
//     configName: "PlayerHighlightColor",
//     title: "Player Highlight Color",
//     description: "Sets the color for player hitboxes",
//     value: [255, 190, 239, 255],
//     shouldShow: data => data.PlayerHighlight !== ""
// })
// .addButton({
//     category: "HUD",
//     configName: "gui",
//     title: "Move GUI Elements",
//     description: "Click to edit gui locations",
//     onClick: () => ChatLib.command("nwjn gui", true)
// })
// .addSwitch({
//     category: "Crimson Isle",
//     configName: "AnnounceVanqs",
//     title: "Announce Vanquishers",
//     description: "Announces Vanquisher coords to party",
//     value: false
// })
// .addSwitch({
//     category: "Mining",
//     configName: "MineshaftWaypoints",
//     title: "Mineshaft Waypoints",
//     description: "Shows guesses of corpses and exit in mineshaft, walk within 3 blocks of a guess waypoint to remove it",
//     value: false
// })

// add lihua in top left
export const initSettings = () => {
    const categories = ["Home", "General", "Bestiary", "Combat", "Kuudra", "Mining", "Performance"]

    const meinConf = new Settings("Nwjn", ConfigProperty.getDefaultConfig(), "data/Scheme.json", `              ${Nwjn.BANNER}`)
        .setClickSound(() => World.playSound("gui.button.press", 0.25, 1))
        .setCategorySort((a, b) => categories.indexOf(a) - categories.indexOf(b))

    let { background, descriptionElement, searchBar, apply } = meinConf.AmaterasuGui

    background.x = 15
    background.y = 15
    background.width = 70
    background.height = 70

    descriptionElement.textWrap.enabled = false
    
    searchBar.x = 84

    apply()
}
import ConfigProperty from "./ConfigProperty"
import Nwjn from "../libs/Helper/Nwjn"
import Settings from "../../Amaterasu/core/Settings"

const category = "Home"

new ConfigProperty("TextParagraph", {
    category,
    configName: "dependencies",
    title: "§6§lPowered by:§r",
    description: "\n" + Nwjn.DEPENDENCIES.map(([lib, ver], idx) => `§r§${(idx + 10).toString(16)}${lib}-${ver}§r`).join("\n"),
    centered: true
})

new ConfigProperty("Button", {
    category,
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
//     category: "General",
//     configName: "ChatWaypoints",
//     title: "Draw Chat Waypoints",
//     description: "Creates waypoints taken from chat messages in patcher sendcoords format",
//     value: false
// })
// .addColorPicker({
//     category: "General",
//     configName: "ChatWaypointsColor",
//     title: "➤ Waypoint Color",
//     description: "     Sets the color for waypoints",
//     value: [255, 190, 239, 200],
//     shouldShow: data => data.ChatWaypoints
// })
// .addSlider({
//     category: "General",
//     configName: "ChatWaypointsTime",
//     title: "➤ Waypoint Time",
//     description: "     The amount of seconds waypoints should stay",
//     options: [30, 90],
//     value: 120,
//     shouldShow: data => data.ChatWaypoints
// })
// .addSwitch({
//     category: "General",
//     configName: "PartyCommands",
//     title: "Party Commands",
//     description: "Enables party commands, universally triggers on [.,!?] commands",
//     value: false
// })
// .addMultiCheckbox({
//     category: "General",
//     configName: "PartyCommandToggles",
//     title: "Party Command Toggles",
//     description: "Toggles for various party commands",
//     placeHolder: "Click",
//     options: [
//         {
//             title: "Join Instance",
//             configName: "PartyCommandsInstance",
//             value: true
//         },
//         {
//             title: "Party Transfer <?ign>",
//             configName: "PartyCommandsTransfer",
//             value: true
//         },
//         {
//             title: "Warp",
//             configName: "PartyCommandsWarp",
//             value: true
//         },
//         {
//             title: "Invite <ign>",
//             configName: "PartyCommandsInvite",
//             value: true
//         },
//         {
//             title: "All Invite",
//             configName: "PartyCommandsAllInvite",
//             value: true
//         },
//         {
//             title: "Server TPS",
//             configName: "PartyCommandsTPS",
//             value: "true"
//         },
//         {
//             title: "Tab Stats",
//             configName: "PartyCommandsStats",
//             value: true
//         },
//         {
//             title: "Power, Tuning, Enrich, MP Data",
//             configName: "PartyCommandsPower",
//             value: true
//         },
//         {
//             title: "Send Coords",
//             configName: "PartyCommandsCoords",
//             value: true
//         },
//         {
//             title: "Your Current Time",
//             configName: "PartyCommandsTime",
//             value: true
//         }
//     ],
//     shouldShow: data => data.PartyCommands
// })
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
    const meinConf = new Settings("Nwjn", ConfigProperty.getDefaultConfig(), "data/Scheme.json", `              ${Nwjn.BANNER}`)
        .setClickSound(() => World.playSound("gui.button.press", 0.25, 1))

    const { background, descriptionElement, searchBar, apply } = meinConf.AmaterasuGui

    background.x = 15
    background.y = 15
    background.width = 70
    background.height = 70

    descriptionElement.textWrap.enabled = false
    
    searchBar.x = 84

    apply()
}
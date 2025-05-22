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
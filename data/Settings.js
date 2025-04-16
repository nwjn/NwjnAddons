import Nwjn from "../libs/Helper/Nwjn"
import Settings from "../../Amaterasu/core/Settings"
import DefaultConfig from "../../Amaterasu/core/DefaultConfig"

const defCon1 = new DefaultConfig("Nwjn", "/data/.Config.json")
.addSwitch({
    category: "General",
    configName: "LinkFix",
    title: "&e✯&r &bLink Fix",
    description: "Encodes and Decodes Links to allow sending and viewing for those with the mod",
    value: true
})
.addSwitch({
    category: "General",
    configName: "BlockHighlight",
    title: "Toggle Block Highlight",
    description: "Toggles block highlight",
    value: false
})
.addColorPicker({
    category: "General",
    configName: "BlockHighlightColor",
    title: "Highlight Color",
    description: "Sets the color for block highlight",
    value: [255, 190, 239, 255],
    shouldShow: data => data.BlockHighlight
})
.addSwitch({
    category: "General",
    configName: "ChatWaypoints",
    title: "Draw Chat Waypoints",
    description: "Creates waypoints taken from chat messages in patcher sendcoords format",
    value: false
})
.addColorPicker({
    category: "General",
    configName: "ChatWaypointsColor",
    title: "➤ Waypoint Color",
    description: "     Sets the color for waypoints",
    value: [255, 190, 239, 200],
    shouldShow: data => data.ChatWaypoints
})
.addSlider({
    category: "General",
    configName: "ChatWaypointsTime",
    title: "➤ Waypoint Time",
    description: "     The amount of seconds waypoints should stay",
    options: [30, 90],
    value: 120,
    shouldShow: data => data.ChatWaypoints
})
.addSwitch({
    category: "General",
    configName: "PartyCommands",
    title: "Party Commands",
    description: "Enables party commands, universally triggers on [.,!?] commands",
    value: false
})
.addMultiCheckbox({
    category: "General",
    configName: "PartyCommandToggles",
    title: "Party Command Toggles",
    description: "Toggles for various party commands",
    placeHolder: "Click",
    options: [
        {
            title: "Join Instance",
            configName: "PartyCommandsInstance",
            value: true
        },
        {
            title: "Party Transfer <?ign>",
            configName: "PartyCommandsTransfer",
            value: true
        },
        {
            title: "Warp",
            configName: "PartyCommandsWarp",
            value: true
        },
        {
            title: "Invite <ign>",
            configName: "PartyCommandsInvite",
            value: true
        },
        {
            title: "All Invite",
            configName: "PartyCommandsAllInvite",
            value: true
        },
        {
            title: "Server TPS",
            configName: "PartyCommandsTPS",
            value: "true"
        },
        {
            title: "Tab Stats",
            configName: "PartyCommandsStats",
            value: true
        },
        {
            title: "Power, Tuning, Enrich, MP Data",
            configName: "PartyCommandsPower",
            value: true
        },
        {
            title: "Send Coords",
            configName: "PartyCommandsCoords",
            value: true
        },
        {
            title: "Your Current Time",
            configName: "PartyCommandsTime",
            value: true
        }
    ],
    shouldShow: data => data.PartyCommands
})
.addSwitch({
    category: "General",
    configName: "SkyblockXP",
    title: "Skyblock XP Gain Message",
    description: "Displays skyblock xp gains in chat",
    value: false
})
.addSwitch({
    category: "General",
    configName: "Clock",
    title: "Clock Display",
    description: "Stay productive by keeping track of time!",
    subcategory: "Clock",
    value: false
})
.addColorPicker({
    category: "General",
    configName: "ClockColor",
    title: "➤ Clock Color",
    description: "     Sets the color for the clock display",
    subcategory: "Clock",
    value: [255, 190, 239, 255],

    shouldShow: data => data.Clock
})
.addSwitch({
    category: "Combat",
    configName: "DamageTracker",
    title: "Damage Tracker",
    description: "Displays Damage Tag values in chat",
    value: false
})
.addSwitch({
    category: "Combat",
    configName: "ReaperTimer",
    title: "Reaper Buff Timer",
    description: "Displays the time left on your reaper armor buff",
    value: false
})
.addSwitch({
    category: "Combat",
    configName: "RendArrows",
    title: "Rend Arrows",
    description: "Displays the amount of arrows pulled on rend in chat",
    value: false
})
.addSwitch({
    category: "Combat",
    configName: "Poison",
    title: "Poison Display",
    description: "Displays amounts of arrows and poisons in inventory",
    value: false
})
.addDropDown({
    category: "Combat",
    configName: "FatalTempo",
    title: "Fatal Tempo Display",
    description: "Select when to show Fatal Tempo Display -> /moveFT",
    options: ["Off", "Always", "Over 0%", "At 200%"],
    value: 0,
    subcategory: "Fatal Tempo"
})
.addMultiCheckbox({
    category: "Combat",
    configName: "FatalTempoComponents",
    title: "Fatal Tempo Components",
    description: "Toggles for different aspects of this display",
    placeHolder: "Click",
    options: [
        {
            title: "Prefix",
            configName: "FatalTempoPrefix",
            value: true
        },
        {
            title: "Percent",
            configName: "FatalTempoPercent",
            value: true
        },
        {
            title: "Time",
            configName: "FatalTempoTime",
            value: true
        }
    ],
    shouldShow: data => data.FatalTempo !== 0
})
.addTextInput({
    category: "Bestiary",
    configName: "MobHighlight",
    title: "Mob Highlight",
    description: "Boxes entities by input based on mob class and health\n&bExamples: `Zombie` or `Zombie-100|120|2k|45k` or `Zombie, Skeleton` or `Zombie-100, Cow`",
    value: ""
})
.addColorPicker({
    category: "Bestiary",
    configName: "MobHighlightColor",
    title: "Mob Highlight Color",
    description: "Sets the color for monster hitboxes",
    value: [255, 190, 239, 255],
    shouldShow: data => data.MobHighlight !== ""
})
.addTextInput({
    category: "Bestiary",
    configName: "StandHighlight",
    title: "Armor Stand Names Highlight",
    description: "Draws hitboxes around armor stands that include the inputted name, seperate with '|' character",
    value: ""
})
.addColorPicker({
    category: "Bestiary",
    configName: "StandHighlightColor",
    title: "Armor Stand Highlight Color",
    description: "Sets the color for armor stand hitboxes",
    value: [255, 190, 239, 255],
    shouldShow: data => data.StandHighlight !== ""
})
.addTextInput({
    category: "Bestiary",
    configName: "PlayerHighlight",
    title: "Player Highlight",
    description: "Draws hitboxes around players that include the inputted name, seperate with '|' character\nInput `Player` to show all real players",
    value: ""
})
.addColorPicker({
    category: "Bestiary",
    configName: "PlayerHighlightColor",
    title: "Player Highlight Color",
    description: "Sets the color for player hitboxes",
    value: [255, 190, 239, 255],
    shouldShow: data => data.PlayerHighlight !== ""
})
.addButton({
    category: "HUD",
    configName: "gui",
    title: "Move GUI Elements",
    description: "Click to edit gui locations",
    onClick: () => ChatLib.command("nwjn gui", true)
})
.addSwitch({
    category: "Crimson Isle",
    configName: "AnnounceVanqs",
    title: "Announce Vanquishers",
    description: "Announces Vanquisher coords to party",
    value: false
})
.addSwitch({
    category: "Mining",
    configName: "MineshaftWaypoints",
    title: "Mineshaft Waypoints",
    description: "Shows guesses of corpses and exit in mineshaft, walk within 3 blocks of a guess waypoint to remove it",
    value: false
})
.addSwitch({
    category: "Performance",
    subcategory: "Death Clutter",
    configName: "DeathClutter",
    title: "&e✯&r &bRemove Dying Mobs and Names",
    description: "Fully kills the entity before it can perform the animation & removes the entity's nametag",
    value: true
})
.addSwitch({
    category: "Performance",
    subcategory: "Spawn Clutter",
    configName: "SpawnClutter",
    title: "&e✯&r &bAbort Junk-Spawns",
    description: `Completely cancels the construction of many unused + non-performative entities`,
    value: true
})
.addMultiCheckbox({
    category: "Performance",
    subcategory: "Spawn Clutter",
    configName: "SpawnClutterOptions",
    title: "➤ &e✯&r &bAbort Junk-Spawns Customization",
    description: "     Optional toggles for a few entities",
    placeHolder: "Edit",
    options: [
        {
            title: "Arrows",
            configName: "SpawnClutterArrows",
            value: false
        },
        {
            title: "&e✯&r Falling Blocks",
            configName: "SpawnClutterFallingBlocks",
            value: true
        }
    ],
    shouldShow: data => data.SpawnClutter
})

const meinConf = new Settings("Nwjn", defCon1, "/data/Scheme.json", Nwjn.BANNER)
    .setPos(15, 15)
    .setSize(70, 70)
    .setClickSound(() => World.playSound("gui.button.press", 0.25, 1))
    .apply()
    
export default meinConf.settings
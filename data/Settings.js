import Settings from "../../Amaterasu/core/Settings"
import DefaultConfig from "../../Amaterasu/core/DefaultConfig"

const defCon1 = new DefaultConfig("NwjnAddons", "/data/Config.json")
.addSwitch({
    category: "General",
    configName: "waypoint",
    title: "Draw Chat Waypoints",
    description: "Creates waypoints taken from chat messages in patcher sendcoords format",
    value: false
})
.addSlider({
    category: "General",
    configName: "wpTime",
    title: "➤ Waypoint Time",
    description: "     The amount of seconds waypoints should stay",
    options: [0, 160],
    value: 60,

    shouldShow(data) {
        return (data.waypoint)
    }
})
.addColorPicker({
    category: "General",
    configName: "wpColor",
    title: "➤ Waypoint Color",
    description: "     Sets the color for waypoints",
    value: [255, 88, 213, 127],

    shouldShow(data) {
        return (data.waypoint)
    }
})
.addSwitch({
    category: "General",
    configName: "partyCommands",
    title: "Party Commands",
    description: "Enables party commands, universally triggers on [.!?] commands",
    value: false
})
.addMultiCheckbox({
    category: "General",
    configName: "partyToggles",
    title: "Party Command Toggles",
    description: "Toggles for various party commands",
    placeHolder: "Click",
    options: [
        {
            title: "Join Instance",
            configName: "pcInstance",
            value: true
        },
        {
            title: "Party Transfer <?ign>",
            configName: "pcTransfer",
            value: true
        },
        {
            title: "Warp",
            configName: "pcWarp",
            value: true
        },
        {
            title: "Invite <ign>",
            configName: "pcInvite",
            value: true
        },
        {
            title: "All Invite",
            configName: "pcAllinvite",
            value: true
        },
        {
            title: "Build Imgur",
            configName: "pcBuild",
            value: true
        },
        {
            title: "Server TPS",
            configName: "pcTps",
            value: "true"
        },
        {
            title: "Tab Stats",
            configName: "pcStats",
            value: true
        },
        {
            title: "Power, Tuning, Enrich, MP Data",
            configName: "pcPower",
            value: true
        },
        {
            title: "Send Coords",
            configName: "pcCoords",
            value: true
        },
        {
            title: "Your Current Time",
            configName: "pcTime",
            value: true
        }
    ],
    shouldShow(data) {
        return data.partyCommands
    }
})
.addSwitch({
    category: "General",
    configName: "sbxp",
    title: "Skyblock XP Gain Message",
    description: "Takes action bar skyblock xp gained message and pastes them in chat",
    value: false
})
.addSwitch({
    category: "Combat",
    configName: "reaperTimer",
    title: "Reaper Armor Buff Timer",
    description: "Displays the time left on your reaper armor buff",
    value: false
})
.addTextInput({
    category: "Bestiary",
    configName: "mobList",
    title: "Mob Highlight",
    description: "Draws hitboxes around inputted mob entity\n&3@see &cnet.minecraft.entity.(monster|passive|boss)&r\n&bExamples: `Zombie` or `Zombie-100|120|2k|45k` or `Zombie, Skeleton` or `Zombie-100, Cow`",
    value: ""
})
.addColorPicker({
    category: "Bestiary",
    configName: "mobHighlightColor",
    title: "Mob Highlight Color",
    description: "Sets the color for monster hitboxes",
    value: [255, 255, 255, 255]
})
.addTextInput({
    category: "Bestiary",
    configName: "standList",
    title: "Armor Stand Names Highlight",
    description: "Draws hitboxes around armor stands that include the inputted name, seperate with '|' character",
    value: ""
})
.addColorPicker({
    category: "Bestiary",
    configName: "standColor",
    title: "Armor Stand Highlight Color",
    description: "Sets the color for armor stand hitboxes",
    value: [255, 255, 255, 255]
})
.addTextInput({
    category: "Bestiary",
    configName: "playerList",
    title: "Player Highlight",
    description: "Draws hitboxes around players that include the inputted name, seperate with '|' character\nInput `Player` to show all real players",
    value: ""
})
.addColorPicker({
    category: "Bestiary",
    configName: "playerColor",
    title: "Player Highlight Color",
    description: "Sets the color for player hitboxes",
    value: [255, 255, 255, 255]
})
.addButton({
    category: "HUD",
    configName: "gui",
    title: "Move GUI Elements",
    description: "Click to edit gui locations",
    onClick() {
        ChatLib.command("nwjn gui", true)
    }
})
.addSwitch({
    category: "HUD",
    configName: "blaze",
    title: "Blaze Display",
    description: "Shows how much time left on gummy and wisp pot -> /moveBlaze",
    subcategory: "Blaze",
    value: false
})
.addDropDown({
    category: "HUD",
    configName: "fatalTempo",
    title: "Fatal Tempo Display",
    description: "Select when to show Fatal Tempo Display -> /moveFT",
    options: ["Off", "Always", "Over 0%", "At 200%"],
    value: 0,
    subcategory: "Fatal Tempo"
})
.addMultiCheckbox({
    category: "HUD",
    configName: "ftParts",
    title: "Fatal Tempo Components",
    description: "Toggles for different aspects of this display",
    placeHolder: "Click",
    options: [
        {
            title: "Prefix",
            configName: "ftPrefix",
            value: true
        },
        {
            title: "Percent",
            configName: "ftPercent",
            value: true
        },
        {
            title: "Time",
            configName: "ftTime",
            value: true
        }
    ],
    shouldShow(data) {
        return (data.fatalTempo !== 0)
    }
})
.addSwitch({
    category: "HUD",
    configName: "poison",
    title: "Poison Display",
    description: "Displays the amount of poisons in your inventory -> /movePoison",
    subcategory: "Poison",
    value: false
})
.addSwitch({
    category: "HUD",
    configName: "mini",
    title: "Miniboss Display",
    description: "Shows your recent CI miniboss kills -> /moveMini",
    subcategory: "Miniboss",
    value: false
})
.addSwitch({
    category: "HUD",
    configName: "widget",
    title: "Widget Display",
    description: "Renders tab widgets on screen",
    subcategory: "Widget",
    value: false
})
.addToggle({
    category: "HUD",
    configName: "stats",
    title: "Stats Widget",
    description: "Show stats widget on HUD -> /moveStats",
    subcategory: "Widget",
    value: false
})
.addToggle({
    category: "HUD",
    configName: "pet",
    title: "Pet Widget",
    description: "Show pet widget on HUD -> /movePet",
    subcategory: "Widget",
    value: false
})
.addToggle({
    category: "HUD",
    configName: "bestiary",
    title: "Bestiary Widget",
    description: "Show bestidary widget on HUD -> /moveBestiary",
    subcategory: "Widget",
    value: false
})
.addToggle({
    category: "HUD",
    configName: "crop",
    title: "Crop Milestone Widget",
    description: "Show crop milestone widget on HUD -> /moveCrop",
    subcategory: "Widget",
    value: false
})
.addToggle({
    category: "HUD",
    configName: "visitor",
    title: "Visitor Widget",
    description: "Show visitor widget on HUD -> /moveVisitor",
    subcategory: "Widget",
    value: false
})
.addToggle({
    category: "HUD",
    configName: "comm",
    title: "Commission Widget",
    description: "Show commission widget on HUD -> /moveComm",
    subcategory: "Widget",
    value: false
})
.addToggle({
    category: "HUD",
    configName: "powder",
    title: "Powder Widget",
    description: "Show powder widget on HUD -> /movePowder",
    subcategory: "Widget",
    value: false
})
.addToggle({
    category: "HUD",
    configName: "corpse",
    title: "Frozen Corpse Widget",
    description: "Show frozen corpse widget on HUD -> /moveCorpse",
    subcategory: "Widget",
    value: false
})
.addToggle({
    category: "HUD",
    configName: "custom",
    title: "Custom Widget",
    description: "Enter widget title from tablist (i.e. 'Fire Sales:' or 'Timers:' -> /moveCustom",
    subcategory: "Widget",
    value: false
})
.addTextInput({
    category: "HUD",
    configName: "widgetText",
    title: "Custom Widget Text",
    description: "Enter widget text from tablist (i.e. 'Fire Sales:' or 'Timers:')",
    value: "",
    subcategory: "Widget",
    value: false
})
.addSwitch({
    category: "Kuudra",
    configName: "kuudraHP",
    title: "Draws Kuudra's HP",
    description: "Displays text of Kuudra's hp on kuudra",
    subcategory: "General",
    value: false
})
.addSwitch({
    category: "Kuudra",
    configName: "teamHighlight",
    title: "Team Highlight",
    description: "Draws a box of the selected color on teammates, changes to green if that player gets fresh tools",
    subcategory: "General",
    value: false
})
.addColorPicker({
    category: "Kuudra",
    configName: "teammateColor",
    title: "➤ Team Color",
    description: "     Sets the color for teammates",
    value: [255, 255, 255, 255],
    subcategory: "General"
})
.addSwitch({
    category: "Kuudra",
    configName: "unrenderPerks",
    title: "Unrender Perks",
    description: "Declutters the shop gui by unrendering unused perks",
    subcategory: "General",
    value: false
})
.addSwitch({
    category: "Kuudra",
    configName: "kuudraHitbox",
    title: "Draws Kuudra's Hitbox",
    description: "Draws a box around Kuudra's hitbox",
    subcategory: "General",
    value: false
})
.addSwitch({
    category: "Kuudra",
    configName: "supplyBeacons",
    title: "Supply Beacons",
    description: "Draws beacons where supplies are",
    subcategory: "Phase 1",
    value: false
})
.addSwitch({
    category: "Kuudra",
    configName: "supplyPiles",
    title: "Supply Drop Beacons",
    description: "Draws beacons on piles where supplies are needed",
    subcategory: "Phase 1",
    value: false
})
.addSwitch({
    category: "Kuudra",
    configName: "pearl",
    title: "Pearl Lineups",
    description: "Draws target boxes of where to pearl to insta place supply\n&eBoxes on the ceiling: pearl at ~38%\n&eBoxes on the sides: pearl at ~76%",
    subcategory: "Phase 1",
    value: false
})
.addSwitch({
    category: "Kuudra",
    configName: "noSupply",
    title: "No Supply Chat",
    description: "Tells party if your pre or second doesn't spawn",
    subcategory: "Phase 1",
    value: false
})
.addSwitch({
    category: "Kuudra",
    configName: "customSupply",
    title: "Custom Supply Drop Message",
    description: "Changes supply message to include time when a supply is dropped:\n&r&6[MVP&r&9++&r&6] nwjn&r&f &a&lrecovered a supply at 18s! &r&8(1/6)&r",
    subcategory: "Kuudra",
    value: false
})
.addSwitch({
    category: "Kuudra",
    configName: "buildPiles",
    title: "Unfinished Pile Beacons",
    description: "Draws beacons on build piles that are incomplete",
    subcategory: "Phase 2",
    value: false
})
.addSwitch({
    category: "Kuudra",
    configName: "buildPercent",
    title: "Cumulative Build Percentage",
    description: "Draws the overall build percentage over the ballista",
    subcategory: "Phase 2",
    value: false
})
.addSwitch({
    category: "Kuudra",
    configName: "buildFresh",
    title: "Fresh Timer",
    description: "Draws the seconds of fresh you have left on the ballista",
    subcategory: "Phase 2",
    value: false
})
.addSwitch({
    category: "Kuudra",
    configName: "progressWithPhase",
    title: "Show Pile Progress Through Mobs",
    description: "Draws the 'Progress: 77%' text on a pile through mobs",
    subcategory: "Phase 2",
    value: false
})
.addSwitch({
    category: "Kuudra",
    configName: "fresh",
    title: "Notify Party On Fresh",
    description: "Say `FRESH!` in party chat when you get fresh tools",
    subcategory: "Phase 2",
    value: false
})
.addSwitch({
    category: "Kuudra",
    configName: "partyDrain",
    title: "Party Drain",
    description: "Tells your party who you mana drained\n&9Party &8> &6[MVP&8++&6] nwjn&f: Drained 2431 mana for: [LucDJ, raidermc, LhxSeven]",
    subcategory: "Phase 4",
    value: false
})
.addSwitch({
    category: "Kuudra",
    configName: "drainDisplay",
    title: "Mana Drain Display",
    description: "Shows buffs received from mana drain",
    subcategory: "Phase 4",
    value: false
})
.addSwitch({
    category: "Crimson Isle",
    configName: "announceVanqs",
    title: "Announce Vanquishers",
    description: "Announces Vanquisher coords to party",
    value: false
})
.addSwitch({
    category: "Crimson Isle",
    configName: "magma",
    title: "Better Magma Boss Message",
    description: "Replaces magma boss damage messages with custom ones that also show total damage\n&r&4&lMagma Boss&r &8> &c+35% &7(100%)",
    value: false
})
.addSwitch({
    category: "Mining",
    configName: "mineshaftWaypoints",
    title: "Mineshaft Waypoints",
    description: "Shows guesses of corpses and exit in mineshafts, walk within 3 blocks of a guess waypoint to remove it",
    value: false
})
.addSwitch({
    category: "QOL",
    configName: "blockHighlight",
    title: "Toggle Block Highlight",
    description: "Toggles block highlight",
    value: false
})
.addColorPicker({
    category: "QOL",
    configName: "highlightColor",
    title: "Highlight Color",
    description: "Sets the color for block highlight",
    value: [255, 88, 213, 255]
})
.addSwitch({
    category: "QOL",
    configName: "deathAnimation",
    title: "Stops Entity Death Animation",
    description: "Stops entity death animation and removes its armorstand tag",
    value: false
})
.addMultiCheckbox({
    category: "QOL",
    configName: "entitySpawns",
    title: "Remove Entity",
    description: "Cancels spawn events of these common clutter options",
    placeHolder: "Click",
    options: [
        {
            title: "Falling Blocks",
            configName: "fallingBlocks",
            value: false
        },
        {
            title: "XP Orbs",
            configName: "xpOrbs",
            value: false
        },
        {
            title: "Arrows",
            configName: "arrows",
            value: false
        },
        {
            title: "Wither Skulls",
            configName: "witherSkulls",
            value: false
        }
    ]
})
.addMultiCheckbox({
    category: "QOL",
    configName: "chatCleanup",
    title: "Cleanup Chat",
    description: "Cancels message events of these options",
    placeHolder: "Click",
    options: [
        {
            title: "Boss Messages",
            configName: "bossCleaner",
            value: false
        },
        {
            title: "Discord Warnings",
            configName: "discordCleaner",
            value: false
        },
        {
            title: "Visitor Dialouge",
            configName: "visitorCleaner",
            value: false
        }
    ]
})
.addSwitch({
    category: "Utilities",
    configName: "damageTracker",
    title: "Damage Tracker",
    description: "Shows damage tags in chat",
    value: false
})
.addSwitch({
    category: "Utilities",
    configName: "rendArrows",
    title: "Rend Arrows",
    description: "Shows the amount or arrows pulled on rend",
    value: false
})
.addSwitch({
    category: "Utilities",
    configName: "imageFix",
    title: "&e✯&r Image Fix",
    description: "Encodes and Decodes Image Links to allow sending and viewing for those with the mod",
    value: true
})
.addSwitch({
    category: "Utilities",
    configName: "clock",
    title: "Clock Display",
    description: "Shows your current time",
    subcategory: "Clock",
    value: false
})
.addColorPicker({
    category: "Utilities",
    configName: "clockColor",
    title: "➤ Clock Color",
    description: "     Sets the color for the clock display",
    subcategory: "Clock",
    value: [255, 255, 255, 255],

    shouldShow(data) {
        return (data.clock)
    }
})

import TextUtil from "../core/static/TextUtil"
const meinConf = new Settings("NwjnAddons", defCon1, "/data/Scheme.json", `${TextUtil.NWJNADDONS} by &6nwjn`)
    .addMarkdown("Changelog", FileLib.getUrlContent("https://raw.githubusercontent.com/wiki/nwjn/NwjnAddons/Latest-Changelog.md"))

    .setPos(15, 15)
    .setSize(70, 70)
    .apply()
    
export default () => meinConf.settings

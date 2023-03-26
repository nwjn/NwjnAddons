/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import { @Vigilant, @ColorProperty, @ButtonProperty, @SwitchProperty, @SliderProperty, @SelectorProperty, Color } from 'Vigilance';

import { consts } from "./utils/constants";

@Vigilant("NwjnAddons", {
  getCategoryComparator: () => (a, b) => {
    const categories = ["General", "Levels", "Bestiary", "Kuudra", "Events"]
    return categories.indexOf(a.name) - categories.indexOf(b.name);
  }
})
class Settings {
  @SwitchProperty({
    name: "Remove Hypixel Lobby Join and Mystery Box Messages",
    description: `Removes the messages of hypixel lobby join and mystery box`,
    category: "General"
  })
  inLobby = true;


  @SwitchProperty({
    name: "Legion Display",
    description: `Shows number of players nearby\n${consts.WIP}`,
    category: "General"
  })
  legion = true;

  @SwitchProperty({
    name: "Cooldown Display",
    description: `Shows the cooldown on your abilities\n${consts.WIP}`,
    category: "General"
  })
  cooldown = true;

  @SwitchProperty({
    name: "Stats Display",
    description: `Shows stats from tab on hud`,
    category: "General"
  })
  stats = true;

  @ButtonProperty({
    name: "Move Stats Tracker GUI",
    description: "Moves the stats tracker around",
    category: "General",
    placeholder: "Click!"
  })
  action() {
    ChatLib.command(`nwjn stats`, true);
  }

  @SwitchProperty({
    name: "Skyblock XP Display",
    description: `Shows your skyblock xp\n${consts.WIP}`,
    category: "Levels"
  })
  skyblockxp = true;

  @SwitchProperty({
    name: "Skyblock XP Decimal in NameTag",
    description: `Adds the decimal to the Sblvl in nametag\n${consts.WIP}`,
    category: "Levels"
  })
  sbxpdecimal = true;

  @SwitchProperty({
    name: "Cheapest Skyblock XP",
    description: `Shows your chosen number or next level of next cheapest skyblock xp upgrades\n${consts.WIP}`,
    category: "Levels"
  })
  cheapestxp = true;

  @SwitchProperty({
    name: "Bestiary Tracker",
    description: `Shows the bestiary mobs of the island you're in on hud\n${consts.WIP}`,
    category: "Bestiary"
  })
  bestiary = true;

  @ButtonProperty({
    name: 'Move Bestiary Tracker GUI',
    description: `Moves the bestiary tracker GUI around`,
    category: 'Bestiary',
    placeholder: 'Click!',
  })
  actionz() {
    ChatLib.command(`nwjn best`, true);
  }
    
  @SwitchProperty({
    name: "Rain Slimes",
    description: `Shows time until rain and sends notification\n${consts.WIP}`,
    // option for intrusive noti, chat noti, or notis off
    category: "Bestiary",
    subcategory: "Spiders Den"
  })
  raining = true;

  @SwitchProperty({
    name: "Arachnes Keeper",
    description: `Shows where the keeper can spawn or waypoint to where it is and draws a box\n${consts.WIP}`,
    category: "Bestiary",
    subcategory: "Spiders Den"
  })
  keeper = true;

  @SwitchProperty({
    name: "Broodmother",
    description: `Shows where the Broodmother is and draws a box\n${consts.WIP}`,
    category: "Bestiary",
    subcategory: "Spiders Den"
  })
  broodmother = true; 

  @SwitchProperty({
    name: "Dragon Box",
    description: `Draws a box around the dragon\n${consts.WIP}`,
    category: "Bestiary",
    subcategory: "End"
  })
  dragon = true;
  
  @SwitchProperty({
    name: "Kuudra Alerts",
    description: `Sends alerts in kuudra`,
    category: "Kuudra"
  })
  alerts = true;    

  @SwitchProperty({
    name: "Supply Placement Waypoint",
    description: `Places a waypoint at all available supply placements\n${consts.WIP}`,
    category: "Kuudra"
  })
  inP1 = true;

  @SwitchProperty({
    name: "Number of Runs in NameTag",
    description: `Adds the number of Infernal Kuudra Completions to end of NameTag\n${consts.WIP}`,
    category: "Kuudra"
  })
  inT5 = true;

  @SwitchProperty({
    name: "Auto 2x Powder Guild Message",
    description: `Automatically sends a guild message when a 2x event is announced in Dwarven Mines or Crystal Hollows.`,
    // 15min timeout
    category: "Events"
  })
  doublepowder = true;

  @SwitchProperty({
    name: "Auto Game Update Guild Message",
    description: `Automatically sends a guild message when a game update is announced in your lobby.`,
    // 30min timeout
    category: "Events"
  })
  gameupdate = true;

  @SwitchProperty({
    name: "Event Notifier",
    description: `Notfies you before Fishing Festivals, Mining Festivals, and Spooky Festivals\n${consts.WIP}`,
    category: "Events"
  })
  EventInCalender = true; 

  @SwitchProperty({
    name: "Jacob Notifier",
    description: `Timer and notification for Jacob Events, Shows medals and next crops\n${consts.WIP}`,
    category: "Events"
  })
  Jacob = true;
  

  constructor() {
    this.initialize(this);
    this.setCategoryDescription("General", "&dNwjnAddons &8by: &bnwjn\n&ause &f/nwjn help &afor full list of commands\n&cHYPIXEL MODIFICATIONS ARE USE AT YOUR OWN RISK")
    this.setCategoryDescription("Levels", "Yummy Skyblock XP ")
    this.setCategoryDescription("Bestiary", "Bestiary Helper!")

    // add Bestiary Level from island in 3rd part
    // this.setSubcategoryDescription("Bestiary", "Spiders Den", "")
    // this.setSubcategoryDescription("Bestiary", "End", "")
    
    this.setCategoryDescription("Kuudra", "100m/h Trust")
    this.setCategoryDescription("Events", "Fun")
  }
}

export default new Settings();
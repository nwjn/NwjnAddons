import { @Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, @SliderProperty, @SelectorProperty, Color } from 'Vigilance';

@Vigilant("Nwjn", "NwjnAddons", {
  getCategoryComparator: () => (a, b) => {
    const categories = ["General", "Levels", "Bestiary", "Kuudra", "Events"]
    return categories.indexOf(a.name) - categories.indexOf(b.name);
  }
})

class Settings {
  @SwitchProperty({
    name: "Legion Display",
    description: "Shows number of players nearby",
    category: "General"
  })
  legion = true;

  @SwitchProperty({
    name: "Cooldown Display",
    description: "Shows the cooldown on your abilities",
    category: "General"
  })
  cooldown = true;

  @SwitchProperty({
    name: "Skyblock XP Display",
    description: "Shows your skyblock xp",
    category: "Levels"
  })
  skyblockxp = true;

  @SwitchProperty({
    name: "Skyblock XP Decimal in NameTag",
    description: "Adds the decimal to the Sblvl in nametag",
    category: "Levels"
  })
  sbxpdecimal = true;

  @SwitchProperty({
    name: "Cheapest Skyblock XP",
    description: "Shows your chosen number or next level of next cheapest skyblock xp upgrades",
    category: "Levels"
  })
  cheapestxp = true;

  @SwitchProperty({
    name: "Bestiary Tracker",
    description: "Shows the bestiary mobs of the island you're in",
    category: "Bestiary"
  })
  inskyblock = true;
    
  @SwitchProperty({
    name: "Rain Slimes",
    description: "Shows time until rain and sends notification",
    // option for intrusive noti, chat noti, or notis off
    category: "Bestiary",
    subcategory: "Spiders Den"
  })
  raining = true;

  @SwitchProperty({
    name: "Arachnes Keeper",
    description: "Shows where the keeper can spawn or waypoint to where it is and draws a box",
    category: "Bestiary",
    subcategory: "Spiders Den"
  })
  keeper = true;

  @SwitchProperty({
    name: "Broodmother",
    description: "Shows where the Broodmother is and draws a box",
    category: "Bestiary",
    subcategory: "Spiders Den"
  })
  broodmother = true; 

  @SwitchProperty({
    name: "Dragon Highlighter",
    description: "Highlights the dragon",
    category: "Bestiary",
    subcategory: "End"
  })
  dragon = true;

  @SwitchProperty({
    name: "Supply Placement Waypoint",
    description: "Places a waypoint at all available supply placements",
    category: "Kuudra"
  })
  inP1 = true;

  @SwitchProperty({
    name: "Stun",
    description: "Starts a stopwatch when a player mounts the cannon",
    category: "Kuudra"
  })
  inP3 = true;    

  @SwitchProperty({
    name: "Number of Runs in NameTag",
    description: "Adds the number of Infernal Kuudra Completions to end of NameTag",
    category: "Kuudra"
  })
  inT5 = true;

  @SwitchProperty({
    name: "Auto 2x Powder Guild Message",
    description: "Sends a guild message when a 2x event is announced in Dwarven Mines or Crystal Hollows.",
    // 15min timeout
    category: "Events"
  })
  doublepowder = true;

  @SwitchProperty({
    name: "Auto Game Update Guild Message",
    description: "Sends a guild message when a game update is announced in your lobby.",
    // 30min timeout
    category: "Events"
  })
  gameupdate = true;

  @SwitchProperty({
    name: "Event Notifier",
    description: "Notfies you before Fishing Festivals, Mining Festivals, and Spooky Festivals",
    category: "Events"
  })
  EventInCalender = true; 

  @SwitchProperty({
    name: "Jacob Notifier",
    description: "Timer and notification for Jacob Events, Shows medals and next crops",
    category: "Events"
  })
  Event = true;
  
  constructor() {
    this.initialize(this);
    this.setCategoryDescription("General", "&cHYPIXEL &cMODIFICATIONS &cARE &cUSE &cAT &cYOUR &cOWN &cRISK")
    this.setCategoryDescription("Levels", "Yummy Skyblock XP ")
    this.setCategoryDescription("Bestiary", "Bestiary Helper!")

    this.setSubcategoryDescription("Bestiary", "Spiders Den")
    this.setSubcategoryDescription("Bestiary", "End")
    
    this.setCategoryDescription("Kuudra", "100m/h Trust")
    this.setCategoryDescription("Events", "Fun")
  }
}

export default new Settings();
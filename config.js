import { @Vigilant, @SwitchProperty, @TextProperty, @CheckboxProperty, @ButtonProperty, @SelectorProperty, @SliderProperty, @ColorProperty, @PercentSliderProperty, @DecimalSliderProperty, Color} from "../Vigilance/index"

@Vigilant("NwjnAddons", "§d§lNwjnAddons", {
  getCategoryComparator: () => (a, b) => {
    const categories = ["General", "Bestiary", "Crimson Isle", "HUD", "Kuudra", "QOL", "Beta (WIP)"]
    return categories.indexOf(a.name) - categories.indexOf(b.name);
  }
})
class Settings {    
  @SliderProperty({
    name: "Draw Chat Waypoints",
    description: "Creates waypoints taken from chat messages in patcher sendcoords format and how long they should stay (in seconds)",
    min: 0,
    max: 160,
    category: "General"
  })
  waypoint = 0;

  @ColorProperty({
    name: 'Waypoint Color',
    description: `Sets the color for waypoints`,
    category: 'General'
  })
  waypointColor = Color.MAGENTA

  @SelectorProperty({
    name: "Chat Type Waypoint Rendering",
    description: "Select where to look for chat waypoints",
    category: "General",
    options: ["All", "Party Only"]
  })
  waypointFrom = 0;

  @SliderProperty({
    name: "Waypoint Beacon Height",
    description: "Changes how high the beacons in the waypoints are (less height = better performance)",
    min: 0,
    max: 300,
    category: "General"
  })
  waypointHeight = 150;
    
  @SwitchProperty({
    name: "Party Commands",
    description: "Enables party commands (full list at /nwjn party)",
    category: "General"
  })
  party = false  
    
  @SwitchProperty({
    name: "Rend Arrows",
    description: "Shows the number of rend arrows that are pulled",
    category: "General"
  })
  rendArrows = false  
    
  @SwitchProperty({
    name: "Detect Reaper Armor",
    description: "Shows time left for reaper armor under crosshair",
    category: "General"
  })
  reaper = false 
    
  @SwitchProperty({
    name: "Stops Entity Death Animation",
    description: "Stops entity death animation and removes armor stands that show 0 hp",
    category: "General"
  })
  dead = false  

  @SwitchProperty({
    name: "Steak-Able Vamp Hitbox",
    description: "Shows a hitbox when a Vamp Slayer is steak-able",
    category: "General"
  })
  steakAble = false 

  @SwitchProperty({
    name: "Skyblock XP Gain Message",
    description: "Takes action bar skyblock xp gained message and pastes them in chat",
    category: "General"
  })
  sbxp = false  
    
  @SwitchProperty({
    name: "Treecap Timer",
    description: "Renders a timer above crosshair for when u can use treecap ability again",
    category: "General"
  })
  treecap = false  
    
  @TextProperty({
    name: "Party and Warp on Chat Message",
    description: "Parties and warps the player inputted in the below text entry whenever the chat message that includes what is in this text entry is in the chat.",
    category: "General"
  })
  pWarp = ""  
    
  @TextProperty({
    name: "Invited Player Name",
    description: "The player name to invite when the thing above happens",
    category: "General"
  })
  pPlayer = ""  
    
  // TODO: Remove unnecessary symbols using negated set like [^'"!?:;\/]
  @TextProperty({
    name: "Mob ESP",
    description: "Draws hitboxes around inputted mob entity\n&cA mob from net.minecraft.entity.monster or net.minecraft.entity.passive\n&bExamples: `Zombie` or `Zombie-100|120|2k|45k` or `Zombie, Skeleton` or `Zombie-100, Cow`",
    category: "Bestiary"
  })
  rawMobList = "" 
    
  @ColorProperty({
    name: 'Mob ESP Color',
    description: `Sets the color for monster hitboxes`,
    category: 'Bestiary'
  })
  espColor = Color.YELLOW
  
  @TextProperty({
    name: "Armor Stand Names ESP",
    description: "Draws hitboxes around armor stands that include the inputted name",
    category: "Bestiary"
  })
  stand = "" 
    
  @ColorProperty({
    name: 'Armor Stand ESP Color',
    description: `Sets the color for armor stand hitboxes`,
    category: 'Bestiary'
  })
  standColor = Color.GREEN

  @TextProperty({
    name: "Player Names ESP",
    description: "Draws hitboxes around players that include the inputted name\n'Any' draws all player entites\n'Player' draws all real players",
    category: "Bestiary"
  })
  player = "" 
    
  @ColorProperty({
    name: 'Player ESP Color',
    description: `Sets the color for player hitboxes`,
    category: 'Bestiary'
  })
  playerColor = Color.MAGENTA

  @SwitchProperty({
    name: "Matcho!",
    description: `Matcho box and text`,
    category: "Bestiary"
  })
  matcho = false

  @SwitchProperty({
    name: "Arachnes Keeper",
    description: `Keeper box and text`,
    category: "Bestiary"
  })
  keeper = false;

  @ButtonProperty({
    name: "Move GUI Elements",
    description: "Click to edit gui locations",
    category: "HUD",
    placeholder: "Click!"
  })
  gui() {
    ChatLib.command("nwjn gui", true)
  }  

  @SwitchProperty({
    name: "Highlight Players in Align Radius",
    description: "Highlights players when they are in align radius",
    category: "HUD",
    subcategory: "Align"
  })
  alignHighlight = false  
    
  @SwitchProperty({
    name: "Align Display",
    description: "Shows how long you are under alignment for",
    category: "HUD",
    subcategory: "Align"
  })
  align = false

  @SwitchProperty({
    name: "Mob Highlight Counter",
    description: "Shows the number of each mob highlighted by mob esp",
    category: "HUD",
    subcategory: "Bestiary"
  })
  mobEspCount = false

  @SwitchProperty({
    name: "Blaze Display",
    description: "Shows how much time left on gummy and wisp pot",
    category: "HUD",
    subcategory: "Blaze"
  })
  blaze = false 
  
  // TODO: rename Flare Display
  @SwitchProperty({
    name: "Champion Display",
    description: `Champion gained on killing a flare`,
    category: "HUD",
    subcategory: "Champion"
  })
  champ = false

  @SwitchProperty({
    name: "Clock Display",
    description: "Shows your current time",
    category: "HUD",
    subcategory: "Clock",
  })
  clock = false;

  // TODO: add option for on hit and on shoot
  @SwitchProperty({
    name: "Fatal Tempo Display",
    description: `Approximate ft percent\n&cSOUND MUST BE ON`,
    category: "HUD",
    subcategory: "Fatal Tempo"
  })
  ft = false

  @DecimalSliderProperty({
    name: "Fatal Tempo Timer Scale",
    description: "Change the scale of the timer for ft above crosshair",
    minF: 1,
    maxF: 2.5,
    category: "HUD",
    subcategory: "Fatal Tempo"
  })
  ftTimer = 1;

  @SelectorProperty({
    name: "Fatal Tempo Settings",
    description: "Select Fatal Tempo Display settings",
    category: "HUD",
    subcategory: "Fatal Tempo",
    options: ["Show Always", "Show Only Over 0", "Show Only At 200"]
  })
  ftOptions = 0;

  @SwitchProperty({
    name: "Mage Gyro",
    description: "Looks for mage cooldown reduction chat message to change gyrocd",
    category: "HUD",
    subcategory: "Gyro"
  })
  mageCD = false

  @SwitchProperty({
    name: "Gyro Display",
    description: "Shows how long your gyro cd is",
    category: "HUD",
    subcategory: "Gyro"
  })
  gravityStorm = false
    
  @SwitchProperty({
    name: "Endstone Sword Mana Drain Range",
    description: "Highlights players in mana drain range",
    category: "HUD",
    subcategory: "Mana"
  })
  endstone = false  

  @SwitchProperty({
    name: "Endstone Sword Party Notify",
    description: "Tells the party how much you extreme focused",
    category: "HUD",
    subcategory: "Mana"
  })
  endstoneNoti = false  

  @SwitchProperty({
    name: "Mana Enchant Calc",
    description: "Approximate buff of your mana enchants",
    category: "HUD",
    subcategory: "Mana"
  })
  manaEnchant = false

  @SliderProperty({
    name: "Cumulative Fero Mana",
    description: "Set the amount of fero mana levels you have",
    min: 0,
    max: 40,
    category: "HUD",
    subcategory: "Mana"
  })
  feroMana = 0;

  @SliderProperty({
    name: "Cumulative Strong Mana",
    description: "Set the amount of strong mana levels you have",
    min: 0,
    max: 40,
    category: "HUD",
    subcategory: "Mana"
  })
  strongMana = 0;
  
  @SwitchProperty({
    name: "Legion Display",
    description: "Shows the number of players in your legion radius",
    category: "HUD",
    subcategory: "Legion"
  })
  legion = false

  @SwitchProperty({
    name: "Poison Display",
    description: `Displays the amount of poisons in your inventory`,
    category: "HUD",
    subcategory: "Poison"
  })
  poison = false

  @SelectorProperty({
    name: "Next Visitor Display",
    description: "Shows time until next visitor",
    category: "HUD",
    subcategory: "Visitor",
    options: ["Off", "12 Minutes", "15 Minutes"]
  })
  nextVisitor = 0;

  @SwitchProperty({
    name: "Miniboss Display",
    description: "Shows your recent CI miniboss kills",
    category: "HUD",
    subcategory: "Miniboss"
  })
  mini = false 
  
  @SwitchProperty({
    name: "Widget Display",
    description: "Renders tab widgets on screen",
    category: "HUD",
    subcategory: "Widget"
  })
  widget = false  

  @CheckboxProperty({
    name: "Stats Widget",
    description: "Show stats widget on HUD",
    category: "HUD",
    subcategory: "Widget"
  })
  stats = false

  @CheckboxProperty({
    name: "Pet Widget",
    description: "Show pet widget on HUD",
    category: "HUD",
    subcategory: "Widget"
  })
  pet = false
    
  @CheckboxProperty({
    name: "Bestiary Widget",
    description: "Show bestidary widget on HUD",
    category: "HUD",
    subcategory: "Widget"
  })
  bestiary = false  
  
  @CheckboxProperty({
    name: "Crop Milestone Widget",
    description: "Show crop milestone widget on HUD",
    category: "HUD",
    subcategory: "Widget"
  })
  crop = false  
    
  @CheckboxProperty({
    name: "Pest Widget",
    description: "Show pest widget on HUD",
    category: "HUD",
    subcategory: "Widget"
  })
  pest = false  
    
  @CheckboxProperty({
    name: "Visitor Widget",
    description: "Show visitor widget on HUD",
    category: "HUD",
    subcategory: "Widget"
  })
  visitor = false  
    
  @CheckboxProperty({
    name: "Jacob Widget",
    description: "Show jacob contest widget on HUD",
    category: "HUD",
    subcategory: "Widget"
  })
  contest = false  

  @CheckboxProperty({
    name: "Commission Widget",
    description: "Show commission widget on HUD",
    category: "HUD",
    subcategory: "Widget"
  })
  comm = false

  @CheckboxProperty({
    name: "Powder Widget",
    description: "Show powder widget on HUD",
    category: "HUD",
    subcategory: "Widget"
  })
  powder = false

  @CheckboxProperty({
    name: "Trophy Fish Widget",
    description: "Show trophy fish widget on HUD",
    category: "HUD",
    subcategory: "Widget"
  })
  trophy = false

  @CheckboxProperty({
    name: "Custom Widget",
    description: "Enter widget title from tablist (i.e. 'Fire Sales:' or 'Timers:'",
    category: "HUD",
    subcategory: "Widget"
  })
  custom = false

  @TextProperty({
    name: "Custom Widget Text",
    description: "Enter widget text from tablist (i.e. 'Fire Sales:' or 'Timers:')",
    category: "HUD",
    subcategory: "Widget"
  })
  widgetText = ""
    
  @SwitchProperty({
    name: "Trophy Fish Session Counter",
    description: "Changes trophy fish catch messages to show count in that session",
    category: "Crimson Isle"
  })
  fish = false
    
  // TODO: allow for public chat
  @SwitchProperty({
    name: "Announce Vanquishers",
    description: `Announces Vanquisher coords to party`,
    category: "Crimson Isle"
  })
  announceVanqs = false

  @SwitchProperty({
    name: "Announce Jawbus",
    description: "Announces Jawbus coords to party",
    category: "Crimson Isle"
  })
  jawbus = false  

  @SwitchProperty({
    name: "Announce Thunder",
    description: "Announces Thunder coords to party",
    category: "Crimson Isle"
  })
  thunder = false

  @SwitchProperty({
    name: "Announce Plhlegblasts",
    description: "Announces Plhlegblast coords to party",
    category: "Crimson Isle"
  })
  plhlegblast = false

  @SwitchProperty({
    name: "Better Magma Boss Message",
    description: "Replaces magma boss damage messages with custom ones that also show total damage\n&r&4&lMagma Boss&r &8> &c+35% &7(100%)",
    category: "Crimson Isle"
  })
  magma = false
  
  @SwitchProperty({
    name: "Highlight Teammates in kuudra",
    description: "title",
    category: "Kuudra"
  })
  teammates = false
  
  @ColorProperty({
    name: 'Teammate Color',
    description: `Sets the color for teammates`,
    category: 'Kuudra'
  })
  teammateColor = Color.MAGENTA;

  @SwitchProperty({
    name: "Stop Rendering Mob Nametags in Kuudra",
    description: "title",
    category: "Kuudra"
  })
  kuudraTags = false

  @SwitchProperty({
    name: "Stop Rendering Useless Perks",
    description: "Stops the useless perks rendering in the gui and stops you from clicking them",
    category: "Kuudra"
  })
  renderPerk = false

  @SwitchProperty({
    name: "Not stunning?",
    description: "Enabled = do not render mining frenzy or cannonball",
    category: "Kuudra"
  })
  renderStun = false

  @SwitchProperty({
    name: "No Pre! No Second!",
    description: "Tells party if you dont have a pre or second\n&csometimes breaks on certain spots on x",
    category: "Kuudra"
  })
  noPre = false  
    
  @SwitchProperty({
    name: "Custom Supply Drop Message",
    description: "Shows a message including time when a supply is dropped:\n&r&6[MVP&r&9++&r&6] nwjn&r&f &a&lrecovered a supply at 18s! &r&8(1/6)&r",
    category: "Kuudra"
  })
  customSupply = false  
    
  @SwitchProperty({
    name: "Accurate Supply Waypoints",
    description: "Draws accurate waypoints where supplies are",
    category: "Kuudra"
  })
  supplyWaypoints = false  

  @SwitchProperty({
    name: "Supply Drop Waypoints",
    description: "Shows where to drop supplies",
    category: "Kuudra"
  })
  supply = false

  @SwitchProperty({
    name: "Supply Pearl Lineup",
    description: "Shows you a box to where to pearl for instant supply drop",
    category: "Kuudra"
  })
  pearl = false
    
  @SwitchProperty({
    name: "Build Helper",
    description: `Progress text on each pile shows through walls, beacons to unfinished piles, big percentage over ballista for amount complete, fresh timer over ballista if u fresh`,
    category: "Kuudra"
  })
  inBuild = false;

  @SwitchProperty({
    name: "Breaking Piles",
    description: `Highlights mobs that are not moving (helps figure out which mobs are breaking piles although is a little spotty)`,
    category: "Kuudra"
  })
  breakingPiles = false;

  @SwitchProperty({
    name: "Notify Party On Fresh",
    description: "Auto say `FRESH!` in party chat when you get fresh tools",
    category: "Kuudra"
  })
  fresh = false

  @SwitchProperty({
    name: "Draw Hitboxes Around Freshers",
    description: "Draw hitboxes around party members who have freshed",
    category: "Kuudra"
  })
  freshHitbox = false
  
  @SwitchProperty({
    name: "Shows Kuudra",
    description: "Draw a hitbox around kuudra to help various parts of the run",
    category: "Kuudra"
  })
  kuudraHitbox = false
    
  @SwitchProperty({
    name: "Remove Discord Warnings",
    description: "Remove the annoying red text that appears whenever someone types discord in p chat",
    category: "QOL"
  })
  discord = false

  @SwitchProperty({
    name: 'Toggle Block Highlight',
    description: 'Toggles block highlight',
    category: 'QOL'
  })
  highlight = false;

  @ColorProperty({
    name: 'Highlight Color',
    description: `Sets the color for block highlight`,
    category: 'QOL'
  })
  highlightColor = Color.GREEN;
    
  @SwitchProperty({
    name: "Mineshaft Helper",
    description: "Shows location of corpses and exit in mineshafts",
    category: "Beta (WIP)"
  })
  mineshaft = false

  @SwitchProperty({
    name: "Tracks Damage Armor Stands",
    description: "Spams ur chat with damage tags",
    category: "Beta (WIP)"
  })
  damageTracker = false

  @SwitchProperty({
    name: "Removed Boss Dialouge",
    description: "Cancels messages that begin with [BOSS]",
    category: "Beta (WIP)"
  })
  boss = false  
  
  @SwitchProperty({
    name: "Gyro Range",
    description: "Shows the area that the gyro will take effect when holding",
    category: "Beta (WIP)"
  })
  gyro = false  
    
  @ColorProperty({
    name: 'Gyro Range Color',
    description: `Sets the color for gyro range`,
    category: 'Beta (WIP)'
  })
  gyroColor = Color.MAGENTA;

  @PercentSliderProperty({
    name: 'Gyro Color Opacity',
    description: 'Change the opacity of the gyro color',
    category: 'Beta (WIP)'
  })
  gyroOpacity = 0.5;
  
  @SwitchProperty({
    name: "Agro Range",
    description: "Shows the area that the agro will take effect when enrager or jingle bells held",
    category: "Beta (WIP)"
  })
  agro = false  
    
  @ColorProperty({
    name: 'Agro Range Color',
    description: `Sets the color for agro range`,
    category: 'Beta (WIP)'
  })
  agroColor = Color.RED;
    
  @PercentSliderProperty({
    name: 'Agro Color Opacity',
    description: 'Change the opacity of the agro color',
    category: 'Beta (WIP)'
  })
  agroOpacity = 0.5;
  
  @SwitchProperty({
    name: "Totem Range",
    description: "Shows the area that the totem will take effect when totem placed or held",
    category: "Beta (WIP)"
  })
  totem = false  
    
  @ColorProperty({
    name: 'Totem Range Color',
    description: `Sets the color for totem range`,
    category: 'Beta (WIP)'
  })
  totemColor = Color.CYAN;

  @PercentSliderProperty({
    name: 'Totem Color Opacity',
    description: 'Change the opacity of the totem color',
    category: 'Beta (WIP)'
  })
  totemOpacity = 0.25;

  @SelectorProperty({
    name: "Totem Range Options",
    description: "Select when the range will show",
    category: "Beta (WIP)",
    options: ["Only When Held", "Only Placed", "Both"]
  })
  totemOptions = 0;

  constructor() {
    this.initialize(this);
    this.setCategoryDescription("Bestiary", "bestiary")
    this.setCategoryDescription("Crimson Isle", "endgame island fr");
    this.setCategoryDescription("Kuudra", "1b/h")
    this.setCategoryDescription("QOL", "Quality of Life")
    this.setCategoryDescription("Beta (WIP)", "Features that are currently incomplete but are planned and have some functionality")

    this.addDependency("Not stunning?", "Stop Rendering Useless Perks")

    this.addDependency("Stats Widget", "Widget Display")
    this.addDependency("Pet Widget", "Widget Display")
    this.addDependency("Bestiary Widget", "Widget Display")
    this.addDependency("Crop Milestone Widget", "Widget Display")
    this.addDependency("Pest Widget", "Widget Display")
    this.addDependency("Visitor Widget", "Widget Display")
    this.addDependency("Jacob Widget", "Widget Display")
    this.addDependency("Commission Widget", "Widget Display")
    this.addDependency("Powder Widget", "Widget Display")
    this.addDependency("Trophy Fish Widget", "Widget Display")

    this.addDependency("Custom Widget", "Widget Display")
    this.addDependency("Custom Widget Text", "Custom Widget")
  }
}
export default new Settings();
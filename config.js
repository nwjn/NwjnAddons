import { @Vigilant, @SwitchProperty, @TextProperty, @CheckboxProperty, @ButtonProperty, @SelectorProperty, @SliderProperty, @ColorProperty, @PercentSliderProperty, @DecimalSliderProperty, Color} from "../Vigilance/index"

@Vigilant("NwjnAddons", "§d§lNwjnAddons", {
  getCategoryComparator: () => (a, b) => {
    const categories = ["General", "Bestiary", "HUD", "Crimson Isle", "Kuudra", "QOL", "Beta (WIP)"]
    return categories.indexOf(a.name) - categories.indexOf(b.name);
  }
})
class Settings {
  // @TextProperty({
  //   name: "Api Key",
  //   description: "Copy and paste your api key into the text box",
  //   category: "General",
  //   protected: true
  // }) 
  // apikey = ""  
    
  @SliderProperty({
    name: "Draw Chat Waypoints",
    description: "Creates waypoints taken from chat messages in patcher sendcoords format and how long they should stay (in seconds)",
    min: 0,
    max: 300,
    category: "General"
  })
  waypoint = 0;

  @ColorProperty({
    name: 'Waypoint Color',
    description: `Sets the color for waypoints`,
    category: 'General'
  })
  waypointColor = Color.CYAN

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
  waypointHeight = 300;
    
  @SwitchProperty({
    name: "Party Commands",
    description: "Enables party commands (full list at /nwjn party)",
    category: "General"
  })
  party = false  
    
  @SwitchProperty({
    name: "Emoticons",
    description: "Enables replacing emoticons with names of the emoticons after sending a message\nExample: *zzz or *dog",
    category: "General"
  })
  emoticons = false  
    
  @SwitchProperty({
    name: "Detect Reaper Armor",
    description: "Shows time left for reaper armor under crosshair\n&cUsing another mod to recolor your reaper armor messes this up you bozo",
    category: "General"
  })
  reaper = false 
    
  @SwitchProperty({
    name: "Show Attack Speed Over Mort in Dungeons",
    description: "Helps you to remember pet ig",
    category: "General"
  })
  mort = false  
    
  @SwitchProperty({
    name: "Steak-Able Vamp Hitbox",
    description: "Shows a hitbox when a Vamp Slayer is steak-able",
    category: "General"
  })
  steakAble = false 

  @SwitchProperty({
    name: "Diana Death Justification",
    description: "Sends a chat message when someone dies to a diana mob zzz",
    category: "General"
  })
  diana = false 

  @SwitchProperty({
    name: "Stops Entity Death Animation",
    description: "title",
    category: "General"
  })
  dead = false  
    
  @SwitchProperty({
    name: "Treecap Timer",
    description: "Renders a timer above crosshair for when u can use treecap ability again\n&cIf monkey is equipped it assumes its lvl 100",
    category: "General"
  })
  treecap = false  
    
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
    description: "Draws hitboxes around players that include the inputted name\n&cdoes not work on npcs\n&cset to `Any` to draw hitboxes on all player entities\n&Set to `Player` to draw hitboxes on any real player",
    category: "Bestiary"
  })
  player = "" 
    
  @ColorProperty({
    name: 'Player ESP Color',
    description: `Sets the color for player hitboxes`,
    category: 'Bestiary'
  })
  playerColor = Color.GREEN

  @TextProperty({
    name: "Monster ESP",
    description: "Draws hitboxes around inputted monster entity\n&cBlaze, CaveSpider, Creeper, Enderman, Endermite, Ghast, GiantZombie, Golem, Guardian, IronGolem, MagmaCube, Mob, PigZombie, Silverfish, Skeleton, Slime, Snowman, Spider, Witch, &cZombie\n&bExamples: Zombie or Zombie(100|120|2k|45k) or Zombie,Skeleton or Zombie(100), Skeleton",
    category: "Bestiary"
  })
  monster = "" 
    
  @ColorProperty({
    name: 'Monster ESP Color',
    description: `Sets the color for monster hitboxes`,
    category: 'Bestiary'
  })
  monsterColor = Color.GREEN

  @TextProperty({
    name: "Passive Entity ESP",
    description: "Draws hitboxes around inputted passive entity\n&cAmbientCreature, Animal, Bat, Chicken, Cow, Horse, Mooshroom, Ocelot, Pig, Rabbit, Sheep, Squid, Tameable, Villager, WaterMob, Wolf\n&bExamples: Wolf or Wolf, Pig or Wolf(250|15k)",
    category: "Bestiary"
  })
  passive = "" 
    
  @ColorProperty({
    name: 'Passive entity ESP Color',
    description: `Sets the color for passive entity hitboxes`,
    category: 'Bestiary'
  })
  passiveColor = Color.GREEN

  @SliderProperty({
    name: "ESP Distance",
    description: "Change distance hitboxes will render",
    min: 0,
    max: 64,
    category: "Bestiary"
  })
  distance = 64;

  @SwitchProperty({
    name: "Matcho!",
    description: `Matcho box and text`,
    category: "Bestiary"
  })
  matcho = false

  @SwitchProperty({
    name: "Matcho Alert",
    description: `Matcho alert`,
    category: "Bestiary"
  })
  matchoAlert = false

  @SwitchProperty({
    name: "Arachnes Keeper",
    description: `Keeper box and text`,
    category: "Bestiary"
  })
  keeper = false;

  @SwitchProperty({
    name: "Arachnes Keeper Alert",
    description: `Keeper alert`,
    category: "Bestiary"
  })
  keeperAlert = false;

  @SwitchProperty({
    name: "Broodmother",
    description: `Broodmother box and text`,
    category: "Bestiary"
  })
  broodmother = false; 

  @SwitchProperty({
    name: "Broodmother Alert",
    description: `Broodmother alert`,
    category: "Bestiary"
  })
  broodmotherAlert = false;

  @SwitchProperty({
    name: "Legion Display",
    description: "Shows the number of players in your legion radius",
    category: "HUD",
    subcategory: "Legion"
  })
  legion = false

  @ButtonProperty({
    name: "Legion Mover",
    description: `Moves legion counter -> Runs /moveLegion`,
    category: "HUD",
    subcategory: "Legion",
    placeholder: "Click!"
  })
  moveLegion() {
    ChatLib.command("moveLegion", true)
  }

  @SwitchProperty({
    name: "Highlight Players in Align Radius",
    description: "Title when align is held and off cd",
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

  @ButtonProperty({
    name: "Align Mover",
    description: `Moves align timer -> Runs /moveAlign`,
    category: "HUD",
    subcategory: "Align",
    placeholder: "Click!"
  })
  moveAlign() {
    ChatLib.command("moveAlign", true)
  }

  @SwitchProperty({
    name: "Mage Gyro",
    description: "Looks for mage cooldown reduction chat message to change gyrocd",
    category: "HUD",
    subcategory: "Gyro"
  })
  mageCD = false

  @SwitchProperty({
    name: "Gyro Display",
    description: "Shows how long you are under alignment for",
    category: "HUD",
    subcategory: "Gyro"
  })
  gravityStorm = false

  @ButtonProperty({
    name: "Gyro Mover",
    description: `Moves gyro timer -> Runs /moveGyro`,
    category: "HUD",
    subcategory: "Gyro",
    placeholder: "Click!"
  })
  moveGyro() {
    ChatLib.command("moveGyro", true)
  }

  @SwitchProperty({
    name: "Bobbin Display",
    description: "Shows the number of bobbers in your bobbin radius",
    category: "HUD",
    subcategory: "Bobbin"
  })
  bobbin = false

  @ButtonProperty({
    name: "Bobbin Mover",
    description: `Moves bobbin counter -> Runs /moveBobbin`,
    category: "HUD",
    subcategory: "Bobbin",
    placeholder: "Click!"
  })
  moveBobbin() {
    ChatLib.command("moveBobbin", true)
  }

  @SwitchProperty({
    name: "Fatal Tempo Display",
    description: `Approximate ft percent\n&cNote: Currently trying to add a fix for precursor eye adding ft hits`,
    category: "HUD",
    subcategory: "Fatal Tempo"
  })
  ft = false
    
  @ButtonProperty({
    name: "Fatal Tempo Mover",
    description: `Moves ft counter -> Runs /moveFt`,
    category: "HUD",
    subcategory: "Fatal Tempo",
    placeholder: "Click!"
  })
  moveFt() {
    ChatLib.command("moveFt", true)
  }

  @SwitchProperty({
    name: "Poison Display",
    description: `Displays the amount of poisons in your inventory`,
    category: "HUD",
    subcategory: "Poison"
  })
  poison = false

  @ButtonProperty({
    name: "Poison Mover",
    description: `Moves the poison display -> Runs /movePoison`,
    category: "HUD",
    subcategory: "Poison",
    placeholder: "Click!"
  })
  movePoison() {
    ChatLib.command("movePoison", true)
  }

  @SwitchProperty({
    name: "Stats Display",
    description: `Shows stats from tab `,
    category: "HUD",
    subcategory: "Stats"
  })
  stats = false;
    
  @ButtonProperty({
    name: "Stats Mover",
    description: "Moves stat tracker -> Runs /moveStats",
    category: "HUD",
    subcategory: "Stats",
    placeholder: "Click!"
  })
  moveStats() {
    ChatLib.command(`moveStats`, true);
  } 

  @CheckboxProperty({
    name: "Toggle Speed",
    description: "",
    category: "HUD",
    subcategory: "Stats"
  })
  speed = false  

  @CheckboxProperty({
    name: "Toggle Strength",
    description: "",
    category: "HUD",
    subcategory: "Stats"
  })
  strength = false  

  @CheckboxProperty({
    name: "Toggle Crit Chance",
    description: "",
    category: "HUD",
    subcategory: "Stats"
  })
  critChance = false  

  @CheckboxProperty({
    name: "Toggle Crit Damage",
    description: "",
    category: "HUD",
    subcategory: "Stats"
  })
  critDamage = false  

  @CheckboxProperty({
    name: "Toggle Attack Speed",
    description: "",
    category: "HUD",
    subcategory: "Stats"
  })
  atkSpd = false  
    
  @SwitchProperty({
    name: "Rain Display",
    description: `Shows active or next Spider's Den rain`,
    category: "HUD",
    subcategory: "Rain"
  })
  rain = false

  @ButtonProperty({
    name: "Rain Mover",
    description: `Move rain -> Runs /moveRain`,
    category: "HUD",
    subcategory: "Rain",
    placeholder: "Click!"
  })
  moveRain() {
    ChatLib.command("moveRain", true);
  }

  @SwitchProperty({
    name: "Champion Display",
    description: `Champion gained on killing a flare`,
    category: "HUD",
    subcategory: "Champion"
  })
  champ = false

  @ButtonProperty({
    name: "Champion Mover",
    description: `Shows your champion xp -> Runs /moveChamp`,
    category: "HUD",
    subcategory: "Champion",
    placeholder: "Click!"
  })
  moveChamp() {
    ChatLib.command("moveChamp", true)
  }   

  @SwitchProperty({
    name: "Blaze Display",
    description: "Shows how much time left on gummy and wisp pot",
    category: "HUD",
    subcategory: "Blaze"
  })
  blaze = false 

  @ButtonProperty({
    name: "Blaze Mover",
    description: `Shows your blaze effect -> Runs /moveBlaze`,
    category: "HUD",
    subcategory: "Blaze",
    placeholder: "Click!"
  })
  moveBlaze() {
    ChatLib.command("moveBlaze", true)
  }   

  @SelectorProperty({
    name: "Clock Display",
    description: "Shows your current time",
    category: "HUD",
    subcategory: "Clock",
    options: ["Off", "12-Hour Time", "24-Hour Time"]
  })
  clock = 0;
  
  @ButtonProperty({
    name: "Clock Mover",
    description: "Moves the clock -> Runs /moveClock",
    category: "HUD",
    subcategory: "Clock",
    placeholder: "Click!"
  })
  moveClock() {
    ChatLib.command("moveClock", true)
  }

  @SelectorProperty({
    name: "Visitor Display",
    description: "Shows time until next visitor",
    category: "HUD",
    subcategory: "Visitor",
    options: ["Off", "12 Minutes", "15 Minutes"]
  })
  visitor = 0;
  
  @ButtonProperty({
    name: "Visitor Mover",
    description: "Moves the visitor -> Runs /moveVisitor",
    category: "HUD",
    subcategory: "Visitor",
    placeholder: "Click!"
  })
  moveVisitor() {
    ChatLib.command("moveVisitor", true)
  }

  @SwitchProperty({
    name: "Miniboss Display",
    description: "Shows your recent CI miniboss kills",
    category: "HUD",
    subcategory: "Miniboss"
  })
  mini = false 

  @ButtonProperty({
    name: "Miniboss Mover",
    description: `Shows your recent CI miniboss kills -> Runs /moveMini`,
    category: "HUD",
    subcategory: "Miniboss",
    placeholder: "Click!"
  })
  moveMini() {
    ChatLib.command("moveMini", true)
  }   

  @SwitchProperty({
    name: "Announce Vanquishers",
    description: `Announces Vanquisher coords to party.`,
    category: "Crimson Isle"
  })
  announceVanqs = false

  @SwitchProperty({
    name: "Announce Jawbus'",
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
    name: "Replace Magma Boss Damage Messages",
    description: "[NwjnAddons] +35% (100%)",
    category: "Crimson Isle"
  })
  magma = false
  
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

  @DecimalSliderProperty({
    name: "Pearl Box Size",
    description: "Slide to change the width and height of each pearl box",
    minF: 0.5,
    maxF: 1.5,
    category: "Kuudra"
  })
  pearlBox = 1;
    
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
    name: "Show Ballista Percentage",
    description: `Changes ballista text to be seen through ballista and shows total percent over ballista`,
    category: "Kuudra"
  })
  inBuild = false;

  @SwitchProperty({
    name: "Auto Fresh & Hitbox",
    description: "Auto say `FRESH!` in party chat when you get fresh tools and draw hitboxes around party members who have freshed",
    category: "Kuudra"
  })
  fresh = false

  @DecimalSliderProperty({
    name: "Fresh Hitbox Width",
    description: "Slide to change the width of fresh hitboxes",
    minF: 0.5,
    maxF: 2,
    category: "Kuudra"
  })
  freshWidth = 1;

  @DecimalSliderProperty({
    name: "Fresh Hitbox Height",
    description: "Slide to change the height of fresh hitboxes",
    minF: 1,
    maxF: 4,
    category: "Kuudra"
  })
  freshHeight = 2;

  @SwitchProperty({
    name: "Stop Rendering Mob Nametags in Kuudra",
    description: "title",
    category: "Kuudra"
  })
  kuudraTags = false

  @SliderProperty({
    name: "Memory Usage Alert",
    description: "Sends an alert when memory reaches a certain percentage (set to 0 for off)",
    min: 0,
    max: 100,
    category: "QOL"
  })
  memory = 0;
    
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
    name: "Render Armor Bar",
    description: "Toggle on to remove armor bar above health",
    category: "QOL"
  })
  armor = false
  
  @SwitchProperty({
    name: "Render Food Bar",
    description: "Toggle on to remove food bar",
    category: "QOL"
  })
  food = false

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
  totemColor = Color.ORANGE;

  @PercentSliderProperty({
    name: 'Totem Color Opacity',
    description: 'Change the opacity of the totem color',
    category: 'Beta (WIP)'
  })
  totemOpacity = 0.5;

  @SelectorProperty({
    name: "Totem Range Options",
    description: "Select when the range will show",
    category: "Beta (WIP)",
    options: ["Only When Held", "Only Placed", "Both"]
  })
  totemOptions = 0;

  @SwitchProperty({
    name: "Frozen Blaze Range",
    description: "Shows the area that the FB will take effect",
    category: "Beta (WIP)"
  })
  fb = false  
    
  @ColorProperty({
    name: 'Frozen Blaze Range Color',
    description: `Sets the color for fb range`,
    category: 'Beta (WIP)'
  })
  fbColor = Color.CYAN;

  @PercentSliderProperty({
    name: 'Frozen Blaze Color Opacity',
    description: 'Change the opacity of the fb color',
    category: 'Beta (WIP)'
  })
  fbOpacity = 0.5;

  constructor() {
    this.initialize(this);
    this.setCategoryDescription("Bestiary", "bestiary")
    this.setCategoryDescription("HUD", "Displays on your screen")
    this.setCategoryDescription("Crimson Isle", "endgame island fr");
    this.setCategoryDescription("Kuudra", "1b/h")
    this.setCategoryDescription("QOL", "Quality of Life")
    this.setCategoryDescription("Beta (WIP)", "Features that are currently incomplete but are planned and have some functionality")

    this.addDependency("Fatal Tempo Mover", "Fatal Tempo Display")
    this.addDependency("Stats Mover", "Stats Display")
    this.addDependency("Champion Mover", "Champion Display")
    this.addDependency("Blaze Mover", "Blaze Display")
    this.addDependency("Poison Mover", "Poison Display")
    this.addDependency("Rain Mover", "Rain Display")
    this.addDependency("Miniboss Mover", "Miniboss Display")

    this.addDependency("Matcho Alert", "Matcho!")
    this.addDependency("Arachnes Keeper Alert", "Arachnes Keeper")
    this.addDependency("Broodmother Alert", "Broodmother")
  }
}
export default new Settings();
import { @Vigilant, @SwitchProperty, @TextProperty, @CheckboxProperty, @ButtonProperty, @SelectorProperty, @SliderProperty, @ColorProperty, @PercentSliderProperty, @DecimalSliderProperty, Color} from "../Vigilance/index"

@Vigilant("NwjnAddons", "§d§lNwjnAddons", {
  getCategoryComparator: () => (a, b) => {
    const categories = ["General", "Bestiary", "Crimson Isle", "HUD", "Kuudra", "QOL", "Beta (WIP)"]
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
    description: "Enables party commands (full list at /nwjn party)]n&c this counts as a chat marco",
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
    description: "Renders a timer above crosshair for when u can use treecap ability again\n&cIf monkey is equipped it assumes its lvl 100",
    category: "General"
  })
  treecap = false  
    
  @TextProperty({
    name: "Party and Warp on Chat Message",
    description: "Parties and warps the player inputted in the below text entry whenever the chat message that includes what is in this text entry is in the chat.\n&c This is a chat marco",
    category: "General"
  })
  pWarp = ""  
    
  @TextProperty({
    name: "Invited Player Name",
    description: "The player name to invite when the thing above happens",
    category: "General"
  })
  pPlayer = ""  
    
  @TextProperty({
    name: "Mob ESP",
    description: "Draws hitboxes around inputted mob entity\n&cA mob from net.minecraft.entity.monster or net.minecraft.entity.passive\n&bExamples: `Zombie` or `Zombie-100|120|2k|45k` or `Zombie, Skeleton` or `Zombie-100, Cow`",
    category: "Bestiary"
  })
  rawMobList = "" 
    
  @ColorProperty({
    name: 'Monster ESP Color',
    description: `Sets the color for monster hitboxes`,
    category: 'Bestiary'
  })
  monsterHitboxColor = Color.YELLOW
    
  @ColorProperty({
    name: 'Passive entity ESP Color',
    description: `Sets the color for passive entity hitboxes`,
    category: 'Bestiary'
  })
  passiveHitboxColor = Color.GREEN
  
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
    name: "Pet Display",
    description: "Simple display of active pet",
    category: "HUD",
    subcategory: "Pet"
  })
  pet = false  
    
  @SwitchProperty({
    name: "Garden Display",
    description: "Shows garden timers",
    category: "HUD",
    subcategory: "Garden"
  })
  garden = false

  @SwitchProperty({
    name: "On Screen Pest Alert",
    description: "shows pests in the middle of screen",
    category: "HUD",
    subcategory: "Garden"
  })
  pests = false

  @SwitchProperty({
    name: "Mob Highlight Counter",
    description: "Shows the number of each mob highlighted by mob esp",
    category: "HUD",
    subcategory: "Bestiary"
  })
  mobEspCount = false
    
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
    name: "Key Guardian Display",
    description: "Shows Key Guardian spawn time",
    category: "HUD",
    subcategory: "Crystal Hollows"
  })
  keyGuard = false
    
  @SwitchProperty({
    name: "Legion Display",
    description: "Shows the number of players in your legion radius",
    category: "HUD",
    subcategory: "Legion"
  })
  legion = false

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
    name: "Fatal Tempo Display",
    description: `Approximate ft percent\n&cNote: Currently trying to add a fix for precursor eye adding ft hits`,
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
    name: "Poison Display",
    description: `Displays the amount of poisons in your inventory`,
    category: "HUD",
    subcategory: "Poison"
  })
  poison = false

  @SwitchProperty({
    name: "Stats Display",
    description: `Shows stats from tab `,
    category: "HUD",
    subcategory: "Stats"
  })
  stats = false;

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
    name: "Champion Display",
    description: `Champion gained on killing a flare`,
    category: "HUD",
    subcategory: "Champion"
  })
  champ = false

  @SwitchProperty({
    name: "Blaze Display",
    description: "Shows how much time left on gummy and wisp pot",
    category: "HUD",
    subcategory: "Blaze"
  })
  blaze = false 

  @SelectorProperty({
    name: "Time Display",
    description: "Shows your current time",
    category: "HUD",
    subcategory: "Clock",
    options: ["Off", "12-Hour Time", "24-Hour Time"]
  })
  time = 0;

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
    name: "Trophy Fish Session Counter",
    description: "Changes trophy fish catch messages to show count in that session",
    category: "Crimson Isle"
  })
  fish = false
    
  @SwitchProperty({
    name: "Announce Vanquishers",
    description: `Announces Vanquisher coords to party.\n&c this is a chat marco`,
    category: "Crimson Isle"
  })
  announceVanqs = false

  @SwitchProperty({
    name: "Announce Jawbus'",
    description: "Announces Jawbus coords to party\n&c this is a chat marco",
    category: "Crimson Isle"
  })
  jawbus = false  

  @SwitchProperty({
    name: "Announce Thunder",
    description: "Announces Thunder coords to party\n&c this is a chat marco",
    category: "Crimson Isle"
  })
  thunder = false

  @SwitchProperty({
    name: "Announce Plhlegblasts",
    description: "Announces Plhlegblast coords to party\n&c this is a chat marco",
    category: "Crimson Isle"
  })
  plhlegblast = false

  @SwitchProperty({
    name: "Replace Magma Boss Damage Messages",
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
    description: "Tells party if you dont have a pre or second\n&csometimes breaks on certain spots on x\n&c this is a chat marco",
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
    description: "Auto say `FRESH!` in party chat when you get fresh tools\n&c this is a chat marco",
    category: "Kuudra"
  })
  fresh = false

  @SwitchProperty({
    name: "Draw Hitboxes Around Freshers",
    description: "Draw hitboxes around party members who have freshed\n&cIf you get a crash called Already Building! turn this feature off",
    category: "Kuudra"
  })
  freshHitbox = false
  
  @SwitchProperty({
    name: "Shows Kuudra",
    description: "Draw a hitbox around kuudra to help various parts of the run\n&cHEAVY USE AT YOUR OWN RISK",
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
    name: "Disable Falling Blocks",
    description: "Removes falling blocks",
    category: "QOL"
  })
  falling = false  
    
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
    this.setCategoryDescription("Crimson Isle", "endgame island fr");
    this.setCategoryDescription("Kuudra", "1b/h")
    this.setCategoryDescription("QOL", "Quality of Life")
    this.setCategoryDescription("Beta (WIP)", "Features that are currently incomplete but are planned and have some functionality")

    this.addDependency("Matcho Alert", "Matcho!")
    this.addDependency("Arachnes Keeper Alert", "Arachnes Keeper")
    this.addDependency("Broodmother Alert", "Broodmother")
    this.addDependency("Not stunning?", "Stop Rendering Useless Perks")
  }
}
export default new Settings();
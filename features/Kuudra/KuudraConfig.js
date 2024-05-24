import { @Vigilant, @SwitchProperty, @ColorProperty, @ParagraphProperty, Color} from "../../../Vigilance/index"
import { version } from "../../utils/constants"

@Vigilant("NwjnAddons/features/Kuudra", "§d§lNwjnAddons (Kuudra)", {
  getCategoryComparator: () => (a, b) => {
    const categories = ["General", "Phase 1", "Phase 2", "Phase 3", "Phase 4"]
    return categories.indexOf(a.name) - categories.indexOf(b.name);
  },
  getSubcategoryComparator: () => (a, b) => {
    const subcategories = ["Show on Kuudra", "Team Highlight", "Player View QOL", "Renderings", "Chats"];

    return subcategories.indexOf(a.getValue()[0].attributesExt.subcategory) - subcategories.indexOf(b.getValue()[0].attributesExt.subcategory);
  }
})
  
class KuudraSettings {
  constructor() {
    this.initialize(this);
    this.setCategoryDescription("General", `&d&l[NwjnAddons-v${version}-Kuudra]&r by nwjn\nFeatures for the entire fight`);
    this.setCategoryDescription("Phase 1", "Supply/Crates phase")
    this.setCategoryDescription("Phase 2", "Build phase")
    this.setCategoryDescription("Phase 3", "Hitsphase")
    this.setCategoryDescription("Phase 4", "Nothing essential to this part of the fight has been added")

    this.addDependency("➤ Team Color", "Team Highlight")
  }

  // General {
    // Show on Kuudra { 
      @SwitchProperty({
        name: "Draws Kuudra's HP",
        description: "Displays text of Kuudra's hp on kuudra",
        category: "General",
        subcategory: "Show on Kuudra"
      })
      kuudraHP = false
    // Show on Kuudra }
    
    // Team Highlight {
      @SwitchProperty({
        name: "Team Highlight",
        description: "Draws a box of the selected color on teammates, changes to green if that player gets fresh tools",
        category: "General",
        subcategory: "Team Highlight"
      })
      teamHighlight = false
      
      @ColorProperty({
        name: "➤ Team Color",
        description: "     Sets the color for teammates",
        category: "General",
        subcategory: "Team Highlight"
      })
      teammateColor = Color.MAGENTA;
    // Team Highlight }

    // Player View QOL {
      @SwitchProperty({
        name: "Unrender Useless Perks",
        description: "Stops the useless perks rendering their texture in the gui\n&cWill not stop you from clicking",
        category: "General",
        subcategory: "Player View QOL"
      })
      cancelUselessPerk = false
    // Player View QOL }
  // General }

  // Phase 1 {
    // Renderings {
      @SwitchProperty({
        name: "Supply Beacons",
        description: "Draws beacons where supplies are",
        category: "Phase 1",
        subcategory: "Renderings"
      })
      supplyBeacons = false
      
      @SwitchProperty({
        name: "Supply Drop Beacons",
        description: "Draws beacons on piles where supplies are needed",
        category: "Phase 1",
        subcategory: "Renderings"
      })
      supplyPiles = false
      
      @SwitchProperty({
        name: "Pearl Lineups",
        description: "Draws target boxes of where to pearl to insta place supply\n&eBoxes on the ceilingz: pearl at ~38％\n&eBoxes on the sides: pearl at ~76％",
        category: "Phase 1",
        subcategory: "Renderings"
      })
      pearl = false
    // Renderings }
  
    // Chats {
      @SwitchProperty({
        name: "No Supply Chat",
        description: "Tells party if your pre or second doesn't spawn\n&cSometimes breaks on spots between X and XCannon",
        category: "Phase 1",
        subcategory: "Chats"
      })
      noSupply = false  
        
      @SwitchProperty({
        name: "Custom Supply Drop Message",
        description: "Changes supply message to include time when a supply is dropped:\n&r&6[MVP&r&9++&r&6] nwjn&r&f &a&lrecovered a supply at 18s! &r&8(1/6)&r",
        category: "Phase 1",
        subcategory: "Chats"
      })
      customSupply = false  
    // Chats }
  // Phase 1 }
    
  // Phase 2 {
    // Renderings {
      @SwitchProperty({
        name: "Unfinished Pile Beacons",
        description: "Draws beacons on build piles that are incomplete",
        category: "Phase 2",
        subcategory: "Renderings"
      })
      buildPiles = false;
      
      @SwitchProperty({
        name: "Cumulative Build Percentage",
        description: "Draws the overall build percentage over the ballista",
        category: "Phase 2",
        subcategory: "Renderings"
      })
      buildPercent = false;
      
      @SwitchProperty({
        name: "Fresh Timer",
        description: "Draws the seconds of fresh you have left on the ballista",
        category: "Phase 2",
        subcategory: "Renderings"
      })
      buildFresh = false;
      
      @SwitchProperty({
        name: "Ballista Builders",
        description: "Draws the number of players actually building under the ballista",
        category: "Phase 2",
        subcategory: "Renderings"
      })
      buildBuilders = false;
      
      @SwitchProperty({
        name: "Show Pile Progress Through Mobs",
        description: "Draws the 'Progress: 77％' text on a pile through mobs",
        category: "Phase 2",
        subcategory: "Renderings"
      })
      progressWithPhase = false;
    // Renderings }

    // Chats {
      @SwitchProperty({
        name: "Notify Party On Fresh",
        description: "Say `FRESH!` in party chat when you get fresh tools",
        category: "Phase 2",
        subcategory: "Chats"
      })
      fresh = false
    // Chats }
  // Phase 2 }  
  
  // Phase 3 {
    // Renderings {
      @SwitchProperty({
        name: "Draws Kuudra's Hitbox",
        description: "Draws a box around Kuudra's hitbox",
        category: "Phase 3",
        subcategory: "Renderings"
      })
      kuudraHitbox = false
    // Renderings }
  // Phase 3}
  
  // Phase 4 {
    @ParagraphProperty({
      name: "Upcoming",
      category: "Phase 4",
    })
    paragraph = "New features will be added here soon"
  // Phase 4 }
}
export default new KuudraSettings();
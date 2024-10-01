import "./utils/data/Data"
import "./utils/Broadcasting"
import "./utils/Party"
import "./utils/functions"
import "./utils/Command"

// import "./features/CrimsonIsle(Move)";
// import "./features/General(Move)"
import "./features/General/ChatWaypoints"
import "./features/General/PartyCommands"

// import "./features/HUD/BlazeTimers"
// import "./features/HUD/Clock"
// import "./features/HUD/FatalTempo"
// import "./features/HUD/Minibosses"
// import "./features/HUD/Poison"
// import "./features/HUD/Widgets"

// Kuudra {
  // import "./features/Kuudra/KuudraUtil"
  
  // General
  // import "./features/Kuudra/General/CancelUselessPerk"
  // import "./features/Kuudra/General/TeamHighlight"
  // import "./features/Kuudra/General/KuudraBox"
  // import "./features/Kuudra/General/KuudraHP"
  
  // P1
  // import "./features/Kuudra/Phase1/CustomSupplyMessage"
  // import "./features/Kuudra/Phase1/NoSupply"
  // import "./features/Kuudra/Phase1/PearlLineups"
  // import "./features/Kuudra/Phase1/SupplyDrops"
  // import "./features/Kuudra/Phase1/SupplyBeacons"
  
  // P2
  // import "./features/Kuudra/Phase2/BuildFresh"
  // import "./features/Kuudra/Phase2/BuildPercent"
  // import "./features/Kuudra/Phase2/BuildPiles"
  // import "./features/Kuudra/Phase2/FreshBox"
  
  // P3
  
  // P4
  // import "./features/Kuudra/Phase4/DrainDisplay"
  // import "./features/Kuudra/Phase4/ManaDrain"
  // Kuudra }
  
  // Bestiary {
    // import "./features/Bestiary/MobHighlight"
    // import "./features/Bestiary/PlayerHighlight"
    // import "./features/Bestiary/StandHighlight"
    // Bestiary }
    
    // import "./features/Mining/MineshaftWaypoints"
    
    import "./features/QOL/BlockHighlight"
    import "./features/QOL/ChatCleanup"
    import "./features/QOL/EntitySpawn"
    
    import "./features/Utilities/Commands"
    import "./features/Utilities/DamageTracker"
    import "./features/Utilities/Dev"
    import "./features/Utilities/RendArrows"

const rightClickMethod = Client.getMinecraft().getClass().getDeclaredMethod("func_147121_ag")
rightClickMethod.setAccessible(true)
function rightClick() {
  rightClickMethod.invoke(Client.getMinecraft())
}

register("soundPlay", () => {
  if (Player.getHeldItem()?.getRegistryName() !== "minecraft:fishing_rod") return
  const caught = World.getAllEntitiesOfType(net.minecraft.entity.item.EntityArmorStand).find(stand => stand.getName().includes("!!!"))

  if (caught) {
    rightClick()
    setTimeout(() => {
      rightClick()
    }, 250);
  }
}).setCriteria("note.pling")
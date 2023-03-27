import Settings from "../config";
import { guiShader } from "../utils/functions";
import { data, bestiaryDisplay, consts, short_number } from "../utils/constants";

let tracker = false;

let privateIsland = false;
let hub = false;
let spidersDen = false;
let end = false;
let crimsonIsle = false;
let deepCaverns = false;
let park = false;
let dungeons = false;

// Credit: Ghosts for Rendering overlay inspiration
// TODO: Add Bestiary Tiers of the island and divide by ten, put infront of the renderer drawing to show the amount of bestiary u get from that island
// TODO: make hidden switchproperties and if you select and option then it will reveal them. can select which mobs you want on your gui. For dungeons do for floors not per mob.
register("renderoverlay", () => {
  guiShader()
  if (Settings.bestiary) {
    // Island
    try {
      TabList.getNames().forEach(name => {
        if (ChatLib.removeFormatting(name).trim().includes("Area: Private Island")) {
          let IslandZombie_txt = `${ consts.IslandZombie }${ short_number(data.IslandZombie) }`;
          let IslandSkeleton_txt = `${ consts.IslandSkeleton }${ short_number(data.IslandSkeleton) }`;
          let IslandEnderman_txt = `${ consts.IslandEnderman }${ short_number(data.IslandEnderman) }`;
          let IslandSlime_txt = `${ consts.IslandSlime }${ short_number(data.IslandSlime) }`;
          let IslandSpider_txt = `${ consts.IslandSpider }${ short_number(data.IslandSpider) }`;
          let IslandCaveSpider_txt = `${ consts.IslandCaveSpider }${ short_number(data.IslandCaveSpider) }`;
          let IslandWitch_txt = `${ consts.IslandWitch }${ short_number(data.IslandWitch) }`;
          Renderer.drawStringWithShadow(`${ IslandZombie_txt } \n${ IslandSkeleton_txt } \n${ IslandEnderman_txt } \n${ IslandSlime_txt } \n${ IslandSpider_txt } \n${ IslandCaveSpider_txt } \n${ IslandWitch_txt }`, data.bestiaryX, data.bestiaryY);
        }
      })
    } catch (e) { }
  
    // Hub
    try {
      TabList.getNames().forEach(name => {
        if (ChatLib.removeFormatting(name).trim().includes("Area: Hub")) {
          let HubCryptGhoul_txt = `${ consts.HubCryptGhoul }${ short_number(data.HubCryptGhoul) }`;
          let HubOldWolf_txt = `${ consts.HubOldWolf }${ short_number(data.HubOldWolf) }`;
          let HubWolf_txt = `${ consts.HubWolf }${ short_number(data.HubWolf) }`;
          let HubZombieVillager_txt = `${ consts.HubZombieVillager }${ short_number(data.HubZombieVillager) }`;
          Renderer.drawStringWithShadow(`${ HubCryptGhoul_txt } \n${HubOldWolf_txt} \n${HubWolf_txt} \n${HubZombieVillager_txt}`, data.bestiaryX, data.bestiaryY)
        }
      }) 
    } catch (e) { }
  
    // Spider's Den
    try {
      TabList.getNames().forEach(name => {
        if (ChatLib.removeFormatting(name).trim().includes("Area: Spider's Den")) {
          let DenBroodMother_txt = `${ consts.DenBroodMother }${ short_number(data.DenBroodMother) }`;
          let DenArachne_txt = `${ consts.DenArachne }${ short_number(data.DenArachne) }`;
          let DenArachnesBrood_txt = `${ consts.DenArachnesBrood }${ short_number(data.DenArachnesBrood) }`;
          let DenArachnesKeeper_txt = `${ consts.DenArachnesKeeper }${ short_number(data.DenArachnesKeeper) }`;
          let DenRainSlime_txt = `${ consts.DenRainSlime }${ short_number(data.DenRainSlime) }`;
          let DenGravelSkeleton_txt = `${ consts.DenGravelSkeleton }${ short_number(data.DenGravelSkeleton) }`;
          let DenDasherSpider_txt = `${ consts.DenDasherSpider }${ short_number(data.DenDasherSpider) }`;
          let DenSpiderJockey_txt = `${ consts.DenSpiderJockey }${ short_number(data.DenSpiderJockey) }`;
          let DenSplitterSpider_txt = `${ consts.DenSplitterSpider } ${ short_number(data.DenSplitterSpider) }`;
          let DenVoraciousSpider_txt = `${ consts.DenVoraciousSpider }${ short_number(data.DenVoraciousSpider) }`;
          let DenWeaverSpider_txt = `${ consts.DenWeaverSpider }${ short_number(data.DenWeaverSpider) }`;
          Renderer.drawStringWithShadow(`${ DenBroodMother_txt } \n${ DenArachne_txt } \n${ DenArachnesBrood_txt } \n${ DenArachnesKeeper_txt } \n${ DenRainSlime_txt } \n${ DenGravelSkeleton_txt } \n${ DenDasherSpider_txt } \n${ DenSpiderJockey_txt } \n${ DenSplitterSpider_txt } \n${ DenVoraciousSpider_txt } \n${ DenWeaverSpider_txt }`, data.bestiaryX, data.bestiaryY);
        }
      })
    } catch (e) { }
  
    // End
    try {
      TabList.getNames().forEach(name => {
        if (ChatLib.removeFormatting(name).trim().includes("Area: The End")) {
          let EndDragon_txt = `${ EndDragon }${ short_number(data.EndDragon) }`;
          let EndEndstoneProtector_txt = `${ consts.EndEndstoneProtector }${ short_number(data.EndEndstoneProtector) }`;
          let EndVoidlingExtremist_txt = `${ consts.EndVoidlingExtremist }${ short_number(data.EndVoidlingExtremist) }`;
          let EndVoidlingFanatic_txt = `${ consts.EndVoidlingFanatic }${ short_number(data.EndVoidlingFanatic) }`;
          let EndZealot_txt = `${ consts.EndZealot }${ short_number(data.EndZealot) }`;
          let EndWatcher_txt = `${ consts.EndWatcher }${ short_number(data.EndWatcher) }`;
          let EndObsidianDefender_txt = `${ consts.EndObsidianDefender }${ short_number(data.EndObsidianDefender) }`;
          let EndEnderman_txt = `${ consts.EndEnderman }${ short_number(data.EndEnderman) }`;
          let EndEndermite_txt = `${ consts.EndEndermite }${ short_number(data.EndEndermite) }`;
          Renderer.drawStringWithShadow(`${ EndDragon_txt } \n${ EndEndstoneProtector_txt } \n${ EndVoidlingExtremist_txt } \n${ EndVoidlingFanatic_txt } \n${ EndZealot_txt } \n${ EndWatcher_txt } \n${ EndObsidianDefender_txt } \n${ EndEnderman_txt } \n${ EndEndermite_txt }`, data.bestiaryX, data.bestiaryY);
        }
      });
    } catch (e) { }
  
    // Crimson Isle
    try {
      TabList.getNames().forEach(name => {
        if (ChatLib.removeFormatting(name).trim().includes("Area: Crimson Isle")) {
          let IsleMagmaBoss_txt = `${ consts.IsleMagmaBoss } ${ short_number(data.IsleMagmaBoss) }`;
          let IsleMageOutlaw_txt = `${ consts.IsleMageOutlaw }${ short_number(data.IsleMageOutlaw) }`;
          let IsleAshfang_txt = `${ consts.IsleAshfang }${ short_number(data.IsleAshfang) }`;
          let IsleBladesoul_txt = `${ consts.IsleBladesoul }${ short_number(data.IsleBladesoul) }`;
          let IsleBarbarianDuke_txt = `${ consts.IsleBarbarianDuke }${ short_number(data.IsleBarbarianDuke) }`;
          let IsleWitherSpectre_txt = `${ consts.IsleWitherSpectre }${ short_number(data.IsleWitherSpectre) }`;
          let IsleWitherSkeleton_txt = `${ consts.IsleWitherSkeleton } ${ short_number(data.IsleWitherSkeleton) }`;
          let IsleFlamingSpider_txt = `${ consts.IsleFlamingSpider }${ short_number(data.IsleFlamingSpider) }`;
          let IslePigman_txt = `${ consts.IslePigman }${ short_number(data.IslePigman) }`;
          let IsleMushroomBull_txt = `${ consts.IsleMushroomBull }${ short_number(data.IsleMushroomBull) }`;
          let IsleMagmaCube_txt = `${ consts.IsleMagmaCube }${ short_number(data.IsleMagmaCube) }`;
          let IsleGhast_txt = `${ consts.IsleGhast }${ short_number(data.IsleGhast) }`;
          let IsleMatcho_txt = `${ consts.IsleMatcho }${ short_number(data.IsleMatcho) }`;
          Renderer.drawStringWithShadow(`${ IsleMagmaBoss_txt } \n${ IsleMageOutlaw_txt } \n${ IsleAshfang_txt } \n${ IsleBladesoul_txt } \n${ IsleBarbarianDuke_txt } \n${ IsleWitherSpectre_txt } \n${ IsleWitherSkeleton_txt } \n${ IsleFlamingSpider_txt } \n${ IslePigman_txt } \n${ IsleMushroomBull_txt } \n${ IsleMagmaCube_txt } \n${ IsleGhast_txt } \n${ IsleMatcho_txt }`, data.bestiaryX, data.bestiaryY);
        }
      })
    } catch (e) { }
    
    // Deep Caverns
    try {
      TabList.getNames().forEach(name => {
        if (ChatLib.removeFormatting(name).trim().includes("Area: Deep Caverns")) {
          let DeepSneakyCreeper_txt = `${ consts.DeepSneakyCreeper }${ short_number(data.DeepSneakyCreeper) }`;
          let DeepLapisZombie_txt = `${ consts.DeepLapisZombie }${ short_number(data.DeepLapisZombie) }`;
          let DeepRedstonePigman_txt = `${ consts.DeepRedstonePigman }${ short_number(data.DeepRedstonePigman) }`;
          let DeepEmeraldSlime_txt = `${ consts.DeepEmeralSlime }${ short_number(data.DeepEmeralSlime) }`;
          let DeepMinerZombie_txt = `${ consts.DeepMinerZombie }${ short_number(data.DeepMinerZombie) }`;
          let DeepMinerSkeleton_txt = `${ consts.DeepMinerSkeleton }${ short_number(data.DeepMinerSkeleton) }`;
          Renderer.drawStringWithShadow(`${ DeepSneakyCreeper_txt } \n${ DeepLapisZombie_txt } \n${ DeepRedstonePigman_txt } \n${ DeepEmeraldSlime_txt } \n${ DeepMinerZombie_txt } \n${ DeepMinerSkeleton_txt }`, data.bestiaryX, data.bestiaryY);
        }
      })
    } catch (e) { }
  
    // Dwarven Mines
    try {
      TabList.getNames().forEach(name => {
        if (ChatLib.removeFormatting(name).trim().includes("Area: Dwarven Mines")) {
          let DwarvenGoblin_txt = `${ consts.DwarvenGoblin }${ short_number(data.DwarvenGoblin) }`;
          let DwarvenIceWalker_txt = `${ consts.DwarvenIceWalker }${ short_number(data.DwarvenIceWalker) }`;
          let DwarvenTreasureHoarder_txt = `${ consts.DwarvenTreasureHoarder }${ short_number(data.DwarvenTreasureHoarder) }`;
          let DwarvenGhost_txt = `${ consts.DwarvenGhost }${ short_number(data.DwarvenGhost) }`;
          Renderer.drawStringWithShadow(`${ DwarvenGoblin_txt } \n${ DwarvenIceWalker_txt } \n${ DwarvenTreasureHoarder_txt } \n${ DwarvenGhost_txt }`, data.bestiaryX, data.bestiaryY)
        }
      })
    } catch (e) { }
  
    // Crystal Hollows
    try {
      TabList.getNames().forEach(name => {
        if (ChatLib.removeFormatting(name).trim().includes("Area: Crystal Hollows")) {
          let CHButterfly_txt = `${ consts.CHButterfly }${ short_number(data.CHButterfly) }`;
          let CHAutomaton_txt = `${ consts.CHAutomaton }${ short_number(data.CHAutomaton) }`;
          let CHThyst_txt = `${ consts.CHThyst }${ short_number(data.CHThyst) }`;
          let CHSludge_txt = `${ consts.CHSludge }${ short_number(data.CHSludge) }`;
          let CHGrunt_txt = `${ consts.CHGrunt }${ short_number(data.CHGrunt) }`;
          let CHYog_txt = `${ consts.CHYog }${ short_number(data.CHYog) }`;
          let CHWorm_txt = `${ consts.CHWorm }${ short_number(data.CHWorm) }`;
          Renderer.drawStringWithShadow(`${ CHButterfly_txt } \n${ CHAutomaton_txt } \n${ CHThyst_txt } \n${ CHSludge_txt } \n${ CHGrunt_txt } \n${ CHYog_txt } \n${ CHWorm_txt }`, data.bestiaryX, data.bestiaryY);
        }
      })
    } catch (e) { }
  
    // Park
    try {
      TabList.getNames().forEach(name => {
        if (ChatLib.removeFormatting(name).trim().includes("Area: The Park")) {
          let ParkSoulOfTheAlpha_txt = `${ consts.ParkSoulOfTheAlpha }${ short_number(data.ParkSoulOfTheAlpha) }`;
          let ParkHowlingSpirit_txt = `${ consts.ParkHowlingSpirit }${ short_number(data.ParkHowlingSpirit) }`;
          let ParkPackSpirit_txt = `${ consts.ParkPackSpirit }${ short_number(data.ParkPackSpirit) }`;
          Renderer.drawStringWithShadow(`${ ParkSoulOfTheAlpha_txt } \n${ ParkHowlingSpirit_txt } \n${ ParkPackSpirit_txt }`, data.bestiaryX, data.bestiaryY);
        }
      })
    } catch (e) { }
  
    // Spooky
    try {
      TabList.getNames().forEach(name => {
        if (ChatLib.removeFormatting(name).trim().includes("Event: Spooky Festival") & ChatLib.removeFormatting(name).trim().includes("Area: Hub")) {
          let SpookyHeadlessHorseman_txt = `${ consts.SpookyHeadlessHorseman }${ short_number(data.SpookyHeadlessHorseman) }`;
          let SpookyScaryJerry_txt = `${ consts.SpookyScaryJerry }${ short_number(data.SpookyScaryJerry) }`;
          let SpookyWitherGourd_txt = `${ consts.SpookyWitherGourd}${ short_number(data.SpookyWitherGourd) }`;
          let SpookyCrazyWitch_txt = `${ consts.SpookyCrazyWitch}${ short_number(data.SpookyCrazyWitch) }`;
          let SpookyWraith_txt = `${ consts.SpookyWraith}${ short_number(data.SpookyWraith) }`;
          let SpookyTrickOrTreater_txt = `${ consts.SpookyTrickOrTreater }${ short_number(data.SpookyTrickOrTreater) }`;
          let SpookyPhantomSpirit_txt = `${ consts.SpookyPhantomSpirit }${ short_number(data.SpookyPhantomSpirit) }`;
          Renderer.drawStringWithShadow(`${ SpookyHeadlessHorseman_txt } \n${ SpookyScaryJerry_txt } \n${ SpookyWitherGourd_txt } \n${ SpookyCrazyWitch_txt } \n${ SpookyWraith_txt } \n${ SpookyTrickOrTreater_txt } \n${ SpookyPhantomSpirit_txt }`, data.bestiaryX, data.bestiaryY);
        }
      })
    } catch (e) { }
  
    // Dungeons
    try {
      TabList.getNames().forEach(name => {
        if (ChatLib.removeFormatting(name).trim().includes("Dungeon: Catacombs")) {
          let DungeonLostAdventurer_txt = `${ consts.DungeonLostAdventurer } ${ short_number(data.DungeonLostAdventurer) }`;
          let DungeonAngryArcheologist_txt = `${ consts.DungeonAngryArcheologist }${ short_number(data.DungeonAngryArcheologist) }`;
          let DungeonShadowAssassin_txt = `${ consts.DungeonShadowAssassin }${ short_number(data.DungeonShadowAssassin) }`;
          let DungeonKingMidas_txt = `${ consts.DungeonKingMidas }${ short_number(data.DungeonKingMidas) }`;
          let DungeonUndead_txt = `${ consts.DungeonUndead }${ short_number(data.DungeonUndead) }`;
          let DungeonWithermancer_txt = `${ consts.DungeonWithermancer }${ short_number(data.DungeonWithermancer) }`;
          let DungeonCryptDreadlord_txt = `${ consts.DungeonCryptDreadlord } ${ short_number(data.DungeonCryptDreadlord) }`;
          let DungeonCryptLurker_txt = `${ consts.DungeonCryptLurker }${ short_number(data.DungeonCryptLurker) }`;
          let DungeonCryptSouleater_txt = `${ consts.DungeonCryptSouleater }${ short_number(data.DungeonCryptSouleater) }`;
          let DungeonSuperTankZombie_txt = `${ consts.DungeonSuperTankZombie }${ short_number(data.DungeonSuperTankZombie) }`;
          let DungeonTankZombie_txt = `${ consts.DungeonTankZombie }${ short_number(data.DungeonTankZombie) }`;
          let DungeonZombieCommander_txt = `${ consts.DungeonZombieCommander }${ short_number(data.DungeonZombieCommander) }`;
          let DungeonZombieGrunt_txt = `${ consts.DungeonZombieGrunt }${ short_number(data.DungeonZombieGrunt) }`;
          let DungeonZombieKnight_txt = `${ consts.DungeonZombieKnight } ${ short_number(data.DungeonZombieKnight) }`;
          let DungeonZombieSoldier_txt = `${ consts.DungeonZombieSoldier }${ short_number(data.DungeonZombieSoldier) }`;
          let DungeonUndeadSkeleton_txt = `${ consts.DungeonUndeadSkeleton }${ short_number(data.DungeonUndeadSkeleton) }`;
          let DungeonScaredSkeleton_txt = `${ consts.DungeonScaredSkeleton }${ short_number(data.DungeonScaredSkeleton) }`;
          let DungeonSkeletonGrunt_txt = `${ consts.DungeonSkeletonGrunt }${ short_number(data.DungeonSkeletonGrunt) }`;
          let DungeonSkeletonMaster_txt = `${ consts.DungeonSkeletonMaster }${ short_number(data.DungeonSkeletonMaster) }`;
          let DungeonSkeletonSoldier_txt = `${ consts.DungeonSkeletonSoldier } ${ short_number(data.DungeonSkeletonSoldier) }`;
          let DungeonSkeletor_txt = `${ consts.DungeonSkeletor }${ short_number(data.DungeonSkeletor) }`;
          let DungeonSniper_txt = `${ consts.DungeonSniper }${ short_number(data.DungeonSniper) }`;
          let DungeonSuperArcher_txt = `${ consts.DungeonSuperArcher }${ short_number(data.DungeonSuperArcher) }`;
          let DungeonCellarSpider_txt = `${ consts.DungeonCellarSpider }${ short_number(data.DungeonCellarSpider) }`;
          let DungeonLonelySpider_txt = `${ consts.DungeonLonelySpider }${ short_number(data.DungeonLonelySpider) }`;
          Renderer.drawStringWithShadow(`${ DungeonLostAdventurer_txt } \n${ DungeonAngryArcheologist_txt } \n${ DungeonShadowAssassin_txt } \n${ DungeonKingMidas_txt } \n${ DungeonUndead_txt } \n${ DungeonWithermancer_txt } \n${ DungeonCryptDreadlord_txt } \n${ DungeonCryptLurker_txt } \n${ DungeonCryptSouleater_txt } \n${ DungeonSuperTankZombie_txt } \n${ DungeonTankZombie_txt } \n${ DungeonZombieCommander_txt } \n${ DungeonZombieGrunt_txt } \n${ DungeonZombieKnight_txt } \n${ DungeonZombieSoldier_txt } \n${ DungeonUndeadSkeleton_txt } \n${ DungeonScaredSkeleton_txt } \n${ DungeonSkeletonGrunt_txt } \n${ DungeonSkeletonMaster_txt } \n${ DungeonSkeletonSoldier_txt } \n${ DungeonSkeletor_txt } \n${ DungeonSniper_txt } \n${ DungeonSuperArcher_txt } \n${ DungeonCellarSpider_txt } \n${ DungeonLonelySpider_txt }`, data.bestiaryX, data.bestiaryY);
        }
      })
    } catch (e) { }
  }
})

bestiaryDisplay.registerClicked((x, y, button_num) => {
  data.bestiaryX = x
  data.bestiaryY = y
  data.save();
})

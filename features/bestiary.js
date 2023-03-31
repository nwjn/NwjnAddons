import Settings from "../config";
import { guiShader, alert } from "../utils/functions";
import { data, bestiaryDisplay, consts, short_number } from "../utils/constants";
import axios from "axios"

let bestiaryData = {
mob:[10,15,75,150,250,500,1500,2500,5000,15000,25000,50000,...new Array(42-13).fill(100000)],
boss:[2,3,5,10,10,10,10,25,25,50,50,100,...new Array(42-13).fill(100)],
private:[10,15,75,150,250]};

if (Settings.bestiary) {
  register("step", () => {
    axios.get(`https://api.hypixel.net/skyblock/profiles?key=${ data.api_key }&uuid=${ data.uuid }`)
      .then(res => {
        let profiles = res.data.profiles;
        let [player_id] = Object.keys(profiles[0].members);
        // console.log(player_id)

        let profile = profiles.findIndex((profile) => {
        //   console.log(profile.profile_id)
          return profile.profile_id == player_id;
        });

        let bestiary = profiles[profile].members[player_id].bestiary;
        // console.log(profile)

        TabList.getNames().forEach(name => {
          if (ChatLib.removeFormatting(name).trim().includes("Area: Private Island")) {
            data.IslandZombie = bestiary.kills_family_zombie
            data.IslandSkeleton = bestiary.kills_family_skeleton;
            data.IslandEnderman = bestiary.kills_family_enderman_private;
            data.IslandSlime = bestiary.kills_family_slime;
            data.IslandSpider = bestiary.kills_family_spider;
            data.IslandCaveSpider = bestiary.kills_family_cave_spider;
            data.IslandWitch = bestiary.kills_family_witch;
            data.save();
          }
          if (ChatLib.removeFormatting(name).trim().includes("Area: Hub")) {
            data.HubCryptGhoul = bestiary.kills_family_unburried_zombie;
            data.HubOldWolf = bestiary.kills_family_old_wolf;
            data.HubWolf = bestiary.kills_family_ruin_wolf;
            data.HubZombieVillager = bestiary.kills_family_zombie_villager;
            let lines = Scoreboard.getLines()
            if (ChatLib.removeFormatting(lines).includes("Spooky Festival")) {
              data.SpookyHeadlessHorseman = bestiary.kills_family_headless_horseman
              data.SpookyScaryJerry = bestiary.kills_family_scary_jerry
              data.SpookyWitherGourd = bestiary.kills_family_wither_gourd
              data.SpookyCrazyWitch = bestiary.kills_family_batty_witch
              data.SpookyWraith = bestiary.kills_family_wraith
              data.SpookyTrickOrTreater = bestiary.kills_family_trick_or_treater
              data.SpookyPhantomSpirit = bestiary.kills_family_phantom_spirit
            }
            data.save();
          }
          if (ChatLib.removeFormatting(name).trim().includes("Area: Spider's Den")) {
            data.DenBroodMother = bestiary.kills_family_brood_mother_spider;
            data.DenArachne = bestiary.kills_family_arachne;
            data.DenArachnesBrood = bestiary.kills_family_arachne_brood;
            data.DenArachnesKeeper = bestiary.kills_family_arachne_keeper;
            data.DenRainSlime = bestiary.kills_family_random_slime;
            data.DenGravelSkeleton = bestiary.kills_family_respawning_skeleton;
            data.DenDasherSpider = bestiary.kills_family_dasher_spider;
            data.DenSpiderJockey = bestiary.kills_family_spider_jockey;
            data.DenSplitterSpider = bestiary.kills_family_splitter_spider;
            data.DenVoraciousSpider = bestiary.kills_family_voracious_spider;
            data.DenWeaverSpider = bestiary.kills_family_weaver_spider;
            data.save();
          }
          if (ChatLib.removeFormatting(name).trim().includes("Area: The End")) {
            data.EndDragon = bestiary.kills_family_dragon;
            data.EndEndstoneProtector = bestiary.kills_family_corrupted_protector;
            data.EndVoidlingExtremist = bestiary.kills_family_voidling_extremist;
            data.EndVoidlingFanatic = bestiary.kills_family_voidling_fanatic;
            data.EndZealot = bestiary.kills_family_zealot_enderman;
            data.EndWatcher = bestiary.kills_family_watcher;
            data.EndObsidianDefender = bestiary.kills_family_obsidian_wither;
            data.EndEnderman = bestiary.kills_family_enderman;
            data.EndEndermite = bestiary.kills_family_endermite;
            data.save();
          }
          if (ChatLib.removeFormatting(name).trim().includes("Area: Crimson Isle")) {
            data.IsleMagmaBoss = bestiary.kills_family_magma_boss
            data.IsleMageOutlaw = bestiary.kills_family_mage_outlaw
            data.IsleAshfang = bestiary.kills_family_ashfang
            data.IsleBladesoul = bestiary.kills_family_bladesoul
            data.IsleBarbarianDuke = bestiary.kills_family_barbarian_duke_x
            data.IsleBlaze = bestiary.kills_family_blaze
            data.IsleWitherSpectre = bestiary.kills_family_wither_spectre
            data.IsleWitherSkeleton = bestiary.kills_family_wither_skeleton
            data.IsleFlamingSpider = bestiary.kills_family_flaming_spider
            data.IslePigman = bestiary.kills_family_pigman
            data.IsleMushroomBull = bestiary.kills_family_charging_mushroom_cow
            data.IsleMagmaCube = bestiary.kills_family_magma_cube
            data.IsleGhast = bestiary.kills_family_ghast
            data.IsleMatcho = bestiary.kills_family_matcho
            data.save()
          }
        });
      })
      .catch(err => {
        ChatLib.chat(err)
    }) 
  }).setDelay(10);
}

// Credit: Ghosts for Rendering overlay inspiration
// TODO: Add Bestiary Tiers of the island and divide by ten, put infront of the renderer drawing to show the amount of sb xp/max sb xp from that island
// TODO: make hidden switchproperties and if you select and option then it will reveal them. can select which mobs you want on your gui. For dungeons do for floors not per mob.
register("renderoverlay", () => {
  guiShader()
  if (Settings.bestiary) {
    // Island
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
  // Hub
      if (ChatLib.removeFormatting(name).trim().includes("Area: Hub")) {
        let HubCryptGhoul_txt = `${ consts.HubCryptGhoul }${ short_number(data.HubCryptGhoul) }`;
        let HubOldWolf_txt = `${ consts.HubOldWolf }${ short_number(data.HubOldWolf) }`;
        let HubWolf_txt = `${ consts.HubWolf }${ short_number(data.HubWolf) }`;
        let HubZombieVillager_txt = `${ consts.HubZombieVillager }${ short_number(data.HubZombieVillager) }`;
        let lines = Scoreboard.getLines()
        if (ChatLib.removeFormatting(lines).includes("Spooky Festival")) {
          let SpookyHeadlessHorseman_txt = `${ consts.SpookyHeadlessHorseman }${ short_number(data.SpookyHeadlessHorseman) }`;
          let SpookyScaryJerry_txt = `${ consts.SpookyScaryJerry }${ short_number(data.SpookyScaryJerry) }`;
          let SpookyWitherGourd_txt = `${ consts.SpookyWitherGourd}${ short_number(data.SpookyWitherGourd) }`;
          let SpookyCrazyWitch_txt = `${ consts.SpookyCrazyWitch}${ short_number(data.SpookyCrazyWitch) }`;
          let SpookyWraith_txt = `${ consts.SpookyWraith}${ short_number(data.SpookyWraith) }`;
          let SpookyTrickOrTreater_txt = `${ consts.SpookyTrickOrTreater }${ short_number(data.SpookyTrickOrTreater) }`;
          let SpookyPhantomSpirit_txt = `${ consts.SpookyPhantomSpirit }${ short_number(data.SpookyPhantomSpirit) }`;
          Renderer.drawStringWithShadow(`${ SpookyHeadlessHorseman_txt } \n${ SpookyScaryJerry_txt } \n${ SpookyWitherGourd_txt } \n${ SpookyCrazyWitch_txt } \n${ SpookyWraith_txt } \n${ SpookyTrickOrTreater_txt } \n${ SpookyPhantomSpirit_txt }`, data.bestiaryX, data.bestiaryY);
        }
        else {
          Renderer.drawStringWithShadow(`${ HubCryptGhoul_txt } \n${ HubOldWolf_txt } \n${ HubWolf_txt } \n${ HubZombieVillager_txt }`, data.bestiaryX, data.bestiaryY);
        }
      }
  // Spider's Den
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
  // End
      if (ChatLib.removeFormatting(name).trim().includes("Area: The End")) {
        let EndDragon_txt = `${ consts.EndDragon }${ short_number(data.EndDragon) }`;
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
  // Crimson Isle
      if (ChatLib.removeFormatting(name).trim().includes("Area: Crimson Isle")) {
        let IsleMagmaBoss_txt = `${ consts.IsleMagmaBoss } ${ short_number(data.IsleMagmaBoss) }`;
        let IsleMageOutlaw_txt = `${ consts.IsleMageOutlaw }${ short_number(data.IsleMageOutlaw) }`;
        let IsleAshfang_txt = `${ consts.IsleAshfang }${ short_number(data.IsleAshfang) }`;
        let IsleBladesoul_txt = `${ consts.IsleBladesoul }${ short_number(data.IsleBladesoul) }`;
        let IsleBarbarianDuke_txt = `${ consts.IsleBarbarianDuke }${ short_number(data.IsleBarbarianDuke) }`;
        let IsleBlaze_txt = `${ consts.IsleBlaze }${ short_number(data.IsleBlaze) }`;
        let IsleWitherSpectre_txt = `${ consts.IsleWitherSpectre }${ short_number(data.IsleWitherSpectre) }`;
        let IsleWitherSkeleton_txt = `${ consts.IsleWitherSkeleton } ${ short_number(data.IsleWitherSkeleton) }`;
        let IsleFlamingSpider_txt = `${ consts.IsleFlamingSpider }${ short_number(data.IsleFlamingSpider) }`;
        let IslePigman_txt = `${ consts.IslePigman }${ short_number(data.IslePigman) }`;
        let IsleMushroomBull_txt = `${ consts.IsleMushroomBull }${ short_number(data.IsleMushroomBull) }`;
        let IsleMagmaCube_txt = `${ consts.IsleMagmaCube }${ short_number(data.IsleMagmaCube) }`;
        let IsleGhast_txt = `${ consts.IsleGhast }${ short_number(data.IsleGhast) }`;
        let IsleMatcho_txt = `${ consts.IsleMatcho }${ short_number(data.IsleMatcho) }`;
        Renderer.drawStringWithShadow(`${ IsleMagmaBoss_txt } \n${ IsleMageOutlaw_txt } \n${ IsleAshfang_txt } \n${ IsleBladesoul_txt } \n${ IsleBarbarianDuke_txt } \n${ IsleBlaze_txt } \n${ IsleWitherSpectre_txt } \n${ IsleWitherSkeleton_txt } \n${ IsleFlamingSpider_txt } \n${ IslePigman_txt } \n${ IsleMushroomBull_txt } \n${ IsleMagmaCube_txt } \n${ IsleGhast_txt } \n${ IsleMatcho_txt }`, data.bestiaryX, data.bestiaryY);
      }
  // Deep Caverns
      if (ChatLib.removeFormatting(name).trim().includes("Area: Deep Caverns")) {
        let DeepSneakyCreeper_txt = `${ consts.DeepSneakyCreeper }${ short_number(data.DeepSneakyCreeper) }`;
        let DeepLapisZombie_txt = `${ consts.DeepLapisZombie }${ short_number(data.DeepLapisZombie) }`;
        let DeepRedstonePigman_txt = `${ consts.DeepRedstonePigman }${ short_number(data.DeepRedstonePigman) }`;
        let DeepEmeraldSlime_txt = `${ consts.DeepEmeralSlime }${ short_number(data.DeepEmeralSlime) }`;
        let DeepMinerZombie_txt = `${ consts.DeepMinerZombie }${ short_number(data.DeepMinerZombie) }`;
        let DeepMinerSkeleton_txt = `${ consts.DeepMinerSkeleton }${ short_number(data.DeepMinerSkeleton) }`;
        Renderer.drawStringWithShadow(`${ DeepSneakyCreeper_txt } \n${ DeepLapisZombie_txt } \n${ DeepRedstonePigman_txt } \n${ DeepEmeraldSlime_txt } \n${ DeepMinerZombie_txt } \n${ DeepMinerSkeleton_txt }`, data.bestiaryX, data.bestiaryY);
      }
  // Dwarven Mines
      if (ChatLib.removeFormatting(name).trim().includes("Area: Dwarven Mines")) {
        let DwarvenGoblin_txt = `${ consts.DwarvenGoblin }${ short_number(data.DwarvenGoblin) }`;
        let DwarvenIceWalker_txt = `${ consts.DwarvenIceWalker }${ short_number(data.DwarvenIceWalker) }`;
        let DwarvenTreasureHoarder_txt = `${ consts.DwarvenTreasureHoarder }${ short_number(data.DwarvenTreasureHoarder) }`;
        let DwarvenGhost_txt = `${ consts.DwarvenGhost }${ short_number(data.DwarvenGhost) }`;
        Renderer.drawStringWithShadow(`${ DwarvenGoblin_txt } \n${ DwarvenIceWalker_txt } \n${ DwarvenTreasureHoarder_txt } \n${ DwarvenGhost_txt }`, data.bestiaryX, data.bestiaryY)
      }
  // Crystal Hollows
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
  // Park
      if (ChatLib.removeFormatting(name).trim().includes("Area: The Park")) {
        let ParkSoulOfTheAlpha_txt = `${ consts.ParkSoulOfTheAlpha }${ short_number(data.ParkSoulOfTheAlpha) }`;
        let ParkHowlingSpirit_txt = `${ consts.ParkHowlingSpirit }${ short_number(data.ParkHowlingSpirit) }`;
        let ParkPackSpirit_txt = `${ consts.ParkPackSpirit }${ short_number(data.ParkPackSpirit) }`;
        Renderer.drawStringWithShadow(`${ ParkSoulOfTheAlpha_txt } \n${ ParkHowlingSpirit_txt } \n${ ParkPackSpirit_txt }`, data.bestiaryX, data.bestiaryY);
      }

  // Dungeons
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
  }
})

bestiaryDisplay.registerClicked((x, y, button_num) => {
  data.bestiaryX = x
  data.bestiaryY = y
  data.save();
})

/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../config";
import request from '../../requestV2';
import { data, bestiaryDisplay, PREFIX, short_number } from "../utils/constants";

let tracker = false;

let privateIsland = false;
let hub = false;
let spidersDen = false;
let end = false;
let crimsonIsle = false;
let deepCaverns = false;
let park = false;
let dungeons = false;


// make it so it ticks a little after worldload somehow or
// "just use a tick trigger or something to check the scoreboard and once it's found then set inSkyblock to true or whatever and stop checking until the next worldLoad" - dude from Chattriggers discord]

register("renderoverlay", () => {
  if (Settings.bestiary) {
    if (bestiaryDisplay.isOpen()) {
      const bestiary_txt = "&0&l&kO&r &6&lClick anywhere to move and press ESC to save!&r &0&l&kO&r";
      Renderer.drawStringWithShadow(bestiary_txt, Renderer.screen.getWidth() / 2 - Renderer.getStringWidth(bestiary_txt) / 2, Renderer.screen.getHeight() / 2);
    }
    // Island
    try {
      TabList.getNames().forEach(name => {
        if (ChatLib.removeFormatting(name).trim().includes("Area: Private Island")) {
          let IslandZombie_txt = `&a&lZombie:&f ${ short_number(data.IslandZombie) }`;
          let IslandSkeleton_txt = `&a&lSkeleton:&f ${ short_number(data.IslandSkeleton) }`;
          let IslandEnderman_txt = `&a&lEnderman:&f ${ short_number(data.IslandEnderman) }`;
          let IslandSlime_txt = `&a&lSlime:&f ${ short_number(data.IslandSlime) }`;
          let IslandSpider_txt = `&a&lSpider:&f ${ short_number(data.IslandSpider) }`;
          let IslandCaveSpider_txt = `&a&lCave Spider:&f ${ short_number(data.IslandCaveSpider) }`;
          let IslandWitch_txt = `&a&lWitch:&f ${ short_number(data.IslandWitch) }`;
          Renderer.drawStringWithShadow(`${ IslandZombie_txt } \n${ IslandSkeleton_txt } \n${ IslandEnderman_txt } \n${ IslandSlime_txt } \n${ IslandSpider_txt } \n${ IslandCaveSpider_txt } \n${ IslandWitch_txt }`, data.bestiaryX, data.bestiaryY);
        }
      })
    } catch (e) { }
  
    // Hub
    try {
      TabList.getNames().forEach(name => {
        if (ChatLib.removeFormatting(name).trim().includes("Area: Hub")) {
          let HubCryptGhoul_txt = `&a&lCrypt Ghoul:&f ${ short_number(data.HubCryptGhoul) }`;
          let HubOldWolf_txt = `&a&lOld Wolf:&f ${ short_number(data.HubOldWolf) }`;
          let HubWolf_txt = `&a&lWolf:&f ${ short_number(data.HubWolf) }`;
          let HubZombieVillager_txt = `&a&lZombie Villager:&f ${ short_number(data.HubZombieVillager) }`;
          Renderer.drawStringWithShadow(`${ HubCryptGhoul_txt } \n${HubOldWolf_txt} \n${HubWolf_txt} \n${HubZombieVillager_txt}`, data.bestiaryX, data.bestiaryY)
        }
      }) 
    } catch (e) { }
  
    // Spider's Den
    try {
      TabList.getNames().forEach(name => {
        if (ChatLib.removeFormatting(name).trim().includes("Area: Spider's Den")) {
          let DenBroodMother_txt = `&c&lBroodmother:&f ${ short_number(data.DenBroodMother) }`;
          let DenArachne_txt = `&c&lArachne:&f ${ short_number(data.DenArachne) }`;
          let DenArachnesBrood_txt = `&a&lArachne's Brood:&f ${ short_number(data.DenArachnesBrood) }`;
          let DenArachnesKeeper_txt = `&a&lArachne's Keeper:&f ${ short_number(data.DenArachnesKeeper) }`;
          let DenRainSlime_txt = `&a&lRain Slime:&f ${ short_number(data.DenRainSlime) }`;
          let DenGravelSkeleton_txt = `&a&lGravel Skeleton:&f ${ short_number(data.DenGravelSkeleton) }`;
          let DenDasherSpider_txt = `&a&lDasher Spider:&f ${ short_number(data.DenDasherSpider) }`;
          let DenSpiderJockey_txt = `&a&lSpider Jockey:&f ${ short_number(data.DenSpiderJockey) }`;
          let DenSplitterSpider_txt = `&a&lSplitter Spider:&f ${ short_number(data.DenSplitterSpider) }`;
          let DenVoraciousSpider_txt = `&a&lVoracious Spider:&f ${ short_number(data.DenVoraciousSpider) }`;
          let DenWeaverSpider_txt = `&a&lWeaver Spider:&f ${ short_number(data.DenWeaverSpider) }`;
          Renderer.drawStringWithShadow(`${ DenBroodMother_txt } \n${ DenArachne_txt } \n${ DenArachnesBrood_txt } \n${ DenArachnesKeeper_txt } \n${ DenRainSlime_txt } \n${ DenGravelSkeleton_txt } \n${ DenDasherSpider_txt } \n${ DenSpiderJockey_txt } \n${ DenSplitterSpider_txt } \n${ DenVoraciousSpider_txt } \n${ DenWeaverSpider_txt }`, data.bestiaryX, data.bestiaryY);
        }
      })
    } catch (e) { }
  
    // End
    try {
      TabList.getNames().forEach(name => {
        if (ChatLib.removeFormatting(name).trim().includes("Area: The End")) {
          let EndDragon_txt = `&5&lDragon:&f ${ short_number(data.EndDragon) }`;
          let EndEndstoneProtector_txt = `&5&lEndstone Protector:&f ${ short_number(data.EndEndstoneProtector) }`;
          let EndVoidlingExtremist_txt = `&d&lVoidling Extremist:&f ${ short_number(data.EndVoidlingExtremist) }`;
          let EndVoidlingFanatic_txt = `&a&lVoidling Fanatic:&f ${ short_number(data.EndVoidlingFanatic) }`;
          let EndZealot_txt = `&a&lZealot:&f ${ short_number(data.EndZealot) }`;
          let EndWatcher_txt = `&a&lWatcher:&f ${ short_number(data.EndWatcher) }`;
          let EndObsidianDefender_txt = `&a&lObsidian Defender:&f ${ short_number(data.EndObsidianDefender) }`;
          let EndEnderman_txt = `&a&lEnderman:&f ${ short_number(data.EndEnderman) }`;
          let EndEndermite_txt = `&a&lEndermite:&f ${ short_number(data.EndEndermite) }`;
          Renderer.drawStringWithShadow(`${ EndDragon_txt } \n${ EndEndstoneProtector_txt } \n${ EndVoidlingExtremist_txt } \n${ EndVoidlingFanatic_txt } \n${ EndZealot_txt } \n${ EndWatcher_txt } \n${ EndObsidianDefender_txt } \n${ EndEnderman_txt } \n${ EndEndermite_txt }`, data.bestiaryX, data.bestiaryY);
        }
      });
    } catch (e) { }
  
    // Crimson Isle
    try {
      TabList.getNames().forEach(name => {
        if (ChatLib.removeFormatting(name).trim().includes("Area: Crimson Isle")) {
          let IsleMagmaBoss_txt = `&4&lMagma Boss:&f ${ short_number(data.IsleMagmaBoss) }`;
          let IsleMageOutlaw_txt = `&5&lMage Outlaw:&f ${ short_number(data.IsleMageOutlaw) }`;
          let IsleAshfang_txt = `&8&lAshfang:&f ${ short_number(data.IsleAshfang) }`;
          let IsleBladesoul_txt = `&8&lBladesoul:&f ${ short_number(data.IsleBladesoul) }`;
          let IsleBarbarianDuke_txt = `&8&lBarbarian Duke:&f ${ short_number(data.IsleBarbarianDuke) }`;
          let IsleWitherSpectre_txt = `&a&lWither Spectre:&f ${ short_number(data.IsleWitherSpectre) }`;
          let IsleWitherSkeleton_txt = `&a&lWither Skeleton:&f ${ short_number(data.IsleWitherSkeleton) }`;
          let IsleFlamingSpider_txt = `&a&lFlaming Spider:&f ${ short_number(data.IsleFlamingSpider) }`;
          let IslePigman_txt = `&a&lPigman:&f ${ short_number(data.IslePigman) }`;
          let IsleMushroomBull_txt = `&a&Mushroom Bull:&f ${ short_number(data.IsleMushroomBull) }`;
          let IsleMagmaCube_txt = `&a&lMagma Cube:&f ${ short_number(data.IsleMagmaCube) }`;
          let IsleGhast_txt = `&a&lGhast:&f ${ short_number(data.IsleGhast) }`;
          let IsleMatcho_txt = `&a&lMatcho:&f ${ short_number(data.IsleMatcho) }`;
          Renderer.drawStringWithShadow(`${ IsleMagmaBoss_txt } \n${ IsleMageOutlaw_txt } \n${ IsleAshfang_txt } \n${ IsleBladesoul_txt } \n${ IsleBarbarianDuke_txt } \n${ IsleWitherSpectre_txt } \n${ IsleWitherSkeleton_txt } \n${ IsleFlamingSpider_txt } \n${ IslePigman_txt } \n${ IsleMushroomBull_txt } \n${ IsleMagmaCube_txt } \n${ IsleGhast_txt } \n${ IsleMatcho_txt }`, data.bestiaryX, data.bestiaryY);
        }
      })
    } catch (e) { }
    
    // Deep Caverns
    try {
      TabList.getNames().forEach(name => {
        if (ChatLib.removeFormatting(name).trim().includes("Area: Deep Caverns")) {
          let DeepSneakyCreeper_txt = `&a&lSneaky Creeper:&f ${ short_number(data.DeepSneakyCreeper) }`;
          let DeepLapisZombie_txt = `&a&lLapis Zombie:&f ${ short_number(data.DeepLapisZombie) }`;
          let DeepRedstonePigman_txt = `&a&lRedstone Pigman:&f ${ short_number(data.DeepRedstonePigman) }`;
          let DeepEmeraldSlime_txt = `&a&lEmerald Slime:&f ${ short_number(data.DeepEmeralSlime) }`;
          let DeepMinerZombie_txt = `&a&lMiner Zombie:&f ${ short_number(data.DeepMinerZombie) }`;
          let DeepMinerSkeleton_txt = `&a&lMiner Skeleton:&f ${ short_number(data.DeepMinerSkeleton) }`;
          Renderer.drawStringWithShadow(`${ DeepSneakyCreeper_txt } \n${ DeepLapisZombie_txt } \n${ DeepRedstonePigman_txt } \n${ DeepEmeraldSlime_txt } \n${ DeepMinerZombie_txt } \n${ DeepMinerSkeleton_txt }`, data.bestiaryX, data.bestiaryY);
        }
      })
    } catch (e) { }
  
    // Dwarven Mines
    try {
      TabList.getNames().forEach(name => {
        if (ChatLib.removeFormatting(name).trim().includes("Area: Dwarven Mines")) {
          let DwarvenGoblin_txt = `&a&lGoblin:&f ${ short_number(data.DwarvenGoblin) }`;
          let DwarvenIceWalker_txt = `&a&lIce Walker:&f ${ short_number(data.DwarvenIceWalker) }`;
          let DwarvenTreasureHoarder_txt = `&a&lTreasure Hoarder:&f ${ short_number(data.DwarvenTreasureHoarder) }`;
          let DwarvenGhost_txt = `&a&lGhost:&f ${ short_number(data.DwarvenGhost) }`;
          Renderer.drawStringWithShadow(`${ DwarvenGoblin_txt } \n${ DwarvenIceWalker_txt } \n${ DwarvenTreasureHoarder_txt } \n${ DwarvenGhost_txt }`, data.bestiaryX, data.bestiaryY)
        }
      })
    } catch (e) { }
  
    // Crystal Hollows
    try {
      TabList.getNames().forEach(name => {
        if (ChatLib.removeFormatting(name).trim().includes("Area: Crystal Hollows")) {
          let CHButterfly_txt = `&e&lButterfly:&f ${ short_number(data.CHButterfly) }`;
          let CHAutomaton_txt = `&a&lAutomaton:&f ${ short_number(data.CHAutomaton) }`;
          let CHThyst_txt = `&a&lThyst:&f ${ short_number(data.CHThyst) }`;
          let CHSludge_txt = `&a&lSludge:&f ${ short_number(data.CHSludge) }`;
          let CHGrunt_txt = `&a&lGrunt:&f ${ short_number(data.CHGrunt) }`;
          let CHYog_txt = `&a&lYog:&f ${ short_number(data.CHYog) }`;
          let CHWorm_txt = `&a&lWorm:&f ${ short_number(data.CHWorm) }`;
          Renderer.drawStringWithShadow(`${ CHButterfly_txt } \n${ CHAutomaton_txt } \n${ CHThyst_txt } \n${ CHSludge_txt } \n${ CHGrunt_txt } \n${ CHYog_txt } \n${ CHWorm_txt }`, data.bestiaryX, data.bestiaryY);
        }
      })
    } catch (e) { }
  
    // Park
    try {
      TabList.getNames().forEach(name => {
        if (ChatLib.removeFormatting(name).trim().includes("Area: The Park")) {
          let ParkSoulOfTheAlpha_txt = `&3&lSoul of the Alpha:&f ${ short_number(data.ParkSoulOfTheAlpha) }`;
          let ParkHowlingSpirit_txt = `&b&lHowling Spirit:&f ${ short_number(data.ParkHowlingSpirit) }`;
          let ParkPackSpirit_txt = `&b&lPack Spirit:&f ${ short_number(data.ParkPackSpirit) }`;
          Renderer.drawStringWithShadow(`${ ParkSoulOfTheAlpha_txt } \n${ ParkHowlingSpirit_txt } \n${ ParkPackSpirit_txt }`, data.bestiaryX, data.bestiaryY);
        }
      })
    } catch (e) { }
  
    // Spooky
    try {
      TabList.getNames().forEach(name => {
        if (ChatLib.removeFormatting(name).trim().includes("Event: Spooky Festival") & ChatLib.removeFormatting(name).trim().includes("Area: Hub")) {
          let SpookyHeadlessHorseman_txt = `&6&lHeadless Horseman:&f ${ short_number(data.SpookyHeadlessHorseman) }`;
          let SpookyScaryJerry_txt = `&6&lScary Jerry:&f ${ short_number(data.SpookyScaryJerry) }`;
          let SpookyWitherGourd_txt = `&6&lWither Gourd:&f ${ short_number(data.SpookyWitherGourd) }`;
          let SpookyCrazyWitch_txt = `&8&lCrazy Witch:&f ${ short_number(data.SpookyCrazyWitch) }`;
          let SpookyWraith_txt = `&8&lWraith:&f ${ short_number(data.SpookyWraith) }`;
          let SpookyTrickOrTreater_txt = `&e&lTrick or Treater:&f ${ short_number(data.SpookyTrickOrTreater) }`;
          let SpookyPhantomSpirit_txt = `&c&lPhantomSpirit:&f ${ short_number(data.SpookyPhantomSpirit) }`;
          Renderer.drawStringWithShadow(`${ SpookyHeadlessHorseman_txt } \n${ SpookyScaryJerry_txt } \n${ SpookyWitherGourd_txt } \n${ SpookyCrazyWitch_txt } \n${ SpookyWraith_txt } \n${ SpookyTrickOrTreater_txt } \n${ SpookyPhantomSpirit_txt }`, data.bestiaryX, data.bestiaryY);
        }
      })
    } catch (e) { }
  
    // Dungeons
    try {
      TabList.getNames().forEach(name => {
        if (ChatLib.removeFormatting(name).trim().includes("Dungeon: Catacombs")) {
  
        }
      })
    } catch (e) { }
  }
})

register("dragged", (dx, dy, x, y) => {
  if (!bestiaryDisplay.isOpen()) return
    data.bestiaryX = x
    data.bestiaryY = y
    data.save()
});

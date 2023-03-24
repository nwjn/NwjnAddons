/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../config";
import bestiary from "../utils/api";

// mobs
const IslandCaveSpider = bestiary.IslandCaveSpider;
const IslandEnderman = bestiary.IslandEnderman;
const IslandSkeleton = bestiary.IslandSkeleton;
const IslandSlime = bestiary.IslandSlime;
const IslandSpider = bestiary.IslandSpider;
const IslandWitch = bestiary.IslandWitch;
const IslandZombie = bestiary.IslandZombie;
const HubCryptGhoul = bestiary.HubCryptGhoul;
const HubOldWolf = bestiary.HubOldWolf;
const HubWolf = bestiary.HubWolf;
const HubZombieVillager = bestiary.HubZombieVillager;
const DenArachnesBrood = bestiary.DenArachnesBrood;
const DenArachnesKeeper = bestiary.DenArachnesKeeper
const DenDasherSpider = bestiary.DenDasherSpider;
const DenGravelSkeleton = bestiary.DenGravelSkeleton;
const DenRainSlime = bestiary.DenRainSlime;
const DenSpiderJockey = bestiary.DenSpiderJockey;
const DenSpliiterSpider = bestiary.DenSpliiterSpider;
const DenVoraciousSpider = bestiary.DenVoraciousSpider;
const DenWeaverSpider = bestiary.DenWeaverSpider;
const EndEnderman = bestiary.EndEnderman;
const EndEndermite = bestiary.EndEndermite;
const EndObsidianDefender = bestiary.EndObsidianDefender;
const EndVoidlingExtremist = bestiary.EndVoidlingExtremist;
const EndVoidlingFanatic = bestiary.EndVoidlingFanatic;
const EndWatcher = bestiary.EndWatcher;
const EndZealot = bestiary.EndZealot;
const IsleBlaze = bestiary.IsleBlaze;
const IsleFlamingSpider = bestiary.IsleFlamingSpider;
const IsleGhast = bestiary.IsleGhast
const IsleMagmaCube = bestiary.IsleMagmaCube;
const IsleMatcho = bestiary.IsleMatcho;
const IsleMushroomBull = bestiary.IsleMushroomBull;
const IslePigman = bestiary.IslePigman;
const IsleWitherSkeleton = bestiary.IsleWitherSkeleton;
const IsleWitherSpectre = bestiary.IsleWitherSpectre;
const DeepSneakyCreeper = bestiary.DeepSneakyCreeper;
const DeepLapisZombie = bestiary.DeepLapisZombie;
const DeepRedstonePigman = bestiary.DeepRedstonePigman;
const DeepEmeralSlime = bestiary.DeepEmeralSlime;
const DeepMinerZombie = bestiary.DeepMinerZombie;
const DeepMinerSkeleton = bestiary.DeepMinerSkeleton;
const DwarvenGoblin = bestiary.DwarvenGoblin;
const DwarvenIceWalker = bestiary.DwarvenIceWalker;
const DwarvenTreasureHoarder = bestiary.DwarvenTreasureHoarder;
const DwarvenGhost = bestiary.DwarvenGhost;
const CHAutomaton = bestiary.CHAutomaton;
const CHButterfly = bestiary.CHButterfly;
const CHGrunt = bestiary.CHGrunt;
const CHSludge = bestiary.CHSludge;
const CHThyst = bestiary.CHThyst;
const CHWorm = bestiary.CHWorm;
const CHYog = bestiary.CHYog;
const ParkHowlingSpirit = bestiary.ParkHowlingSpirit;
const ParkPackSpirit = bestiary.ParkPackSpirit
const ParkSoulOfTheAlpha = bestiary.ParkSoulOfTheAlpha;
const SpookyCrazyWitch = bestiary.SpookyCrazyWitch;
const SpookyPhantomSpirit = bestiary.SpookyPhantomSpirit;
const SpookyScaryJerry = bestiary.SpookyScaryJerry;
const SpookyTrickOrTreater = bestiary.SpookyTrickOrTreater;
const SpookyWitherGourd = bestiary.SpookyWitherGourd;
const SpookyWraith = bestiary.SpookyWraith;



// bosses
const DenArachne = bestiary.DenArachne;
const DenBroodMother = bestiary.DenBroodMother;
const EndDragon = bestiary.EndDragon;
const EndEndstoneProtector = bestiary.EndEndstoneProtector;
const IsleAshfang = bestiary.IsleAshfang;
const IsleBladesoul = bestiary.IsleBladesoul;
const IsleMageOutlaw = bestiary.IsleMageOutlaw;
const IsleBarbarianDuke = bestiary.IsleBarbarianDuke;
const IsleMagmaBoss = bestiary.IsleMagmaBoss;
const SpookyHeadlessHorseman = bestiary.SpookyHeadlessHorseman;

const bestiaryDisplay = new Display();
bestiaryDisplay.setAlign("left")

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

register("worldload", () => {
  bestiaryDisplay.clearLines()
})

register("step", () => {
  // Island
  try {
		TabList.getNames().forEach(name => {
      if (ChatLib.removeFormatting(name).trim().includes("Area: Private Island")) {
        bestiaryDisplay.setLine(1, ` &a&lZombie:&f ${ IslandZombie }`)
        bestiaryDisplay.setLine(2, ` &a&lSkeleton:&f ${ IslandSkeleton }`)
        bestiaryDisplay.setLine(3, ` &a&lEnderman:&f ${ IslandEnderman }`)
        bestiaryDisplay.setLine(4, ` &a&lSlime:&f ${ IslandSlime }`)
        bestiaryDisplay.setLine(5, ` &a&lSpider:&f ${ IslandSpider }`)
        bestiaryDisplay.setLine(6, ` &a&lCaveSpider:&f ${ IslandCaveSpider }`)
        bestiaryDisplay.setLine(7, ` &a&lWitch:&f ${ IslandWitch }`)
			}
		})
  } catch (e) { }

  // Hub
  try {
    TabList.getNames().forEach(name => {
      if (ChatLib.removeFormatting(name).trim().includes("Area: Hub")) {
        bestiaryDisplay.setLine(1, ` &a&lCrypt Ghoul:&f ${ HubCryptGhoul }`);
        bestiaryDisplay.setLine(2, ` &a&lOld Wolf:&f ${ HubOldWolf }`);
        bestiaryDisplay.setLine(3, ` &a&lWolf:&f ${ HubWolf }`);
        bestiaryDisplay.setLine(4, ` &a&lZombie Villager:&f ${ HubZombieVillager }`);
      }
    }) 
  } catch (e) { }

  // Spider's Den
  try {
		TabList.getNames().forEach(name => {
			if (ChatLib.removeFormatting(name).trim().includes("Area: Spider's Den")) {
        bestiaryDisplay.setLine(1, ` &c&lBroodmother:&f ${ DenBroodMother }`)
        bestiaryDisplay.setLine(2, ` &c&lArachne:&f ${ DenArachne }`)
        bestiaryDisplay.setLine(3, ` &a&lArachne's Brood:&f ${ DenArachnesBrood }`)
        bestiaryDisplay.setLine(4, ` &a&lArachne's Keeper:&f ${ DenArachnesKeeper }`)
        bestiaryDisplay.setLine(5, ` &a&lRain Slime:&f ${ DenRainSlime }`)
        bestiaryDisplay.setLine(6, ` &a&lGravel Skeleton:&f ${ DenGravelSkeleton }`)
        bestiaryDisplay.setLine(7, ` &a&lDasher Spider:&f ${ DenDasherSpider }`)
        bestiaryDisplay.setLine(8, ` &a&lSpider Jockey:&f ${ DenSpiderJockey }`)
        bestiaryDisplay.setLine(9, ` &a&lSplitter Spider:&f ${ DenSpliiterSpider }`)
        bestiaryDisplay.setLine(10, ` &a&lVoracious Spider:&f ${ DenVoraciousSpider }`)
        bestiaryDisplay.setLine(11, ` &a&lWeaver Spider:&f ${ DenWeaverSpider }`)
			}
		})
  } catch (e) { }

  // End
  try {
    TabList.getNames().forEach(name => {
      if (ChatLib.removeFormatting(name).trim().includes("Area: Spider's Den")) {
        bestiaryDisplay.setLine(1, ` &5&lDragon:&f ${ EndDragon }`);
        bestiaryDisplay.setLine(2, ` &5&lEndstone Protector:&f ${ EndEndstoneProtector }`);
        bestiaryDisplay.setLine(3, ` &d&lVoidling Extremist:&f ${ EndVoidlingExtremist }`);
        bestiaryDisplay.setLine(4, ` &a&lVoidling Fanatic:&f ${ EndVoidlingFanatic }`);
        bestiaryDisplay.setLine(5, ` &a&lZealot:&f ${ EndZealot }`);
        bestiaryDisplay.setLine(6, ` &a&lWatcher:&f ${ EndWatcher }`);
        bestiaryDisplay.setLine(7, ` &a&lObsidian Defender:&f ${ EndObsidianDefender }`);
        bestiaryDisplay.setLine(8, ` &a&lEnderman:&f ${ EndEnderman }`);
        bestiaryDisplay.setLine(9, ` &a&lEndermite:&f ${ EndEndermite }`);
      }
    });
  } catch (e) { }

  // Crimson Isle
  try {
		TabList.getNames().forEach(name => {
			if (ChatLib.removeFormatting(name).trim().includes("Area: Crimson Isle")) {
        crimsonIsle = true
        // Ashfang V: 0/10
        bestiaryDisplay.setLine(1, ` &4&lMagma Boss:&f ${ IsleMagmaBoss }`)
        bestiaryDisplay.setLine(2, ` &5&lMage Outlaw:&f ${ IsleMageOutlaw }`)
        bestiaryDisplay.setLine(3, ` &8&lAshfang:&f  ${ IsleAshfang }`)
        bestiaryDisplay.setLine(4, ` &8&lBladesoul:&f ${ IsleBladesoul }`)
        bestiaryDisplay.setLine(5, ` &8&lBarbarian Duke X:&f ${ IsleBarbarianDuke }`)
        bestiaryDisplay.setLine(6, ` &a&lWither Spectre:&f ${ IsleWitherSpectre }`)
        bestiaryDisplay.setLine(7, ` &a&lWither Skeleton:&f ${ IsleWitherSkeleton }`)
        bestiaryDisplay.setLine(8, ` &a&lFlaming Spider:&f ${ IsleFlamingSpider }`)
        bestiaryDisplay.setLine(9, ` &a&lPigman:&f ${ IslePigman }`)
        bestiaryDisplay.setLine(10, ` &a&lMushroom Bull:&f ${ IsleMushroomBull }`)
        bestiaryDisplay.setLine(11, ` &a&lMagma Cube:&f ${ IsleMagmaCube }`)
        bestiaryDisplay.setLine(12, ` &a&lGhast:&f ${ IsleGhast }`)
        bestiaryDisplay.setLine(13, ` &a&lMatcho:&f ${ IsleMatcho }`)
			}
		})
  } catch (e) { }
  
  // Deep Caverns
  try {
    TabList.getNames().forEach(name => {
      if (ChatLib.removeFormatting(name).trim().includes("Area: Deep Caverns")) {
        bestiaryDisplay.setLine(1, ` &a&lSneaky Creeper:&f ${ DeepSneakyCreeper }`);
        bestiaryDisplay.setLine(2, ` &a&lLapis Zombier:&f ${ DeepLapisZombie }`);
        bestiaryDisplay.setLine(3, ` &a&lRedstone Pigman:&f ${ DeepRedstonePigman }`);
        bestiaryDisplay.setLine(4, ` &a&lEmerald Slime:&f ${ DeepEmeralSlime }`);
        bestiaryDisplay.setLine(5, ` &a&lMiner Zombie:&f ${ DeepMinerZombie }`);
        bestiaryDisplay.setLine(6, ` &a&lMiner Skeleton:&f ${ DeepMinerSkeleton }`);
      }
    })
  } catch (e) { }

  // Dwarven Mines
  try {
    TabList.getNames().forEach(name => {
      if (ChatLib.removeFormatting(name).trim().includes("Area: Dwarven Mines")) {
        bestiaryDisplay.setLine(1, ` &a&lGoblin:&f ${ DwarvenGoblin }`);
        bestiaryDisplay.setLine(2, ` &a&lIce Walker:&f ${ DwarvenIceWalker }`);
        bestiaryDisplay.setLine(3, ` &a&lTreasure Hoarder:&f ${ DwarvenTreasureHoarder }`);
        bestiaryDisplay.setLine(4, ` &a&lGhost:&f ${ DwarvenGhost }`);
      }
    })
  } catch (e) { }

  // Crystal Hollows
  try {
    TabList.getNames().forEach(name => {
      if (ChatLib.removeFormatting(name).trim().includes("Area: Crystal Hollows")) {
        bestiaryDisplay.setLine(1, ` &e&lButterfly:&f ${ CHButterfly }`);
        bestiaryDisplay.setLine(2, ` &a&lAutomaton:&f ${ CHAutomaton }`);
        bestiaryDisplay.setLine(3, ` &a&lThyst:&f ${ CHThyst }`);
        bestiaryDisplay.setLine(4, ` &a&lSludge:&f ${ CHSludge }`);
        bestiaryDisplay.setLine(5, ` &a&lGrunt:&f ${ CHButterfly }`);
        bestiaryDisplay.setLine(6, ` &a&lYog:&f ${ CHYog }`);
        bestiaryDisplay.setLine(7, ` &a&lWorm:&f ${ Dee }`);
        bestiaryDisplay.setLine(8, ` &a&lEnderman:&f ${ CHWorm }`);
      }
    })
  } catch (e) { }

  // Park
  try {
    TabList.getNames().forEach(name => {
      if (ChatLib.removeFormatting(name).trim().includes("Area: The Park")) {
        bestiaryDisplay.setLine(1, ` &3&lSoul of the Alpha: &f ${ ParkSoulOfTheAlpha }`)
        bestiaryDisplay.setLine(2, ` &b&lHowling Spirit:&f ${ ParkHowlingSpirit }`)
        bestiaryDisplay.setLine(3, ` &b&lPack Spirit:&f ${ ParkPackSpirit }`)
      }
    })
  } catch (e) { }

  // Spooky
  try {
    TabList.getNames().forEach(name => {
      if (ChatLib.removeFormatting(name).trim().includes("Event: Spooky Festival")) {
        bestiaryDisplay.setLine(5, ` &6&lHeadless Horseman:&f ${ SpookyHeadlessHorseman }`);
        bestiaryDisplay.setLine(6, ` &6&lScary Jerry:&f ${ SpookyScaryJerry }`)
        bestiaryDisplay.setLine(7, ` &6&lWither Gourd:&f ${ SpookyWitherGourd }`)
        bestiaryDisplay.setLine(8, ` &8&lCrazy Witch:&f ${ SpookyCrazyWitch }`)
        bestiaryDisplay.setLine(9, ` &8&lWraith:&f ${ SpookyWraith }`)
        bestiaryDisplay.setLine(10, ` &e&lTrick or Treater:&f ${ SpookyTrickOrTreater }`)
        bestiaryDisplay.setLine(11, ` &c&lPhantom Spirit:&f ${ SpookyPhantomSpirit }`)
      }
    })
  } catch (e) { }
}).setDelay(2);

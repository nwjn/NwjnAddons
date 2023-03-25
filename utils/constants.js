/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import PogObject from "PogData"

export const PREFIX = "&d&l[NwjnAddons] ";
export const WIP = "&cThis feature is still in development!"
export const short_number = (num) => {
    if(num == undefined) return;
    return num.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
export let bestiaryDisplay = new Gui()
export let statsDisplay = new Gui()


export let data = new PogObject("NwjnAddons", {
  "api_key": "",
  "first_time": true,
  "bestiaryX": 0,
  "bestiaryY": 0,
  
  "bestiaryTier": 0,
  // Island
  "IslandCaveSpider": 0, "IslandEnderman": 0, "IslandSkeleton": 0, "IslandSlime": 0, "IslandSpider": 0, "IslandWitch": 0, "IslandZombie": 0,

  // Hub 
  "HubCryptGhoul": 0, "HubOldWolf": 0, "HubWolf": 0, "HubZombieVillager": 0,

  // Spider's Den
  "DenArachne": 0, "DenArachnesBrood": 0, "DenArachnesKeeper": 0, "DenBroodMother": 0, "DenDasherSpider": 0, "DenGravelSkeleton": 0, "DenRainSlime": 0, "DenSpiderJockey": 0, "DenSplitterSpider": 0, "DenVoraciousSpider": 0, "DenWeaverSpider": 0,

  // End
  "EndDragon": 0, "EndEnderman": 0, "EndEndermite": 0, "EndEndstoneProtector": 0, "EndObsidianDefender": 0, "EndVoidlingExtremist": 0, "EndVoidlingFanatic": 0, "EndWatcher": 0, "EndZealot": 0,

  // Crimson Isle
  "IsleAshfang": 0, "IsleBarbarianDuke": 0, "IsleBladesoul": 0, "IsleBlaze": 0, "IsleFlamingSpider": 0, "IsleGhast": 0, "IsleMageOutlaw": 0, "IsleMagmaBoss": 0, "IsleMagmaCube": 0, "IsleMatcho": 0, "IsleMushroomBull": 0, "IslePigman": 0, "IsleWitherSkeleton": 0, "IsleWitherSpectre": 0,

  // Deep Caverns
  "DeepEmeralSlime": 0, "DeepLapisZombie": 0, "DeepMinerSkeleton": 0, "DeepMinerZombie": 0, "DeepRedstonePigman": 0, "DeepSneakyCreeper": 0,

  // Dwarven Mines
  "DwarvenGhost": 0, "DwarvenGoblin": 0, "DwarvenIceWalker": 0, "DwarvenTreasureHoarder": 0,

  // Crystal Hollows
  "CHAutomaton": 0, "CHButterfly": 0, "CHGrunt": 0, "CHSludge": 0, "CHThyst": 0, "CHWorm": 0, "CHYog": 0,

  // Park
  "ParkHowlingSpirit": 0, "ParkPackSpirit": 0, "ParkSoulOfTheAlpha": 0, 

  // Spooky
  "SpookyCrazyWitch": 0, "SpookyHeadlessHorseman": 0, "SpookyPhantomSpirit": 0, "SpookyScaryJerry": 0, "SpookyTrickOrTreater": 0, "SpookyWitherGourd": 0, "SpookyWraith": 0,

  // Catacombs
  "DungeonAngryArcheologist": 0, "DungeonCellarSpider": 0, "DungeonCryptDreadlord": 0, "DungeonCryptLurker": 0, "DungeonCryptSouleater": 0, "DungeonKingMidas": 0, "DungeonLonelySpider": 0, "DungeonLostAdventurer": 0, "DungeonScaredSkeleton": 0, "DungeonShadowAssassin": 0, "DungeonSkeletonGrunt": 0, "DungeonSkeletonMaster": 0, "DungeonSkeletonSoldier": 0, "DungeonSkeletor": 0, "DungeonSniper": 0, "DungeonSuperArcher": 0, "DungeonSuperTankZombie": 0, "DungeonTankZombie": 0, "DungeonUndead": 0, "DungeonUndeadSkeleton": 0, "DungeonWithermancer": 0, "DungeonZombieCommander": 0, "DungeonZombieGrunt": 0, "DungeonZombieKnight": 0, "DungeonZombieSoldier": 0,

  "statsX": 0, "statsY": 0,
  "Speed": 0, "Strength": 0, "CritChance": 0, "CritDamage": 0, "AttackSpeed": 0
}, "data.json")

// // mobs
// export const IslandCaveSpider = data.IslandCaveSpider;
// export const IslandEnderman = data.IslandEnderman;
// export const IslandSkeleton = data.IslandSkeleton;
// export const IslandSlime = data.IslandSlime;
// export const IslandSpider = data.IslandSpider;
// export const IslandWitch = data.IslandWitch;
// export const IslandZombie = data.IslandZombie;
// export const HubCryptGhoul = data.HubCryptGhoul;
// export const HubOldWolf = data.HubOldWolf;
// export const HubWolf = data.HubWolf;
// export const HubZombieVillager = data.HubZombieVillager;
// export const DenArachnesBrood = data.DenArachnesBrood;
// export const DenArachnesKeeper = data.DenArachnesKeeper
// export const DenDasherSpider = data.DenDasherSpider;
// export const DenGravelSkeleton = data.DenGravelSkeleton;
// export const DenRainSlime = data.DenRainSlime;
// export const DenSpiderJockey = data.DenSpiderJockey;
// export const DenSpliiterSpider = data.DenSpliiterSpider;
// export const DenVoraciousSpider = data.DenVoraciousSpider;
// export const DenWeaverSpider = data.DenWeaverSpider;
// export const EndEnderman = data.EndEnderman;
// export const EndEndermite = data.EndEndermite;
// export const EndObsidianDefender = data.EndObsidianDefender;
// export const EndVoidlingExtremist = data.EndVoidlingExtremist;
// export const EndVoidlingFanatic = data.EndVoidlingFanatic;
// export const EndWatcher = data.EndWatcher;
// export const EndZealot = data.EndZealot;
// export const IsleBlaze = data.IsleBlaze;
// export const IsleFlamingSpider = data.IsleFlamingSpider;
// export const IsleGhast = data.IsleGhast
// export const IsleMagmaCube = data.IsleMagmaCube;
// export const IsleMatcho = data.IsleMatcho;
// export const IsleMushroomBull = data.IsleMushroomBull;
// export const IslePigman = data.IslePigman;
// export const IsleWitherSkeleton = data.IsleWitherSkeleton;
// export const IsleWitherSpectre = data.IsleWitherSpectre;
// export const DeepSneakyCreeper = data.DeepSneakyCreeper;
// export const DeepLapisZombie = data.DeepLapisZombie;
// export const DeepRedstonePigman = data.DeepRedstonePigman;
// export const DeepEmeralSlime = data.DeepEmeralSlime;
// export const DeepMinerZombie = data.DeepMinerZombie;
// export const DeepMinerSkeleton = data.DeepMinerSkeleton;
// export const DwarvenGoblin = data.DwarvenGoblin;
// export const DwarvenIceWalker = data.DwarvenIceWalker;
// export const DwarvenTreasureHoarder = data.DwarvenTreasureHoarder;
// export const DwarvenGhost = data.DwarvenGhost;
// export const CHAutomaton = data.CHAutomaton;
// export const CHButterfly = data.CHButterfly;
// export const CHGrunt = data.CHGrunt;
// export const CHSludge = data.CHSludge;
// export const CHThyst = data.CHThyst;
// export const CHWorm = data.CHWorm;
// export const CHYog = data.CHYog;
// export const ParkHowlingSpirit = data.ParkHowlingSpirit;
// export const ParkPackSpirit = data.ParkPackSpirit
// export const ParkSoulOfTheAlpha = data.ParkSoulOfTheAlpha;
// export const SpookyCrazyWitch = data.SpookyCrazyWitch;
// export const SpookyPhantomSpirit = data.SpookyPhantomSpirit;
// export const SpookyScaryJerry = data.SpookyScaryJerry;
// export const SpookyTrickOrTreater = data.SpookyTrickOrTreater;
// export const SpookyWitherGourd = data.SpookyWitherGourd;
// export const SpookyWraith = data.SpookyWraith;



// // bosses
// export const DenArachne = data.DenArachne;
// export const DenBroodMother = data.DenBroodMother;
// export const EndDragon = data.EndDragon;
// export const EndEndstoneProtector = data.EndEndstoneProtector;
// export const IsleAshfang = data.IsleAshfang;
// export const IsleBladesoul = data.IsleBladesoul;
// export const IsleMageOutlaw = data.IsleMageOutlaw;
// export const IsleBarbarianDuke = data.IsleBarbarianDuke;
// export const IsleMagmaBoss = data.IsleMagmaBoss;
// export const SpookyHeadlessHorseman = data.SpookyHeadlessHorseman;

// // stats
// export const StatsSpeed = data.Speed;
// export const StatsStrength = data.Strength;
// export const StatsCritChance = data.CritChance;
// export const StatsCritDamage = data.CritDamage;
// export const StatsAttackSpeed = data.AttackSpeed;
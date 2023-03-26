/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import PogObject from "PogData"

export const short_number = (num) => {
  if(num == undefined) return;
  return num.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

export const bestiaryDisplay = new Gui()
export const statsDisplay = new Gui()  

export const consts ={
  PREFIX: "&d&l[NwjnAddons]",
  WIP: "&cThis feature is still in development!",
  
  
  // Island
  IslandZombie: '&a&lZombie:&f ',
  IslandSkeleton: '&a&lSkeleton:&f ',
  IslandEnderman: '&a&lEnderman:&f ',
  IslandSlime: '&a&lSlime:&f ',
  IslandSpider: '&a&lSpider:&f ',
  IslandCaveSpider: '&a&lCave Spider:&f ',
  IslandWitch: '&a&lWitch:&f ',
  // Hub
  HubCryptGhoul: '&a&lCrypt Ghoul:&f ',
  HubOldWolf: '&a&lOld Wolf:&f ',
  HubWolf: '&a&lWolf:&f ',
  HubZombieVillager: '&a&lZombie Villager:&f ',
  // Den
  DenBroodMother: '&c&lBroodmother:&f ',
  DenArachne: '&c&lArachne:&f ',
  DenArachnesBrood: '&a&lArachne\'s Brood:&f ',
  DenArachnesKeeper: '&a&lArachne\'s Keeper:&f ',
  DenRainSlime: '&a&lRain Slime:&f ',
  DenGravelSkeleton: '&a&lGravel Skeleton:&f ',
  DenDasherSpider: '&a&lDasher Spider:&f ',
  DenSpiderJockey: '&a&lSpider Jockey:&f ',
  DenSplitterSpider: '&a&lSplitter Spider:&f ',
  DenVoraciousSpider: '&a&lVoracious Spider:&f ',
  DenWeaverSpider: '&a&lWeaver Spider:&f ',
  // End
  EndDragon: '&5&lDragon:&f ',
  EndEndstoneProtector: '&5&lEndstone Protector:&f ',
  EndVoidlingExtremist: '&d&lVoidling Extremist:&f ',
  EndVoidlingFanatic: '&a&lVoidling Fanatic:&f ',
  EndZealot: '&a&lZealot:&f ',
  EndWatcher: '&a&lWatcher:&f ',
  EndObsidianDefender: '&a&lObsidian Defender:&f ',
  EndEnderman: '&a&lEnderman:&f ',
  EndEndermite: '&a&lEndermite:&f ',
  // Crimson Isle
  IsleMagmaBoss: '&4&lMagma Boss:&f ',
  IsleMageOutlaw: '&5&lMage Outlaw:&f ',
  IsleAshfang: '&8&lAshfang:&f ',
  IsleBladesoul: '&8&lBladesoul:&f ',
  IsleBarbarianDuke: '&8&lBarbarian Duke:&f ',
  IsleWitherSpectre: '&a&lWither Spectre:&f ',
  IsleWitherSkeleton: '&a&lWither Skeleton:&f ',
  IsleFlamingSpider: '&a&lFlaming Spider:&f ',
  IslePigman: '&a&lPigman:&f ',
  IsleMushroomBull: '&a&Mushroom Bull:&f ',
  IsleMagmaCube: '&a&lMagma Cube:&f ',
  IsleGhast: '&a&lGhast:&f ',
  IsleMatcho: '&a&lMatcho:&f ',
  // Deep Caverns
  DeepSneakyCreeper: '&a&lSneaky Creeper:&f ',
  DeepLapisZombie: '&a&lLapis Zombie:&f ',
  DeepRedstonePigman: '&a&lRedstone Pigman:&f ',
  DeepEmeralSlime: '&a&lEmerald Slime:&f ',
  DeepMinerZombie: '&a&lMiner Zombie:&f ',
  DeepMinerSkeleton: '&a&lMiner Skeleton:&f ',
  // Dwarven Mines
  DwarvenGoblin: '&a&lGoblin:&f ',
  DwarvenIceWalker: '&a&lIce Walker:&f ',
  DwarvenTreasureHoarder: '&a&lTreasure Hoarder:&f ',
  DwarvenGhost: '&a&lGhost:&f ',
  // Crystal Hollow
  CHButterfly: '&e&lButterfly:&f ',
  CHAutomaton: '&a&lAutomaton:&f ',
  CHThyst: '&a&lThyst:&f ',
  CHSludge: '&a&lSludge:&f ',
  CHGrunt: '&a&lGrunt:&f ',
  CHYog: '&a&lYog:&f ',
  CHWorm: '&a&lWorm:&f ',
  // Park
  ParkSoulOfTheAlpha: '&3&lSoul of the Alpha:&f ',
  ParkHowlingSpirit: '&b&lHowling Spirit:&f ',
  ParkPackSpirit: '&b&lPack Spirit:&f ',
  // Spooky
  SpookyHeadlessHorseman: '&6&lHeadless Horseman:&f ',
  SpookyScaryJerry: '&6&lScary Jerry:&f ',
  SpookyWitherGourd: '&6&lWither Gourd:&f ',
  SpookyCrazyWitch: '&8&lCrazy Witch:&f ',
  SpookyWraith: '&8&lWraith:&f ',
  SpookyTrickOrTreater: '&e&lTrick or Treater:&f ',
  SpookyPhantomSpirit: '&c&lPhantomSpirit:&f ',
  // Catacombs
  DungeonLostAdventurer: '&d&lLost Adventurer:&f ',
  DungeonAngryArcheologist: '&d&lAngry Archeologist:&f ',
  DungeonShadowAssassin: '&d&lShadow Assassin:&f ',
  DungeonKingMidas: '&d&lKing Midas:&f ',
  DungeonUndead: '&4&lUndead:&f ',
  DungeonWithermancer: '&a&lWithermancer:&f ',
  DungeonCryptDreadlord: '&a&lCrypt Dreadlord:&f ',
  DungeonCryptLurker: '&a&lCrypt Lurker:&f ',
  DungeonCryptSouleater: '&a&lCrypt Souleater:&f ',
  DungeonSuperTankZombie: '&a&lSuper Tank Zombie:&f ',
  DungeonTankZombie: '&a&lTank Zombie:&f ',
  DungeonZombieCommander: '&a&lZombie Commander:&f ',
  DungeonZombieGrunt: '&a&lZombie Grunt:&f ',
  DungeonZombieKnight: '&a&lZombie Knight:&f ',
  DungeonZombieSoldier: '&a&lZombie Soldier:&f ',
  DungeonUndeadSkeleton: '&a&lUndead Skeleton:&f ',
  DungeonScaredSkeleton: '&a&lScared Skeleton:&f ',
  DungeonSkeletonGrunt: '&a&lSkeleton Grunt:&f ',
  DungeonSkeletonMaster: '&a&lSkeleton Master:&f ',
  DungeonSkeletonSoldier: '&a&lSkeleton Soldier:&f ',
  DungeonSkeletor: '&a&lSkeletor:&f ',
  DungeonSniper: '&a&lSniper:&f ',
  DungeonSuperArcher: '&a&lSuper Archer:&f ',
  DungeonCellarSpider: '&a&lCellar Spider:&f',
  DungeonLonelySpider: '&a&lLonely Spider:&f '
}


// Credit: Ghosts for data inspiration
export let data = new PogObject("NwjnAddons", {
  "api_key": "",
  "first_time": true,

  "statsX": 0, 
  "statsY": 0,
  "Speed": 0,
  "Strength": 0,
  "CritChance": 0,
  "CritDamage": 0,
  "AttackSpeed": 0,

  "bestiaryX": 0,
  "bestiaryY": 0,
  "bestiaryTier": 0,

  // Island
  "IslandCaveSpider": 0,
  "IslandEnderman": 0,
  "IslandSkeleton": 0,
  "IslandSlime": 0,
  "IslandSpider": 0,
  "IslandWitch": 0,
  "IslandZombie": 0,

  // Hub 
  "HubCryptGhoul": 0,
  "HubOldWolf": 0,
  "HubWolf": 0,
  "HubZombieVillager": 0,

  // Spider's Den
  "DenArachne": 0,
  "DenArachnesBrood": 0,
  "DenArachnesKeeper": 0,
  "DenBroodMother": 0,
  "DenDasherSpider": 0,
  "DenGravelSkeleton": 0,
  "DenRainSlime": 0,
  "DenSpiderJockey": 0,
  "DenSplitterSpider": 0,
  "DenVoraciousSpider": 0,
  "DenWeaverSpider": 0,

  // End
  "EndDragon": 0,
  "EndEnderman": 0,
  "EndEndermite": 0,
  "EndEndstoneProtector": 0,
  "EndObsidianDefender": 0,
  "EndVoidlingExtremist": 0,
  "EndVoidlingFanatic": 0,
  "EndWatcher": 0,
  "EndZealot": 0,

  // Crimson Isle
  "IsleAshfang": 0,
  "IsleBarbarianDuke": 0,
  "IsleBladesoul": 0,
  "IsleBlaze": 0,
  "IsleFlamingSpider": 0,
  "IsleGhast": 0,
  "IsleMageOutlaw": 0,
  "IsleMagmaBoss": 0,
  "IsleMagmaCube": 0,
  "IsleMatcho": 0,
  "IsleMushroomBull": 0,
  "IslePigman": 0,
  "IsleWitherSkeleton": 0,
  "IsleWitherSpectre": 0,
  
  // Deep Caverns
  "DeepEmeralSlime": 0,
  "DeepLapisZombie": 0,
  "DeepMinerSkeleton": 0,
  "DeepMinerZombie": 0,
  "DeepRedstonePigman": 0,
  "DeepSneakyCreeper": 0,
  
  // Dwarven Mines
  "DwarvenGhost": 0,
  "DwarvenGoblin": 0,
  "DwarvenIceWalker": 0,
  "DwarvenTreasureHoarder": 0,
  
  // Crystal Hollows
  "CHAutomaton": 0,
  "CHButterfly": 0,
  "CHGrunt": 0,
  "CHSludge": 0,
  "CHThyst": 0,
  "CHWorm": 0,
  "CHYog": 0,
  
  // Park
  "ParkHowlingSpirit": 0,
  "ParkPackSpirit": 0,
  "ParkSoulOfTheAlpha": 0,
  
  // Spooky
  "SpookyCrazyWitch": 0,
  "SpookyHeadlessHorseman": 0,
  "SpookyPhantomSpirit": 0,
  "SpookyScaryJerry": 0,
  "SpookyTrickOrTreater": 0,
  "SpookyWitherGourd": 0,
  "SpookyWraith": 0,
  
  // Catacombs
  "DungeonAngryArcheologist": 0,
  "DungeonCellarSpider": 0,
  "DungeonCryptDreadlord": 0,
  "DungeonCryptLurker": 0,
  "DungeonCryptSouleater": 0,
  "DungeonKingMidas": 0,
  "DungeonLonelySpider": 0,
  "DungeonLostAdventurer": 0,
  "DungeonScaredSkeleton": 0,
  "DungeonShadowAssassin": 0,
  "DungeonSkeletonGrunt": 0,
  "DungeonSkeletonMaster": 0,
  "DungeonSkeletonSoldier": 0,
  "DungeonSkeletor": 0,
  "DungeonSniper": 0,
  "DungeonSuperArcher": 0,
  "DungeonSuperTankZombie": 0,
  "DungeonTankZombie": 0,
  "DungeonUndead": 0,
  "DungeonUndeadSkeleton": 0,
  "DungeonWithermancer": 0,
  "DungeonZombieCommander": 0,
  "DungeonZombieGrunt": 0,
  "DungeonZombieKnight": 0,
  "DungeonZombieSoldier": 0,
}, "data.json")
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
  IslandZombie: '&aZombie:&f ',
  IslandSkeleton: '&aSkeleton:&f ',
  IslandEnderman: '&aEnderman:&f ',
  IslandSlime: '&aSlime:&f ',
  IslandSpider: '&aSpider:&f ',
  IslandCaveSpider: '&aCave Spider:&f ',
  IslandWitch: '&aWitch:&f ',
  // Hub
  HubCryptGhoul: '&aCrypt Ghoul:&f ',
  HubOldWolf: '&aOld Wolf:&f ',
  HubWolf: '&aWolf:&f ',
  HubZombieVillager: '&aZombie Villager:&f ',
  // Den
  DenBroodMother: '&cBroodmother:&f ',
  DenArachne: '&cArachne:&f ',
  DenArachnesBrood: '&aArachne\'s Brood:&f ',
  DenArachnesKeeper: '&aArachne\'s Keeper:&f ',
  DenRainSlime: '&aRain Slime:&f ',
  DenGravelSkeleton: '&aGravel Skeleton:&f ',
  DenDasherSpider: '&aDasher Spider:&f ',
  DenSpiderJockey: '&aSpider Jockey:&f ',
  DenSplitterSpider: '&aSplitter Spider:&f ',
  DenVoraciousSpider: '&aVoracious Spider:&f ',
  DenWeaverSpider: '&aWeaver Spider:&f ',
  // End
  EndDragon: '&5Dragon:&f ',
  EndEndstoneProtector: '&5Endstone Protector:&f ',
  EndVoidlingExtremist: '&dVoidling Extremist:&f ',
  EndVoidlingFanatic: '&aVoidling Fanatic:&f ',
  EndZealot: '&aZealot:&f ',
  EndWatcher: '&aWatcher:&f ',
  EndObsidianDefender: '&aObsidian Defender:&f ',
  EndEnderman: '&aEnderman:&f ',
  EndEndermite: '&aEndermite:&f ',
  // Crimson Isle
  IsleMagmaBoss: '&4Magma Boss:&f ',
  IsleMageOutlaw: '&5Mage Outlaw:&f ',
  IsleAshfang: '&8Ashfang:&f ',
  IsleBladesoul: '&8Bladesoul:&f ',
  IsleBarbarianDuke: '&8Barbarian Duke:&f ',
  IsleWitherSpectre: '&aWither Spectre:&f ',
  IsleWitherSkeleton: '&aWither Skeleton:&f ',
  IsleFlamingSpider: '&aFlaming Spider:&f ',
  IslePigman: '&aPigman:&f ',
  IsleMushroomBull: '&aMushroom Bull:&f ',
  IsleMagmaCube: '&aMagma Cube:&f ',
  IsleGhast: '&aGhast:&f ',
  IsleMatcho: '&aMatcho:&f ',
  // Deep Caverns
  DeepSneakyCreeper: '&aSneaky Creeper:&f ',
  DeepLapisZombie: '&aLapis Zombie:&f ',
  DeepRedstonePigman: '&aRedstone Pigman:&f ',
  DeepEmeralSlime: '&aEmerald Slime:&f ',
  DeepMinerZombie: '&aMiner Zombie:&f ',
  DeepMinerSkeleton: '&aMiner Skeleton:&f ',
  // Dwarven Mines
  DwarvenGoblin: '&aGoblin:&f ',
  DwarvenIceWalker: '&aIce Walker:&f ',
  DwarvenTreasureHoarder: '&aTreasure Hoarder:&f ',
  DwarvenGhost: '&aGhost:&f ',
  // Crystal Hollow
  CHButterfly: '&eButterfly:&f ',
  CHAutomaton: '&aAutomaton:&f ',
  CHThyst: '&aThyst:&f ',
  CHSludge: '&aSludge:&f ',
  CHGrunt: '&aGrunt:&f ',
  CHYog: '&aYog:&f ',
  CHWorm: '&aWorm:&f ',
  // Park
  ParkSoulOfTheAlpha: '&3Soul of the Alpha:&f ',
  ParkHowlingSpirit: '&bHowling Spirit:&f ',
  ParkPackSpirit: '&bPack Spirit:&f ',
  // Spooky
  SpookyHeadlessHorseman: '&6Headless Horseman:&f ',
  SpookyScaryJerry: '&6Scary Jerry:&f ',
  SpookyWitherGourd: '&6Wither Gourd:&f ',
  SpookyCrazyWitch: '&8Crazy Witch:&f ',
  SpookyWraith: '&8Wraith:&f ',
  SpookyTrickOrTreater: '&eTrick or Treater:&f ',
  SpookyPhantomSpirit: '&cPhantomSpirit:&f ',
  // Catacombs
  DungeonLostAdventurer: '&dLost Adventurer:&f ',
  DungeonAngryArcheologist: '&dAngry Archeologist:&f ',
  DungeonShadowAssassin: '&dShadow Assassin:&f ',
  DungeonKingMidas: '&dKing Midas:&f ',
  DungeonUndead: '&4Undead:&f ',
  DungeonWithermancer: '&aWithermancer:&f ',
  DungeonCryptDreadlord: '&aCrypt Dreadlord:&f ',
  DungeonCryptLurker: '&aCrypt Lurker:&f ',
  DungeonCryptSouleater: '&aCrypt Souleater:&f ',
  DungeonSuperTankZombie: '&aSuper Tank Zombie:&f ',
  DungeonTankZombie: '&aTank Zombie:&f ',
  DungeonZombieCommander: '&aZombie Commander:&f ',
  DungeonZombieGrunt: '&aZombie Grunt:&f ',
  DungeonZombieKnight: '&aZombie Knight:&f ',
  DungeonZombieSoldier: '&aZombie Soldier:&f ',
  DungeonUndeadSkeleton: '&aUndead Skeleton:&f ',
  DungeonScaredSkeleton: '&aScared Skeleton:&f ',
  DungeonSkeletonGrunt: '&aSkeleton Grunt:&f ',
  DungeonSkeletonMaster: '&aSkeleton Master:&f ',
  DungeonSkeletonSoldier: '&aSkeleton Soldier:&f ',
  DungeonSkeletor: '&aSkeletor:&f ',
  DungeonSniper: '&aSniper:&f ',
  DungeonSuperArcher: '&aSuper Archer:&f ',
  DungeonCellarSpider: '&aCellar Spider:&f',
  DungeonLonelySpider: '&aLonely Spider:&f '
}


// Credit: Ghosts for data inspiration
export let data = new PogObject("NwjnAddons", {
  "api_key": "",
  "first_time": true,

  "statsX": 0, 
  "statsY": 0,

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
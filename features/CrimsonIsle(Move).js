import settings from "../config";
import { registerWhen, clamp } from "../utils/functions";
import WorldUtil from "../utils/world"

function coords() {
  return `x: ${ ~~Player.getX() }, y: ${~~Player.getY()}, z: ${~~Player.getZ()}`
}

registerWhen(register("chat", () => {
  ChatLib.say(`/pc ${coords()} [NwjnAddons] Lord Jawbus!!!`)
}).setCriteria("You have angered a legendary creature... Lord Jawbus has arrived."), () => WorldUtil.worldIs("Crimson Isle") && settings.jawbus);

registerWhen(register("chat", () => {
  ChatLib.say(`/pc ${coords()} [NwjnAddons] Thunder!!!`)
}).setCriteria("You hear a massive rumble as Thunder emerges."), () => WorldUtil.worldIs("Crimson Isle") && settings.thunder);

registerWhen(register("chat", () => {
  ChatLib.say(`/pc ${coords()} [NwjnAddons] Plhlegblast!!!`)
}).setCriteria("WOAH! A Plhlegblast appeared."), () => WorldUtil.worldIs("Crimson Isle") && settings.plhlegblast);

registerWhen(register("chat", () => {
  ChatLib.say(`/pc ${coords()} [NwjnAddons] Vanquisher!!!`)
}).setCriteria("A Vanquisher is spawning nearby!"), () => settings.announceVanqs && WorldUtil.worldIs("Crimson Isle"));


let totalDamage = 0
registerWhen(register("step", () => {
  if (!World.isLoaded()) return

  const line = Scoreboard.getLines().find(l => l.toString().removeFormatting().includes("Boss: "))
  if (line) totalDamage = parseInt(line.toString().removeFormatting().replace(/[^0-9]/g, ""))
}).setDelay(5), () => settings.magma)

registerWhen(register('chat', (damage, event) => {
  totalDamage = clamp(totalDamage + parseInt(damage), 0, 100)

  cancel(event)

  ChatLib.chat(`&4&lMagma Boss&r &8> &c+${damage}% &7(${totalDamage}%)`)
}).setCriteria("The Magma Boss angers! (+${damage}% Damage)").setPriority(Priority.LOWEST), () => settings.magma && WorldUtil.worldIs("Crimson Isle"))

registerWhen(register('worldUnload', () => {
  totalDamage = 0
}), () => settings.magma)

let fishes = {
  SulphurSkitter: {
    name: "Sulphur Skitter",
    bronze: 0,
    silver: 0,
    gold: 0,
    diamond: 0,
  },
  SteamingHotFlounder: {
    name: "Steaming-Hot Flounder",
    bronze: 0,
    silver: 0,
    gold: 0,
    diamond: 0,
  },
  Gusher: {
    name: "Gusher",
    bronze: 0,
    silver: 0,
    gold: 0,
    diamond: 0,
  },
  Blobfish: {
    name: "Blobfish",
    bronze: 0,
    silver: 0,
    gold: 0,
    diamond: 0,
  },
  Slugfish: {
    name: "Slugfish",
    bronze: 0,
    silver: 0,
    gold: 0,
    diamond: 0,
  },
  Flyfish: {
    name: "Flyfish",
    bronze: 0,
    silver: 0,
    gold: 0,
    diamond: 0,
  },
  Lavahorse: {
    name: "Lavahorse",
    bronze: 0,
    silver: 0,
    gold: 0,
    diamond: 0,
  },
  ManaRay: {
    name: "Mana Ray",
    bronze: 0,
    silver: 0,
    gold: 0,
    diamond: 0,
  },
  VolcanicStonefish: {
    name: "Volcanic Stonefish",
    bronze: 0,
    silver: 0,
    gold: 0,
    diamond: 0,
  },
  Vanille: {
    name: "Vanille",
    bronze: 0,
    silver: 0,
    gold: 0,
    diamond: 0,
  },
  SkeletonFish: {
    name: "Skeleton Fish",
    bronze: 0,
    silver: 0,
    gold: 0,
    diamond: 0,
  },
  Moldfin: {
    name: "Moldfin",
    bronze: 0,
    silver: 0,
    gold: 0,
    diamond: 0,
  },
  SoulFish: {
    name: "Soul Fish",
    bronze: 0,
    silver: 0,
    gold: 0,
    diamond: 0,
  },
  KarateFish: {
    name: "Karate Fish",
    bronze: 0,
    silver: 0,
    gold: 0,
    diamond: 0,
  },
  GoldenFish: {
    name: "Golden Fish",
    bronze: 0,
    silver: 0,
    gold: 0,
    diamond: 0,
  },
  Obfuscated1: {
    name: "Obfuscated 1",
    bronze: 0,
    silver: 0,
    gold: 0,
    diamond: 0,
  },
  Obfuscated2: {
    name: "Obfuscated 2",
    bronze: 0,
    silver: 0,
    gold: 0,
    diamond: 0,
  },
  Obfuscated3: {
    name: "Obfuscated 3",
    bronze: 0,
    silver: 0,
    gold: 0,
    diamond: 0,
  },
}

registerWhen(register("chat", (fish, rarity, event) => {
  fish = fish.substring(fish.indexOf(" ") + 1)
  fish = fish.replaceAll(/\W/g, "")
  if (!(fish in fishes)) return
  const ghoti = fishes[fish]
  switch (rarity) {
    case "BRONZE": ghoti.bronze++; break;
    case "SILVER": ghoti.silver++; break;
    case "GOLD": ghoti.gold++; break;
    case "DIAMOND": ghoti.diamond++; break;
  }
  /*
  TODO: test
  ghoti[rarity.toLowerCase()]++
  */
  const chat = ChatLib.getChatMessage(event, true)
  cancel(event)
  ChatLib.chat(`${chat} &8${ghoti.bronze}&r-&7${ghoti.silver}&r-&6${ghoti.gold}&r-&b${ghoti.diamond} &d(${ghoti.bronze + ghoti.silver + ghoti.gold + ghoti.diamond})`)
}).setCriteria("TROPHY FISH! You caught ${fish} ${rarity}."), () => WorldUtil.worldIs("Crimson Isle") && settings.fish);
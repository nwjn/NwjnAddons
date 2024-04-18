import { comma, consts, EntityArmorStand } from "../utils/constants";
import { holding } from "../utils/functions";

register("command", () => {
  ChatLib.clearChat()
}).setName("clearchat", true)

register("command", () => {
  let rarity = "None"
  holding()?.getLore()?.forEach(line => {
    if (line.toString().includes("COMMON") || line.toString().includes("RARE") || line.toString().includes("EPIC") || line.toString().includes("LEGENDARY") || line.toString().includes("MYTHIC") || line.toString().includes("DIVINE") || line.toString().includes("SPECIAL")) rarity = line
  })
  ChatLib.chat(`\nName: ${ holding()?.getName() }\nRegistry Name: ${ holding()?.getRegistryName() }\nSkyblock ID: ${ holding("String", "id") }\nRarity: ${ rarity }\n`)
}).setName("itemInfo", true).setAliases("item");

register("command", () => {
  const looking = Player.lookingAt()

  // todo: instance of Entity
  if (!looking.toString().startsWith("Entity")) {
    ChatLib.chat(looking)
    return
  }
  /*
  TODO (TEST & REPLACE)
  if (looking instanceof Block) return;
  */ 
  ChatLib.chat(`\nName: ${looking.getName()}\nEntityClass: ${looking.getClassName()}\nPos: ${looking.getPos()}\nHP: ${comma(looking.getEntity().func_110143_aJ())}/${comma(looking.getEntity().func_110148_a(Java.type('net.minecraft.entity.SharedMonsterAttributes').field_111267_a).func_111125_b())}\n`)
}).setName("entityInfo", true).setAliases("entity");

register("command", () => {
  new Thread(() => {
    const [x, y, z] = [Player.getX(), Player.getY(), Player.getZ()]
    ChatLib.say(`/pc x: ${x}, y: ${y}, z: ${z}`)
    Thread.sleep(550)
    ChatLib.say(`/pc x: ${x + 2}, y: ${y}, z: ${z}`)
    Thread.sleep(550)
    ChatLib.say(`/pc x: ${x + 1}, y: ${y + 1}, z: ${z}`)
    Thread.sleep(550)
    ChatLib.say(`/pc x: ${x + 1}, y: ${y + 2}, z: ${z}`)
    Thread.sleep(550)
  }).start()
}).setName('rocket', true);

register("command", (...args) => {
  try {
    const equat = args.join("").replace(/,/g, "")
    ChatLib.chat(`${consts.PREFIX}&r: ${comma(equat)} = ${comma(eval(equat))}`)
  } catch (err) {ChatLib.chat(`${consts.PREFIX}&r: ${err}`)}
}).setName("calc", true)

register("command", () => {
  const looking = Player.lookingAt()
  if (looking?.getClassName() == "EntityOtherPlayerMP") ChatLib.command(`trade ${ looking?.getName() }`)
  // todo: instance of EntityPlayer.class
}).setName("deal", true);

register("command", (index) => {
  const tab = TabList.getNames()[parseInt(index)]
  ChatLib.chat(tab)
}).setName("/tab");

register("command", () => {
  const nbt = Player.getHeldItem()?.getNBT()
  FileLib.delete("NwjnAddons", "temp.json")
  FileLib.write("NwjnAddons", "temp.json", JSON.stringify(nbt.toObject(), null, 4), true);
}).setName("nbt");

register("command", () => {
  console.clear()
}).setName("clearConsole")
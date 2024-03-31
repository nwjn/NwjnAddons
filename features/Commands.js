import { comma, consts } from "../utils/constants";
import { fixLength } from "../utils/functions";

register("command", () => {
  ChatLib.clearChat()
}).setName("clearchat", true)

register("command", () => {
  const holding = Player.getHeldItem()
  let rarity = "None"
  holding?.getLore()?.forEach(line => {
    if (line.toString().includes("COMMON") || line.toString().includes("RARE") || line.toString().includes("EPIC") || line.toString().includes("LEGENDARY") || line.toString().includes("MYTHIC") || line.toString().includes("DIVINE") || line.toString().includes("SPECIAL")) rarity = line
  })
  const id = holding?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString("id")
  ChatLib.chat(`\nName: ${ holding?.getName() }\nRegistry Name: ${ holding?.getRegistryName() }\nSkyblock ID: ${ id }\nRarity: ${ rarity }\n`)
}).setName("itemInfo", true).setAliases("item");

register("command", () => {
  const looking = Player.lookingAt()
  if (!looking.toString().startsWith("Entity")) {
    ChatLib.chat(looking) 
    return
  }
  ChatLib.chat(`\nName: ${looking.getName()}\nEntityClass: ${looking.getClassName()}\nPos: ${looking.getPos()}\nHP: ${comma(looking.getEntity().func_110143_aJ())}/${comma(looking.getEntity().func_110148_a(Java.type('net.minecraft.entity.SharedMonsterAttributes').field_111267_a).func_111125_b())}\n`)
}).setName("entityInfo", true).setAliases("entity");

register("command", () => {
  const playerX = Player.getX();
  const playerY = Player.getY();
  const playerZ = Player.getZ();
  new Thread(() => {
    ChatLib.say(`/pc x: ${playerX}, y: ${playerY}, z: ${playerZ}`)
    Thread.sleep(550)
    ChatLib.say(`/pc x: ${playerX + 2}, y: ${playerY}, z: ${playerZ}`)
    Thread.sleep(550)
    ChatLib.say(`/pc x: ${playerX + 1}, y: ${playerY + 1}, z: ${playerZ}`)
    Thread.sleep(550)
    ChatLib.say(`/pc x: ${playerX + 1}, y: ${playerY + 2}, z: ${playerZ}`)
    Thread.sleep(550)
  }).start()
}).setName('rocket', true);

function timeFormat(time) {
  let minutes = Math.trunc(time / 60)
  let seconds = time % 60
  return `Time: &a${fixLength(minutes)}m ${fixLength(seconds)}s`
}

register("command", (p1, p2, p3, p4, tokens) => {
  p1 = parseFloat(p1)
  p2 = parseFloat(p2)
  p3 = parseFloat(p3)
  p4 = parseFloat(p4)

  ChatLib.chat("&a&l▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")
  ChatLib.chat(`&dSupplies &bin ${ p1.toFixed(2) } seconds`)
  ChatLib.chat(`&bBallista in ${p2.toFixed(2)} seconds `)
  ChatLib.chat(`&cKuudra &bin ${ p3.toFixed(2) } seconds`)
  ChatLib.chat(`&aCleared &bin ${ p4.toFixed(2) } seconds`)
  ChatLib.chat(ChatLib.getCenteredText("&6&lKUUDRA DOWN! &r&c&lThis is a FAKE command!"))
  ChatLib.chat(ChatLib.getCenteredText("&8Percentage Complete: &r100%"))
  ChatLib.chat(ChatLib.getCenteredText(`${timeFormat(Math.round(p1 + p2 + p3 + p4))}`))
  ChatLib.chat(ChatLib.getCenteredText(`Tokens Earned: &5${tokens}`))
  ChatLib.chat("&a&l▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")
}).setName("fakePB", true);

register("command", (...args) => {
  try {
    const equat = args.join("").replace(/,/g, "")
    ChatLib.chat(`${consts.PREFIX}&r: ${comma(equat)} = ${comma(eval(equat))}`)
  } catch (err) {ChatLib.chat(`${consts.PREFIX}&r: ${err}`)}
}).setName("calc", true)

register("command", () => {
  const looking = Player.lookingAt()
  if (looking?.getClassName() == "EntityOtherPlayerMP") ChatLib.command(`trade ${looking?.getName()}`)
}).setName("deal", true);

register("command", (index) => {
  ChatLib.chat(TabList.getNames()[index])
}).setName("/tab", true);
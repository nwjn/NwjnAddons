import { getNowHP, getMaxHP } from "../../utils/functions.js"
import { TextHelper } from "../../utils/TextHelper.js";

register("command", () => {
  ChatLib.clearChat()
}).setName("clearchat", true)

register("command", () => {
  const looking = Player.lookingAt()
  if (!(looking instanceof Entity)) { ChatLib.chat(looking); return; }

  ChatLib.chat(ChatLib.getChatBreak("-"))
  ChatLib.chat(`Name: ${ looking?.getName() }`)
  ChatLib.chat(`EntityClass: ${ looking?.getClassName() }`)
  ChatLib.chat(`Current HP: ${ TextHelper.addCommas(~~getNowHP(looking)) }`)
  ChatLib.chat(`Max HP: ${ TextHelper.addCommas(~~getMaxHP(looking)) }`)
  ChatLib.chat(ChatLib.getChatBreak("-"))
}).setName("entityInfo", true).setAliases("entity");

register("command", () => {
  new Thread(() => {
    const [x, y, z] = [~~Player.getX(), ~~Player.getY(), ~~Player.getZ()]
    ChatLib.say(`/pc x: ${x}, y: ${y}, z: ${z}`)
    Thread.sleep(300)
    ChatLib.say(`/pc x: ${x + 2}, y: ${y}, z: ${z}`)
    Thread.sleep(300)
    ChatLib.say(`/pc x: ${x + 1}, y: ${y + 1}, z: ${z}`)
    Thread.sleep(300)
    ChatLib.say(`/pc x: ${x + 1}, y: ${y + 2}, z: ${z}`)
    Thread.sleep(300)
  }).start()
}).setName('rocket', true);

register("command", (...args) => {
  try {
    const equat = args.join(" ").replace(/,/g, "")
    ChatLib.chat(`${TextHelper.PREFIX}&r: ${TextHelper.addCommas(equat)} = ${TextHelper.addCommas(eval(equat))}`)
  } catch (err) {ChatLib.chat(`${TextHelper.PREFIX}&r: ${err}`)}
}).setName("calc", true)


register("command", () => {
  const looking = Player.lookingAt()
  if (looking?.getClassName() != "EntityOtherPlayerMP") return;

  const name = looking.getName()
  ChatLib.chat(`${TextHelper.PREFIX}: Trading with &e${name}`)
  ChatLib.command(`trade ${ name }`);
  ChatLib.addToSentMessageHistory(-1, `/trade ${ name }`)
}).setName("deal", true);
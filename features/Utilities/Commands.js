import EntityUtil from "../../core/static/EntityUtil.js";
import TextUtil from "../../core/static/TextUtil.js";
import MathUtil from "../../core/static/MathUtil.js";

register("command", () => {
  ChatLib.clearChat()
}).setName("clearchat", true)

register("command", () => {
  // todo: raytrace hit
  const looking = Player.lookingAt()
  if (!(looking instanceof Entity)) { ChatLib.chat(looking); return; }

  ChatLib.chat(ChatLib.getChatBreak("-"))
  ChatLib.chat(`Name: ${ looking?.getName() }`)
  ChatLib.chat(`EntityClass: ${ looking?.getClassName() }`)
  ChatLib.chat(`Current HP: ${ MathUtil.addCommas(~~EntityUtil.getHP(looking)) }`)
  ChatLib.chat(`Max HP: ${ MathUtil.addCommas(~~EntityUtil.getMaxHP(looking)) }`)
  ChatLib.chat(ChatLib.getChatBreak("-"))
}).setName("entityInfo", true).setAliases("entity");


register("command", (...args) => {
  try {
    const equat = args.join(" ").replace(/,/g, "")
    ChatLib.chat(`${TextUtil.NWJNADDONS}&r: ${equat} = ${MathUtil.addCommas(eval(equat))}`)
  } catch (err) {ChatLib.chat(`${TextUtil.NWJNADDONS}&r: ${err}`)}
}).setName("calc", true)


register("command", () => {
  const looking = Player.lookingAt()
  if (looking?.getClassName() != "EntityOtherPlayerMP") return;

  const name = looking.getName()
  ChatLib.chat(`${TextUtil.NWJNADDONS}: Trading with &e${name}`)
  ChatLib.command(`trade ${ name }`);
  ChatLib.addToSentMessageHistory(-1, `/trade ${ name }`)
}).setName("deal", true);
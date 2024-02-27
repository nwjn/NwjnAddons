import { comma } from "../utils/constants";
import { fixLength } from "../utils/functions";

register("command", () => {
  ChatLib.clearChat()
}).setName("clearchat", true)

register("command", () => {
  let holding = undefined
  let type = undefined
  holding = Player.getHeldItem()
  holding?.getLore()?.forEach(line => {
    if (line.toString().includes("COMMON") || line.toString().includes("RARE") || line.toString().includes("EPIC") || line.toString().includes("LEGENDARY") || line.toString().includes("MYTHIC") || line.toString().includes("DIVINE") || line.toString().includes("SPECIAL")) type = line
  })
  let id = holding?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString("id")
  ChatLib.chat(`\nName: ${ holding?.getName() }\nRegistry Name: ${ holding?.getRegistryName() }\nSkyblock ID: ${ id }\nEnchanted: ${ holding?.isEnchanted() }\nType: ${ type }\n`)
}).setName("itemInfo", true).setAliases("item");

register("command", () => {
  let looking = Player.lookingAt()
  if (!looking.toString().startsWith("Entity")) {
    ChatLib.chat(looking) 
    return
  }
  ChatLib.chat(`\nName: ${looking.getName()}\nEntityType: ${looking.getClassName()}\nPos: ${looking.getPos()}\nHP: ${comma(looking.getEntity().func_110143_aJ())}/${comma(looking.getEntity().func_110148_a(Java.type('net.minecraft.entity.SharedMonsterAttributes').field_111267_a).func_111125_b())}\n`)
}).setName("entityInfo", true).setAliases("entity");

register("command", () => {
  var playerX = Player.getX();
  var playerY = Player.getY();
  var playerZ = Player.getZ();
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
  let seconds = parseInt(time % 60)
  return `Time: &a${fixLength(minutes)}m ${fixLength(seconds)}s`
}

register("command", (p1, p2, p3, p4, tokens) => {
  p1 = parseFloat(p1)
  p2 = parseFloat(p2)
  p3 = parseFloat(p3)
  p4 = parseFloat(p4)

  let run = Math.round(p1 + p2 + p3 + p4)
  run = timeFormat(run)

  ChatLib.chat("&a&l▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")
  ChatLib.chat(`&dSupplies &bin ${ p1.toFixed(2) } seconds`)
  ChatLib.chat(`&bBallista in ${p2.toFixed(2)} seconds `)
  ChatLib.chat(`&cKuudra &bin ${ p3.toFixed(2) } seconds`)
  ChatLib.chat(`&aCleared &bin ${ p4.toFixed(2) } seconds`)
  ChatLib.chat(ChatLib.getCenteredText("&6&lKUUDRA DOWN! &r&c&lThis is a FAKE command!"))
  ChatLib.chat(ChatLib.getCenteredText("&8Percentage Complete: &r100%"))
  ChatLib.chat(ChatLib.getCenteredText(`${run}`))
  ChatLib.chat(ChatLib.getCenteredText(`Tokens Earned: &5${tokens}`))
  ChatLib.chat("&a&l▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")
}).setName("fakePB", true);

register("command", (...args) => {
  ChatLib.chat(ChatLib.getCenteredText(`&r&b&m--------------&rCalc&r&b&m--------------`));
  ChatLib.chat(ChatLib.getCenteredText(`&b${ args.join(" ") }`))
  let loop = 0
  args.forEach(arg => {
    if (arg.match(/(\*|\/|\+|\-)/g)) loop++
  })
  args = args.concat("")
  let equation = args.join(" ")
  equation = equation.replaceAll(/[^0-9+\-*/\s.]/g, "")
  while (equation.includes(" * ") || equation.includes(" / ")) {
    if (loop < 0) {
      ChatLib.chat(ChatLib.getCenteredText(`&b&cERROR`));
      ChatLib.chat(ChatLib.getCenteredText(`&b&m--------------------------------&r`))
      return
    }
    loop--
    if (equation.includes(" * ")) {
      let before = equation.substring(0, equation.indexOf("*") - 1);
      before = before.substring(before.lastIndexOf(" "));
      before = before.replaceAll(" ", "")
      let after = equation.substring(equation.indexOf("*") + 2);
      after = after.substring(0, after.indexOf(" "));
      after = after.replaceAll(" ", "")
      let result = parseFloat(before) * parseFloat(after);
      equation = equation.replace(`${ before } * ${ after }`, `${ result }`);
    }
    else if (equation.includes(" / ")) {
      let before = equation.substring(0, equation.indexOf("/") - 1);
      before = before.substring(before.lastIndexOf(" "));
      before = before.replaceAll(" ", "")
      let after = equation.substring(equation.indexOf("/") + 2);
      after = after.substring(0, after.indexOf(" "));
      after = after.replaceAll(" ", "")
      let result = parseFloat(before) / parseFloat(after);
      equation = equation.replace(`${ before } / ${ after }`, `${ result }`);
    }
    // console.log(equation)
  }
  while (equation.includes(" + ") || equation.includes(" - ")) {
    if (loop < 0) {
      ChatLib.chat(ChatLib.getCenteredText(`&b&cERROR`));
      ChatLib.chat(ChatLib.getCenteredText(`&b&m--------------------------------&r`))
      return
    }
    loop--
    if (equation.includes(" + ")) {
      let before = equation.substring(0, equation.indexOf("+") - 1);
      before = before.substring(before.lastIndexOf(" "));
      before = before.replaceAll(" ", "")
      let after = equation.substring(equation.indexOf("+") + 2);
      after = after.substring(0, after.indexOf(" "));
      after = after.replaceAll(" ", "")
      let result = parseFloat(before) + parseFloat(after);
      equation = equation.replace(`${ before } + ${ after }`, `${ result }`);
    }
    else if (equation.includes(" - ")) {
      let before = equation.substring(0, equation.indexOf("-") - 1);
      before = before.substring(before.lastIndexOf(" "));
      before = before.replaceAll(" ", "")
      let after = equation.substring(equation.indexOf("-") + 2);
      after = after.substring(0, after.indexOf(" "));
      after = after.replaceAll(" ", "")
      let result = parseFloat(before) - parseFloat(after);
      equation = equation.replace(`${ before } - ${ after }`, `${ result }`);
    }
    // console.log(equation)
  }
  ChatLib.chat(ChatLib.getCenteredText(`&b${ equation.slice(0, -1) }`));
  ChatLib.chat(ChatLib.getCenteredText(`&b&m--------------------------------&r`))
}).setName("calc", true)

register("command", (num) => {
  ChatLib.chat(ChatLib.getCenteredText(`&r&b&m--------------&rStacks&r&b&m--------------`));
  ChatLib.chat(ChatLib.getCenteredText(`&b${ num }`))
  ChatLib.chat(ChatLib.getCenteredText(`&b${Math.trunc(parseInt(num) / 64)} stacks and ${parseInt(num) % 64}`));
  ChatLib.chat(ChatLib.getCenteredText(`&b&m----------------------------------&r`))
}).setName("stacks", true);

register("command", (...args) => {
  ChatLib.chat(ChatLib.getCenteredText(`&r&b&m--------------&rAvg&r&b&m--------------`));
  ChatLib.chat(ChatLib.getCenteredText(`&b${ args.join(", ") }`))
  let result = 0
  args.forEach(arg => result += parseFloat(arg))
  ChatLib.chat(ChatLib.getCenteredText(`&b${ result / args.length }`));
  ChatLib.chat(ChatLib.getCenteredText(`&b&m-----------------------------&r`))
}).setName("avg", true);

register("command", () => {
  let looking = Player.lookingAt()
  if (looking?.getClassName() == "EntityOtherPlayerMP") ChatLib.command(`trade ${looking?.getName()}`)
}).setName("deal", true);

/*
function distance ([...p1], [...p2]) {
  if (p1.length == 3 && p2.length == 3) return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2) + Math.pow(p2[2] - p1[2], 2))
  else if (p1.length == 2 && p2.length == 2) return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2))
  else return undefined
}

function atrLvl(start, end) {
  let result = Math.pow(2, Math.abs(start - end))
  return result
}

function c(coins, lvl, per) {
  let result = Math.pow(2, Math.abs(per - lvl))
  return coins / result
}
*/
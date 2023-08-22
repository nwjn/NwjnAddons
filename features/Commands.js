import { comma } from "../utils/constants";
  
register("command", (arg) => {
  if (arg == 3) {
    new Thread(() => {
      ChatLib.say(`/pc 3`)
      Thread.sleep(1000)
      ChatLib.say(`/pc 2`)
      Thread.sleep(1000)
      ChatLib.say(`/pc 1`)
      Thread.sleep(1000)
      ChatLib.say(`/pc Go!`)
    }).start()
  }
  else if (arg == 5) {
    new Thread(() => {
      ChatLib.say(`/pc 5`)
      Thread.sleep(1000)
      ChatLib.say(`/pc 4`)
      Thread.sleep(1000)
      ChatLib.say(`/pc 3`)
      Thread.sleep(1000)
      ChatLib.say(`/pc 2`)
      Thread.sleep(1000)
      ChatLib.say(`/pc 1`)
      Thread.sleep(1000)
      ChatLib.say(`/pc Go!`)
    }).start()
  }
}).setName('countdown', true);

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
  ChatLib.chat(`\nName: ${ holding?.getName() }\nRegistry Name: ${ holding?.getRegistryName() }\nSkyblock ID: ${ id }\nEnchanted: ${ holding?.isEnchanted() }\nType: ${ type }`)
  
  id = id.toLowerCase().replace(/(^\w|_\w)/g, c => c.toUpperCase());
  if (id.startsWith("Abiphone")) id = "Abiphone"
  new Message().addTextComponent(new TextComponent(`Official Wiki: https://wiki.hypixel.net/${ id }`).setClick('open_url', `https://wiki.hypixel.net/${ id }`)).chat()
  if (id == "Abiphone") id = "Abiphones"
  let lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At', 
    'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With']
  id = id.split("_")
  id.forEach(str => {
    if (lowers.includes(str)) {
      id[id.indexOf(str)] = str.toLowerCase()
    }
  })
  id = id.join('_')
  new Message().addTextComponent(new TextComponent(`Fandom Wiki: https://hypixel-skyblock.fandom.com/wiki/${id}?so=search\n`).setClick('open_url', `https://hypixel-skyblock.fandom.com/wiki/${id}?so=search`)).chat()
}).setName("itemInfo");

register("command", () => {
  let looking = Player.lookingAt()
  if (!looking.toString().startsWith("Entity")) {
    ChatLib.chat(looking)
    return
  }
  ChatLib.chat(`\nName: ${looking.getName()}\nEntityType: ${looking.getClassName()}\nPos: ${looking.getPos()}\nHP: ${comma(looking.getEntity().func_110143_aJ())}/${comma(looking.getEntity().func_110148_a(Java.type('net.minecraft.entity.SharedMonsterAttributes').field_111267_a).func_111125_b())}\n`)
}).setName("entityInfo");

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

register("command", (arg) => {
  new Thread(() => {
    ChatLib.say(`/party transfer ${ arg }`)
    Thread.sleep(500)
    ChatLib.say(`/party leave`)
  }).start()
}).setName("leavePT");
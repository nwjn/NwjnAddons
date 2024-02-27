import settings from "../config";
import renderBeaconBeam from "BeaconBeam"
import RenderLib from "RenderLib"
import { registerWhen } from "../utils/functions";
import { getWorld } from "../utils/world";
  
registerWhen(register("renderEntity", (entity, position, ticks, event) => {
  if (!entity.toString().removeFormatting().includes(["[Lv"])) return
  cancel(event)
}), () => settings.kuudraTags && getWorld() == "Kuudra")

let freshies = []
registerWhen(register("chat", () => {
  ChatLib.say(`/pc FRESH! (${build})`)
}).setCriteria("Your Fresh Tools Perk bonus doubles your building speed for the next 10 seconds!"), () => settings.fresh && getWorld() == "Kuudra")

registerWhen(register("chat", () => {
  freshies = []
}).setCriteria("[NPC] Elle: Phew! The Ballista is finally ready! It should be strong enough to tank Kuudra's blows now!"), () => settings.fresh && getWorld() == "Kuudra")

registerWhen(register("chat", (supply, event) => {
  let name = new Message(event).getFormattedText()
  name = name.toString().substring(0, name.indexOf("recovered") - 7)
  cancel(event);
  let time = undefined
  Scoreboard.getLines().forEach(line => {
    if (line.toString().includes("Time Elapsed"))
      time = line.toString()
  })
  time = time?.substring(time?.indexOf(":") + 2)
  ChatLib.chat(`${name} &a&lrecovered a supply at ${time}! &r&8(${supply}/6)`)
}).setCriteria("${*} recovered one of Elle's supplies! (${supply}/6)"), () => settings.customSupply && getWorld() == "Kuudra")

let supply1 = false
let supply2 = false
let supply3 = false
let supply4 = false
let supply5 = false
let supply6 = false
let x1 = 0
let z1 = 0
let x2 = 0
let z2 = 0
let x3 = 0
let z3 = 0
let x4 = 0
let z4 = 0
let x5 = 0
let z5 = 0
let x6 = 0
let z6 = 0
let x = 0
let y = 78
let z = 0
let fuel = 0
let build = 0

registerWhen(register("renderWorld", () => {
  if (settings.teammates) {
    World.getAllEntitiesOfType(Java.type("net.minecraft.client.entity.EntityOtherPlayerMP").class).forEach(player => {
      let ping = World.getPlayerByName(player.getName())?.getPing();
      if (ping != 1) return;
      RenderLib.drawEspBox(player.getX(), player.getY(), player.getZ(), 1, 2, settings.teammateColor.getRed() / 255, settings.teammateColor.getGreen() / 255, settings.teammateColor.getBlue() / 255, 1, false);
    })
  }
  if (settings.pearl) {
    // Triangle
    RenderLib.drawInnerEspBox(-97, 157, -112, settings.pearlBox, settings.pearlBox, 2, 0, 0, 1, true);
    RenderLib.drawEspBox(-70.5, 79, -134.5, 1, 1, 2, 0, 0, 1, false);
    RenderLib.drawEspBox(-85.5, 78, -128.5, 1, 1, 2, 0, 0, 1, false); 
    RenderLib.drawInnerEspBox(-95.5, 161, -105.5, settings.pearlBox, settings.pearlBox, 2, 0, 1, 1, true);
    RenderLib.drawEspBox(-67.5, 77, -122.5, 1, 1, 2, 0, 1, 1, false);
    // X
    RenderLib.drawInnerEspBox(-103, 160, -109, settings.pearlBox, settings.pearlBox, 1, 1, 1, 1, true);
    RenderLib.drawEspBox(-134.5, 77, -138.5, 1, 1, 1, 1, 1, 1, false);
    RenderLib.drawEspBox(-130.5, 79, -113.5, 1, 1, 1, 1, 1, 1, false);
    // Square
    RenderLib.drawInnerEspBox(-110, 155, -106, settings.pearlBox, settings.pearlBox, 0, 1, 1, 1, true);
    RenderLib.drawInnerEspBox(-43.5, 120, -149.5, settings.pearlBox, settings.pearlBox, 0, 1, 1, 1, true)
    RenderLib.drawInnerEspBox(-45.5, 135, -138.5, settings.pearlBox, settings.pearlBox, 0, 1, 1, 1, true)
    RenderLib.drawInnerEspBox(-35.5, 138, -124.5, settings.pearlBox, settings.pearlBox, 0, 1, 1, 1, true)
    RenderLib.drawInnerEspBox(-26.5, 126, -111.5, settings.pearlBox, settings.pearlBox, 0, 1, 1, 1, true)
    RenderLib.drawEspBox(-140.5, 78, -90.5, 1, 1, 0, 1, 1, 1, false);
    // =
    RenderLib.drawInnerEspBox(-106, 165, -101, settings.pearlBox, settings.pearlBox, 0, 1, 0, 1, true);
    RenderLib.drawEspBox(-65.5, 76, -87.5, 1, 1, 0, 1, 0, 1, false);
    // /
    RenderLib.drawInnerEspBox(-105, 157, -100, settings.pearlBox, settings.pearlBox, 0, 0, 1, 1, true);
    RenderLib.drawEspBox(-113.5, 77, -68.5, 1, 1, 0, 0, 1, 1, false);
  }
  if (settings.inBuild) {
    World.getAllEntitiesOfType(Java.type("net.minecraft.entity.item.EntityArmorStand").class).forEach(stand => {
      name = stand.getName();
      if (name.includes("Building Progress")) {
        name = ChatLib.removeFormatting(name.substring(19, 25));
        build = name.replaceAll(" ", "")
        Tessellator.drawString(build, stand.getX(), stand.getY() + 7, stand.getZ(), 0xffffff, false, 0.5, false);
      }
      else if (name.includes("PROGRESS: ") && name.includes("%")) {
        Tessellator.drawString(name, stand.getX(), stand.getY() + 2.475, stand.getZ(), 0xff0000, false, 0.02665, false);
        renderBeaconBeam(stand.getX(), stand.getY(), stand.getZ(), 1, 0, 0, 1, true, 100)
      }
      else if (name.includes("Energy Charge: 0%")) fuel = 0
      if (fuel > 0) Tessellator.drawString(`${ fuel }%`, -101.5, 91.125, -105.5, 0xffffff, false, 0.5, false);
    })
  }
  Scoreboard.getLines().forEach(line => {
    line = ChatLib.removeFormatting(line.getName())
    if (line.includes("/6)")) {
      if (settings.supplyWaypoints) {
        World.getAllEntitiesOfType(Java.type("net.minecraft.entity.monster.EntityGiantZombie").class).forEach(giant => {
          if (giant?.getEntity()?.func_70694_bm()?.toString() != "1xitem.skull@3") return
          // giant.getEntity().func_82142_c(false)
          let yaw = giant.getYaw();
          renderBeaconBeam(giant.getX() + (3.7 * Math.cos((yaw + 130) * (Math.PI / 180))), giant.getEyeHeight() - 3, giant.getZ() + (3.7 * Math.sin((yaw + 130) * (Math.PI / 180))), 0, 1, 1, 1, true, 200);
        });
      }
      if (settings.supply) {
        if (supply1 == true) {
          renderBeaconBeam(x1, y, z1, 1, 1, 1, 1, true, 100);
        }
        if (supply2 == true) {
          renderBeaconBeam(x2, y, z2, 1, 1, 1, 1, true, 100);
        }
        if (supply3 == true) {
          renderBeaconBeam(x3, y, z3, 1, 1, 1, 1, true, 100);
        }
        if (supply4 == true) {
          renderBeaconBeam(x4, y, z4, 1, 1, 1, 1, true, 100);
        }
        if (supply5 == true) {
          renderBeaconBeam(x5, y, z5, 1, 1, 1, 1, true, 100);
        }
        if (supply6 == true) {
          renderBeaconBeam(x6, y, z6, 1, 1, 1, 1, true, 100);
        }
        World.getAllEntitiesOfType(Java.type("net.minecraft.entity.item.EntityArmorStand").class).forEach(stand => {
          x = Math.trunc(stand.getX());
          z = Math.trunc(stand.getZ());
          if ((x == -98) && (z == -112) && (stand.getName().includes("BRING SUPPLY CHEST HERE"))) {
            supply1 = true;
            x1 = x;
            z1 = z;
          }
          else if ((x == -98) && (z == -112) && (stand.getName().includes("SUPPLIES RECEIVED"))) {
            supply1 = false
          }
          else if ((x == -98) && (z == -99) && (stand.getName().includes("BRING SUPPLY CHEST HERE"))) {
            supply2 = true;
            x2 = x;
            z2 = z;
          }
          else if ((x == -98) && (z == -99) && (stand.getName().includes("SUPPLIES RECEIVED"))) {
            supply2 = false
          }
          else if ((x == -110) && (z == -106) && (stand.getName().includes("BRING SUPPLY CHEST HERE"))) {
            supply3 = true;
            x3 = x;
            z3 = z;
          }
          else if ((x == -110) && (z == -106) && (stand.getName().includes("SUPPLIES RECEIVED"))) {
            supply3 = false
          }
          else if ((x == -106) && (z == -112) && (stand.getName().includes("BRING SUPPLY CHEST HERE"))) {
            supply4 = true;
            x4 = x;
            z4 = z;
          }
          else if ((x == -106) && (z == -112) && (stand.getName().includes("SUPPLIES RECEIVED"))) {
            supply4 = false
          }
          else if ((x == -94) && (z == -106) && (stand.getName().includes("BRING SUPPLY CHEST HERE"))) {
            supply5 = true;
            x5 = x;
            z5 = z;
          }
          else if ((x == -94) && (z == -106) && (stand.getName().includes("SUPPLIES RECEIVED"))) { 
            supply5 = false
          }
          else if ((x == -106) && (z == -99) && (stand.getName().includes("BRING SUPPLY CHEST HERE"))) {
            supply6 = true;
            x6 = x;
            z6 = z;
          }
          else if ((x == -106) && (z == -99) && (stand.getName().includes("SUPPLIES RECEIVED"))) {
            supply6 = false
          }
        })
      }
    }
  })
  if (settings.fresh) {
    if (freshies.length == 0) return
    freshies.forEach(fresher => {
      let fresh = World.getPlayerByName(fresher)
      if (fresher == Player.getName()) return
      RenderLib.drawInnerEspBox(fresh.getX(), fresh.getY(), fresh.getZ(), settings.freshWidth, settings.freshHeight, 0, 1, 0, 0.5, false)
    })
  }
}), () => getWorld() == "Kuudra")

registerWhen(register("chat", (percent) => {
  fuel = percent
}).setCriteria("${*} recovered a Fuel Cell and charged the Ballista! (${percent}%)"), () => getWorld() == "Kuudra" && settings.inBuild)

registerWhen(register("chat", (player) => {
  if (player.includes("]")) {
    player = player.substring(player.indexOf(" ") + 1)
  }
  if (player.includes(" ")) {
    player = player.substring(0, player.indexOf(" "))
  }
  freshies.push(player)
  setTimeout(() => {
    freshies.splice(freshies.indexOf(player), 1)
  }, 10000);
}).setCriteria("Party > ${player}: FRESH!").setContains(), () => settings.fresh && getWorld() == "Kuudra")

register("worldUnload", () => {
  supply1 = false
  supply2 = false
  supply3 = false
  supply4 = false
  supply5 = false
  supply6 = false
  x1 = 0
  z1 = 0
  x2 = 0
  z2 = 0
  x3 = 0
  z3 = 0
  x4 = 0
  z4 = 0
  x5 = 0
  z5 = 0
  x6 = 0
  z6 = 0
  x = 0
  y = 78
  z = 0
  fuel = 0
  build = 0
});
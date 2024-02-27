export const comma = (num) => {
  if(num == undefined) return;
  return num.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const version = (JSON.parse(FileLib.read("NwjnAddons", "metadata.json"))).version

export const consts = {
  PREFIX: "&d&l[NwjnAddons]&r",
  WIP: "&cThis feature is still in development!",
};

export const ARMOR_STANDS = Java.type("net.minecraft.entity.item.EntityArmorStand").class
export const PLAYERS = Java.type("net.minecraft.client.entity.EntityOtherPlayerMP").class
export const MAGMA_CUBES = Java.type(`net.minecraft.entity.monster.EntityMagmaCube`).class
export const GIANT_ZOMBIES = Java.type("net.minecraft.entity.monster.EntityGiantZombie").class
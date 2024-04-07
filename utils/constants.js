export const comma = (num) => {
  if (num.toString()?.includes(".")) {
    const [intVal, floatVal] = num.toString()?.split(".")
    return intVal.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "." + floatVal
  }
  return num.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const version = (JSON.parse(FileLib.read("NwjnAddons", "metadata.json"))).version

export const consts = {
  PREFIX: "&d&l[NwjnAddons]&r",
  WIP: "&cThis feature is still in development!",
};

export const EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand")
export const EntityPlayer = Java.type("net.minecraft.client.entity.EntityOtherPlayerMP")
export const EntityMagmaCube = Java.type(`net.minecraft.entity.monster.EntityMagmaCube`)
export const EntityGiant = Java.type("net.minecraft.entity.monster.EntityGiantZombie");
export const SMA = Java.type('net.minecraft.entity.SharedMonsterAttributes');
export const PLAYERMP = Player.asPlayerMP();
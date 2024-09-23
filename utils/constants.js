export const version = (JSON.parse(FileLib.read("NwjnAddons", "metadata.json"))).version

export const PREFIX = "§r§d§l[NwjnAddons]§r"

export const chatType = {
  0: "pc", // party
  1: "ac", // all
  2: "gc" // guild
};

export const shortNum = {
  undefined: 1,
  "k": 1_000,
  "m": 1_000_000,
  "b": 1_000_000_000
};

export const ENTITY = {
  "ArmorStand": Java.type("net.minecraft.entity.item.EntityArmorStand"),
  "Player": Java.type("net.minecraft.client.entity.EntityOtherPlayerMP"),
  "MagmaCube": Java.type(`net.minecraft.entity.monster.EntityMagmaCube`),
  "Giant": Java.type("net.minecraft.entity.monster.EntityGiantZombie"),
  "SMA": Java.type('net.minecraft.entity.SharedMonsterAttributes'),
  "JoinWorld": Java.type("net.minecraftforge.event.entity.EntityJoinWorldEvent")
};

export const PACKET = {
  "S0FPacketSpawnMob": Java.type("net.minecraft.network.play.server.S0FPacketSpawnMob")
}
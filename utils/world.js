import { delay, setRegisters } from "./functions";

// Credit: Adapted from volcaddons findworld
let world = undefined;
export function getWorld() { return world; };
let spawn = undefined;
export function getSpawn() { return spawn; };


function findWorld(noFind = 10) {
  if (!noFind) {
    world = undefined;
    return;
  }
  noFind--;
  world = TabList?.getNames()?.find(tab => tab?.match(/(Area|Dungeon)/g))?.removeFormatting();
  if (!world)
    delay(() => {
      findWorld(noFind)
    }, 500);
  else {
    world = world.substring(world.indexOf(': ') + 2);
    setRegisters();
  }
}

register("worldload", () => {
  trackJoin.register()
})

const trackJoin = register("playerJoined", (player) => {
  if (player.getName() != Player.getName()) return;
  [world, spawn] = [undefined, [~~player.getX(), ~~player.getY(), ~~player.getZ()]]
  setRegisters() // pre registerset so registers w/o world check arent delayed
  findWorld()
  trackJoin.unregister()
}).unregister();

// on ct load
spawn = [~~Player.getX(), ~~Player.getY(), ~~Player.getZ()]
findWorld();
delay(() => {
  setRegisters()
  trackJoin.unregister()
}, 1000)
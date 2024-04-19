import { delay, setRegisters } from "./functions";

// Credit: Adapted from volcaddons findworld
let world = undefined;
export function getWorld() { return world; };

function findWorld(noFind = 10) {
  if (!noFind) return;
  noFind--;
  world = TabList?.getNames()?.find(tab => tab?.match(/(Area|Dungeon)/g))?.removeFormatting();
  if (!world)
    delay(() => {
      findWorld(noFind)
    }, 1000);
  else {
    world = world.substring(world.indexOf(': ') + 2);
    setRegisters();
  }
}

register("worldLoad", () => {
  setRegisters()
  world = undefined
  findWorld()
})

// on ct load
world = undefined
findWorld();
delay(() => {
  setRegisters()
}, 1000);

export function resetWorld() {
  world = undefined
  findWorld()
}
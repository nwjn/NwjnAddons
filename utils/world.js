import { delay, setRegisters } from "./functions";

// Credit: Adapted from volcaddons findworld
let world = undefined;
export function getWorld() { return world; };

function findWorld(noFind = 10) {
  try {
    if (noFind == 10) world = undefined
    if (!noFind) return;
    noFind--;
    const tab = TabList.getNames()?.find(tab => tab?.match(/(Area|Dungeon)/g))?.removeFormatting();
    if (!tab)
      delay(() => {
        findWorld(noFind)
      }, 1000);
    else {
      world = tab.substring(tab.indexOf(': ') + 2);
      setRegisters();
    }
  } catch (err) {}
}

register("worldLoad", () => {
  setRegisters()
  findWorld()
})

// on ct load
findWorld();
delay(() => {
  setRegisters()
}, 1000);

export function resetWorld() {
  findWorld()
}
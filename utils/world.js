import { delay, setRegisters } from "./functions";

let game = undefined;
export function getGame() { return game; };
// Credit: volcaddons for findworld
let world = undefined;
export function getWorld() { return world; };
let noFind = 0;


function findWorld() {
  if (noFind == 10) return;
  noFind++;
  world = TabList?.getNames()?.find(tab => tab?.match(/(Area|Dungeon)/g))?.removeFormatting();
  if (!world)
    delay(() => {
      findWorld()
    }, 1000);
  else {
    world = world.substring(world.indexOf(': ') + 2);
    setRegisters();
  }
}

register("worldLoad", () => {
  noFind = 0;
  world = undefined
  findWorld()
});

register("worldUnload", () => {
  world = undefined
});

register("chat", () => {
  delay(() => {
    if (!world) return
    findWorld()
    setRegisters()
  }, 5000)
}).setCriteria(/Sending( you|) to( server|) (mini|mega)[0-9A-Z]+(\.\.\.|!)/g);
import Settings from "../config";
// import "./utils/entities"


// Bestiary Tracker, Tracks the bestiary mobs of the island you're in, needs to grab all possible regions of island from sidebar location

// Hub: Wilderness: Spooky | Ruins, Graveyard: Wolves, Zombies
// Park: Howling Cave: Wolves
// Den: Spider's Den: Spiders, slimes, and skeletons
// End: The End, Bruiser's Hideout, Void Sepulture: Enderman, Watcher, Obsidian Defender, Zealot, Endermite, Dragon, Golem, Voidling Fanatic, Voidling Extremist
// Crimson Isle

let inSB = false;

// make it so it ticks a little after worldload somehow or 
// "just use a tick trigger or something to check the scoreboard and once it's found then set inSkyblock to true or whatever and stop checking until the next worldLoad"
register("tick", () => {
  let Title = Scoreboard.getTitle().removeFormatting();
  // console.log(Title)
  // ChatLib.chat(Title)
  if (Title == "SKYBLOCK") {
    // console.log("You are in Skyblock")
    inSB = true;
    console.log("Should be true:", inSB)
  }
  else {
    // console.log("You are not in Skyblock")
    inSB = false;
    console.log("Should be false:", inSB)
  }
  register("worldUnload", () => {
  })
})
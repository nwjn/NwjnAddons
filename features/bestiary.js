import Settings from "../config";
// import "./utils/entities"

let inSB = false;

// make it so it ticks a little after worldload somehow or 
// "just use a tick trigger or something to check the scoreboard and once it's found then set inSkyblock to true or whatever and stop checking until the next worldLoad" - dude from Chattriggers discord
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
})
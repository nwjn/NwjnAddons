import { delay } from "./functions";
import { PREFIX } from "./constants";

function getPlayerName(player) {
  let name = player;
  let nameIndex = name.indexOf(']');

  while (nameIndex !== -1) {
    name = name.substring(nameIndex + 2);
    nameIndex = name.indexOf(']');
  }

  return name.split(' ')[0];
}

// --- VARIABLES ---

// The player's in-game name
let ign = Player.getName();

// Variables to track party status and leadership
let inParty = false;
export function getInParty() { return inParty };

let party = new Set();
export function getParty() { return party };

let isLeader = false;
export function getIsLeader() { return isLeader };


// --- TRACK PARTY ---

// Event handler for detecting when the party is opened (tracks /stream open x)
register("chat", () => {
  inParty = true;
  isLeader = true;
}).setCriteria("Party is capped at ${*} players.");

// Event handler for detecting when the party is disbanded (/p disband)
register("chat", () => {
  inParty = false;
  isLeader = false;
}).setCriteria("${*} has disbanded the party!");

// Event handler for detecting an empty party (party disbands when all invites expire and it's empty)
register("chat", () => {
  inParty = false;
  isLeader = false;
}).setCriteria("The party was disbanded because all invites expired and the party was empty.");

// Event handler for detecting when a player leaves the party (/p leave)
register("chat", () => {
  inParty = false;
  isLeader = false;
  party = new Set();
}).setCriteria("You left the party.");

// Not in party
register("chat", () => {
  inParty = false;
  isLeader = false;
}).setCriteria("You are not${*}in a party${*}");


// --- TRACK PARTY LEADER ---

// Event handler for detecting party leadership transfers
register("chat", (player1) => {
  isLeader = ign === getPlayerName(player1);
}).setCriteria("The party was transferred to ${player1} by ${*}");

// Event handler for detecting party leadership transfers due to player leaving
register("chat", (player1) => {
  isLeader = ign === getPlayerName(player1);
}).setCriteria("The party was transferred to ${player1} because ${*} left");

// Event handler for detecting party leadership transfers due to promotion
register("chat", (player2) => {
  isLeader = ign === getPlayerName(player2);
}).setCriteria("${*} has promoted ${player2} to Party Leader");


// --- TRACK PARTY INTERACTIONS ---

// Event handler for detecting when a player first joins the party
register("chat", () => {
  isLeader = false;
  inParty = true;
}).setCriteria("You have joined ${*}'s party!");

// Event handler for detecting when a player is kicked from the party
register("chat", () => {
  inParty = false;
  party = new Set();
}).setCriteria("You have been kicked from the party by ${player}");

// --- CONTROL FOR GAME/CT RS ---
const checkParty = () => {
  ChatLib.chat(`${PREFIX}: Running party list...`)
  delay(() => { ChatLib.command("p list"); }, 500);
}

// Event handler for game load
register("gameLoad", () => {
  ign = Player.getName();
  checkParty()
});

// Event handler for detecting game chat message (Welcomes players to Hypixel SkyBlock)
register("chat", () => {
  ign = Player.getName();
  checkParty()
}).setCriteria("Welcome to Hypixel SkyBlock!");

// Remove message on restart
register("chat", (leader) => {
  const player = getPlayerName(leader);
  isLeader = ign === player;
  inParty = true;
  if (player === Player.getName()) return;
  party.add(player);
}).setCriteria("Party Leader: ${leader} ●");

// Track party members
register("chat", (members) => {
  members.split(" ● ").forEach(member => {
      const name = getPlayerName(member);
      if (name === Player.getName()) return;
      party.add(name);
  });
}).setCriteria("Party Moderators: ${members} ● ");

register("chat", (members) => {
  members.split(" ● ").forEach(member => {
      const name = getPlayerName(member);
      if (name === Player.getName()) return;
      party.add(name);
  });
}).setCriteria("Party Members: ${members} ● ");

register("chat", (player) => {
  const name = getPlayerName(player);
  if (name === Player.getName()) return;
  party.delete(name);
}).setCriteria("${player} has been removed from the party.");
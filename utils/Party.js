import { delay, extractIGN } from "./functions";
import { PREFIX } from "./constants";

// --- VARIABLES ---

// The player's in-game name
let ign = Player.getName();

let isLeader = false;
export function getIsLeader() { return isLeader };


// --- TRACK PARTY ---

// Event handler for detecting when the party is disbanded (/p disband)
register("chat", () => {
  isLeader = false;
}).setCriteria("${*} has disbanded the party!");

// Event handler for detecting an empty party (party disbands when all invites expire and it's empty)
register("chat", () => {
  isLeader = false;
}).setCriteria("The party was disbanded because all invites expired and the party was empty.");

// Event handler for detecting when a player leaves the party (/p leave)
register("chat", () => {
  isLeader = false;
}).setCriteria("You left the party.");

// Not in party
register("chat", () => {
  isLeader = false;
}).setCriteria("You are not${*}in a party${*}");


// --- TRACK PARTY LEADER ---

// Event handler for detecting party leadership transfers
register("chat", (player1) => {
  isLeader = ign === extractIGN(player1);
}).setCriteria("The party was transferred to ${player1} by ${*}");

// Event handler for detecting party leadership transfers due to player leaving
register("chat", (player1) => {
  isLeader = ign === extractIGN(player1);
}).setCriteria("The party was transferred to ${player1} because ${*} left");

// Event handler for detecting party leadership transfers due to promotion
register("chat", (player2) => {
  isLeader = ign === extractIGN(player2);
}).setCriteria("${*} has promoted ${player2} to Party Leader");


// --- TRACK PARTY INTERACTIONS ---

// --- CONTROL FOR GAME/CT RS ---
const checkParty = () => {
  ChatLib.chat(`${PREFIX}: Running party list...`)
  delay(() => { ChatLib.command("p list"); }, 500);
}

// Event handler for game load
register("gameLoad", () => {
  checkParty()
});

// Remove message on restart
register("chat", (leader) => {
  const player = extractIGN(leader);
  isLeader = ign === player;
}).setCriteria("Party Leader: ${leader} ●");
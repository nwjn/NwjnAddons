/**
 * Strips rank and tags from player
 *
 * @param {String} player
 * @returns {String} Player base ign
 */
export function getPlayerName(player) {
  return player.split("] ").slice(-1).toString().replace(/[^\w_]/g, "")
}

  /**
   * Checks if the player entity is a real user
   * @param {PlayerMP} player 
   * @returns {Boolean}
   */
export function realPlayer(player) {
  return (player?.getPing() === 1)
}
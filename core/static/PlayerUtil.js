export default class PlayerUtil {
    /**
     * Strips rank and tags from player
     * @param {String} string
     * @returns {String} Player ign
     */
    static getPlayerName = (string) => string.removeFormatting()?.split("] ")?.slice(-1)?.toString()?.replace(/\W/g, "")

    /**
     * Checks if the player entity is a real user
     * @param {PlayerMP} player 
     * @returns {Boolean}
     */
    static realPlayer = (player) => player.getPing() === 1
}
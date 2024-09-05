export default class PlayerUtil {
  static myIGN = Player.getName()
  /**
   * Gets the name of a player from their chat message
   * @param {String} message 
   * @param {Boolean} formatting 
   * @returns {String}
   */
  static getIgnFromChatMessage(message, formatting = false) {
    if (formatting) return message?.split("] ")?.slice(-1)?.toString()?.replace(/[^A-Za-z0-9_§&]/g, "")
    return message?.removeFormatting()?.split("] ")?.slice(-1)?.toString()?.replace(/[^A-Za-z0-9_]/g, "")
  }

  /**
   * Gets the prefix text of guild, party, or co-op message
   * @param {String} message 
   * @returns {String}
   */
  static getMessagePrefix(message) {
    return message?.split("> ")?.slice(-1)?.toString()
  }

  /**
   * Checks if the player entity is a person
   * @param {PlayerMP} player 
   * @returns {Boolean}
   */
  // static realPlayer(player) {
  //   return (player?.getUUID()?.version() === 4)
  // }

  /**
   * Checks if the player entity is a person
   * @param {PlayerMP} player 
   * @returns {Boolean}
   */
  static realPlayer(player) {
    return (player?.getPing() === 1)
  }
}
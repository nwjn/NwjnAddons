export default class EntityUtil {
  static #SMA = Java.type("net.minecraft.entity.SharedMonsterAttributes")

  /**
   * @param {Entity} entity 
   * @returns {Number}
   */
  static getMaxHP(entity) {
    return entity.getEntity().func_110148_a(this.#SMA.field_111267_a).func_111125_b()
  }

  /**
   * @param {Entity} entity 
   * @returns {Number}
   */
  static getNowHP(entity) {
    return entity.getEntity().func_110143_aJ()
  }
}
export default class MobUtil {
    /**
     * Used for general removing
     * @param {MCTEntity} entity 
     */
    static removeEntity(entity) {
        World.getWorld()?./* removeEntity */func_72900_e(entity)
    }
    
    /** 
     * General entity removal by id
     * @param {number} id
     * @returns {?MCTEntity} removed entity or null
    */
    static removeEntityByID(id) {
        return World.getWorld()?./* removeEntityFromWorld */func_73028_b(id)
    }

    /**
     * Used for removing if entity is known to not be a player entity
     * @param {MCTEntity} entity
     */
    static setDead(entity) {
        entity./* setDead */func_70106_y()
    }

    /**
     * @param {number} id 
     * @returns {?MCTEntity}
     */
    static getEntityByID(id) {
        return World.getWorld()./* getEntityByID */func_73045_a(id)
    }

    /**
     * todo add derpy check
     * @param {MCTEntity} entity 
     * @returns {number} floored value or 0
     */
    static getMaxHP(entity) {
        return entity
            ?./* getAttributeMap */func_110140_aT()
            ?./* getAttributeInstanceByName */func_111152_a("generic.maxHealth")
            ?./* getBaseValue */func_111125_b()
            | 0

    }

    /**
     * @param {MCTEntity} entity 
     * @returns {number} floored value or 0
     */
    static getHP(entity) {
        return entity
            ?./* getHealth */func_110143_aJ()
            | 0
    }
}
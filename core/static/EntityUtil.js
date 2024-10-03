export default class EntityUtil {
    /**
     * @param {MCTEntity|Entity} entity 
     * @returns {MCTEntity} the mcEntity
     */
    static getEntity = (entity) => entity?.entity ?? entity

    /**
     * - Credit: SkyHanni
     * - Gets the correspond armor stand tag of the entity
     * @param {MCTEntity|Entity} entity 
     * @returns {MCTEntity} The armor stand entity
     */
    static getMobStandTag(entity) {
        entity = this.getEntity(entity)

        if (Player.asPlayerMP().distanceTo(entity) > 16) return null // hypixel won't render stands from over 16 blocks away

        const tagEntity =
            World.getWorld().func_73045_a( // getEntityByID
                entity.func_145782_y() + 1 // getEntityID, + 1 gets next entity
            )

        return (
            tagEntity instanceof net.minecraft.entity.item.EntityArmorStand
            &&
            /§r §[^a]0(§f\/|§c❤)/g.test(tagEntity.func_95999_t()) // tests if the nametag of the stand is hp tag
        ) ? tagEntity : null
    }

    /**
     * Gets the Max HP of the entity
     * @param {MCTEntity|Entity} entity 
     * @returns {Number} maxhealth int
     */
    static getMaxHP = (entity) => ~~this.getEntity(entity)
        .func_110138_aP() // getMaxHealth

    /**
     * Gets the current HP of the entity
     * @param {MCTEntity|Entity} entity 
     * @returns {Number} hp int
     */
    static getHP = (entity) => ~~this.getEntity(entity)
        .func_110143_aJ() // getHealth
}
// import Frustum from "./Frustum"
const AxisAlignedBB = net.minecraft.util.AxisAlignedBB
const RenderManager = Renderer.getRenderManager()

export default class RenderHelper {
    // static getRenderYaw = () => RenderManager./* playerViewX */field_78732_j

    // static getRenderPitch = () => RenderManager./* playerViewY */field_78735_i

    // static getRenderPos() {
    //     return {
    //         rx: Frustum.getRenderX(),
    //         ry: Frustum.getRenderY(),
    //         rz: Frustum.getRenderZ()
    //     }
    // }

    // /**
    //  *
    //  * @param {Number} dx
    //  * @param {Number} dy
    //  * @returns {Number}
    //  * @link https://www.flipcode.com/archives/Fast_Approximate_Distance_Functions.shtml
    //  */
    // static fastDistance(dx, dy) {
    //     if (dx < 0) dx = -dx;
    //     if (dy < 0) dy = -dy;
    
    //     let min, max;
    //     if (dx < dy) {
    //         min = dx;
    //         max = dy;
    //     } else {
    //         min = dy;
    //         max = dx;
    //     }

    //     let approx = (max * 1007) + (min * 441);
    //     if (max < (min << 4)) approx -= (max * 40);
    
    //     return ((approx + 512) >> 10);
    // }
    
    // /**
    //  * @param {number} oldValue
    //  * @param {Number} newValue
    //  * @param {Number} mult
    //  * @returns {Number}
    //  */
    // static lerp(oldValue, newValue, mult) {
    //     return oldValue + (newValue - oldValue) * mult;
    // }

    // static inFrustum = (aabb) => Frustum.isAABBInFrustum(aabb)

    // static isBoundsInFrustum = (x, y, z, w, h) => Frustum.isBoxInFrustum(...RenderHelper.createBounds(x, y, z, w, h))

    // static isEntityInFrustum = (entity) => Frustum.isAABBInFrustum(entity./* getEntityBoundingBox */func_174813_aQ())

    static getAxisCoords(aabb) {
        return [
            aabb./* minX */field_72340_a - 0.002,
            aabb./* minY */field_72338_b - 0.002,
            aabb./* minZ */field_72339_c - 0.002,
            aabb./* maxX */field_72336_d + 0.002,
            aabb./* maxY */field_72337_e + 0.002,
            aabb./* maxZ */field_72334_f + 0.002
        ]
    }

    // static createBounds(x, y, z, w, h) {
    //     const wHalf = w * 0.5
    //     return [
    //         x - wHalf - 0.002,
    //         y - 0.002,
    //         z - wHalf - 0.002,

    //         x + wHalf + 0.002,
    //         y + h + 0.002,
    //         z + wHalf + 0.002
    //     ]
    // }

    // static toAABB(x, y, z, w, h) {
    //     const [minX, minY, minZ, maxX, maxY, maxZ] = RenderHelper.createBounds(x, y, z, w, h)
    //     return new AxisAlignedBB(minX, minY, minZ, maxX, maxY, maxZ)
    // }

    // /**
    //  * @param {Number} x
    //  * @param {Number} y
    //  * @param {Number} z
    //  * @returns {{x: Number, y: Number, z: Number, scale: Number}}
    //  */
    // static coerceToRenderDist(x, y, z) {
    //     const {rx, ry, rz} = RenderHelper.getRenderPos();
    //     const renderLimit = Client.settings.video.getRenderDistance() << 4;
    //     const distSquared = (rx - x) ** 2 + (ry - y) ** 2 + (rz - z) ** 2;
    
    //     if (distSquared < renderLimit ** 2) return { x, y, z, scale: 1 };

    //     const scale = distSquared ** 0.5 / renderLimit;
    //     return {
    //         x: RenderHelper.lerp(rx, x, scale),
    //         y: RenderHelper.lerp(ry, y, scale),
    //         z: RenderHelper.lerp(rz, z, scale),
    //         scale
    //     };
    // }
}
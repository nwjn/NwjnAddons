// /** Optimized by PerseusPotter */
// import { Field } from "../Helper/Reflect"
// const RenderManager = Renderer.getRenderManager()

// export default new class Frustum {
//     constructor() {
//         this.renderPosX = new Field(RenderManager, /* renderPosX */"field_78725_b")
//         this.renderPosY = new Field(RenderManager, /* renderPosY */"field_78726_c")
//         this.renderPosZ = new Field(RenderManager, /* renderPosZ */"field_78723_d")

//         // Needs to be called from within the Minecraft Thread to initialize the Frustum class
//         // Otherwise you will get this error: Java.lang.RuntimeException: No OpenGL context found in the current thread.
//         Client.scheduleTask(() => this.Frustum = new net.minecraft.client.renderer.culling.Frustum())

//         // Updates frustum position on preRenderTicks, all view angle changes are handled within GL
//         register(net.minecraftforge.fml.common.gameevent.TickEvent, (event) => {
//             if (event.phase.toString() !== "START") return

//             this.Frustum?./* setPos */func_78547_a(
//                 this.getRenderX(), 
//                 this.getRenderY(), 
//                 this.getRenderZ()
//             )
//         })
//     }

//     getRenderX() {
//         return this.renderPosX.get(RenderManager)
//     }

//     getRenderY() {
//         return this.renderPosY.get(RenderManager)
//     }

//     getRenderZ() {
//         return this.renderPosZ.get(RenderManager)
//     }

//     /**
//      * @param AxisAlignedBB net.minecraft.util.AxisAlignedBB
//      * @returns {Boolean} true if any corner of the aabb is within the frustum
//      */
//     isAABBInFrustum(AxisAlignedBB) {
//         return this.Frustum?./* isBoundingBoxInFrustum */func_78546_a(AxisAlignedBB)
//     }
        
//     /**
//      * @param {Number} minX
//      * @param {Number} minY
//      * @param {Number} minZ
//      * @param {Number} maxX
//      * @param {Number} maxY
//      * @param {Number} maxZ
//      * @returns {Boolean} true if any corner of the aabb is within the frustum
//      */
//     isBoxInFrustum(minX, minY, minZ, maxX, maxY, maxZ) {
//         return this.Frustum?./* isBoxInFrustum */func_78548_b(minX, minY, minZ, maxX, maxY, maxZ)
//     }
// }
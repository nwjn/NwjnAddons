import Seconds from "../Time/Seconds"
import { scheduleTask, addCountdown } from "../Time/Scheduler"
import Apelles from "./Apelley"

export default class Waypoint {
    static renderWaypoint(text, x, y, z, color) {
        Apelles.renderBeacon(color.packed, x, y, z, { centered: false, h: 200, phase: true })

        Apelles.renderBillboardString(0xFFFFFFFF, text, x, y, z, { scale: 2, increase: true, phase: true })

        Apelles.renderAABBOutline(color.packed, x, y, z, x + 1, y + 1, z + 1, { lw: 2, phase: true, smooth: true })
        Apelles.renderAABBFilled(color.damped, x, y, z, x + 1, y + 1, z + 1, { phase: true })
    }

    constructor(id, mainText, subText, x, y, z, color, removalRadius, lifespan = null) {
        this.id = id
        this.mainText = mainText
        this.subText = subText?.replace(/\|\s|@\w{0,12}/g, "")?.trim()
        this.subText = this.subText ? `\n${this.subText}` : ""
        this.blockPos = new Vec3i(~~x, ~~y, ~~z)
        this.color = color ?? Renderer.WHITE
        this.removalRadiusSq = removalRadius ** 2 | 0
        this.distanceSq = Player.asPlayerMP().getPos().distanceSq(this.blockPos)
        this.keepAlive = true

        scheduleTask(() => this.keepAlive = false, Seconds.of(4))
        if (lifespan) scheduleTask(() => this.deleteListener?.(), Seconds.of(lifespan))

        this.update()
        this.tick = addCountdown(() => this.update(), Seconds.of(lifespan))
    }

    update() {
        if (!this.keepAlive && this.distanceSq <= this.removalRadiusSq) return this.deleteListener?.()

        this.distanceSq = Player.asPlayerMP().getPos().distanceSq(this.blockPos)

        this.text = `${this.mainText} §b[${ ~~Math.sqrt(this.distanceSq) }m]${this.subText}`
    }

    render() {
        const { x, y, z } = this.blockPos
        Waypoint.renderWaypoint(this.text, x, y, z, this.color)
    }

    onDelete(fn) {
        this.deleteListener = fn

        return this
    }
}
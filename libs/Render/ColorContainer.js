export class ColorContainer {
    static toHex(rgba255Array) {
        const [r, g, b, a] = rgba255Array

        return r * 0x1000000
             + g * 0x10000
             + b * 0x100
             + a * 0x1
    }

    static toRGBA(int) {
        return [
            int >> 24 & 0xff,
            int >> 16 & 0xff,
            int >> 8  & 0xff,
            int >> 0  & 0xff
        ]
    }

    constructor(rgba255Array) {
        this.set(rgba255Array)
    }

    getHex() {
        return this.rgbaHex
    }

    getFontHex() {
        return this.argbHex | 0
    }

    set(rgba255Array) {
        if (typeof(rgba255Array) === "number") return this.set(ColorContainer.toRGBA(rgba255Array))
        if (!rgba255Array.every(comp => comp === parseInt(comp))) return this.set(rgba255Array.map(comp => comp * 0xff))

        const r = rgba255Array[0] & 0xff
        const g = rgba255Array[1] & 0xff
        const b = rgba255Array[2] & 0xff
        const a = rgba255Array[3] & 0xff

        this.rgba255 = [r, g, b, a]
        this.rgba1 = [r / 0xff, g / 0xff, b / 0xff, a / 0xff]
        this.rgbaHex = ColorContainer.toHex([r, g, b, a])
        this.argbHex = ColorContainer.toHex([a, r, g, b])
    }

    glColor(newAlpha = this.rgba1[3]) {
        GlStateManager./* color */func_179131_c(this.rgba1[0], this.rgba1[1], this.rgba1[2], newAlpha)
    }

    opaqueColor(alpha) {
        const copy = this.rgba1.slice()
        copy[3] = alpha > 1 
            ? (alpha & 0xff) / 0xff
            : alpha
        
        return copy
    }
}
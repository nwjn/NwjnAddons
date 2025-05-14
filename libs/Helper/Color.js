export default class {
    static toRGBAHex(array) {
        return array[0] * 0x1000000
             + array[1] * 0x10000
             + array[2] * 0x100
             + array[3] * 0x1
    }

    static scaleAlphaOffset(hex, scaleFactor) {
        return hex - (hex & 0xff) * (1 - scaleFactor)
    }

    static rgbaToARGB(hex) {
        return (hex >> 24 & 0xff) * 0x10000
             + (hex >> 16 & 0xff) * 0x100
             + (hex >>  8 & 0xff) * 0x1
             + (hex >>  0 & 0xff) * 0x1000000
    }
}
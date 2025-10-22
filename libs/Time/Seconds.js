export default class Seconds {
    /** @override */ onChange(value) {}

    static of(value) {
        if (value instanceof Seconds) return value
        if (typeof(value) === "number") return new Seconds(value)
        return new Seconds(value?.toSeconds())
    }

    constructor(seconds) {
        this.val = Math.floor(seconds)
    }

    toTicks() {
        return this.val * 20
    }

    get value() {
        return this.val
    }

    set value(seconds) {
        this.val = seconds

        this.onChange(seconds)
    }

    valueOf() {
        return this.val
    }
}
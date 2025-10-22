export default class Ticks {
    /** @override */ onChange(value) {}

    static of(value) {
        if (value instanceof Ticks) return value
        if (typeof(value) === "number") return new Ticks(value)
        return new Ticks(value?.toTicks())
    }

    constructor(ticks) {
        this.val = Math.floor(ticks)
    }

    toSeconds() {
        return this.val * 0.05
    }

    get value() {
        return this.val
    }

    set value(ticks) {
        this.val = ticks

        this.onChange(this.val)
    }

    valueOf() {
        return this.val
    }
}
export class Field {
    /**
     * - Calls a wrapped java reflected field once
     * - For single-use calls
     * @param {JavaTClass} instance class or instance
     * @param {string} fieldName
     * @returns {?any} value returned by field, if any
     */
    static getFieldValue(instance, fieldName) {
        return new this(instance, fieldName).get(instance)
    }

    /**
     * - Calls a wrapped java reflected field once
     * - For single-use calls
     * @param {JavaTClass} instance class or instance
     * @param {string} fieldName
     */
    static setFieldValue(instance, fieldName, value) {
        return new this(instance, fieldName).set(instance, value)
    }

    /**
     * - Gets an accessible wrapped java reflected field
     * @param {JavaTClass} instance class or instance
     * @param {string} fieldName
     */
    constructor(instance, fieldName) {
        this.property = instance.class.getDeclaredField(fieldName)
        this.shouldLeaveOpen = this.property.isAccessible()
    }

    /**
     * - Accesses and returns the value on this field
     * @param {JavaTClass} instance class or instance
     * @returns {?any} value returned by field, if any
     */
    get(instance) {
        if (!instance) return console.warn("Reflected Java Fields require an instance parameter to access this getter")
        /* Resetting accessibility because it is better practice despite it being largely unnecessary */

        if (!this.shouldLeaveOpen) this.property.setAccessible(true)
        const value = this.property.get(instance)
        if (!this.shouldLeaveOpen) this.property.setAccessible(false)

        return value
    }

    /**
     * - Accesses and set the value on this field
     * @param {JavaTClass} instance class or instance
     * @param {any} value
     */
    set(instance, value) {
        if (!instance) return console.warn("Reflected Java Fields require an instance parameter to access this setter")
        /* Resetting accessibility because it is better practice despite it being largely unnecessary */

        if (!this.shouldLeaveOpen) this.property.setAccessible(true)
        this.property.set(instance, value)
        if (!this.shouldLeaveOpen) this.property.setAccessible(false)
    }
}

export class Method {
    /**
     * - Calls a wrapped java reflected method once
     * - For single-use calls
     * @param {JavaTClass} instance class or instance
     * @param {string} methodName 
     * @param {...any} params parameters used during method invocation
     * @returns {?any} value returned by method, if any
     */
    static callMethod(instance, methodName, ...params) {
        return new this(instance, methodName).call(instance, params)
    }

    /**
     * - Gets an accessible wrapped java reflected method
     * @param {JavaTClass} instance class or instance
     * @param {string} methodName 
     */
    constructor(instance, methodName) {
        this.property = instance.class.getDeclaredMethod(methodName)
        this.shouldLeaveOpen = this.property.isAccessible()
    }

    /**
     * - Accesses and calls the wrapped java reflected method
     * @param {JavaTClass} instance class or instance
     * @param {...any} params parameters used during method invocation
     * @returns {?any} value returned by method, if any
     */
    call(instance, ...params) {
        if (!instance) return console.warn("Reflected Java Methods require an instance parameter to access this caller")
        /* Resetting accessibility because it is better practice despite it being largely unnecessary */

        if (!this.shouldLeaveOpen) this.property.setAccessible(true)
        const value = this.property.invoke(instance, params)
        if (!this.shouldLeaveOpen) this.property.setAccessible(false)

        return value
    }
}
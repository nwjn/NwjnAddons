/** 
 * Heavily modified implementation of:
 * @author DocilElm
 * @license {GNU-GPL-3} https://github.com/DocilElm/tska/blob/main/LICENSE
 * @credit https://github.com/DocilElm/tska/blob/main/event/Feature.js
 */

import Location from "../Hypixel/Location"
import Event from "../Events/Event"
import Config from "../../data/Config"
import ConfigProperty from "../../data/ConfigProperty"

export default class {
    /**
     * - Utility that handles registering various events and listeners to make complex, functional, and performative features
     * - Class can be used with or without requiring the settings, worlds, or zones fields depending on the intended functionality

     * @param {object?} obj
     * @param {ConfigProperty?} obj.setting If none: Feature is always active, otherwise will (un)register based on setting
     * @param {string[]?} obj.worlds If none: Feature is not world dependent, otherwise will only register in worlds listed
     * @param {string[]?} obj.zones If none: Feature is not zone dependent, otherwise will only register in zones listed
     */
    constructor(obj = {}) {
        // Since rhino handles instance properties weirdly we are going to pass them through the super constructor
        for (let key in obj) this[key] = obj[key]
        
        this.worlds = this.worlds?.map(w => w.toLowerCase())
        this.zones = this.zones?.map(z => z.toLowerCase())

        this.hasSetting = this.setting instanceof ConfigProperty
        this.isRegistered = false

        Config.require(this)
    }

    /** Add [Events] to run when this feature is registered */
    addEvent(triggerType, methodFn, args) {
        this.events ??= []

        this.events.push(new Event(triggerType, methodFn, args, false))
    }

    /** Add [SubEvents] to run when the feature is registered and follows a custom condition */
    addSubEvent(triggerType, methodFn, args = null, condition = () => true) {
        if (typeof(args) === "function") {
            [ args, condition ] = [ condition, args ]
        }
        this.subEvents ??= []

        this.subEvents.push([new Event(triggerType, methodFn, args, false), condition])
    }

    /** Rechecks [SubEvents] and registers them if they follow their condition */
    update() {
        if (!this.isRegistered || !this.subEvents) return
        for (let subEvent of this.subEvents) 
            subEvent[1]() ? subEvent[0].register() : subEvent[0].unregister()
    }

    /** 
     * @private
     * Registers all attached [Events] and updates [SubEvents] 
     */
    _register() {
        this.update()
        if (this.isRegistered) return
        
        if (this.events) for (let event of this.events) event.register()

        this.onRegister()
        this.isRegistered = true
    }

    /** 
     * @private
     * UnRegisters all attached [Events] and [SubEvents] 
     */
    _unregister() {
        if (!this.isRegistered) return

        if (this.events) for (let event of this.events) event.unregister()
        if (this.subEvents) for (let subEvent of this.subEvents) subEvent[0].unregister()

        this.onUnregister()
        this.isRegistered = false
    }

    /**
     * @private
     * - Updates registers based on setting, world, and zone criteria of this [Feature]
     * - Location#inWorld and Location#inZone return true if param is nullish
     */
    _updateRegister() {
        if (this.hasSetting && !this.isSettingEnabled) return this._unregister()
        if (!(Location.nwjn$inWorlds(this.worlds) && Location.nwjn$inZones(this.zones))) return this._unregister()
        
        return this._register()
    }

    /** @private */
    _postInit() {
        // Main setting enables/disables entire [Feature]
        if (this.setting) {
            this.isSettingEnabled = this.setting.value
    
            this.setting.addListener((_, val) => {
                this.isSettingEnabled = val
                this._updateEnablers()
            })
        }

        this.postInit()

        this._updateEnablers()
    }

    /** @private */
    _updateEnablers() {
        this.isSettingEnabled ? this.onEnabled(this.isSettingEnabled) : this.onDisabled()
        this._updateRegister()
    }

    /** @override */ postInit() {}
    /** @override */ onRegister() {}
    /** @override */ onUnregister() {}
    /** @override */ onEnabled(lastState) {}
    /** @override */ onDisabled(lastState) {}
}
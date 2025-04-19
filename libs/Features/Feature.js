/** 
 * Adaptation based upon:
 * @author DocilElm
 * @license {GNU-GPL-3} https://github.com/DocilElm/Doc/blob/main/LICENSE
 * @credit https://github.com/DocilElm/Doc/blob/main/core/Feature.js
 */

import { initSettings } from "../../data/Settings"
import Location from "../../utils/Location"
import Event from "../Events/Event"
import ConfigProperty from "../../data/ConfigProperty"


export default class Feature {
    static settingsRequiredInitFunction = []

    static finalize() {
        let func = initSettings()

        while (func = Feature.settingsRequiredInitFunction.pop()) func()

        delete Feature.settingsRequiredInitFunction
        delete Feature.finalize
    }
    
    /** @override Function called once settings have been initialized*/ postInit() {}
    /** @override Function called when this is registered */ onRegister() {}
    /** @override Function called when this is unregistered */ onUnregister() {}
    /** @override Function called when this is enabled by setting */ onEnabled(previousValue) {}
    /** @override Function called when this is disabled by setting */ onDisabled(previousValue) {}

    /**
     * - Utility that handles registering various events and listeners to make complex, functional, and performative features
     * - Class can be used with or without requiring the settings, worlds, or zones fields depending on the intended functionality
     * 
     * @param {Object} obj If passed in as a child of this, uses the name of this child and return it
     * @param {ConfigProperty|null} obj.setting The main config setting: If null -> Feature is always active, If setting returns falsey -> all events of this feature will be unregistered
     * @param {String[]|String|null} obj.worlds The world(s) where this feature should activate: If null -> Feature is not world dependent
     * @param {String[]|String|null} obj.zones The zones(s) where this feature should activate: If null -> Feature is not zone dependent
     */
    constructor(obj = {}) {
        /** @private */ this._setting = obj.setting
        /** @private */ this._worlds = obj.worlds
        /** @private */ this._zones = obj.zones
        /** @private */ this._isSettingEnabled = false
        /** @private */ this._isRegistered = false

        // Will always update on world changes
        Location.onWorldChange(this._updateRegister.bind(this))
        if (this._zones) Location.onAreaChange(this._updateRegister.bind(this))

        Feature.settingsRequiredInitFunction.push(this._postInit.bind(this))
    }

    /**
     * - Runs the condition function when [Feature] is update and registers if condition passes
     * - Inits subEvent dependencies if called for the first time
     */
    addEvent(triggerType, methodFn, args) {
        if (!("events" in this)) {
            this.events = []
            this.registerEvents = () => this.events.forEach(event => event.register())
            this.unregisterEvents = () => this.events.forEach(event => event.unregister())
        }
        this.events.push(new Event(triggerType, methodFn, args, false))

        return this
    }

    /**
     * - Runs the condition function when [Feature] is update and registers if condition passes
     * - Inits subEvent dependencies if called for the first time
     */
    addSubEvent(triggerType, methodFn, args, condition = () => true) {
        if (!("subEvents" in this)) {
            this.subEvents = []
            this.updateSubEvents = () => this.subEvents.forEach(([subEvent, condition]) => condition() ? subEvent.register() : subEvent.unregister())
            this.unregisterSubEvents = () => this.subEvents.forEach(([subEvent]) => subEvent.unregister())
        }
        this.subEvents.push([new Event(triggerType, methodFn, args, false), condition])

        return this
    }

    /**
     * @private
     * - Updates registers based on setting, world, and zone criteria of this [Feature]
     * - Location#inWorld and Location#inZone return true if param is nullish
     */
    _updateRegister() {
        if (("_isSettingEnabled" in this) && !this._isSettingEnabled) return this._unregister()
        if (!(Location.nwjn$inWorld(this._worlds) && Location.nwjn$inZone(this._zones))) return this._unregister()
        
        return this._register()
    }

    /** 
     * @private
     * UnRegisters all strung [Events] including [SubEvents] 
     */
    _unregister() {
        if (!this._isRegistered) return
        this._isRegistered = false
        
        this.unregisterEvents?.()
        this.unregisterSubEvents?.()
        this.onUnregister()
    }

    /** 
     * @private
     * Registers all strung [Events] and updates [SubEvents] 
     */
    _register() {
        if (this._isRegistered) return
        this._isRegistered = true
        
        this.registerEvents?.()
        this.updateSubEvents?.()
        this.onRegister()
    }

    /** @private */
    _postInit() {
        // Main setting enables/disables entire [Feature]
        if (this._setting) {
            this._isSettingEnabled = this._setting.value
    
            this._setting._registerListener((_, val) => {
                this._isSettingEnabled = val
                this._updateEnablers()
            })
        }

        this.postInit()

        this._updateEnablers()
    }

    /** @private */
    _updateEnablers() {
        this._isSettingEnabled ? this.onEnabled(this._isSettingEnabled) : this.onDisabled()
        this._updateRegister()
    }
}
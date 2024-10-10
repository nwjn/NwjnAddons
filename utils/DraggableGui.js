// Credit: https://github.com/DocilElm/Doc/blob/main/shared/DraggableGui.js

import ElementUtils from "../../DocGuiLib/core/Element"
import HandleGui from "../../DocGuiLib/core/Gui"
import { CenterConstraint, CramSiblingConstraint, ScrollComponent, UIRoundedRectangle, UIText, OutlineEffect } from "../../Elementa"
import { addCommand } from "./Command"
import { data } from "../data/Data"
import Settings from "../data/Settings"

const guisCreated = new Set()

export default class DraggableGui {
    constructor({name, example, color, command}) {
        this.featureName = name
        const daita = data[this.featureName]

        if (!daita || !("x" in daita) || !("y" in daita) || !("scale" in daita)) 
            data[this.featureName] = {
                x: 0,
                y: 0,
                scale: 1
            }

        // Gui data
        this.ctGui = new Gui()
        this.width = null
        this.height = null
        this.customSize = false // used later on
        this.selected = false; // used later on

        this.commandName = command
        register("command", () => this.ctGui.open()).setName(this.commandName, true)

        this.color = color
        this.example = example.addColor()
        this.text = null

        // Add listeners to this [DraggableGui]
        this.ctGui.registerScrolled((_, __, dir) => {
            if (dir === 1) data[this.featureName].scale += 0.02
            else data[this.featureName].scale -= 0.02

            // if (this.customSize) this.customSize(dir) // later
        })

        this.ctGui.registerMouseDragged((mx, my) => {
            data[this.featureName].x = mx
            data[this.featureName].y = my
        })

        this.ctGui.registerDraw(() => this._draw(this.text || this.example))

        register("renderOverlay", () => {
            if (this.ctGui.isOpen()) return
            this._draw(this.text)
        })

        // Add the created [DraggableGui] to the set
        // so we can use this outside of this class internally
        guisCreated.add(this)
    }

    drawText(text) {
        this.text = text.addColor()
    }

    _draw(string) {
        if (!string) return
        Renderer.retainTransforms(true)
        Renderer.translate(this.getX(), this.getY())
        Renderer.scale(this.getScale())
        const color = Settings()?.[this.color]
        if (color) Renderer.colorize(...color)
        Renderer.drawStringWithShadow(string, 0, 0)
        Renderer.retainTransforms(false)
        Renderer.finishDraw()
    }

    /**
     * - Gets the `X` value of this [DraggableGui]
     * @returns {number}
     */
    getX() {
        return data[this.featureName].x
    }

    /**
     * - Gets the `Y` value of this [DraggableGui]
     * @returns {number}
     */
    getY() {
        return data[this.featureName].y
    }

    /**
     * - Gets the `Scale` value of this [DraggableGui]
     * @returns {number}
     */
    getScale() {
        return data[this.featureName].scale
    }

    /**
     * - Opens this [DraggableGui]
     * @returns this for method chaining
     */
    open() {
        this.ctGui.open()

        return this
    }

    /**
     * - Closes this [DraggableGui]
     * @returns this for method chaining
     */
    close() {
        this.ctGui.close()

        return this
    }

    /**
     * - Checks whether this [DraggableGui] is open or not
     * @returns {boolean}
     */
    isOpen() {
        return this.ctGui.isOpen()
    }
}

const handler = new HandleGui("data/Scheme.json", "NwjnAddons")
const scheme = handler.getColorScheme()

const bgBox = new UIRoundedRectangle(scheme.Amaterasu.background.roundness)
    .setX(new CenterConstraint())
    .setY(new CenterConstraint())
    .setWidth((30).percent())
    .setHeight((50).percent())
    .setColor(ElementUtils.getJavaColor(scheme.Amaterasu.background.color))
    .enableEffect(new OutlineEffect(ElementUtils.getJavaColor(scheme.Amaterasu.background.outlineColor), scheme.Amaterasu.background.outlineSize))

const bgScrollable = new ScrollComponent("", 5)
    .setX(new CenterConstraint())
    .setY((1).pixels())
    .setWidth((80).percent())
    .setHeight((90).percent())
    .setChildOf(bgBox)

const scrollableSlider = new UIRoundedRectangle(3)
    .setX(new CramSiblingConstraint(2))
    .setY((5).pixels())
    .setHeight((5).pixels())
    .setWidth((5).pixels())
    .setColor(ElementUtils.getJavaColor(scheme.Amaterasu.scrollbar.color))
    .setChildOf(bgBox)

bgScrollable.setScrollBarComponent(scrollableSlider, true, false)

const btnCreated = new Set()

class ButtonComponent {
    constructor(featureName, commandName) {
        this.featureName = featureName
        this.commandName = commandName

        this._init()
        btnCreated.add(this.featureName)
    }

    _init() {
        this.bgButtonBox = new UIRoundedRectangle(scheme.Button.background.roundness)
            .setX((1).pixels())
            .setY(new CramSiblingConstraint(5))
            .setWidth((100).percent())
            .setHeight((12).percent())
            .setColor(ElementUtils.getJavaColor(scheme.Button.background.color))
            .enableEffect(new OutlineEffect(ElementUtils.getJavaColor(scheme.Button.background.outlineColor), scheme.Button.background.outlineSize))
            .setChildOf(bgScrollable)
            .onMouseClick((comp, event) => {
                if (event.mouseButton !== 0) return

                ChatLib.command(this.commandName, true)
            })

        this.buttonText = new UIText(this.featureName)
            .setX(new CenterConstraint())
            .setY(new CenterConstraint())
            .setChildOf(this.bgButtonBox)
    }
}

addCommand("gui", "Opens the Editor Gui", () => {
    guisCreated.forEach(it => {
        if (btnCreated.has(it.featureName)) return

        new ButtonComponent(it.featureName, it.commandName)
    })

    handler.ctGui.open()
})

handler._drawNormal(bgBox)
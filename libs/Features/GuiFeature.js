import Feature from "./Feature"
import GuiEditor from "./GuiEditor"
import { TextHud } from "../../../tska/gui/TextHud"
import Config from "../../data/Config"

const FontRenderer = Renderer.getFontRenderer()

export default class GuiFeature extends Feature {
    /**
     * - Extension of [Feature] for features that include gui elements
     * 
     * @param {object} obj If passed in as a child of this, uses the name of this child and return it
     * @param {ConfigProperty} obj.setting The main config name: If null -> Feature is always active, If setting returns false -> all events of this feature will be unregistered
     * @param {string[]?} obj.worlds The world(s) where this feature should activate: If null -> Feature is not world dependent
     * @param {string[]?} obj.zones The zones(s) where this feature should activate: If null -> Feature is not zone dependent
     * @param {ConfigProperty?} obj.color Color to draw text or defaults to white
     * @param {string[]?} obj.defaultText The text to shown in the editor if the feature's text is blank
    */
    constructor(obj = {}) {
        super(obj)
        
        this.color = obj.color
        this.defaultText = obj.defaultText ?? ""
        this.lines = []

        this.addHud()
    }

    addHud() {
        const configName = this.setting.configName
        
        this.hud = new TextHud(configName, GuiEditor.obj[configName] ?? {
            x: Renderer.screen.getWidth() * Math.random() * 0.5 | 0, 
            y: Renderer.screen.getHeight() * Math.random() * 0.5 | 0, 
            scale: 1.5,
            width: 0,
            height: 0
        }, "")
            .setShouldDrawOutline(true)
            .setScaleStep(0.025)
            .onDraw(this.onDraw.bind(this))

        Config.postInit(() => {
            this.setting.value ? GuiEditor.enabled.add(this.hud) : GuiEditor.enabled.delete(this.hud)
            this.setting.addListener((_, val) => val ? GuiEditor.enabled.add(this.hud) : GuiEditor.enabled.delete(this.hud))
        })

        GuiEditor.huds.push(this.hud)
    }

    onDraw(x, y, text) {
        const lines = text.length ? text : this.defaultText
        
        Renderer.retainTransforms(true)
        Renderer.translate(x, y)
        Renderer.scale(this.hud.scale)

        const argb = this.color?.shifted ?? Renderer.WHITE
        for (let i = 0; i < lines.length; i++) 
            FontRenderer./* drawString */func_175065_a(lines[i], 1, 1 + i * 9, argb | 0, true)

        Renderer.retainTransforms(false)
        Renderer.finishDraw()
    }

    addLine(text) {
        text = text.addColor()
        this.lines.push(text)

        this.hud.width = Math.max(Renderer.getStringWidth(text) * 1.05, this.lines.length === 1 ? 0 : this.hud.width)
        this.hud.height = 9 * this.lines.length * 1.05
        this.hud.text = this.lines
    }

    setLine(text, index = 0) {
        text = text.addColor()
        this.lines[index] = text

        this.hud.width = Math.max(Renderer.getStringWidth(text) * 1.05, this.lines.length === 1 ? 0 : this.hud.width)
        this.hud.height = 9 * this.lines.length * 1.05
        this.hud.text = this.lines
    }

    setLines(textArray) {
        this.lines.length = 0
        textArray.forEach(line => this.addLine(line))
        this.hud.text = this.lines
    }

    removeText() {
        this.lines.length = 0
        this.hud.text = ""
        this.hud.width = 0
        this.hud.height = 0
    }
}
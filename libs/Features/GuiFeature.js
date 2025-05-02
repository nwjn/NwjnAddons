import Feature from "./Feature"
import GuiEditor from "./GuiEditor"
import { TextHud } from "../../../tska/gui/TextHud"
import ConfigProperty from "../../data/ConfigProperty"

const FontRenderer = Renderer.getFontRenderer()

export default class GuiFeature extends Feature {
    /**
     * - Extension of [Feature] for features that include gui elements
     * 
     * @param {Object|Feature} obj If passed in as a child of this, uses the name of this child and return it
     * @param {String|null} obj.setting The main config name: If null -> Feature is always active, If setting returns false -> all events of this feature will be unregistered
     * @param {String[]|String|null} obj.worlds The world(s) where this feature should activate: If null -> Feature is not world dependent
     * @param {String[]|String|null} obj.zones The zones(s) where this feature should activate: If null -> Feature is not zone dependent

     * @param {String[]} defaultText The text to shown in the editor if the feature's text is blank
    */
    constructor(obj = {}, defaultText) {
        super(obj)
        
        this.color = obj.color
        this.defaultText = defaultText
        this.lines = []

        this.addHud()
    }

    addHud() {
        this.hud = new TextHud(this.setting.configName, GuiEditor.obj[this.setting.configName] ?? {
            x: Renderer.screen.getWidth() * Math.random() * 0.5 | 0, 
            y: Renderer.screen.getHeight() * Math.random() * 0.5 | 0, 
            scale: 1.5,
            width: 0,
            height: 0
        }, "")
            .setShouldDrawOutline(true)
            .setScaleStep(0.025)
            .onDraw(this.onDraw.bind(this))

        ConfigProperty.awaitSettings(() => {
            this.setting.value ? GuiEditor.enabled.add(this.hud) : GuiEditor.enabled.delete(this.hud)
            this.setting._registerListener((_, val) => val ? GuiEditor.enabled.add(this.hud) : GuiEditor.enabled.delete(this.hud))
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
            FontRenderer./* drawString */func_175065_a(lines[i], 0, 1 + i * 9, argb | 0, true)

        Renderer.retainTransforms(false)
        Renderer.finishDraw()
    }

    addLine(text) {
        text = text.addColor()
        this.lines.push(text)

        this.hud.width = Math.max(Renderer.getStringWidth(text) * 1.05, this.hud.width)
        this.hud.height = 9 * this.lines.length * 1.05
        this.hud.text = this.lines
    }

    setLine(text, index = 0) {
        text = text.addColor()
        this.lines[index] = text

        this.hud.width = Math.max(Renderer.getStringWidth(text) * 1.05, this.hud.width)
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
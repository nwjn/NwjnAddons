import settings from "../config";
import { registerWhen } from "./functions";
import { getWorld } from "./world";

const GUI_INSTRUCT = "Use +/- to change scale or press R to reset";

// Credit: Volcaddons
function renderScale(scale, text, x, y) {
    Renderer.scale(scale);
    Renderer.drawString(text, x, y);
}

const overlays = [];
let currentOverlay = undefined;
const gui = new Gui();
const background = new Gui();
export function openGUI() { gui.open() };
register("renderOverlay", () => {
    if (!gui.isOpen()) return;
    
    overlays.forEach(overlay => {
        if (!settings[overlay.setting]) return;
        Renderer.drawRect(
            Renderer.color(69, 69, 69, 169),
            overlay.loc[0] - 3*overlay.loc[2], overlay.loc[1] - 3*overlay.loc[2],
            overlay.width + 6*overlay.loc[2], overlay.height + 6*overlay.loc[2]
        );
        renderScale(overlay.loc[2], overlay.example, overlay.X, overlay.Y);
    });

    renderScale(
        1.2, GUI_INSTRUCT,
        Renderer.screen.getWidth() / 2 - Renderer.getStringWidth(GUI_INSTRUCT) / 1.2,
        Renderer.screen.getHeight() / 2.4,
    );
});
register("guiMouseClick", (x, y) => {
    if (!gui.isOpen()) return;
    currentOverlay = undefined;

    overlays.forEach(overlay => {
        if (x > overlay.loc[0] - 3*overlay.loc[2] &&
            x < overlay.loc[0] + 3*overlay.loc[2] + overlay.width &&
            y > overlay.loc[1] - 3*overlay.loc[2] &&
            y < overlay.loc[1] + 3*overlay.loc[2] + overlay.height
        ) currentOverlay = overlay;
    });
});
register("dragged", (dx, dy) => {
    if (currentOverlay === undefined || !gui.isOpen()) return;

    if (gui.isOpen()) {
        currentOverlay.loc[0] += dx;
        currentOverlay.loc[1] += dy;
        currentOverlay.X = currentOverlay.loc[0] / currentOverlay.loc[2];
        currentOverlay.Y = currentOverlay.loc[1] / currentOverlay.loc[2];
    }
});
register("guiKey", (char, keyCode) => {
    if (currentOverlay === undefined || !gui.isOpen()) return;
    
    if (keyCode === 13) {
        currentOverlay.loc[2] += 0.05;
        currentOverlay.X = currentOverlay.loc[0] / currentOverlay.loc[2];
        currentOverlay.Y = currentOverlay.loc[1] / currentOverlay.loc[2];
    } else if (keyCode === 12) {
        currentOverlay.loc[2] -= 0.05;
        currentOverlay.X = currentOverlay.loc[0] / currentOverlay.loc[2];
        currentOverlay.Y = currentOverlay.loc[1] / currentOverlay.loc[2];
    } else if (keyCode === 19) {
        currentOverlay.loc[2] = 1;
        currentOverlay.X = currentOverlay.loc[0];
        currentOverlay.Y = currentOverlay.loc[1];
    }
    currentOverlay.setSize();
});

export class Overlay {
    constructor(setting, requires, condition, loc, command, example) {
        overlays.push(this);
        this.setting = setting;
        this.requires = new Set(requires);
        this.loc = loc;
        this.X = this.loc[0] / this.loc[2];
        this.Y = this.loc[1] / this.loc[2];
        this.example = example;
        this.message = example;
        this.gui = new Gui();
        this.setSize();

        register("command", () => {
            this.gui.open();
        }).setName(command);

        registerWhen(register(this.requires.has("misc") ? "postGuiRender" : "renderOverlay", () => {
            if (this.gui.isOpen()) {
                renderScale(
                    this.loc[2],
                    `x: ${Math.round(this.loc[0])}, y: ${Math.round(this.loc[1])}, s: ${this.loc[2].toFixed(2)}`,
                    this.X, this.Y - 10
                );
                Renderer.drawLine(Renderer.WHITE, this.loc[0], 1, this.loc[0], Renderer.screen.getHeight(), 0.5);
                Renderer.drawLine(Renderer.WHITE, Renderer.screen.getWidth(), this.loc[1], 1, this.loc[1], 0.5);

                renderScale(this.loc[2], this.example, this.X, this.Y);

                renderScale(
                    1.2, GUI_INSTRUCT,
                    Renderer.screen.getWidth() / 2 - Renderer.getStringWidth(GUI_INSTRUCT) / 1.2,
                    Renderer.screen.getHeight() / 2.4,
                );
            } else if (settings[this.setting] && (this.requires.has(getWorld()) || this.requires.has("all")) && !gui.isOpen()) {
                if (this.requires.has("misc")) {
                    if (!condition()) return;
                    background.func_146278_c(0);
                    renderScale(this.loc[2], this.message, this.X, this.Y);
                } else
                    renderScale(this.loc[2], this.message, this.X, this.Y);
            }
        }), () => true);

        register("dragged", (dx, dy, x, y) => {
            if (this.gui.isOpen()) {
                this.loc[0] = parseInt(x);
                this.loc[1] = parseInt(y);
                this.X = this.loc[0] / this.loc[2];
                this.Y = this.loc[1] / this.loc[2];
            }
        });
        
        register("guiKey", (char, keyCode) => {
            if (this.gui.isOpen()) {
                if (keyCode === 13) { 
                    this.loc[2] += 0.05;
                    this.X = this.loc[0] / this.loc[2];
                    this.Y = this.loc[1] / this.loc[2];
                } else if (keyCode === 12) {
                    this.loc[2] -= 0.05;
                    this.X = this.loc[0] / this.loc[2];
                    this.Y = this.loc[1] / this.loc[2];
                } else if (keyCode === 19) { 
                    this.loc[2] = 1;
                    this.X = this.loc[0];
                    this.Y = this.loc[1];
                }
            }
        });
    }

    setSize() {
        const lines = this.example.split("\n");
        this.width = 0;
        this.height = lines.length * 9 * this.loc[2];
        lines.forEach(line => {
            const regex = /&l(.*?)(?:&|$)/g;
            const matches = [];
            let match;

            while ((match = regex.exec(line)) !== null) matches.push(match[1]);

            const width = 1.1*Renderer.getStringWidth(matches.join('')) + Renderer.getStringWidth(line.replace(regex, ''));
            this.width = Math.max(this.width, width * this.loc[2]);
        });
    }
}

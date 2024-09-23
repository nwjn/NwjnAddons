// Credit: My father, Volcaronitee

function renderScale(scale, text, x, y, z = 0) {
    Renderer.scale(scale);
    Renderer.translate(0, 0, z)
    Renderer.drawString(text, x, y, true);
}
const BORDER_COLOR = Renderer.color(128, 128, 128, 128);
const RECT_COLOR = Renderer.color(0, 0, 0, 128);
function drawBox(x, y, z, width, height) {
  Renderer.translate(x, y, z);
  Renderer.drawRect(RECT_COLOR, 0, 0, width, height);

  // Draw Outline
  Renderer.retainTransforms(true);
  Renderer.translate(x, y, z + 1);
  Renderer.drawLine(BORDER_COLOR, -1, -1, width + 1, -1, 1);
  Renderer.drawLine(BORDER_COLOR, -1, -1, -1, height + 1, 1);
  Renderer.drawLine(BORDER_COLOR, -1, height + 1, width + 1, height + 1, 1);
  Renderer.drawLine(BORDER_COLOR, width + 1, -1, width + 1, height + 1, 1);
  Renderer.retainTransforms(false);
}

const GUI_INSTRUCT = "§lUse +/- to scale, R to reset, B to draw Background, or W to change world view";

const gui = new Gui();
export function openGUI() {
    gui.open();
};

import Settings from "./Settings.js"
import Loc from "./Location.js"
import { registerWhen } from "./functions.js";

let overlays = [];
let currentOverlay = undefined;

/**
 * Renders overlays on the GUI if it's open.
 */
gui.registerDraw(() => {
    overlays.forEach(overlay => {
        if (!Settings()[overlay.setting]) return;
        // Draw example text and box
        const scale = overlay.loc[2];
        const x = overlay.loc[0];
        const y = overlay.loc[1];

        if (overlay.loc[3]) {
            drawBox(
                x - 3 * scale,
                y - 3 * scale,
                0,
                o.ewidth + 5 * scale,
                o.eheight + 5 * scale
            );
        }
        renderScale(scale, overlay.example, overlay.X, overlay.Y);
    });

    // GUI Instructions
    renderScale(
        1, GUI_INSTRUCT,
        (Renderer.screen.getWidth() - Renderer.getStringWidth(GUI_INSTRUCT)) / 2,
        Renderer.screen.getHeight() / 2
    );
});

/**
 * Handles overlay selection when clicking on the screen.
 */
gui.registerClicked((x, y) => {
    currentOverlay = overlays.find(overlay => {
        const scale = overlay.loc[2];
        const oX = overlay.loc[0];
        const oY = overlay.loc[1];

        if (x > oX - 3*scale &&
            x < oX + 3*scale + overlay.eWidth &&
            y > oY - 3*scale &&
            y < oY + 3*scale + overlay.eHeight
        ) return
    });
})

/**
 * Handles movement of the selected overlay.
 * Updates location and normalized coordinates based on delta coordinates.
 */
gui.registerMouseDragged((x, y) => {
    if (currentOverlay === undefined || !gui.isOpen()) return;

    // Changes location of text
    currentOverlay.loc[0] = x
    currentOverlay.loc[1] = y
    currentOverlay.X = currentOverlay.loc[0] / currentOverlay.loc[2];
    currentOverlay.Y = currentOverlay.loc[1] / currentOverlay.loc[2];
})

/**
 * Handles scaling of the selected overlay using key presses.
 * Listens for specific keys: Enter (increase), Minus (decrease), r (reset).
 * Updates normalized coordinates and calls "setSize" after scaling.
 */
gui.registerKeyTyped((_, keyCode) => {
    if (currentOverlay === undefined) return;
    if (keyCode === 13) {  // Increase Scale (+ key)
        currentOverlay.loc[2] = Math.round((currentOverlay.loc[2] + 0.05) * 100) / 100;
        currentOverlay.X = currentOverlay.loc[0] / currentOverlay.loc[2];
        currentOverlay.Y = currentOverlay.loc[1] / currentOverlay.loc[2];
    } else if (keyCode === 12) {  // Decrease Scale (- key)
        currentOverlay.loc[2] = Math.round((currentOverlay.loc[2] - 0.05) * 100) / 100;
        currentOverlay.X = currentOverlay.loc[0] / currentOverlay.loc[2];
        currentOverlay.Y = currentOverlay.loc[1] / currentOverlay.loc[2];
    } else if (keyCode === 19) {  // Reset Scale (r key)
        currentOverlay.loc[2] = 1;
        currentOverlay.X = currentOverlay.loc[0];
        currentOverlay.Y = currentOverlay.loc[1];
    } else if (keyCode === 48) {  // Set BG (b key)
        currentOverlay.loc[3] = !currentOverlay.loc[3];
    } else if (keyCode === 1) {
        gui.close()
    } else return;

    currentOverlay.setSize(currentOverlay.example, "example");
})


export class Overlay {
    /**
     * Creates an overlay with HUD elements and GUI functionality.
     *
     * @param {String} setting - The setting key used to determine whether the overlay should be shown.
     * @param {String[]} requires - An array of world names where the overlay should be displayed (or "all" for all requires).
     * @param {Function} condition - Function to check if condition is met before rendering.
     * @param {Number[]} loc - An array representing the x, y, and scale of the overlay.
     * @param {String} command - The command name that will open the GUI.
     * @param {String} example - An example text to be displayed as an overlay.
     */
    constructor(setting, requires, loc, command, example) {
        overlays.push(this);
        // Store the inputs as instance variables.
        this.setting = setting;
        this.requires = requires;
        this.loc = loc;
        this.X = this.loc[0] / this.loc[2];
        this.Y = this.loc[1] / this.loc[2];
        this.example = example;
        this.message = example;
        this.gui = new Gui();

        // Set size for background rendering
        this.setSize(this.message, "message");
        this.setSize(this.example, "example");

        // Register a render function to display the overlay and GUI instructions.
        // The overlay is shown when the GUI is open or in requires specified in 'requires' array.'
        this.gui.registerDraw(() => {
            const width = Renderer.screen.getWidth();
            const height = Renderer.screen.getHeight();

            // Coords and scale
            const coords = `x: ${~~this.loc[0]}, y: ${~~this.loc[1]}, s: ${this.loc[2].toFixed(2)}`;
            renderScale(this.loc[2], coords, this.X + 2, this.Y - 10);
            Renderer.drawLine(Renderer.WHITE, this.loc[0], 1, this.loc[0], height, 0.5);
            Renderer.drawLine(Renderer.WHITE, width, this.loc[1], 1, this.loc[1], 0.5);

            // Draw example text
            if (this.loc[3] && this.width !== 0)
                drawBox(
                    this.loc[0] - 3 * this.loc[2],
                    this.loc[1] - 3 * this.loc[2],
                    0,
                    this.eWidth + 5 * this.loc[2],
                    this.eHeight + 5 * this.loc[2]
                );
            renderScale(this.loc[2], this.example, this.X, this.Y);

            // GUI Instructions
            renderScale(
                1, GUI_INSTRUCT,
                (Renderer.screen.getWidth() - Renderer.getStringWidth(GUI_INSTRUCT)) / 2,
                Renderer.screen.getHeight() / 2
            )
        })

        registerWhen(register("renderOverlay", () => {
            if (!gui.isOpen() && !this.gui.isOpen()) {
                if (this.loc[3] && this.width !== 0)
                    drawBox(
                        this.loc[0]- 3 * this.loc[2],
                        this.loc[1] - 3 * this.loc[2],
                        0,
                        this.width + 5 * this.loc[2],
                        this.height + 5 * this.loc[2]
                    );
                renderScale(this.loc[2], this.message, this.X, this.Y);
            }
        }), () => Settings()[this.setting] && (Loc.inWorld(requires) || this.requires.has("all")));

        // Register editing stuff
        this.gui.registerMouseDragged((x, y) => {
            // Changes location of text
            this.loc[0] = x
            this.loc[1] = y
            this.X = this.loc[0] / this.loc[2];
            this.Y = this.loc[1] / this.loc[2];
        })
        
        this.gui.registerKeyTyped((_, keyCode) => {
            if (keyCode === 13) {  // Increase Scale (+ key)
                this.loc[2] = Math.round((this.loc[2] + 0.05) * 100) / 100;
                this.X = this.loc[0] / this.loc[2];
                this.Y = this.loc[1] / this.loc[2];
            } else if (keyCode === 12) {  // Decrease Scale (- key)
                this.loc[2] = Math.round((this.loc[2] - 0.05) * 100) / 100;
                this.X = this.loc[0] / this.loc[2];
                this.Y = this.loc[1] / this.loc[2];
            } else if (keyCode === 19) {  // Reset Scale (r key)
                this.loc[2] = 1;
                this.X = this.loc[0];
                this.Y = this.loc[1];
            } else if (keyCode === 48) {  // Swap flex (b key)
                this.loc[3] = !this.loc[3];
            } else if (keyCode === 1) {
                this.gui.close()
            } else return;

            this.setSize(this.message, "message");
        })

        // Register a command to open the GUI when executed.
        register("command", () => {
            this.gui.open();
        }).setName(command);
    }

    /**
     * Replaces current overlay message with provided message.
     * 
     * @param {String} message - Message to be updated to.
     */
    setMessage(message) {
        this.message = message;
        this.setSize(this.message, "message");
    }

    /**
     * Sets width and height of overlay.
     */
    setSize(message, type) {
        if (!message) return;
        const lines = message.split("\n");


        if (type === "message") this.height = lines.length * 9 * this.loc[2];
        else this.eHeight = lines.length * 9 * this.loc[2];

        const width = Renderer.getStringWidth(lines.sort((a, b) => Renderer.getStringWidth(a) < Renderer.getStringWidth(b))[0])

        if (type === "message") this.width = width;
        else this.eWidth = width;
    }
}

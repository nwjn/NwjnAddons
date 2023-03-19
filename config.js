import { @Vigilant, @SwitchProperty, @SliderProperty, @PercentSliderProperty, @ButtonProperty, @SelectorProperty, @ColorProperty, Color } from 'Vigilance'

const categorytitle = "&6NwjnAddons &7- by &5nwjn"

@Vigilant("NwjnAddons", "§6§lNwjnAddons", {
    getCategoryComparator: () => (a, b) => {
        const categories = [
            "General",
            "Hud",
            "QoL",
            "Bestiary",
            "Kuudra",
            "Dungeons",
            "Events",
            "World",
            "Misc"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    },
})

class Settings {

    constructor() {
        this.initialize(this);
        this.setCategoryDescription("General", `&6&lNwjnAddons\n
            &7by &5nwjn\n
            &e&o/nwjn help &eto see all commands.`
        );
        this.setCategoryDescription("Hud", categorytitle);
        this.setCategoryDescription("QoL", categorytitle);
        this.setCategoryDescription("Bestiary", categorytitle);
        this.setCategoryDescription("Kuudra", categorytitle);
        this.setCategoryDescription("Dungeons", categorytitle);
        this.setCategoryDescription("Events", categorytitle);
        this.setCategoryDescription("World", categorytitle);
        this.setCategoryDescription("Misc", categorytitle);


        this.addDependency("Color for all Texts", "Give all texts the same Color");

        this.addDependency("Golem Location Alignment", "Golem Location");
        this.addDependency("Text size for Location", "Golem Location");
        this.addDependency("Color for Location Text", "Golem Location");
        this.addDependency("Move Location Text", "Golem Location");

        this.addDependency("Golem Stage Alignment", "Golem Stage");
        this.addDependency("Text size for Stage", "Golem Stage");
        this.addDependency("Color for Stage Text", "Golem Stage");
        this.addDependency("Move Stage Text", "Golem Stage");

        this.addDependency("Golem Countdown delay message", "Golem Countdown");
        this.addDependency("Golem Countdown Alignment", "Golem Countdown");
        this.addDependency("Text size for Golem Countdown", "Golem Countdown");
        this.addDependency("Color for Golem Countdown Text", "Golem Countdown");
        this.addDependency("Move Golem Countdown Text", "Golem Countdown");

        this.addDependency("Send Since Stage 4 Time in chat", "Since Stage 4 timer");
        this.addDependency("Since Stage 4 Alignment", "Since Stage 4 timer");
        this.addDependency("Text size for Since Stage 4", "Since Stage 4 timer");
        this.addDependency("Color for Since Stage 4 Text", "Since Stage 4 timer");
        this.addDependency("Move Since Stage 4 Text", "Since Stage 4 timer");

        this.addDependency("Only show when Stage 4 or 5", "Show text next to the Golem");
        this.addDependency("Text size for statue text", "Show text next to the Golem");
        this.addDependency("Scale the text on distance", "Show text next to the Golem");
        this.addDependency("Color for statue text", "Show text next to the Golem");
        this.addDependency("Take color from On Screen category for Statue text", "Show text next to the Golem");
        this.addDependency("Grey background", "Show text next to the Golem");
        this.addDependency("X Offset for statue text", "Show text next to the Golem");
        this.addDependency("Y Offset for statue text", "Show text next to the Golem");
        this.addDependency("Z Offset for statue text", "Show text next to the Golem");

        this.addDependency("Show spawning progress", "Show Golem Bossbar");
        this.addDependency("Show health Number", "Show Golem Bossbar");
        this.addDependency('Say "Golem" above the Bossbar', "Show Golem Bossbar");

        this.addDependency("Stage 4 Sound volume", "Stage 4 Sound");
        this.addDependency("Stage 4 Sound Test", "Stage 4 Sound");

        this.addDependency("Stage 5 Sound volume", "Stage 5 Sound");
        this.addDependency("Stage 5 Sound Test", "Stage 5 Sound");

        this.addDependency("Reboot Volume", "Reboot Sound");
        this.addDependency("Reboot Sound Test", "Reboot Sound");

        this.addDependency("Update Volume", "Update Sound");
        this.addDependency("Update Sound Test", "Update Sound");

        this.addDependency("Dragon Countdown delay message", "Dragon Countdown");
        this.addDependency("Dragon Countdown Alignment", "Dragon Countdown");
        this.addDependency("Text size for Dragon Countdown", "Dragon Countdown");
        this.addDependency("Color for Dragon Countdown Text", "Dragon Countdown");
        this.addDependency("Take color from On Screen category for Dragon Countdown", "Dragon Countdown");
        this.addDependency("Move Dragon Countdown Text", "Dragon Countdown");
    }


    @SwitchProperty({
        name: "Overall",
        category: "General",
        subcategory: "§eOverall",
        description: "Toggle the whole Module",
    })
    overall = true;

    @SwitchProperty({
        name: "Location & Stage scan everywhere in End",
        description: "Faster but uses a bit more performance (recommended)",
        category: "General",
        subcategory: "§eScanning method",
    })
    scaninend = true;

    @SwitchProperty({
        name: "Increase scanning rate",
        description: "Faster but uses a bit more performance (recommended)",
        category: "General",
        subcategory: "§eScanning method",
    })
    scanningrate = true;

    @SelectorProperty({
        name: "Change scanning speed",
        description: "Choose rate per minute\n&lAuto reloads CT Modules after closing\n&lthis settings menu &r(when changing something)",
        category: "General",
        subcategory: "§eScanning method",
        options: ["1 (pre 2.2.0 default)", "3 (new default)", "5 (recommended)", "10 (fast)", "15 (fastest)"]
    })
    scanningrate = 1;
}

export default new Settings()
/** 
 * An adaption of STuF (With Stuffy)
 * @author Stuffyerface
 * @link https://github.com/stuffyerface/ImageLinkFix
 */

import Feature from "../../libs/Features/Feature"
import TextUtil from "../../libs/Helper/TextUtil"
import ConfigProperty from "../../data/ConfigProperty"
import { Field } from "../../../tska/reflection/Field"

void new class extends Feature {
    constructor() {
        super({
            setting: new ConfigProperty("Switch", {
                category: "General",
                configName: "LinkFix",
                title: "§e✯§r §bLink Fix",
                description: "Encodes and Decodes Links to allow sending and viewing for those with the mod",
                value: true
            }),
        
            SENT_URL_REGEX: /([a-z\d]{2,}:\/\/[-\w.]+\.[a-z]{2,}\/(?:$|\S+\.\w+|\S+))/,
            RECEIVE_URL_REGEX:  / (l\$(?:h|H)?\d+\|\S+)/,
            ENCODED_PARTS_REGEX: /^(l\$(\S)?(\S)?(\d+)\|(\S+))$/,
            DECODED_PARTS_REGEX: /^(([a-z\d]{2,}:\/\/)([-\w.]+\.[a-z]{2,})(\/\S*))$/,
        
            textField: new Field(net.minecraft.util.ChatComponentText, /* text */"field_150267_b"),
        
            schemes: {
                "h": "http://",
                "H": "https://",
                "http://": "h",
                "https://": "H"
            },
        
            extensions: {
                1: ".png",
                2: ".jpg",
                3: ".jpeg",
                4: ".gif",
                ".png": 1,
                ".jpg": 2,
                ".jpeg": 3,
                ".gif": 4
            },
        
            charSet: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        })

        this.addEvent("MessageSent", this.onSendLink.bind(this), { setCriteria: this.SENT_URL_REGEX })
        this.addEvent("ServerChat", this.onEncodedReceive.bind(this), { setCriteria: this.RECEIVE_URL_REGEX })
    }

    /**
     * @Event MessageSent
     * @Modifier /([a-z\d]{2,}:\/\/[-\w.]+\.[a-z]{2,}\/(?:$|\S+\.\w+|\S+))/
     */
    onSendLink(link, { message, event }) {
        const encoded = this.encode(link)
        if (!encoded) return

        cancel(event)
        ChatLib.say(message.replace(link, encoded))
    }

    /**
     * @Event ServerChat
     * @Modifier / (l\$(?:h|H)?\d+\|\S+)/
     */
    onEncodedReceive(url, { chatComponent }) {
        const decoded = this.decode(url)
        if (!decoded) return

        chatComponent./* getSiblings */func_150253_a().some(comp => {
            const text = this.textField.get(comp)
            if (!text?.includes(url)) return

            // Bypass CT messing up link text in new TextComponent & setText
            this.textField.set(comp, text.replace(url, decoded))

            // Now use CT's TextComponent with MC's TextComponent
            return comp = new TextComponent(comp)
                .setHover("show_text", `§r§0§l【§r§c§lNwjn§0§l】§r${decoded}`)
                .setClick("open_url", decoded)
                .chatComponentText
        })
    }

    decode(encoded) {
        const [matched, scheme, extension, dots, body] = TextUtil.getMatches(this.ENCODED_PARTS_REGEX, encoded)
        if (!matched) return

        const dotsLen = 9 - dots.length

        const firstBody = body.slice(0, dotsLen)
        const secondBody = body.slice(dotsLen).replace(/\^/g, ".")

        const translated = this.translate(firstBody + secondBody, -1)

        const dotted = Array.from(dots).reduce((prev, curr) => {
            const slice = prev.slice(Number(curr))
            return prev.replace(slice, "." + slice)
        }, translated)

        const prefix = this.schemes[scheme] ?? ""
        const suffix = this.extensions[extension] ?? ""

        return prefix + dotted + suffix
    }

    encode(url) {
        let encoded = "l$"
    
        const [matched, scheme, host, dir] = TextUtil.getMatches(this.DECODED_PARTS_REGEX, url)
        if (!matched) return

        const prefix = (encoded == (encoded += this.schemes[scheme] ?? "")) ? scheme : ""
        const suffix = (encoded == (encoded += this.extensions[dir.slice(-5)] ?? "")) ? (encoded += 0, dir) : dir.slice(0, -5)

        const dotted = prefix + host + suffix

        const firstBody = Array.from(dotted.slice(0, 10)).reduce((prev, curr, idx) => {
            if (curr === ".") return encoded += idx, prev
            else return prev + curr
        }, "")
        encoded += "|" 

        const secondBody = dotted.slice(10).replace(/\./g, "^")

        return encoded += this.translate(firstBody + secondBody, 1)
    }

    translate(input, offset) {
        return Array.from(input).reduce((prev, curr) => {
            const idx = this.charSet.indexOf(curr)

            const ret = ~idx ? this.charSet[this.wrapIndex(idx + offset)] : curr

            return prev + ret
        }, "")
    }

    wrapIndex(index) {
        const range = this.charSet.length
        return ((index) % range + range) % range
    }
}
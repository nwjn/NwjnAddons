import TextUtil from "./TextUtil";

const stufRegex = /(l\$)([hH])([1-4])([0-9]+)?\|(.+)/
const urlRegex = /(https?:\/\/)(.+\..+)(\/.+)(\.(?:png|jpe?g|gif))/
const schemes = {
    "h": "http://",
    "H": "https://"
}
const extensions = {
    "1": ".png",
    "2": ".jpg",
    "3": ".jpeg",
    "4": ".gif"
}
const charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
/**
 * - An adaption of STuF (Permitted by Stuffy)
 * @see https://github.com/stuffyerface/STuF
 */
export default class STuF {

    /**
     * Decodes a string in Standardized Truncated url Format.
     * @param {String} string - The String to Decode.
     * @returns {String} url
     */
    static decode = (string) => {
        const [valid, scheme, extension, dots, body] = TextUtil.getMatches(stufRegex, string)
        if (!valid) return false

        const [host, dir] = TextUtil.getMatches(/^(\w+)(\/\w+)$/, body)

        let url = STuF.translate(host + dir.replace(/\^/g, "."), -1)

        for (let i of dots) url = url.slice(0, ~~i) + "." + url.slice(~~i)

        const getScheme = schemes[scheme]
        const getExtension = extensions[extension]
        if (!getScheme || !getExtension) return
        return getScheme + url + getExtension
    }

    /**
     * Encodes a string in Standardized Truncated url Format.
     * @param {String} url - The URL to Encode.
     */
    static encode = (url) => {
        const [scheme, host, dir, extension] = TextUtil.getMatches(urlRegex, url)
        if (!scheme) return false

        let encoded = "l$"
            + TextUtil.getKeyFromValue(schemes, scheme)
            + TextUtil.getKeyFromValue(extensions, extension)

        for (let i in host)
            if (host[i] === ".")
                encoded += i

        const mappedURL = STuF.translate(host.replace(/\./g, "") + dir.replace(/\./g, "^"), 1)

        return encoded + "|" + mappedURL
    }

    /**
     * @param {String} string 
     * @param {Number} inc Encode uses 1, Decode uses -1
     * @returns {String}
     */
    static translate(string, inc) {
        let result = ""
        for (let i = 0; i < string.length; i++) {
            let char = string[i];
            let index = charSet.indexOf(char);

            result += index === -1 ? char : charSet[index + inc]
        }

        return result
    }
}

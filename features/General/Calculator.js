import { addCommand } from "../../libs/Helper/Command"
import NumUtil from "../../libs/Helper/NumUtil"
import Nwjn from "../../libs/Helper/Nwjn"

void new class {
    REGEX = {
        tokens: /\-?\d*\.?\d+|\*\*|\^|\*|\/|\%|\+|\-/g,
        remove: /[^\d\+\-\*\%\/\^\(\)\.]/g,
        subs: /\(([^()]+)\)/g,
        parenthesis: /\(|\)/g,
        
        exponential: /\^|\*\*/,
        multiplicative: /\*|\/|\%/,
        additive: /\+|\-/
    }

    OPERATIONS = {
        "^" : (a, b) => a ** b,
        "**": (a, b) => a ** b,
        "*" : (a, b) => a *  b,
        "/" : (a, b) => a /  b,
        "%" : (a, b) => a %  b,
        "+" : (a, b) => a +  b,
        "-" : (a, b) => a -  b
    }

    steps = []

    constructor() {
        addCommand({
            name: "calc", 
            description: "Calculate the given equation", 
            run: this.onCommand.bind(this),
            clickAction: "suggest"
        })
    }

    /** @Event Command */
    onCommand(...args) {
        if (!args?.[0]) return Client.scheduleTask(() => Client.setCurrentChatMessage("/nwjn calc "))

        const raw = args.join("")
        const equat = raw.replace(this.REGEX.remove, "")

        if (!equat) return Nwjn.chat("§cNo numbers given.")

        this.steps.push(`§b${equat}`)

        const solved = NumUtil.formatGrouped(this.solve(equat))
        Nwjn.chatComponent(`§b${raw}§r = §l§a${solved}`)
            .setHover("show_text", this.steps.join("§r\n"))
            .chat()

        this.steps.length = 0
    }

    step(action, data) {
        this.steps.push(`[${action}] ${Array.isArray(data) ? data.join(" ") : data}`)
    }

    /**
     * Solves operations and modifies array in place
     * @param {number} opIdx index of the array
     * @param {Array} array array of operations and numbers
     */
    mergeSolve(opIdx, array) {
        // grr unary negative
        if (array[opIdx] === "-" && (!opIdx || isNaN(array[opIdx - 1]))) return array.splice(opIdx, 2, -array[opIdx + 1])

        const operation = this.OPERATIONS[array[opIdx]]
        if (!operation) return

        const parts = array.slice(opIdx - 1, opIdx + 2)
        this.step("Solving", parts)

        array.splice(
            opIdx - 1, // Start at first number
            3, // Remove number, operator, number
            operation(+parts[0], +parts[2]) // Replace first number with solved
        )

        this.step("Merge", array)
    }

    /**
     * Split equation into parts and solve by order of operations
     * @param {string} equat equation
     */
    partition(equat) {
        const arr = equat.match(this.REGEX.tokens)
        if (!arr) return equat

        this.step("Start Partition", arr)
    
        // solve exponential
        for (let i = arr.length - 1; i >= 0; i--) {
            if (this.REGEX.exponential.test(arr[i])) {
                this.mergeSolve(i, arr)
                i = arr.length
            }
        }
        
        // solve multiplicative
        for (let i in arr) {
            if (this.REGEX.multiplicative.test(arr[i]))
                this.mergeSolve(i--, arr)
        }
        
        // solve additive
        for (let i in arr) {
            if (this.REGEX.additive.test(arr[i]))
                this.mergeSolve(i--, arr)
        }
        
        this.step("Partition Result", arr[0])

        return arr[0]
    }

    /**
     * Solve parenthesis then hand equation to partitions
     * @param {string} equat 
     * @returns {string} solved
     */
    solve(equat) {
        const subCalculations = equat.match(this.REGEX.subs)
        let result = equat
    
        if (!subCalculations) return this.partition(equat)

        for (let subCalc of subCalculations) {
            let solve = this.partition(subCalc.replace(this.REGEX.parenthesis, ""))

            this.step("Solve Sub", `(${subCalc}) = ${solve}`)

            result = result.replace(subCalc, solve)

            this.step("Merge Sub", result)
        }

        if (result.includes("(")) return this.solve(result)
    
        this.step("Rewrite", result)
        return this.partition(result)
    }
}
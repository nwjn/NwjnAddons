import Command from "../../libs/Helper/Command"
import NumUtil from "../../libs/Helper/NumUtil"
import Nwjn from "../../libs/Helper/Nwjn"

void new class {
    REGEX = {
        shorthand: /[\d\.\,]+[kmbtq]/g,
        remove: /[^\d\+\-\*\%\/\^\(\)\.]/g,
        subs: /\(([^()]+)\)/g,
        parenthesis: /\(|\)/g,
        
        operator: /[\+\-\*\/\%\^\(\)]/,
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
        Command.addCommand({
            name: "calc", 
            description: "Calculate the given equation", 
            run: this.onCommand.bind(this),
            clickAction: "suggest_command",
            asOwnCommand: true
        })
    }

    /** @Event Command */
    onCommand(...args) {
        const raw = args.reduce((ret, curr) => curr ? ret + curr : ret, "")
        
        const equat = (raw.match(this.REGEX.shorthand) ?? [])
            .reduce((prev, curr) => prev.replace(curr, NumUtil.parseCompact(curr)), raw)
            .replace(this.REGEX.remove, "")

        if (!equat) return Nwjn.chat("§cNo numbers given.")

        this.steps.push(`§b${ equat }`)

        const solve = this.solve(NumUtil.isFormatUS() ? equat : NumUtil.swapFormat(equat))
        Nwjn.chatComponent(`§b${ raw }§r = §l§a${ NumUtil.formatGrouped(solve) }`)
            .setHover("show_text", this.steps.join("\n"))
            .chat()

        this.steps.length = 0
    }

    tokenizer(equat) {
        const tokens = []
        let current = "", prev = ""

        for (let char of equat) {
            if (this.REGEX.operator.test(char)) {
                if (char === '-' && (!prev || this.REGEX.operator.test(prev))) {
                    if (current) tokens.push(current)
                    current = char
                }
                else {
                    if (current) tokens.push(current)
                    current = ""
                    tokens.push(char)
                }
            }
            else if (/[\d\.]/.test(char)) {
                current += char
            }

            prev = char
        }

        if (current) tokens.push(current)
        return tokens
    }

    step(action, data, _sub = false) {
        if (!NumUtil.isFormatUS()) data = Array.isArray(data) ? data.map(it => NumUtil.swapFormat(it)) : NumUtil.swapFormat(data)
            
        _sub = _sub ? "  " : ""
        this.steps.push(`${ _sub }${ action } | ${ Array.isArray(data) ? data.join(" ") : data }§r`)
    }

    /**
     * Solves operations and modifies array in place
     * @param {number} opIdx index of the array
     * @param {Array} array array of operations and numbers
     */
    mergeSolve(opIdx, array, _sub) {
        // grr unary negative
        if (array[opIdx] === '-' && (!opIdx || this.REGEX.operator.test(array[opIdx - 1]))) return void array.splice(opIdx, 2, -array[opIdx + 1])

        const operation = this.OPERATIONS[array[opIdx]]
        if (!operation) return

        const parts = array.slice(opIdx - 1, opIdx + 2)
        this.step("§6Solve", parts, _sub)

        array.splice(
            opIdx - 1, // Start at first number
            3, // Remove number, operator, number
            operation(+parts[0], +parts[2]) // Replace first number with solved
        )

        this.step("§3Result", array, _sub)
    }

    /**
     * Split equation into parts and solve by order of operations
     * @param {string} equat equation
     */
    partition(equat, _sub) {
        const arr = this.tokenizer(equat)
        if (!arr) return equat
    
        // solve exponential
        for (let i = arr.length - 1; i >= 0; i--) {
            if (this.REGEX.exponential.test(arr[i])) {
                this.mergeSolve(i, arr, _sub)
                i = arr.length
            }
        }
        
        // solve multiplicative
        for (let i = 0; i < arr.length - 1; i++) {
            if (this.REGEX.multiplicative.test(arr[i]))
                this.mergeSolve(i--, arr, _sub)
        }
        
        // solve additive
        for (let i = 0; i < arr.length - 1; i++) {
            if (this.REGEX.additive.test(arr[i]))
                this.mergeSolve(i--, arr, _sub)
        }

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
            this.step("§eSolve", subCalc)
            let solve = this.partition(subCalc.replace(this.REGEX.parenthesis, ""), true)

            result = result.replace(subCalc, solve)

            this.step("§9Rewrite", result)
        }

        if (result.includes("(")) return this.solve(result)

        return this.partition(result)
    }
}
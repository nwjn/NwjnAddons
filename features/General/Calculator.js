import { addCommand } from "../../libs/Helper/Command"
import NumUtil from "../../libs/Helper/NumUtil"
import Nwjn from "../../libs/Helper/Nwjn"

void new class {
    exponential = /\^|\*\*/
    multiplicative = /\*|\/|\%/
    additive = /\+|\-/

    OPERATIONS = {
        "^" : (a, b) => a ** b,
        "**": (a, b) => a ** b,
        "*" : (a, b) => a *  b,
        "/" : (a, b) => a /  b,
        "%" : (a, b) => a %  b,
        "+" : (a, b) => a +  b,
        "-" : (a, b) => a -  b
    }

    constructor() {
        addCommand("calc", "Calculate the given equation", this.onCommand.bind(this))
    }

    /** @Event Command */
    onCommand(...args) {
        if (!args?.[0]) return Nwjn.chat("§cNo equation given.")

        const raw = args.join("")
        const equat = raw.replace(/[^\d\+\-\*\%\/\^\(\)\.]/g, "")

        if (!equat) return Nwjn.chat("§cNo numbers given.")

        const steps = [`§b${raw}§r`]
        const solved = NumUtil.formatGrouped(this.solve(equat, steps))
        
        Nwjn.chatComponent(`${steps[0]} = §l§a${solved}`)
            .setHover("show_text", steps.join("\n"))
            .chat()
    }

    /**
     * Solves operations and modifies array in place
     * @param {number} opIdx index of the array
     * @param {Array} array array of operations and numbers
     */
    mergeSolve(opIdx, array, _steps) {
        const operation = this.OPERATIONS[array[opIdx]]
        if (!operation) return

        array.splice(
            opIdx - 1, // Start at first number
            3, // Remove number, operator, number
            operation(+array[opIdx - 1], +array[opIdx + 1]) // Replace first number with solved
        )

        _steps.push(array.join(" "))
    }

    /**
     * Split equation into parts and solve by order of operations
     * @param {string} equat equation
     */
    partition(equat, _steps) {
        const arr = equat.match(/((?:^-*)?[\d\.]+|\*\*|\^|\*|\/|\%|\+|\-)/g)
        if (!arr) return equat
    
        // solve exponential
        for (let i in arr) {
            if (this.exponential.test(arr[i]))
                this.mergeSolve(i--, arr, _steps)
        }
        
        // solve multiplicative
        for (let i in arr) {
            if (this.multiplicative.test(arr[i]))
                this.mergeSolve(i--, arr, _steps)
        }
        
        // solve additive
        for (let i in arr) {
            if (this.additive.test(arr[i]))
                this.mergeSolve(i--, arr, _steps)
        }
        
        return arr[0]
    }

    /**
     * Solve parenthesis then hand equation to partitions
     * @param {string} equat 
     * @returns {string} solved
     */
    solve(equat, _steps) {
        const subCalculations = equat.match(/\(([^()]+)\)/g)
        let result = equat
    
        if (!subCalculations) return this.partition(equat, _steps)
    
        for (let subCalc of subCalculations) {
            subCalc = subCalc.replace(/\(|\)/g, "")
            result = result.replace(`(${subCalc})`, this.partition(subCalc, _steps))
        }
    
        if (result.includes("(")) return this.solve(result, _steps)
    
        return this.partition(result, _steps)
    }
}
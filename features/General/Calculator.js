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
        const equat = raw.replace(/[^\d\+\-\*\%\/\^\(\)\.]/g, "")

        if (!equat) return Nwjn.chat("§cNo numbers given.")

        const solved = NumUtil.formatGrouped(this.solve(equat))
        Nwjn.chat(`§b${raw}§r = §l§a${solved}`)
    }

    /**
     * Solves operations and modifies array in place
     * @param {number} opIdx index of the array
     * @param {Array} array array of operations and numbers
     */
    mergeSolve(opIdx, array) {
        const operation = this.OPERATIONS[array[opIdx]]
        if (!operation) return

        array.splice(
            opIdx - 1, // Start at first number
            3, // Remove number, operator, number
            operation(+array[opIdx - 1], +array[opIdx + 1]) // Replace first number with solved
        )
    }

    /**
     * Split equation into parts and solve by order of operations
     * @param {string} equat equation
     */
    partition(equat) {
        const arr = equat.match(/((?:^-*)?[\d\.]+|\*\*|\^|\*|\/|\%|\+|\-)/g)
        if (!arr) return equat
    
        // solve exponential
        for (let i in arr) {
            if (this.exponential.test(arr[i]))
                this.mergeSolve(i--, arr)
        }
        
        // solve multiplicative
        for (let i in arr) {
            if (this.multiplicative.test(arr[i]))
                this.mergeSolve(i--, arr)
        }
        
        // solve additive
        for (let i in arr) {
            if (this.additive.test(arr[i]))
                this.mergeSolve(i--, arr)
        }
        
        return arr[0]
    }

    /**
     * Solve parenthesis then hand equation to partitions
     * @param {string} equat 
     * @returns {string} solved
     */
    solve(equat) {
        const subCalculations = equat.match(/\(([^()]+)\)/g)
        let result = equat
    
        if (!subCalculations) return this.partition(equat)

        for (let subCalc of subCalculations) {
            subCalc = subCalc.replace(/\(|\)/g, "")
            result = result.replace(`(${subCalc})`, this.partition(subCalc))
        }

        if (result.includes("(")) return this.solve(result)
    
        return this.partition(result)
    }
}
import { addCommand } from "../../libs/Helper/Command"
import NumUtil from "../../libs/Helper/NumUtil"
import Nwjn from "../../libs/Helper/Nwjn"

new class {
    constructor() {
        addCommand("calc", "Calculate the given equation", this.onCommand.bind(this))
    }

    onCommand(...args) {
        try {
            const raw = args.join("")
            const equat = raw.replace(/[^\d+\-*/^().]/g, "")

            const solved = NumUtil.formatGrouped(this.solve(equat))
            Nwjn.chat(`${raw} = ${solved}`)
        } catch (err) {
            Nwjn.chat(`Error whilst solving: ${err}`)
        }
    }

    mergeSolve(op, array) {
        let i1 = op - 1
        let i2 = op + 1
    
        let t1 = +array[i1]
        let t2 = +array[i2]
    
        switch (array[op]) {
            case "^":
                array[i1] = Math.pow(t1, t2)
                break
            case '*':
                array[i1] = t1 * t2
                break
            case '/':
                array[i1] = t1 / t2
                break
            case '+':
                array[i1] = t1 + t2
                break
            case '-':
                array[i1] = t1 - t2
                break
            default:
                return
        }
    
        array[op] = array[i2] = false
    
        return array.filter(it => it !== false)
    }

    partition(string) {
        let arr = string.match(/(-*[0-9]+|\+|\-|\*|\/|\^)/g)
        if (!arr) return string
    
        let i = -1
        while (i++ < arr.length - 1) 
            if (arr[i] == '*') 
                arr = this.mergeSolve(i--, arr)
        
        i = -1
        while (i++ < arr.length - 1) 
            if (arr[i] == '/') 
                arr = this.mergeSolve(i--, arr)
        
        i = -1
        while (i++ < arr.length - 1) 
            if (arr[i] == '+' || arr[i] == '-')
                arr = this.mergeSolve(i--, arr)
        
        return arr[0]
    }

    solve(str) {
        let result = str
        let subCalculations = str.match(/\(([^()]+)\)/g)
        let subCalc
    
        if (!subCalculations)
            return this.partition(str)
    
        for (let k = 0; k < subCalculations.length; k++) {
            subCalc = subCalculations[k].replace(/\(|\)/g, "")
            result = result.replace(`(${subCalc})`, this.partition(subCalc))
        }
    
        if (result.includes("("))
            return this.solve(result)
    
        return this.partition(result)
    }
}
import { rules } from './rule.js'
import { readFileSync, writeFileSync } from 'fs'
const gcodeFile = process.argv[2]
console.log('processing', gcodeFile)

const gcode = readFileSync(gcodeFile, { encoding: 'utf-8' }) || ''
let currentCode = gcode
for (const rule of rules) {
  currentCode = currentCode.replace(rule.find, rule.replace || '')
}
console.log(currentCode)
writeFileSync(gcodeFile + '.gcode', currentCode)

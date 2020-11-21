import { readFileSync, writeFileSync } from 'fs'
import { rebuild } from './gcode.js'
const gcodeFile = process.argv[2]
console.log('processing', gcodeFile)
const gcode = readFileSync(gcodeFile, { encoding: 'utf-8' }) || ''
const outputCode = rebuild(gcode)
writeFileSync(gcodeFile + '.gcode', outputCode)

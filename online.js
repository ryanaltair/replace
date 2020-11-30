import { rebuild } from './gcode.js'
const loader = document.querySelector('#loader')
const scaleEl = document.querySelector('#scale')
const g0fEl = document.querySelector('#g0f')
const g1fEl = document.querySelector('#g1f')
const toFixedEl = document.querySelector('#toFixed')
function download (filename, text) {
  const element = document.createElement('a')
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
  )
  element.setAttribute('download', filename)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}
function parseFile () {
  const file = loader.files[0]
  console.log(`File name: ${file.name}`) // e.g my.png
  console.log(`Last modified: ${file.lastModified}`) // e.g 1552830408824
  console.log(file)
  const reader = new FileReader()
  reader.readAsText(file)
  reader.onload = function () {
    console.log(reader.result)
    const opt = {
      g0FeedRate: Number(g0fEl.value),
      g1FeedRate: Number(g1fEl.value),
      scale: Number(scaleEl.value),
      toFixedCount: Number(toFixedEl.value)
    }
    const gcodeRaw = reader.result
    const gcode = rebuild(gcodeRaw, opt)
    download(file.name, gcode)
  }
  reader.onerror = function () {
    console.log(reader.error)
  }
}
loader.addEventListener('change', parseFile)

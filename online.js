import { rebuild } from './gcode.js'
const loader = document.querySelector('#loader')
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
    const gcodeRaw = reader.result
    const gcode = rebuild(gcodeRaw)
    download(file.name, gcode)
  }
  reader.onerror = function () {
    console.log(reader.error)
  }
}
loader.addEventListener('change', parseFile)

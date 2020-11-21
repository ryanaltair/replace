function rebuild (gcode, opt = {}) {
  const splitCode = opt.lineSplit || '\n'
  const output = []
  const lines = gcode.split(splitCode)
  console.log(lines)
  function getSpeed (words) {
    console.log(words)
    for (const word of words) {
      if (word.startsWith('F')) {
        console.log('speed', word, word.slice(1))
        return word.slice(1)
      }
    }
  }
  function fillSpeed (words, speedNow) {
    const newWords = []
    for (const word of words) {
      if (word.startsWith('F')) {
        return words.join(' ')
      }
    }
    for (const word of words) {
      newWords.push(word)
      if (word.startsWith('G')) {
        newWords.push(`F${speedNow}`)
      }
    }
    return newWords.join(' ')
  }
  let speed = ''
  for (const line of lines) {
    console.log('lINE', line)
    if (line.startsWith('G1') || line.startsWith('G1')) {
      // console.log('CMD', line)
      const words = line.trim().split(' ')
      speed = getSpeed(words) || speed
      output.push(fillSpeed(words, speed))
    } else {
      // console.log('DROP', line)
    }
  }
  return output.join(splitCode)
}
export { rebuild }

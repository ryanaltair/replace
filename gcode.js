function rebuild (gcode, opt = {}) {
  const splitCode = opt.lineSplit || '\n'
  const lines = gcode.split(splitCode)
  const { g0FeedRate, g1FeedRate, scale, toFixedCount } = opt
  const g0FeedRateStr = g0FeedRate ? `F${g0FeedRate}` : undefined
  const g1FeedRateStr = g1FeedRate ? `F${g1FeedRate}` : undefined
  console.log(opt)
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
  function changeScale (words) {
    console.log('words', typeof words)
    const newWords = []
    for (const wordRaw of words) {
      const word = wordRaw.trim()
      const wordStart = word[0]
      const wordEnd = word.slice(1)
      if (['X', 'Y', 'Z'].includes(wordStart)) {
        const scaled = Number(wordEnd) * Number(scale)
        newWords.push(`${wordStart}${scaled.toFixed(toFixedCount)}`)
      } else {
        newWords.push(word)
      }
    }
    console.log('if', newWords.join(' '))
    return newWords.join(' ')
  }
  function fillSpeed (words, speedNow) {
    const newWords = []
    for (const word of words) {
      if (!word.startsWith('F')) {
        // ignore old FeedRate
        newWords.push(word)
      }
      if (word.startsWith('G0')) {
        newWords.push(g0FeedRateStr || `F${speedNow}`)
      } else if (word.startsWith('G1')) {
        newWords.push(g1FeedRateStr || `F${speedNow}`)
      }
    }
    return newWords.join(' ')
  }
  let speed = ''
  let output = []
  for (const line of lines) {
    console.log('lINE', line)
    if (line.startsWith('G0') || line.startsWith('G1')) {
      // console.log('CMD', line)
      const words = line.trim().split(' ')
      speed = getSpeed(words) || speed
      output.push(fillSpeed(words, speed))
    } else {
      // console.log('DROP', line)
    }
  }
  if (scale) {
    output = output.map(raw => {
      const line = raw.trim().split(' ')
      return changeScale(line)
    })
  }
  return output.join(splitCode)
}
export { rebuild }

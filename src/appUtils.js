export function checkGuess(w, g, isWord) {
  const word = [...w]
  const guess = [...g]
  const checkedGuess = []
  let isCorrect = false
  
  //if guess is not a word
  if (!isWord) {
    for (let i = 0; i < guess.length; i++) {
      checkedGuess[i] = {char: guess[i], match: 'not-a-word'}
    }
    return {newGuess: checkedGuess, isCorrect: isCorrect}
  }

  //check full matches
  let matches = 0
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === word[i]) {
      checkedGuess[i] = {char: guess[i], match: 'match'}
      guess[i] = ' '
      word[i] = ' '
      matches += 1
    }
  }

 // if all characters are full matches no need to check for partial-matches
 if (matches === word.length) {
  isCorrect = true
  return {newGuess: checkedGuess, isCorrect: isCorrect}
 }

 //check partial matches
 for (let i = 0; i < guess.length; i++) {
   if (guess[i] !== ' ') {
     const partialMatchIndex = word.indexOf(guess[i])
     if (partialMatchIndex !== -1) {
       checkedGuess[i] = {char: guess[i], match: 'partial-match'}
       guess[i] = ' '
       word[partialMatchIndex] = ' '
     }
     else {
       checkedGuess[i] = {char: guess[i], match: 'no-match'}
     }
   }
 }
 return {newGuess: checkedGuess, isCorrect: isCorrect}
}

export function getRandomWord(words) {
  const i = Math.floor(Math.random() * words.length)
  return {newWord: words[i][0], newDef: words[i][1]}
}

export function getWordOfTheDay(words) {
  const date = new Date
  const seed = Number(date.getUTCDate().toString() + date.getUTCMonth().toString() + date.getUTCFullYear().toString())
  const i = Math.floor(splitmix32(seed)() * words.length)
  return {newWord: words[i][0], newDef: words[i][1]}
}

export function wordExists(words, word) {
  if(binarySearch(words, word) === -1) return false
  return true
}

function binarySearch(array, value) {
  let low = 0
  let high = array.length - 1
  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    if (array[mid][0] > value) high = mid - 1
    else if (array[mid][0] < value) low = mid + 1
    else return mid
  }
  return -1
}

function splitmix32(a) {
  return function() {
    a |= 0; a = a + 0x9e3779b9 | 0;
    var t = a ^ a >>> 16; t = Math.imul(t, 0x21f0aaad);
        t = t ^ t >>> 15; t = Math.imul(t, 0x735a2d97);
    return ((t = t ^ t >>> 15) >>> 0) / 4294967296;
  }
}
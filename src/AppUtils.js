export function checkGuess(w, g) {
  const word = [...w]
  const guess = [...g]
  const checkedGuess = []
  let hasWon = false

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
  hasWon = true
  return {newGuess: checkedGuess, hasWon: hasWon}
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
 return {newGuess: checkedGuess, hasWon: hasWon}
}

export function getRandomWord(words) {
  const i = Math.floor(Math.random() * words.length)
  return words[i]
}
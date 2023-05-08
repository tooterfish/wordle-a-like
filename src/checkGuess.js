export default function checkGuess(w, g) {
  const word = [...w]
  const guess = [...g]
 //assume word and guess are already arrays, not strings
 const checkedGuess = []

 //check full matches
 for (let i = 0; i < guess.length; i++) {
   if (guess[i] === word[i]) {
     checkedGuess[i] = {char: guess[i], match: 'match'}
     guess[i] = ' '
     word[i] = ' '
   }
 }

 //check partial matches
 for (let i = 0; i < guess.length; i++) {
   if (guess[i] !== ' ') {
     const partialMatchIndex = word.indexOf(guess[i])
     if (partialMatchIndex !== -1) {
       checkedGuess[i] = {char: guess[i], match: 'partial-match'}
       guess[i] = ' '
       word[i] = ' '
     }
     else {
       checkedGuess[i] = {char: guess[i], match: 'no-match'}
     }
   }
 }
 return checkedGuess
}
import './App.css'

import { useEffect, useState } from 'react'

import {checkGuess, getRandomWord, wordExists} from './AppUtils'

import RowChecked from './RowChecked'
import RowInput from './RowInput'
import RowBlank from './RowBlank'
import Keyboard from './Keyboard'

import words from './words.json'

export default function App() {
  const [word, setWord] = useState([])
  const [guess, setGuess] = useState([])
  const [isWord, setIsWord] = useState(true)
  const [checkedGuesses, setCheckedGuesses] = useState([[], [], [], [], [], []])
  const [foundLetters, setFoundLetters] = useState({})
  let [inputRow, setInputRow] = useState(0)
  
  useEffect(() => {
      setWord(getRandomWord(words))
      // setWord('hexyl')
  }, [])

  useEffect(() => {
    if (word.length > 0) {
      if (guess.length === word.length) {
        if (!wordExists(words, guess.join(''))) {
          setIsWord(false)
        }
        else setIsWord(true)
      }
      else {
        setIsWord(true)
      }
    }
  }, [guess])

  function submitGuess() {
    if (isWord) {
      console.log(word) //debug
      const {newGuess, hasWon}= checkGuess(word, guess)
      const newFoundLetters = {...foundLetters}
      newGuess.forEach((letter) => {
        if (newFoundLetters[letter.char]) {
          switch (letter.match) {
            case 'match':
              if (newFoundLetters[letter.char] !== 'match') newFoundLetters[letter.char] = 'match'
              break
            case 'partial-match':
              if (newFoundLetters[letter.char] !== 'match' && newFoundLetters[letter.char] !== 'no-match') newFoundLetters[letter.char] = 'partial-match'
              break
          }
        }
        else {
          newFoundLetters[letter.char] = letter.match
        }
        // if (letter.match === 'match') newFoundLetters[letter.char] = letter.match
        // else if (letter.match === 'partial-match' && newFoundLetters[letter.char] !== 'match') newFoundLetters[letter.char] = letter.match
        // else newFoundLetters[letter.char] = letter.match
      })
      setFoundLetters(newFoundLetters)
      const newGuesses = [...checkedGuesses]
      newGuesses[inputRow] = newGuess
      setCheckedGuesses(newGuesses)
      setInputRow(inputRow += 1)
      setGuess([])
      console.log(hasWon)
    }
  }

  return (
    <>
    <div className="game-board">
      {checkedGuesses.map((checkedGuess, i) => {
        if (i === inputRow) return <RowInput key={i} guess={guess} wordLength={word.length} isWord={isWord}/>
        else if (checkedGuess.length !== 0) return <RowChecked key={i} checkedGuess={checkedGuess} />
        else return <RowBlank key={i} wordSize={word.length}/>
      })}
    </div>
      <Keyboard guess={guess} setGuess={setGuess} submitGuess={submitGuess} foundLetters={foundLetters} wordLength={word.length}/>
    </>
  )
}
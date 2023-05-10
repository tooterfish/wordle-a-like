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
  const [inputRow, setInputRow] = useState(0)

  const [hasWon, setHasWon] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  
  useEffect(() => {
      setWord(getRandomWord(words))
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
      const {newGuess, isCorrect}= checkGuess(word, guess)
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
      })
      setFoundLetters(newFoundLetters)
      const newGuesses = [...checkedGuesses]
      newGuesses[inputRow] = newGuess
      setCheckedGuesses(newGuesses)
      setInputRow(inputRow + 1)
      setGuess([])

      console.log(isCorrect)

      if (isCorrect) {
        console.log('<<<<<<<<<<')
        setHasWon(true)
        setIsPlaying(false)
      } 
      else {
        if (inputRow > checkedGuesses.length) {
          setIsPlaying(false)
        }
      }

      console.log('gameover ', !isPlaying, ' has won ', hasWon)

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
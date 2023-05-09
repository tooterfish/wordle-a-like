import './App.css'

import { useEffect, useState } from 'react'

import {checkGuess, getRandomWord} from './AppUtils'

import RowChecked from './RowChecked'
import RowInput from './RowInput'
import RowBlank from './RowBlank'
import Keyboard from './Keyboard'

import words from './words.json'

export default function App() {
  const [word, setWord] = useState([])
  const [guess, setGuess] = useState([])
  const [checkedGuesses, setCheckedGuesses] = useState([[], [], [], [], [], []])
  const [foundLetters, setFoundLetters] = useState({})
  let [inputRow, setInputRow] = useState(0)
  
  useEffect(() => {
      setWord(getRandomWord(words))
  }, [])

  function submitGuess() {
    console.log(word) //debug
    const newGuess = checkGuess(word, guess)
    const newFoundLetters = {...foundLetters}
    newGuess.forEach((letter) => {
      newFoundLetters[letter.char] = letter.match
    })
    setFoundLetters(newFoundLetters)
    const newGuesses = [...checkedGuesses]
    newGuesses[inputRow] = newGuess
    setCheckedGuesses(newGuesses)
    setInputRow(inputRow += 1)
    setGuess([])
  }

  return (
    <>
    <div className="game-board">
      {checkedGuesses.map((checkedGuess, i) => {
        if (i === inputRow) return <RowInput key={i} guess={guess} wordSize={word.length}/>
        else if (checkedGuess.length !== 0) return <RowChecked key={i} checkedGuess={checkedGuess} />
        else return <RowBlank key={i} wordSize={word.length}/>
      })}
    </div>
      <Keyboard guess={guess} setGuess={setGuess} submitGuess={submitGuess} foundLetters={foundLetters}/>
    </>
  )
}
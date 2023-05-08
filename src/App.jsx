import './App.css'

import { useState } from 'react'

import checkGuess from './checkGuess'

import RowChecked from './RowChecked'
import RowInput from './RowInput'
import RowBlank from './RowBlank'
import Keyboard from './Keyboard'

export default function App() {
  const [guess, setGuess] = useState([])
  const [word, setWord] = useState('awake'.split(''))
  const [checkedGuesses, setCheckedGuesses] = useState([[], [], [], [], [], []])
  let [inputRow, setInputRow] = useState(0)
  
  function submitGuess() {
    const newGuess = checkGuess(word, guess)
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
        if (inputRow === i) return <RowInput key={i} guess={guess} wordSize={word.length}/>
        else if (checkedGuess.length !== 0) return <RowChecked key={i} checkedGuess={checkedGuess} />
        else return <RowBlank key={i} wordSize={word.length}/>
      })}
    </div>
      <Keyboard guess={guess} setGuess={setGuess} submitGuess={submitGuess}/>
    </>
  )
}
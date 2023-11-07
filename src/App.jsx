import './App.css'

import { useEffect, useState } from 'react'

import {checkGuess, getRandomWord, getWordOfTheDay, wordExists} from './appUtils'

import Header from './Header'
import HowTo from './HowTo'
import Footer from './Footer'
import RowChecked from './RowChecked'
import RowInput from './RowInput'
import RowBlank from './RowBlank'
import Keyboard from './Keyboard'
import GameOver from './GameOver'
import Welcome from './Welcome'
import Restart from './Restart'

import wordsAndDefs from './wordsAndDefs.json'

export default function App() {
  const [word, setWord] = useState('     ')
  const [definition, setDefinition] = useState('')
  const [guess, setGuess] = useState([])
  const [isWord, setIsWord] = useState(true)
  const [checkedGuesses, setCheckedGuesses] = useState([[], [], [], [], [], []])
  const [foundLetters, setFoundLetters] = useState({})
  const [inputRow, setInputRow] = useState(0)
  const [winRow, setWinRow] = useState()

  const [hasWon, setHasWon] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const [howToOpen, setHowToOpen] = useState(false)

  function openHowTo() {
    setHowToOpen(true)
  }

  function reset() {
    setCheckedGuesses([[], [], [], [], [], []])
    setInputRow(0)
    setFoundLetters({})
    setGuess([])
    setIsPlaying(true)
    setHasWon(false)
    setWinRow()
  }

  function randomWord() {
    reset()
    const {newWord, newDef} = getRandomWord(wordsAndDefs)
    setWord(newWord)
    setDefinition(newDef)
  }

  function wordOfTheDay() {
    reset()
    const {newWord, newDef} = getWordOfTheDay(wordsAndDefs)
    setWord(newWord)
    setDefinition(newDef)
  }

  function submitGuess() {
    const isWord = wordExists(wordsAndDefs, guess.join(''))
    const {newGuess, isCorrect} = checkGuess(word, guess, isWord)

    if (isWord) {
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
    }

    const newGuesses = [...checkedGuesses]
    newGuesses[inputRow] = newGuess
    setCheckedGuesses(newGuesses)
    setInputRow(inputRow + 1)
    setGuess([])

    if (isCorrect) {
      setHasWon(true)
      setWinRow(inputRow)
      setIsPlaying(false)
      setInputRow(checkedGuesses.length)
    } 
    if (inputRow >= checkedGuesses.length - 1) {
        setIsPlaying(false)
    }
  }

  return (
    <>
    <Header openHowTo={openHowTo}/>
    <HowTo isOpen={howToOpen} setOpen={setHowToOpen}/>
    <div className="app">
      <div className="game-container">
        <div className="game-board">
          {checkedGuesses.map((checkedGuess, i) => {
            if (i === inputRow) return <RowInput key={i} guess={guess} wordLength={word.length} isWord={isWord}/>
            else if (checkedGuess.length !== 0) return <RowChecked key={i} checkedGuess={checkedGuess} winRow={(winRow === i)}/>
            else return <RowBlank key={i} wordSize={word.length}/>
          })}
        </div>
        {
          isPlaying ?
          <Keyboard guess={guess} setGuess={setGuess} submitGuess={submitGuess} foundLetters={foundLetters} wordLength={word.length}/>
          :
          <div className="info">
          {
            word === '     ' ?
            <>
              <Welcome />
            </> :
            <>
              <GameOver word={word} definition={definition} hasWon={hasWon}/>
            </>
          }
          <Restart randomWord={randomWord} wordOfTheDay={wordOfTheDay}/>
          </div>
        }
        </div>
    </div>
    <Footer />
    </>
  )
}
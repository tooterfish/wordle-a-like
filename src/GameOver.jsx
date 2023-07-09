import RowChecked from './RowChecked'

import {useEffect, useState} from 'react'

import './GameOver.css'

export default function GameOver({word, definition, hasWon}) {
  let msg = 'Bad Luck!'
  if (hasWon) {
    msg = 'Congratulations!'
  }

  const formattedWord = word[0].toUpperCase() + word.slice(1)

  const finishedWord = []
  for (const char of word) {
        finishedWord.push({char: char, match: 'match'})
  }

  return <div className="gameover">
    <h3>{msg}</h3><br />
    <div className="gameover-answer">
    The word you were looking for was<br />
    <RowChecked checkedGuess={finishedWord} winRow={true}/>
    </div>
    <div className="gameover-definition">
    <b>{formattedWord}</b>, {definition}<br />
    </div>
    Would you like to play again?
  </div>
}
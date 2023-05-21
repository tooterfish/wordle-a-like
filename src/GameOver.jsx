import RowChecked from './RowChecked'

import {useEffect, useState} from 'react'

import './GameOver.css'

export default function GameOver({word, definition, hasWon}) {
  let msg = 'Bad Luck!'
  if (hasWon) {
    msg = 'Congratulations!'
  }

  const finishedWord = []
  for (const char of word) {
        finishedWord.push({char: char, match: 'match'})
  }

  return <div className="gameover">
    <b>{msg}</b><br />
    The word you were looking for is:<br />
    <RowChecked checkedGuess={finishedWord}/>
    <b>{word[0].toUpperCase() + word.slice(1)}</b>, {definition}<br />
    Would you like to play again?
  </div>
}
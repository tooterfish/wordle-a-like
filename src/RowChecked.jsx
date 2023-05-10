import { useState, useEffect } from 'react'

import './Row.css'
import Card from './Card'

export default function RowChecked({ checkedGuess }) {

  const [side, setSide] = useState('')

  useEffect(() => {
    setTimeout(() => {
      setSide('card-flipped')
    }, 250)
  }, [])

  return <>
  <div className="row">
    {checkedGuess.map((checkedChar, i) => {
      return <Card key={i} char={checkedChar.char} flipped={`${side}`} frontStyle={'blank filled'} backStyle={`${checkedChar.match}`} />
    })}
  </div>
  </>
}
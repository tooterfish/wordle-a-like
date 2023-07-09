import { useState, useEffect } from 'react'

import './Row.css'
import Card from './Card'

export default function RowChecked({ checkedGuess, winRow }) {

  return <>
  <div className="row">
    {checkedGuess.map((checkedChar, i) => {
      return <Card key={i} char={checkedChar.char} flipIndex={i} frontStyle={'blank filled'} backStyle={`${checkedChar.match}`} winRow={winRow}/>
    })}
  </div>
  </>
}
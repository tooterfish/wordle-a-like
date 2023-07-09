import { useEffect, useState } from 'react'

import './Card.css'

export default function Card({char, flipIndex, frontStyle, backStyle, winRow}) {

  const [flipped, setFlipped] = useState('')
  const [won, setWon] = useState('')

  if (backStyle) {
    useEffect(() => {
      setTimeout(() => {
        setFlipped('card-flipped')
      }, 100 * flipIndex + 100)
    }, [])
  }

  if (winRow) {
      setTimeout(() => {
        setFlipped(`won`)
        setWon('card-match')
      }, 100 * flipIndex + 1000)
  }



  return <>
  <div className={`card ${flipped}`}>
    <div className={`front ${frontStyle} ${won}`}>{char}</div>
    <div className={`back card-${backStyle}`}>{char}</div>
  </div>
  </>
}
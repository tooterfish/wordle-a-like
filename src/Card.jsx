import { useEffect, useState } from 'react'

import './Card.css'

export default function Card({char, flipIndex, frontStyle, backStyle}) {

  const [flipped, setFlipped] = useState('')

  if (backStyle) {
    useEffect(() => {
      setTimeout(() => {
        setFlipped('card-flipped')
      }, 100 * flipIndex)
    }, [])
  }

  return <>
  <div className={`card ${flipped}`}>
    <div className={`back ${backStyle}`}>{char}</div>
    <div className={`front ${frontStyle}`}>{char}</div>
  </div>
  </>
  
  
}
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
    <div className={`front ${frontStyle}`}>{char}</div>
    <div className={`back card-${backStyle}`}>{char}</div>
  </div>
  </>
  
  
}
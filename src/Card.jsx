import './Card.css'

export default function Card({char, flipped, frontStyle, backStyle}) {
  return <>
  <div className={`card ${flipped}`}>
    <div className={`back ${backStyle}`}>{char}</div>
    <div className={`front ${frontStyle}`}>{char}</div>
  </div>
  </>
  
  
}
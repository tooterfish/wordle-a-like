import './Card.css'

export default function Card({char, match}) {
  return <div className={`card ${match}`}>{char}</div>
}
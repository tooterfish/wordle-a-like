import './Row.css'
import Card from './Card'

export default function Row({guess, wordSize}) {
  const n = wordSize - guess.length
  const remaining = Array.from({length: n})
  let input = 'current-input'
  return <>
  <div className="row input-row">
    {guess.map((char, i) => {
      return <Card key={i} char={char} match={'blank filled'}/>
    })}
    {remaining.map((_, i) => {
      if (i > 0) input = ''
      return <Card key={i} match={`blank ${input}`}/>
    })}
  </div>
  </>
}
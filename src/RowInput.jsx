import './Row.css'
import Card from './Card'

export default function Row({guess, wordSize, wordExists}) {
  const n = wordSize - guess.length
  const remaining = Array.from({length: n})
  let input = 'current-input'

  return <>
  <div className="row input-row">
    {guess.map((char, i) => {
      return <Card key={i} char={char} frontStyle={`blank filled ${wordExists}`}/>
    })}
    {remaining.map((_, i) => {
      if (i > 0) input = ''
      return <Card key={i} frontStyle={`blank ${input}`}/>
    })}
  </div>
  </>
}
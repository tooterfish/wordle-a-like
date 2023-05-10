import './Row.css'
import Card from "./Card"

export default function RowBlank({wordSize}) {
  const blankCards = Array.from({length: wordSize})
  return <>
  <div className="row">
    {blankCards.map((_, i) => { return <Card key={i} frontStyle={'blank'}/>})}
  </div>
  </>
}
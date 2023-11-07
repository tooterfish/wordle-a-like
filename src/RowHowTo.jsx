import './Row.css'
import Card from "./Card"

export default function RowBlank({word, type}) {
  return <>
  <div className="row">
    {word.map((char, i) => { 
      if (char) {
        return <Card key={i} char={char} flipIndex={i} frontStyle={'blank filled'} backStyle={type}/>
      } else {
        return <Card key={i} flipIndex={i} frontStyle={'blank'}/>
      }
    })
  }
  </div>
  </>
}
import './Row.css'
import Card from "./Card"

export default function RowBlank({word, type, position}) {
  return <>
  <div className="row row-howto">
    {word.map((char, i) => { 
      if (i === position) {
        return <Card key={i} char={char} flipIndex={i} frontStyle={'blank filled'} backStyle={type}/>
      } else {
        return <Card key={i} char={char} flipIndex={i} frontStyle={'blank'}/>
      }
    })
  }
  </div>
  </>
}
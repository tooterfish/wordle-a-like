import './Header.css'

export default function Header({openHowTo}) {
  return <div className="header">
    <h1>Wordle-a-Like</h1>
    <button onClick={openHowTo}>HowTo</button>
  </div>
  
}
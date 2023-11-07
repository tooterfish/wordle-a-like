import './Header.css'

export default function Header({openHowTo}) {
  return <div className="header">
    <div className='header-title'>
    <h1>Wordle-a-Like</h1>
    </div>
    <div className='header-options'>
      <button className='options-button' onClick={openHowTo}>?</button>
    </div>
  </div>
  
}
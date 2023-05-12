import './Restart.css'

export default function Restart({randomWord, wordOfTheDay}) {
  return<>
    <div className="restart-button-container">
    <button className="restart-button" onClick={randomWord}>Random Word</button>
    <button className="restart-button" onClick={wordOfTheDay}>Word of the Day</button>
    </div>
  </>
}
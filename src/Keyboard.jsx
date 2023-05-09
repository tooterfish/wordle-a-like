import './Keyboard.css'
import Key from './Key'

export default function Keyboard({guess, setGuess, submitGuess, foundLetters}) {
  const top = 'qwertyuiop'.split('')
  const mid = 'asdfghjkl'.split('')
  const bot = ['enter', ...'zxcvbnm'.split(''), 'del']

  function handleClick(e) {
    const newGuess = [...guess]
    switch(e.target.value) {
      case 'enter':
        if (newGuess.length === 5) {
          submitGuess()
        }
        break
      case 'del':
        newGuess.pop()
        setGuess(newGuess)
        break
      default:
        if (newGuess.length < 5) {
          newGuess.push(e.target.value)
          setGuess(newGuess)
        }
    }
  }

  return <>
    <div>
      <div className="key-row">
        {top.map((text) => { return <button key={text} value={text} onClick={handleClick} className={`key ${foundLetters[text]}`}>{text}</button> })}
      </div>
      <div className="key-row">
        {mid.map((text) => { return <button key={text} value={text} onClick={handleClick} className={`key ${foundLetters[text]}`}>{text}</button> })}
      </div>
      <div className="key-row">
        {bot.map((text) => {
          let special = ''
          if (text.length > 1) special = 'special-key'
          return <button key={text} value={text} onClick={handleClick} className={`key ${foundLetters[text]} ${special}`}>{text}</button> })}
      </div>
    </div>
  </>
}
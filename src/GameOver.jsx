export default function GameOver({word, hasWon}) {
  if (hasWon) {
    return<>
    <div>Congratulations! You successfully guessed {word}!
    </div>
    </> 
  }
  else {
    return<>
    <div>Bad luck! The word you were looking for was {word}.</div>
    </>
  }
}
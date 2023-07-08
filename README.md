# Wordle-a-Like  


## Project Summary
Wordle-a-Like is a Wordle clone created with React/Vite as a coding excercise and portfolio project.

### Link to Hosted Version
https://wordlealike.netlify.app/

**How to Play**  
Wordle is a word guessing game in which players get six attempts to guess a given word. Players may choose either a random word or the word of the day.

After each guess the game will highlight the guessed letters. Dark grey if the given word doesn't contain the letter, green for a correct letter in the correct position and yellow for a correct letter in the wrong position.

A Player's guess must be valid a word, otherwise the game will highlight the guessed letters in red even if they are correct.

**Technical Information**  
Binary search has been implemented to make searching the word list more efficient.

Word of the Day is implemented using the splitmix32 PRNG as documented [here](https://github.com/bryc/code/blob/master/jshash/PRNGs.md), using the current date as the seed.

### Setup
*Built with: Node v19.7.0, React v18.2.0*

To setup the project locally:

- Clone this repository
- Run ```npm install```
- Run ```npm run dev``` 

### Todo:
- Implement a "how to play" popup.
- Add support for user logins, to allow users to view their play stats.
- Compress the word list, as it's a little large at the moment.

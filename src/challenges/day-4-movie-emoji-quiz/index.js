import '../../styles/style.css'
import { films } from './data.js'

export default function movieEmojiQuiz(container) {
    container.innerHTML = `
        <div class="challenge">
            <main>
                <h1>Guess the Christmas Movie</h1>
                <div class="emoji-clues-container" aria-label="" aria-live="polite"></div>
                <form id="guess-input">
                    <label for="guess-input">Enter your guess</label>
                    <input type="text" placeholder="E.g. Home Alone" id="guess-input" name="guess-input">
                    <button type="submit" id="button">Submit Guess</button>
                </form>
                <div class="message-container" aria-live="polite">You have 3 guesses remaining.</div>
            </main>
        </div>
    `

    // Game state
    let remainingGuesses = 3
    let currentMovie = null
    let availableFilms = [...films]

    // Get DOM elements
    const guessForm = container.querySelector('#guess-input')
    const messageContainer = container.querySelector('.message-container')
    const emojiCluesContainer = container.querySelector('.emoji-clues-container')

    function startGame() {
        if (availableFilms.length === 0) {
            messageContainer.textContent = "That's all folks!"
            return
        }
        
        // Select random movie from remaining films
        const randomIndex = Math.floor(Math.random() * availableFilms.length)
        currentMovie = availableFilms[randomIndex]
        availableFilms.splice(randomIndex, 1)
        
        // Display emoji clues
        emojiCluesContainer.textContent = currentMovie.emoji.join(' ')
        emojiCluesContainer.setAttribute('aria-label', currentMovie.ariaLabel)
        
        // Reset game state
        remainingGuesses = 3
        messageContainer.textContent = `You have ${remainingGuesses} guesses remaining.`
        
        // Reset form
        const input = guessForm.querySelector('input')
        const button = guessForm.querySelector('button')
        input.disabled = false
        button.disabled = false
        input.value = ''
    }

    guessForm.addEventListener('submit', function(e) {
        e.preventDefault()
        
        const input = e.target.querySelector('input')
        const button = e.target.querySelector('button')
        const guess = input.value.trim().toLowerCase()
        const correctAnswer = currentMovie.title.toLowerCase()
        
        if (guess === correctAnswer) {
            messageContainer.textContent = '🎉 Correct! 🎉'
            input.disabled = true
            button.disabled = true
            
            setTimeout(startGame, 3000)
        } else {
            remainingGuesses--
            if (remainingGuesses > 0) {
                messageContainer.textContent = `Incorrect! You have ${remainingGuesses} more ${remainingGuesses === 1 ? 'guess' : 'guesses'} remaining.`
            } else {
                messageContainer.textContent = `The film was "${currentMovie.title}"!`
                input.disabled = true
                button.disabled = true
                
                setTimeout(startGame, 3000)
            }
        }
        
        input.value = ''
    })

    // Start the game
    startGame()
}
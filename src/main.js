import './styles/style.css'
import { challengeRegistry } from './challenges/index.js'

// Create the main app container
document.querySelector('#app').innerHTML = `
    <nav class="challenges-nav">
        <h1>JavaScriptmas 2024</h1>
        ${challengeRegistry.map(challenge => `
            <button data-challenge-id="${challenge.id}">${challenge.title}</button>
        `).join('')}
    </nav>
    <div id="challenges-container"></div>
`

// Function to dynamically load challenges
async function loadChallenge(challengeId) {
    const challenge = challengeRegistry.find(ch => ch.id === challengeId)
    if (!challenge) return

    try {
        // Update active state of buttons
        document.querySelectorAll('.challenges-nav button').forEach(btn => {
            btn.classList.remove('active')
            if (btn.dataset.challengeId === challengeId) {
                btn.classList.add('active')
            }
        })

        // Load and initialize the challenge
        const module = await import(challenge.path)
        const challengeContainer = document.getElementById('challenges-container')
        challengeContainer.innerHTML = ''
        module.default(challengeContainer)
    } catch (error) {
        console.error(`Error loading challenge ${challengeId}:`, error)
    }
}

// Add click handlers to buttons
document.querySelectorAll('.challenges-nav button').forEach(button => {
    button.addEventListener('click', () => {
        loadChallenge(button.dataset.challengeId)
    })
})

// Load the first challenge by default
loadChallenge(challengeRegistry[0].id) 
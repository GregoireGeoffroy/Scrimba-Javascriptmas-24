import '../../styles/style.css'

export default function santasEmojiHack(container) {
    container.innerHTML = `
        <div class="challenge">
            <h2>Day 3 - Santa's Emoji Hack 🎄</h2>
            <div class="emoji-hack-container">
                <div class="description">
                    <p>Santa wants to ban negative emojis during Christmas! Help him convert negative emoji shortcodes into positive ones.</p>
                    <p>Example: ":angry:" becomes "🎁" instead of "😠"</p>
                </div>
                <div class="input-wrapper">
                    <textarea id="input-text" 
                        placeholder="Type your text with emoji shortcodes (e.g., Just read your article :thumbsdown:)"
                        rows="4"
                    ></textarea>
                    <button id="convert-btn">Spread Christmas Joy! 🎅</button>
                </div>
                <div class="output-wrapper">
                    <h3>Positive Version:</h3>
                    <p id="output-text"></p>
                </div>
            </div>
        </div>
    `

    const inputText = container.querySelector('#input-text')
    const convertBtn = container.querySelector('#convert-btn')
    const outputText = container.querySelector('#output-text')

    const hackedEmojis = {
        "angry": "🎁",      // 😠
        "thumbsdown": "👏", // 👎  
        "man_facepalming": "🎅", // 🤦‍♂️
        "cry": "‍😄",        // 😭
        "puke": "🤩"       // 🤮
    }

    function emojifyWord(word) {
        if (word.startsWith(":") && word.endsWith(":")) {
            const key = word.slice(1, -1)
            return hackedEmojis[key] || word
        }
        return word
    }

    function emojifyPhrase(phrase) {
        const words = phrase.split(" ")
        const emojifiedWords = words.map(emojifyWord)
        return emojifiedWords.join(" ")
    }

    convertBtn.addEventListener('click', () => {
        const text = inputText.value
        if (text.trim()) {
            const emojiText = emojifyPhrase(text)
            outputText.textContent = emojiText
            outputText.classList.add('emoji-animation')
            setTimeout(() => outputText.classList.remove('emoji-animation'), 500)
        }
    })

    inputText.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            convertBtn.click()
        }
    })
} 
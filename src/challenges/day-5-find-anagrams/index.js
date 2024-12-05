import '../../styles/style.css'

export default function findAnagramsChallenge(container) {
    const anagrams = [
        ["Can Assault", "Santa Claus"],
        ["Refreshed Erudite Londoner", "Rudolf the Red Nose Reindeer"],
        ["Frosty The Snowman", "Honesty Warms Front"],
        ["Drastic Charms", "Christmas Cards"],
        ["Congress Liar", "Carol Singers"],
        ["The Tin Glints", "Silent Night"],
        ["Be The Helm", "Betlehem"],
        ["Is Car Thieves", "Christmas Eve"]
    ]

    container.innerHTML = `
        <div class="challenge">
            <div class="anagrams-container">
                <h2>Christmas Anagram Quiz 🔤</h2>
                <div class="description">
                    <p>Help find the valid Christmas anagrams! Some pairs might not be real anagrams.</p>
                    <p>Note: Spaces are ignored in the comparison.</p>
                </div>
                <div class="anagrams-list"></div>
                <button id="check-anagrams" class="check-btn">Check Anagrams</button>
                <div id="results" class="results"></div>
            </div>
        </div>
    `

    const anagramsList = container.querySelector('.anagrams-list')
    const checkButton = container.querySelector('#check-anagrams')
    const results = container.querySelector('#results')

    // Function to check if two strings are anagrams
    function areAnagrams(str1, str2) {
        const normalize = str => str.toLowerCase().replace(/\s/g, '').split('').sort().join('')
        return normalize(str1) === normalize(str2)
    }

    // Function to find valid anagrams
    function findAnagrams(array) {
        return array.filter(([str1, str2]) => areAnagrams(str1, str2))
    }

    // Display anagram pairs
    anagrams.forEach(([str1, str2], index) => {
        const pair = document.createElement('div')
        pair.className = 'anagram-pair'
        pair.innerHTML = `
            <div class="pair-number">${index + 1}</div>
            <div class="pair-content">
                <div class="word">${str1}</div>
                <div class="separator">⟷</div>
                <div class="word">${str2}</div>
            </div>
        `
        anagramsList.appendChild(pair)
    })

    // Handle check button click
    checkButton.addEventListener('click', () => {
        const validAnagrams = findAnagrams(anagrams)
        
        // Update UI to show results
        anagramsList.querySelectorAll('.anagram-pair').forEach((pair, index) => {
            const isValid = validAnagrams.some(([str1, str2]) => 
                anagrams[index][0] === str1 && anagrams[index][1] === str2
            )
            pair.className = `anagram-pair ${isValid ? 'valid' : 'invalid'}`
        })

        // Show results summary
        results.innerHTML = `
            <p>Found ${validAnagrams.length} valid anagram${validAnagrams.length === 1 ? '' : 's'} 
            out of ${anagrams.length} pairs!</p>
        `
        results.className = 'results show'
    })
} 
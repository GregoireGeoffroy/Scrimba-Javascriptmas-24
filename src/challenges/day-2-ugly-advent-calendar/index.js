import '../../styles/style.css'

export default function uglyAdventCalendar(container) {
    container.innerHTML = `
        <div class="challenge">
            <h2>JavaScriptmas 2024</h2>
            <h4>A new coding challenge daily until Christmas Day!</h4>
            <ol id="calendar" class="calendar-container"></ol>
        </div>
    `

    const calendarContainer = container.querySelector('#calendar')
    
    for (let i = 1; i <= 24; i++) {
        let box = document.createElement('li')
        box.classList.add('calendar-box')
        
        let number = document.createElement('p')
        number.innerHTML = i
        
        let icon = document.createElement('i')
        icon.classList.add('fas', 'fa-gift')
        
        let description = document.createElement('p')
        description.innerHTML = "Open me!"
        
        box.appendChild(number)
        box.appendChild(icon)
        box.appendChild(description)
        
        // Add click handler
        box.addEventListener('click', () => {
            box.style.transform = 'scale(1.1)'
            box.style.backgroundColor = '#F21905'
            box.style.color = '#5BA67B'
        })
        
        calendarContainer.appendChild(box)
    }
}

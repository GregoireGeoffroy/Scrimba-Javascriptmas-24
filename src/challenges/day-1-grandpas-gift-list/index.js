import '../../styles/style.css'

export default function christmasWishlist(container) {
    container.innerHTML = `
        <div class="challenge">
            <h2>Grandpa's Christmas Wishlist</h2>
            <div class="wishlist-container">
                <div class="input-container">
                    <input type="text" id="item-input" placeholder="Enter gift idea...">
                    <button id="add-item-button">Add to List</button>
                </div>
                <ul id="shopping-list"></ul>
            </div>
        </div>
    `

    // Get references to DOM elements
    const itemInput = container.querySelector('#item-input')
    const addItemButton = container.querySelector('#add-item-button')
    const shoppingList = container.querySelector('#shopping-list')
    const listArr = []

    // Function to check item is not duplicate
    function checkDuplicate() {
        const itemText = itemInput.value.trim().replace(/\s+/g, ' ')
        
        if (itemText && !listArr.some(item => item.toLowerCase() === itemText.toLowerCase())) {
            listArr.push(itemText)
            renderList()
        }
    }

    // Function to add an item to the shopping list
    function renderList() {
        shoppingList.innerHTML = ''
        listArr.forEach((gift) => {
            const listItem = document.createElement('li')
            listItem.textContent = gift
            shoppingList.appendChild(listItem)
        })
        itemInput.value = '' // Clear the input field
    }

    // Add event listeners
    addItemButton.addEventListener('click', checkDuplicate)
    itemInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            checkDuplicate()
        }
    })
} 
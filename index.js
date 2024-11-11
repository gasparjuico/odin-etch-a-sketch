const canvas = document.querySelector('.canvas');
const userInput = document.querySelector('#user-input');
const submitButton = document.querySelector('.submit-btn');
const penSelection = document.querySelector('.pen-selection');
const clearButton = document.querySelector('.clear-btn');
let colorMode = 'black';

penSelection.addEventListener('change', (event) => {
    // Check if the change event originated from an input with name 'colorMode'
    if (event.target.name === 'colorMode') {
        colorMode = event.target.value;
        console.log(`Color mode set to: ${colorMode}`);
    }
})

function createGrid(size) {
    // Clear any existing content (useful if resizing grid)
    canvas.innerHTML= '';

    // 600px is the fixed height and width of the canvas without borders
    const squareSize = 600 / size;

    // Loop to create a grid of divs
    for (let i=0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.width = `${squareSize}px`;
        square.style.length = `${squareSize}px`;
        // Use style.background instead of style.opacity to retain border color
        square.style.background = 'rgba(0, 0, 0, 0)';
        // Initial opacity level for darken mode
        square.dataset.opacity = '0';
        canvas.appendChild(square);

        // Event listener to change color on hover
        square.addEventListener('mouseenter', () => {
            if (colorMode === 'black') {
                square.style.backgroundColor = 'black';
                square.style.opacity = '1';
            } else if (colorMode === 'random') {
                square.style.backgroundColor = getRandomColor();
                square.style.opacity = '1';
            } else if (colorMode === 'darken') {
                // Increase opacity by 25%
                let newOpacity = parseFloat(square.dataset.opacity) + 0.25;
                //  Cap opacity at 100%
                newOpacity = Math.min(newOpacity, 1)
                square.dataset.opacity = newOpacity;

                square.style.backgroundColor = `rgba(0, 0, 0, ${newOpacity})`;
            } else if (colorMode === 'eraser') {
                square.style.background = 'rgba(0, 0, 0, 0';
            }
        })
    }
}

// Default to a 16x16 grid
createGrid(16);

// Helper function to generate random RGB color
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function setGridSize() {
    let size = parseInt(userInput.value);

    if (size > 0 && size <= 100) {
        createGrid(size);
    } else {
        alert("Please input a valid number between 1 and 100.");
    }

    userInput.value='';
}

submitButton.addEventListener('click', setGridSize);

function resetGridBackground() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.style.background = 'rgba(0, 0, 0, 0)';
        // Reset opacity for darken mode
        square.dataset.opacity = '0';
    })
}

clearButton.addEventListener('click', resetGridBackground);

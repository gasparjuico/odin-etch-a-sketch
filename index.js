const canvas = document.querySelector('.canvas');
const userInput = document.querySelector('#user-input')
const submitButton = document.querySelector('.submit-btn');
const penSelection = document.querySelector('.pen-selection');
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
        canvas.appendChild(square);

        // Event listener to change color on hover
        square.addEventListener('mouseenter', () => {
            square.style.backgroundColor = 'black';
        })
    }
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

createGrid(16);
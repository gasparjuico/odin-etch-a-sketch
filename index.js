const canvas = document.querySelector('.canvas');
const gridSize = 16;

function createGrid(size) {
    // Clear any existing content (useful if resizing grid)
    canvas.innerHTML= '';

    // Loop to create a grid of divs
    for (let i=0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        canvas.appendChild(square);
    }
}

createGrid(gridSize);
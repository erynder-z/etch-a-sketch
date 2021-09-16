//creates a given number of blocks and adds either the property --grid-rows or --grid-columns to the block.
//creates x*y number of blocks and puts the items in the grid-container div.
//actual grid (x- and y-axis) arrangement is managed by css via the --grid-rows / --grid-columns property that has been set to the boxes.
const gridContainer = document.getElementById("grid-container");

function createGrid (numOfBlocksX, numOfBlocksY ) {
    gridContainer.style.setProperty("--grid-rows", numOfBlocksY);
    gridContainer.style.setProperty("--grid-cols", numOfBlocksX);
    for (let i = 0; i < numOfBlocksX; i++ ) {
        for (let j = 0; j < numOfBlocksY; j++) {
        let block = document.createElement("div");
        gridContainer.appendChild(block).className = "block";      
    }}
}

createGrid(16, 16);


//grabs value from the color_picker and stores it in the color-variable.
let color = document.getElementById("color-picker").value;
document.getElementById("color-picker").onchange = function() {
    color = this.value; 
}

//creates eventListener for mouseover and changes the background.
let hoverPaint = document.getElementById("grid-container");
hoverPaint.addEventListener("mouseover", function(event) {
    event.target.style.background = color;
});


//removes all childs from gridContainer by clearing the innerHTML, then creates a grid with numbers from prompt.
//limits columns and rows max size to 100.
function changeGrid() {
    numOfBlocksX = prompt("Enter number of columns: (max: 100)");
        if (numOfBlocksX > 100) {
            alert("Number of columns is limited to 100");
            numOfBlocksX = 100;
        }
    numOfBlocksY = prompt("Enter number of rows: (max: 100)");
        if (numOfBlocksY > 100) {
            alert("Number of rows is limited to 100");
            numOfBlocksY = 100;
        }
    const removeInnerHtml = document.getElementById("grid-container");
    gridContainer.innerHTML = "";
    createGrid(numOfBlocksX, numOfBlocksY);
}

//adds event listener so changeGrid is called on clicking button.
let changeGridClick = document.getElementById("grid-size-changer");
changeGridClick.addEventListener("click", () => {
    changeGrid();
});


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

//the initial grid
createGrid(16, 16);


//grabs value from the color_picker and stores it in the color variable.
let color = document.getElementById("color-picker").value;
document.getElementById("color-picker").onchange = function() {
    color = this.value; 
}

//pick random color
//takes a random number from all possible rgb values and converts it to hexadecimal
function randomColor() {
    let randCol = "#"+Math.floor(Math.random()*16777215).toString(16);
    color = randCol;
}

let randomColorClick = document.getElementById("random-color");
    randomColorClick.addEventListener("click", () => {
    randomColor();
});


//color the background of an element with chosen color
//must be a named function in order to remove the event listener from paintOnHover / paintOnClick later
function paintBlock(event) {
    event.target.style.background = color;
}

let hoverPaint = document.getElementById("grid-container");
let clickPaint = document.getElementById("grid-container");


//adds event listener and calls the paintBlock function
function paintOnHover() {
    clickPaint.removeEventListener("mousedown", paintBlock);
    hoverPaint.addEventListener("mouseover", paintBlock);
}

//creates the paint-on-click mode
function paintOnClick() {
    hoverPaint.removeEventListener("mouseover", paintBlock);
    clickPaint.addEventListener("mousedown", paintBlock);
    hoverPaint.removeEventListener("mouseover", paintRainbow);
    clickPaint.removeEventListener("mousedown", paintRainbow);
}



//adds stop-painting functionality
function deleteEventListeners() {
    hoverPaint.removeEventListener("mouseover", paintBlock);
    clickPaint.removeEventListener("mousedown", paintBlock);
    hoverPaint.removeEventListener("mouseover", paintRainbow);
    clickPaint.removeEventListener("mousedown", paintRainbow);
    
}
window.onkeydown = function(event) {
    if (event.keyCode == 88) {
       deleteEventListeners();
    } else if (event.keyCode == 67) {
        deleteEventListeners();
    }
 }

 window.onkeyup = function(event) {
    if (event.keyCode == 88) {
       paintOnHover();
    } else if (event.keyCode == 67) {
       paintOnHoverRainbow();
    }
 }

 //raindow mode
 function paintRainbow(event) {
    event.target.style.background = "#"+Math.floor(Math.random()*16777215).toString(16);
}

function paintOnHoverRainbow() {
    clickPaint.removeEventListener("mousedown", paintRainbow);
    hoverPaint.addEventListener("mouseover", paintRainbow);
}

let rainbowPaintButton = document.getElementById("rainbow-mode");
rainbowPaintButton.addEventListener("click", () => {
    paintOnHoverRainbow();
});

/* ADD LATER
//grayscale mode
function paintGray(event) {
const grayscaleArray = ["#FFFFFF", "#DCDCDC", "#D3D3D3", "#C0C0C0", "#A9A9A9", "#696969", "#808080", "#778899", "#708090", "#2F4F4F", "#000000"];
}

function paintOnHoverGray() {
    clickPaint.removeEventListener("mousedown", paintBlock);
    hoverPaint.removeEventListener("mousedown", paintBlock);
    hoverPaint.addEventListener("mouseover", paintGray);
}
*/

//prompts for number of columns and rows.
//removes all children from gridContainer (=deleting all blocks) by clearing the innerHTML, then creates a grid with numbers from prompt.
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
    
    gridContainer.innerHTML = "";
    createGrid(numOfBlocksX, numOfBlocksY);
}

//adds event listener so changeGrid is called on clicking button.
let changeGridClick = document.getElementById("grid-size-changer");
changeGridClick.addEventListener("click", () => {
    changeGrid();
});

//grid template buttons
let smallGridClick = document.getElementById("small-size-button");
smallGridClick.addEventListener("click", () => {
    gridContainer.innerHTML = "";
    createGrid(16, 16);
});

let mediumGridClick = document.getElementById("medium-size-button");
mediumGridClick.addEventListener("click", () => {
    gridContainer.innerHTML = "";
    createGrid(32, 32);
});

let largeGridClick = document.getElementById("large-size-button");
largeGridClick.addEventListener("click", () => {
    gridContainer.innerHTML = "";
    createGrid(64, 64);
});

let hoverPaintButton = document.getElementById("paint-on-hover");
hoverPaintButton.addEventListener("click", () => {
    paintOnHover();
});

let clickPaintButton = document.getElementById("paint-on-click");
clickPaintButton.addEventListener("click", () => {
    paintOnClick();
});

/* ADD LATER
let grayscaleButton = document.getElementById("grayscale-mode");
grayscaleButton.addEventListener("click", () => {
    paintOnHoverGray();
});
*/

// CREATE GRID FUNCTIONALITY
//creates a given number of blocks and adds either the property --grid-rows or --grid-columns to the block.
//creates x*y number of blocks and puts the items in the grid-container div.
//actual grid (x- and y-axis) arrangement is managed by css via the --grid-rows / --grid-columns property that has been set to the boxes.
const gridContainer = document.getElementById("grid-container");

let clearGridValueX; //needed for passing values into clearGrid function
let clearGridValueY;

function createGrid (numOfBlocksX, numOfBlocksY) {
    clearGridValueX = numOfBlocksX; 
    clearGridValueY = numOfBlocksY;
    gridContainer.style.setProperty("--grid-rows", numOfBlocksY);
    gridContainer.style.setProperty("--grid-cols", numOfBlocksX);
    for (let i = 0; i < numOfBlocksX; i++ ) {
        for (let j = 0; j < numOfBlocksY; j++) {
        let block = document.createElement("div");
        gridContainer.appendChild(block).className = "block";      
    }}
}

// CREATES INITIAL GRID
createGrid(16, 16);

// COLOR CHOOSER FUNCTIONALITY
//grabs value from the color_picker and stores it in the color variable.
let color = document.getElementById("color-picker").value;
document.getElementById("color-picker").onchange = function() {
    color = this.value; 
}

// RANDOM COLOR FUNCTIONALITY
//takes a random number from all possible rgb values and converts it to hexadecimal
function randomColor() {
    let randCol = "#"+Math.floor(Math.random()*16777215).toString(16);
    color = randCol;
}

let randomColorClick = document.getElementById("random-color");
    randomColorClick.addEventListener("click", () => {
    randomColor();
});

// BASIC COLORING FUNCTIONALITY
//color the background of an element with chosen color
//must be a named function in order to remove the event listener from paintOnHover / paintOnClick later
function paintBlock(event) {
    event.target.style.background = color;
}

let hoverPaint = document.getElementById("grid-container");
let clickPaint = document.getElementById("grid-container");


//PAINT ON HOVER MODE
function paintOnHover() {
    clickPaint.removeEventListener("mousedown", paintBlock);
    hoverPaint.removeEventListener("mousedown", paintRainbow);
    hoverPaint.removeEventListener("mouseover", paintGray);
    hoverPaint.addEventListener("mouseover", paintBlock);
}

//PAINT ON CLICK MODE 
function paintOnClick() {
    hoverPaint.removeEventListener("mouseover", paintBlock);
    clickPaint.addEventListener("mousedown", paintBlock);
    hoverPaint.removeEventListener("mouseover", paintRainbow);
    clickPaint.removeEventListener("mousedown", paintRainbow);
    hoverPaint.removeEventListener("mouseover", paintGray);
    hoverPaint.removeEventListener("mouseover", eraseColor);
}

//STOP PAINTING ON KEYPRESS FUNCTIONALITY
function deleteEventListeners() {
    hoverPaint.removeEventListener("mouseover", paintBlock);
    hoverPaint.removeEventListener("mouseover", paintGray);
    hoverPaint.removeEventListener("mouseover", paintRainbow);
    clickPaint.removeEventListener("mousedown", paintBlock);
    clickPaint.removeEventListener("mousedown", paintRainbow);
}


// KEYS
 window.onkeyup = function(event) {
    if (event.keyCode == 88) {
       deleteEventListeners();
 }
}

 //RAINBOW MODE FUNCTIONALITY
 function paintRainbow(event) {
    event.target.style.background = "#"+Math.floor(Math.random()*16777215).toString(16);
}

function paintOnHoverRainbow() {
    clickPaint.removeEventListener("mousedown", paintRainbow);
    hoverPaint.removeEventListener("mouseover", paintBlock);
    hoverPaint.addEventListener("mouseover", paintRainbow);  
}

let rainbowPaintButton = document.getElementById("rainbow-mode");
rainbowPaintButton.addEventListener("click", () => {
    paintOnHoverRainbow();
});

// SHADING MODE FUNCTIONALITY
// get the RBG values from the current block and returns the numbers
// need to work with rgb values to make this method work
// will only work on white background since "default" color format is hex, so first pass will always result in rgb(255,255,255)
function getRGBValues(RGBString) {
    let red = RGBString.substring(RGBString.indexOf('(') + 1, RGBString.indexOf(','));
    if (!red) {red = 255;}

    let green = RGBString.substring(RGBString.indexOf(',') + 2, RGBString.lastIndexOf(','));
    if (!green) {green = 255;}

    let blue = RGBString.substring(RGBString.lastIndexOf(',') + 2, RGBString.indexOf(')'));
    if (!blue) {blue = 255;}
    
    return [Number(red), Number(green), Number(blue)];
}
//multiplies the old RGB values with 0.2 to darken
function paintGray(event) {
    
    let oldColor = event.target.style.backgroundColor;
    let oldRGBValues = getRGBValues(oldColor);
    let red = oldRGBValues[0], green = oldRGBValues[1], blue = oldRGBValues[2];
        red = red - Math.ceil(red * 0.2);
        green = green - Math.ceil(green * 0.2);
        blue = blue - Math.ceil(blue * 0.2);
        event.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
   }
function paintOnHoverGray() {
    clickPaint.removeEventListener("mousedown", paintBlock);
    hoverPaint.removeEventListener("mousedown", paintBlock); 
    hoverPaint.removeEventListener("mouseover", paintRainbow);
    hoverPaint.removeEventListener("mouseover", paintBlock);
    hoverPaint.removeEventListener("mouseover", eraseColor);
    hoverPaint.addEventListener("mouseover", paintGray);
}

function eraseColor(event) {
    event.target.style.backgroundColor = "#FFFFFF";
}

function eraserMode() {
    clickPaint.removeEventListener("mousedown", paintBlock);
    hoverPaint.removeEventListener("mousedown", paintBlock);
    hoverPaint.removeEventListener("mouseover", paintGray);
    hoverPaint.removeEventListener("mouseover", paintRainbow);
    hoverPaint.removeEventListener("mouseover", paintBlock);
    hoverPaint.addEventListener("mouseover", eraseColor);
}

//CUSTOM GRID SIZE FUNCTIONALITY
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

//GRID TEMPLATE SIZE BUTTONS FUNCTIONALITY
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


let grayscaleButton = document.getElementById("grayscale-mode");
grayscaleButton.addEventListener("click", () => {
    paintOnHoverGray();
});

let eraserButton = document.getElementById("eraser-button");
eraserButton.addEventListener("click", () => {
    eraserMode();
});

let clearGridButton = document.getElementById("clear-grid-button");
clearGridButton.addEventListener("click", () => {
    gridContainer.innerHTML = "";
    createGrid(clearGridValueX, clearGridValueY);
});


//ADDING CLASSES TO BUTTONS TO HIGHLIGHT SELECTED MODE
let temp1 = document.getElementById("painter-container")
let buttons1 = temp1.getElementsByClassName("button_toggle_P");
for (let i = 0; i < buttons1.length; i++) {
    buttons1[i].addEventListener("click", function() {
        let current1 = document.getElementsByClassName("activeP");
        current1[0].className = current1[0].className.replace(" activeP", "");
        this.className += " activeP";
    });
} 
let temp2 = document.getElementById("grid-resize-container")
let buttons2 = temp2.getElementsByClassName("button_toggle_G");
for (let i = 0; i < buttons2.length; i++) {
    buttons2[i].addEventListener("click", function() {
        let current2 = document.getElementsByClassName("activeG");
        current2[0].className = current2[0].className.replace(" activeG", "");
        this.className += " activeG";
    });
}

//DEFAULT MODE
paintOnHover();

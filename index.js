// whose turn it is
let redTurn = true;

// document.getElementById finds the first element on the page with the id of "gameBoard"
const gameBoard = document.getElementById("gameBoard")

// back end board data
let gameArray = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
]

const edgeX = gameArray[0].length - 3;
const edgeY = gameArray.length - 3;

function horizontalWin() {
    for (let y = 0; y < gameArray.length; y++) {
        for (let x = 0; x < edgeX; x++) {
            let cell = gameArray[y][x];

            if (cell === gameArray[y][x + 1] &&
                cell === gameArray[y][x + 2] &&
                cell === gameArray[y][x + 3] &&
                cell !== 0
            ) {
                console.log(cell);
                console.log("4 in a row found at  " + (x) + ":" + (y));
                alert(redTurn ? "Black Wins!" : "Red Wins!");
            }
        }
    }
}

function verticalWin() {
    for (let y = 0; y < edgeY; y++) {
        for (let x = 0; x < gameArray[0].length; x++) {
            let cell = gameArray[y][x];

            if (cell === gameArray[y + 1][x] &&
                cell === gameArray[y + 2][x] &&
                cell === gameArray[y + 3][x] &&
                cell !== 0
            ) {
                console.log(cell);
                console.log("4 in a row found at " + (x) + ":" + (y));
                console.log("win"); 
                alert(redTurn ? "Black Wins!" : "Red Wins!");
            }

        }
    }
}

function diagonalWinRight() {
    for (let y = 0; y < edgeY; y++) {
        for (let x = 0; x < edgeX; x++) {
            cell = gameArray[y][x];
            if (cell !== 0) {
                if (cell === gameArray[y + 1][x + 1] &&
                    cell === gameArray[y + 2][x + 2] &&
                    cell === gameArray[y + 3][x + 3]
                ) {
                    console.log(cell); 
                    console.log("4 in a row found at " + (x) + ":" + (y));
                    console.log("win"); 
                    alert(redTurn ? "Black Wins!" : "Red Wins!");
                }
            }
        }
    }

}

function diagonalWinLeft(){
    for (let y = 0; y < gameArray.length; y++){
        for (let x = 0; x < edgeX; x++) {
            cell = gameArray[y][x]; 
            if (cell !==0) {
                if (cell === gameArray[y - 1][x + 1] &&
                    cell === gameArray[y - 2][x + 2] &&
                    cell === gameArray[y - 3][x + 3]
            ) {
                console.log(cell);
                console.log("4 in a row found at " + (x) + ":" + (y)); 
                console.log("win");
                alert(redTurn ? "Black Wins!" : "Red Wins!");
            }
            }
        }
    }
}

// console.log(gameArray.length)
// purpose of class: styling
// Purpose of ID: to allow the click handler to identify which column we are in to be logged. 

for (let i = 1; i <= gameArray[0].length; i++) {
    let column = document.createElement("div");
    column.classList = "columns";
    column.id = "col" + i;
    gameBoard.appendChild(column);
}

// Selects all columns, inserts into variable "allColumns"
let allColumns = document.querySelectorAll(".columns")

// adds event listeners via iteration so all columns are recognized
for (let i = 0; i < allColumns.length; i++) {
    allColumns[i].addEventListener("click", handleClick)
}

function handleClick(event) {
    // makes variables based on columns/elements clicked
    let columnClicked = event.target
    let colNumber = columnClicked.id[3];

    // the column to add the disk to
    let destination = document.getElementById("col" + colNumber)


    // conditional based on whose turn it is
    // for height limit, look up "childElementCount"
    if (columnClicked.childElementCount < 6)

    if (redTurn) {
        // adds red disk to clicked column
        let redDisk = document.createElement("div");
        redDisk.classList.add("redDisk");
        destination.appendChild(redDisk);
        gameArray[gameArray.length - columnClicked.childElementCount][colNumber - 1] = "R"
        redTurn = false;
    } else {
        // adds black disk to clicked column
        let blackDisk = document.createElement("div")
        blackDisk.classList.add("blackDisk")
        destination.appendChild(blackDisk);
        gameArray[gameArray.length - columnClicked.childElementCount][colNumber - 1] = "B"
        redTurn = true;
    }
    horizontalWin()
    verticalWin()
    diagonalWinRight()
    diagonalWinLeft()
}
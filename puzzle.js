
var rows = 3;
var columns = 3;

var currTile;
var otherTile; //blank tile

var turns = 0;

var startOrder = ["4", "2", "8", "5", "3", "6", "7", "1", "9"];
var correctOrder = {'0-0': "1", '0-1': "2", '0-2': "3",
                    '1-0': "4", '1-1': "5", '1-2': "6",
                    '2-0': "7", '2-1': "8", '2-2': "9"};
var currOrder = {'0-0': "4", '0-1': "2", '0-2': "8",
                 '1-0': "5", '1-1': "3", '1-2': "6",
                 '2-0': "7", '2-1': "1", '2-2': "9"};

window.onload = function() {
    winMessage();
    for (let r=0; r < rows; r++) {
        for (let c=0; c < columns; c++){

            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = startOrder.shift() + ".jpg";

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart); //click an image to drag
            tile.addEventListener("dragover", dragOver); //moving image around while clicked
            tile.addEventListener("dragenter", dragEnter); //dragging image onto another one
            tile.addEventListener("dragleave", dragLeave); //dragged image leaving another image
            tile.addEventListener("drop", dragDrop); // drag an image over another image,
            tile.addEventListener("dragend", dragEnd); //after drag drop swap the two tiles 

            document.getElementById("board").append(tile);
            //winner();  
        }
        //winner();
    }
}

function dragStart() {
    currTile = this; //this refers to the img tile being dragged
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //this refers to the img tile being dropped on
}

function dragEnd() {
    if (!otherTile.src.includes("9.jpg")) {
        return;
    }

    let currCoords = currTile.id.split("-"); //ex) "0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c-1;
    let moveRight = r == r2 && c2 == c+1;

    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c == c2 && r2 == r+1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (true) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        currOrder[otherTile.id] = otherTile.src[otherTile.src.length-5];
        currOrder[currTile.id] = "9";    

        checkWin();
    }
    

}
//Modal Win Message
var modal = document.getElementById('myModal');

winMessage = function() {
    console.log("func called")
    $("#myModal").modal("show");
    x = document.querySelector(".gamehead");
    x.textContent = "You Finished"
}

document.getElementById('finish').addEventListener("click", myFunction);

function myFunction() {
    document.location.reload();
}

function checkWin() {    
    console.log("NOT WIN")
    
    if (Object.values(currOrder).toString() == Object.values(correctOrder).toString()) {
        console.log("WIN")
        winMessage();
        return 1;
    } else {
        return 0;
    }

}
// Player Object
function Player(name, mark){
  this.name = name;
  this.mark = mark;
}

// Board Object
function Board(firstPlayer){
  this.canvas;
  this.currentTurn = firstPlayer;
}

Board.prototype.start = function(){
  // console.log("board.start called.");
  this.canvas = document.createElement("canvas");
  div = document.getElementById("canvasDiv");
  this.canvas.width = 900;
  this.canvas.height = 900;
  div.appendChild(this.canvas);
};

Board.prototype.draw = function(marks){
  var ctx = this.canvas.getContext("2d");
  // Draw border
  ctx.beginPath();
  ctx.rect(0, 0, this.canvas.width, this.canvas.height);
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.closePath();
  // Draw grid
  ctx.beginPath();
  ctx.rect(300, 0, 5, this.canvas.height);
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.rect(600, 0, 5, this.canvas.height);
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.rect(0, 300, this.canvas.width, 5);
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.rect(0, 600, this.canvas.width, 5);
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.closePath();

  // Draw marks
  for(var i = 0; i < marks.length; i++){
    var innerMarks = marks[i];
    for(var j = 0; j < innerMarks.length; j++){
      if(marks[i][j] !== 0){
        ctx.font = "150px Arial";
        ctx.fillText(marks[i][j], (i*300) + 95, (j*300) + 200);
      }
    }
  }
};

Board.prototype.clear = function() {
  var ctx = this.canvas.getContext("2d");
  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Board.prototype.nextTurn = function(){
  if(this.currentTurn === "X"){
    this.currentTurn = "O";
  } else{
    this.currentTurn = "X";
  }
};

// Space Object
function Space(){
  this.spaceArrays = [
    [0,0,0],
    [0,0,0],
    [0,0,0]];

  this.currentMousePos;
}

Space.prototype.isMarked = function(row, column) {
  if (this.spaceArrays[row][column] !== 0){
    return true;
  } else{
    return false;
  }
};

Space.prototype.mark = function(row, column, mark) {
  if (this.isMarked(row, column) === false) {
    this.spaceArrays[row][column] = mark;
  }
};

Space.prototype.getSpaceClicked = function(board, evt) {
  var rect = board.canvas.getBoundingClientRect();
    return {
      x: (evt.clientX-rect.left)/(rect.right-rect.left)*board.canvas.width,
      y: (evt.clientY-rect.top)/(rect.bottom-rect.top)*board.canvas.height
    };
};

// Main game loop
var updateGame = function(playerX, playerO, board, space){
  board.clear();
  board.draw(space.spaceArrays);
  $("#canvasDiv p").text("Player " + board.currentTurn + "'s turn'");

  $("#canvasDiv canvas").click(function(){
    console.log("click!");
    var x = space.currentMousePos.x;
    var y = space.currentMousePos.y;
    if((x < 300 && y < 300) && (!space.isMarked(0, 0))){
      console.log(x + ", " + y);
      space.mark(0, 0, board.currentTurn);
      board.nextTurn();
    }
    if((x < 600 && x > 300 && y < 300) && (!space.isMarked(1, 0))){
      console.log(x + ", " + y);
      space.mark(1, 0, board.currentTurn);
      board.nextTurn();
    }
    if((x < 900 && x > 600 && y < 300) && (!space.isMarked(2, 0))){
      console.log(x + ", " + y);
      space.mark(2, 0, board.currentTurn);
      board.nextTurn();
    }
    if((x < 300 && y > 300 && y < 600) && (!space.isMarked(0, 1))){
      console.log(x + ", " + y);
      space.mark(0, 1, board.currentTurn);
      board.nextTurn();
    }
    if((x < 600 && x > 300 && y > 300 && y < 600) && (!space.isMarked(1, 1))){
      console.log(x + ", " + y);
      space.mark(1, 1, board.currentTurn);
      board.nextTurn();
    }
    if((x < 900 && x > 600 && y > 300 && y < 600) && (!space.isMarked(2, 1))){
      console.log(x + ", " + y);
      space.mark(2, 1, board.currentTurn);
      board.nextTurn();
    }
    if((x < 300 && y > 600) && (!space.isMarked(0, 2))){
      console.log(x + ", " + y);
      space.mark(0, 2, board.currentTurn);
      board.nextTurn();
    }
    if((x < 600 && x > 300 && y > 600) && (!space.isMarked(1, 2))){
      console.log(x + ", " + y);
      space.mark(1, 2, board.currentTurn);
      board.nextTurn();
    }
    if((x < 900 && x > 600 && y > 600) && (!space.isMarked(2, 2))){
      console.log(x + ", " + y);
      space.mark(2, 2, board.currentTurn);
      board.nextTurn();
    }
  });
}

// Set up game
function startGame(playerXName, playerOName){
  // console.log("startGame called.")
  var playerX = new Player(playerXName, "X");
  var playerO = new Player(playerOName, "O");
  var firstPlayer = Math.round(Math.random()) ? "X" : "O";

  var space = new Space();
  var board = new Board(firstPlayer);
  board.start();
  board.draw(space.spaceArrays);


  board.canvas.addEventListener('mousemove', function(evt) {
        var mousePos = space.getSpaceClicked(board, evt);
        space.currentMousePos = mousePos;
      }, false);

  setInterval(updateGame, 100, playerX, playerO, board, space);
}

$(document).ready(function(){
  $("form#playerForm").submit(function(event) {
    event.preventDefault();
    var playerXName = $("#playerX").val();
    var playerOName = $("#playerO").val();

    $("#startForm").hide();
    $("#canvasDiv").show();

    startGame(playerXName, playerOName);
  });
});

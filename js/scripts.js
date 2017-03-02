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
//
// function AI() {
//   var 1 = space.spaceArrays[0][0];
//   var 2 = space.spaceArrays[0][1];
//   var 3 = space.spaceArrays[0][2];
//   var 4 = space.spaceArrays[1][0];
//   var 5 = space.spaceArrays[1][1];
//   var 6 = space.spaceArrays[1][2];
//   var 7 = space.spaceArrays[2][0];
//   var 8 = space.spaceArrays[2][1];
//   var 9 = space.spaceArrays[2][2];
// }

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

Space.prototype.checkWin = function () {
  var topRow = this.spaceArrays[0];
  var midRow = this.spaceArrays[1];
  var botRow = this.spaceArrays[2];
  if(topRow[0] === midRow[0] && midRow[0] === botRow[0]){
    return topRow[0];
  } else if(topRow[1] === midRow[1] && midRow[1] === botRow[1]){
    return topRow[1];
  } else if(topRow[2] === midRow[2] && midRow[2] === botRow[2]){
    return topRow[2];
  } else if(topRow[0] === topRow[1] && topRow[1] === topRow[2]){
    return topRow[0];
  } else if(midRow[0] === midRow[1] && midRow[1] === midRow[2]){
    return midRow[0];
  } else if(botRow[0] === botRow[1] && botRow[1] === botRow[2]){
    return botRow[0];
  } else if(topRow[0] === midRow[1] && midRow[1] === botRow[2]){
    return topRow[0];
  } else if(botRow[0] === midRow[1] && midRow[1] === topRow[2]){
    return botRow[0];
  } else{
    return false;
  }
};

// Main game loop
var updateGame = function(playerX, playerO, board, space){
  board.clear();
  board.draw(space.spaceArrays);
  $("#canvasDiv h3").text("Player " + board.currentTurn + "'s turn'");

  var winner = space.checkWin();
  if(winner !== false && winner !== 0){
    if(winner === "X"){
      alert(playerX.name + " wins!");
    } else{
      alert(playerO.name + " wins!");
    }
    clearInterval(window.stopInterval);
  }

  $("#canvasDiv canvas").click(function(){
    var x = space.currentMousePos.x;
    var y = space.currentMousePos.y;
    if((x < 300 && y < 300) && (!space.isMarked(0, 0))){
      space.mark(0, 0, board.currentTurn);
      board.nextTurn();
    }
    if((x < 600 && x > 300 && y < 300) && (!space.isMarked(1, 0))){
      space.mark(1, 0, board.currentTurn);
      board.nextTurn();
    }
    if((x < 900 && x > 600 && y < 300) && (!space.isMarked(2, 0))){
      space.mark(2, 0, board.currentTurn);
      board.nextTurn();
    }
    if((x < 300 && y > 300 && y < 600) && (!space.isMarked(0, 1))){
      space.mark(0, 1, board.currentTurn);
      board.nextTurn();
    }
    if((x < 600 && x > 300 && y > 300 && y < 600) && (!space.isMarked(1, 1))){
      space.mark(1, 1, board.currentTurn);
      board.nextTurn();
    }
    if((x < 900 && x > 600 && y > 300 && y < 600) && (!space.isMarked(2, 1))){
      space.mark(2, 1, board.currentTurn);
      board.nextTurn();
    }
    if((x < 300 && y > 600) && (!space.isMarked(0, 2))){
      space.mark(0, 2, board.currentTurn);
      board.nextTurn();
    }
    if((x < 600 && x > 300 && y > 600) && (!space.isMarked(1, 2))){
      space.mark(1, 2, board.currentTurn);
      board.nextTurn();
    }
    if((x < 900 && x > 600 && y > 600) && (!space.isMarked(2, 2))){
      space.mark(2, 2, board.currentTurn);
      board.nextTurn();
    }
  });
}

// Set up game
function startGame(playerXName, playerOName){
  // console.log("startGame called.")
  if (playerOName === "easyComputer") {

  } else if (playerOName === "hardComputer") {

  }
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

  window.stopInterval = setInterval(updateGame, 100, playerX, playerO, board, space);
}

$(document).ready(function(){

  $("#twoPlayerButton").click(function(){
    $("#gameSelect").hide();
    $("#startForm").show();
  });

  $("form#playerForm").submit(function(event) {
    event.preventDefault();
    var playerXName = $("#playerX").val();
    var playerOName = $("#playerO").val();

    $("#startForm").hide();
    $("#canvasDiv").show();

    startGame(playerXName, playerOName);
  });
  $("#computerButton").click(function(){
    $("#gameSelect").hide();
    $("#compDifficulty").show();
  });
  $("#easyButton").click(function(){
    $("#compDifficulty").hide();
    $("#canvasDiv").show();
    startGame("Player One", "easyComputer");
  });
  $("#hardButton").click(function(){
    $("#compDifficulty").hide();
    $("#canvasDiv").show();
    startGame("Player One", "hardComputer");
  });
});

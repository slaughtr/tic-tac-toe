function Player(name, mark){
  this.name = name;
  this.mark = mark;
}

function Board(){
  this.canvas;
  this.start = function(){
    // console.log("board.start called.");
    this.canvas = document.createElement("canvas");
    div = document.getElementById("canvasDiv");
    this.canvas.width = 900;
    this.canvas.height = 900;
    div.appendChild(this.canvas);
  };
  this.draw = function(marks){
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
  this.clear = function() {
    var ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, board.canvas.width, board.canvas.height);
  };
}

function Space(){
  this.spaceArrays = [[0,"X",0],["O",0,0],[0,0,"X"]];
  this.isMarked = function(row, column) {
    if (this.spaceArrays[row][column] === 0) return false;
  };
  this.mark = function(row, column, mark) {
    if (this.isMarked(row, column) === false) {
      this.spaceArrays[row][column] = mark;
    }
  };
  this.getSpaceClicked = function(board, evt) {
    var rect = board.canvas.getBoundingClientRect();
      return {
        x: (evt.clientX-rect.left)/(rect.right-rect.left)*900,
        y: (evt.clientY-rect.top)/(rect.bottom-rect.top)*900
      };
  };
  this.currentMousePos;
}

var updateGame = function(playerX, playerO, board, space){
  board.draw(space.spaceArrays);
}

function startGame(playerXName, playerOName){
  // console.log("startGame called.")
  var playerX = new Player(playerXName, "X");
  var playerO = new Player(playerOName, "O");
  var firstPlayer = Math.round(Math.random()) ? "X" : "O";

  var space = new Space();
  var board = new Board();
  board.start();
  board.draw(space.spaceArrays);

  board.canvas.addEventListener('mousemove', function(evt) {
        var mousePos = space.getSpaceClicked(board, evt);
        space.currentMousePos = mousePos;
      }, false);

  updateGame(playerX, playerO, board, space);

  $("html").click(function(){
    console.log(space.currentMousePos);
  });
}

$(document).ready(function(){
  $("form#playerForm").submit(function() {
    event.preventDefault();
    var playerXName = $("#playerX").val();
    var playerOName = $("#playerO").val();

    $("#startForm").hide();
    $("#canvasDiv").show();

    startGame(playerXName, playerOName);


  });
});

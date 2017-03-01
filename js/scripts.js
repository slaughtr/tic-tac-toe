function Player(name, mark){
  this.name = name;
  this.mark = mark;
}

function Board(){
  this.start = function(){
    // console.log("board.start called.");
    var canvas = document.createElement("canvas");
    div = document.getElementById("canvasDiv");
    canvas.width = 900;
    canvas.height = 900;
    div.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    // Draw border
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
    // Draw grid
    ctx.beginPath();
    ctx.rect(300, 0, 5, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.rect(600, 0, 5, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.rect(0, 300, canvas.width, 5);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.rect(0, 600, canvas.width, 5);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();

  }
}

function Space(){

}

var updateGame = function(){

}

function startGame(playerXName, playerOName){
  // console.log("startGame called.")
  var playerX = new Player(playerXName, "X");
  var playerO = new Player(playerOName, "O");
  var firstPlayer = Math.round(Math.random()) ? "X" : "O";

  var board = new Board();
  board.start();

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

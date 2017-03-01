function Player(name, mark){
  this.name = name;
  this.mark = mark;
}

function Game(){

}

function Board(){

}

function Space(){

}

function UpdateGame(){

}

$(document).ready(function(){
  $("form#playerForm").submit(function() {
    event.preventDefault();
    var playerXName = $("#playerX").val();
    var playerOName = $("#playerO").val();

    playerX = new Player(playerXName, "X");
    playerO = new Player(playerOName, "O");

    $("#startForm").hide();
    $("#canvasDiv").show();
  });
});

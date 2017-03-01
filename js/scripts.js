



function startGame(){

}

$(document).ready(function(event){

  $("form#playerForm").submit(function() {
    event.preventDefault();
    $("#startForm").hide();
  });
});

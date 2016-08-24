//alert("jQuery is working on " + $("h1").text()); //test for jQuery linked and loaded correctly
// game logic
  // roll a die (6 sided?)
  // if die = 1 it's the next player's turn
  // if the die != 1 then the turn continues and the amount of die is added to
  // turn score
  // the player can "hold" and their turn score is added to their total score
  // game is over when first player reaches 100 total score

function Player(name) {
  this.name=name;
  this.gameScore=0;
  this.turnScore=0;
  this.isTurn=false;
  console.log(this);
}



function Die() {
}

function Game() {
  this.gameOver = true;
  var currentPlayer = 0;
  this.players=[];
  console.log(this);
}

Game.prototype.addPlayer=function(player) {
  this.players.push(player);
}

// UI logic
var newGame = new Game();
// Setup Game: List Players
$("#addPlayer").click(function() {
  var newPlayer = new Player($("#playerName").val());
  $("#listPlayers").append("<li>" + newPlayer.name + "</li>");
  newGame.addPlayer(newPlayer);
  console.log(Game);
  $("#playerName").val("");
});
// Turn - next player and roll until 1 or "hold"
// Score - add turn score to total at end of turn
// Check for winner, next player...

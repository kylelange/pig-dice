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
  //console.log(this);
}


function Die(sides) {
  this.sides = sides;
  this.value = 1;
  this.roll();
  //console.log(this);
}

Die.prototype.roll=function(){
    min = 1;
    max = this.sides;
    this.value = Math.floor(Math.random()*(max - min+1)) + min;
}

function Game() {
  this.gameOver = true;
  this.currentPlayer = 0;
  this.players=[];
  this.die = new Die(6);
  //console.log(this);
}

Game.prototype.endGame = function() {
  this.gameOver = true;
  this.currentPlayer = 0;
  this.players=[];
}

Game.prototype.addPlayer=function(player) {
  this.players.push(player);
}

Game.prototype.startGame=function() {
  this.gameOver = false;
  this.currentPlayer = 0;
}

Game.prototype.endTurn = function() {
  this.players[this.currentPlayer].gameScore+=this.players[this.currentPlayer].turnScore;
  this.players[this.currentPlayer].turnScore = 0;
//debugger;
  if (this.currentPlayer<this.players.length-1) {
    this.currentPlayer++;
  } else {
    this.currentPlayer = 0;
  }
}
// UI logic
var newGame = new Game();
function endTurn() {
  newGame.endTurn();
}

function endGame() {
  alert("end game!");
  newGame.endGame();
  $("#listPlayers").empty();
  $("#displayDie").html("<img src='img/roll.png' class='img-responsive'>");
  $("#currentScore").text("Current Player Name");
  $("#currentPlayer").text("Current Turn Score");
}

function showScores() {
  $("#listPlayerScores").empty();
  newGame.players.forEach(function(player){
    $("#listPlayerScores").append("<h3>"+player.name+": "+player.gameScore+"</h3>");

  });
}

function startTurn () {
  newGame.die.roll();
  if(newGame.die.value === 1) {
    newGame.players[newGame.currentPlayer].turnScore=0;
  } else {
    newGame.players[newGame.currentPlayer].turnScore+=newGame.die.value;
  }
  $("#displayDie").html("<img src='img/"+newGame.die.value+".jpg' class='img-responsive'>");
  $("#currentScore").text(newGame.players[newGame.currentPlayer].turnScore);
  $("#currentPlayer").text(newGame.players[newGame.currentPlayer].name + ": " + newGame.players[newGame.currentPlayer].gameScore);
  showScores();
  if(newGame.players[newGame.currentPlayer].turnScore===0) {
    alert("Sorry, " + newGame.players[newGame.currentPlayer].name + " you rolled a 1. You get NOTHING!!");
    endTurn();
    startTurn();
  }
  if (newGame.players[newGame.currentPlayer].gameScore + newGame.players[newGame.currentPlayer].turnScore >= 100) {
    setTimeout(endGame,500);
  }
}
// Setup Game: List Players
$("#addPlayer").click(function() {
  var newPlayer = new Player($("#playerName").val());
  $("#listPlayers").append("<li>" + newPlayer.name + "</li>");
  newGame.addPlayer(newPlayer);
  $("#playerName").val("");
});

$("#roll").click(function(){
  startTurn();
});
// Turn - next player and roll until 1 or "hold"
$("#playGame").click(function(){
  newGame.startGame();
  $("#listPlayers").hide();
  showScores();
  startTurn();
});
// Score - add turn score to total at end of turn
$("#hold").click(function(){
  endTurn();
  startTurn();
});
// Check for winner, next player...

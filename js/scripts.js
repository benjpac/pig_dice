// var player1Total = 0
// var player2Total = 0
//
// var currentTurn = "player1";
// function move(playerTotal) {
//   playerTotal = roll(playerTotal)
//   //update player 1 total
//   return playerTotal;
// }
//
// function roll(playerTotal) {
//   var roll = Math.floor((Math.random() * 6) + 1);
//   if (roll === 1) {
//     return 0
//   } else {
//     return playerTotal += roll;
//   }
// }
//
// if (currentTurn === "player1") {
//   player1Total = move(player1Total);
//   currentTurn = "player2";
// } else if (currentTurn === "player2") {
//   player2Total = move(player2Total);
//   currentTurn = "player1";
// }
//

var active = "";
var player1 = "";
var player2 = "";
var players = {};

function PlayerTracker(username) {
  this.userName = username;
  this.totalScore = 0;
  this.turnScore = 0;
  this.roll = function() {
    var roll = Math.floor((Math.random() * 6) + 1);
    $("#output").append("<li>" + active + " roll = " + roll)
    if (roll === 1) {
      debugger;
      this.turnScore = 0;
      $("#output").append("turnScore = " + this.turnScore)
      this.endTurn();
    } else {
      this.turnScore += roll
      $("#output").append("turnScore = " + this.turnScore)
    }
    testAI();
  }
  this.endTurn = function() {
    this.totalScore += this.turnScore;
    this.turnScore = 0;
    if (active === player1) {
      active = player2;
    } else {
      active = player1;
    }
    testAI();
    console.log(players)
  }
  this.endGame = function() {
    if (this.totalScore + this.turnScore >= 5) {
      alert(this.userName + " Wins!!")
      clearBoard();
    }
  }
}

function createUser(username) {
  players[username] = new PlayerTracker(username);
}

function testAI (active) {
  if (active === "computer") {
    AI()
  }
}

function AI() {
  if (players[active].turnScore < 20) {
    players[active].roll();
  } else {
    players[active].endTurn();
  }
}

function clearBoard() {
  $("#player1").val("");
  $("#player2").val("");
  active = "";
  player1 = "";
  player2 = "";
  players = {};
  $("#output").empty();
}

$(document).ready(function() {
  $("form").submit(function(event) {
    event.preventDefault()
    player1 = $("#player1").val();
    player2 = $("#player2").val();
    createUser(player1);
    createUser(player2);
    active = player1;
  });
  $("#computer").click(function() {
    player1 = $("#player1").val();
    player2 = "computer";
    createUser(player1);
    createUser(player2);
    active = player1;
  });
  $("#roll").click(function() {
    players[active].roll();
    players[active].endGame();
  });
  $("#end-turn").click(function() {
    players[active].endTurn();

  });
  $("#end-game").click(function() {
    clearBoard();
  });
});
// game sequence:
// 1. create two users
// 2. user rolls
// 3. user chooses to roll again (unless last roll was a 1)
// 4. if user chooses not to roll or rolls a 1, goes to player2
// 5. if totalScore == 100 game is over

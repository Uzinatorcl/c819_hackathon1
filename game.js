class Gameboard {
  constructor(numberOfPlayers) {
    this.players = [];
    this.numberOfPlayers = numberOfPlayers;
    this.gemMine = null;
    this.playerTurnIndex = 0;
    this.mineGemClick = this.mineGemClick.bind(this);
    this.leaveMineClick = this.leaveMineClick.bind(this);
    this.restartGameClick = this.restartGameClick.bind(this);
    this.createPlayer = this.createPlayer.bind(this);
    this.typeOfGems = ["obsidian", "topaz", "amethyst", "emerald", "sapphire", "ruby", "diamond"];
    this.round = 1;
    this.domElements = {
      // round number
      // player turn
      // player stats
      // rules
    }
  }

  initializeBoard() {
    // initialize game with all properties set to initial values
    // create dom elements for game data
    // create dom elements for players
    // create appropriate number of players
    // create mine
    // start game with first player turn
    this.createMine();
    $(".buttonContainer").on("click", ".mineGems", this.mineGemClick);
    $(".buttonContainer").on("click", ".leaveMine", this.leaveMineClick);
    $(".rulesButton").on("click", function () { $(".rules").toggleClass("hidden") });
    $(".close-rules").on("click", function () { $(".rules").toggleClass("hidden") });
    $(".restart-game").on('click', this.restartGameClick);
    $('.createPlayer').on('click', this.createPlayer);
  }



  createPlayer(event) {
    var numberOfPlayers = parseInt(event.currentTarget.innerText);
    $('.players-modal').toggleClass('hidden');
    for(var i = 1; i <= numberOfPlayers; i++) {
        this.players.push(new Player('.player' + i, 'Player ' + i));
    }
  }

  createMine() {
    // append mine dom elements
    this.gemMine = new Mine;
  }

  mineGemClick() {
    console.log("player " + (this.playerTurnIndex + 1) + " is mining for gems");
    // get gems from this.gemMine
    var player = this.currentPlayer();
    var gemsMined = player.mine(this.gemMine);
    if (player.gems["obsidian"] === 2) {
      this.playerAccident(player);
      return;
    }
    this.updatePlayerGems(player, gemsMined);
    this.updatePlayerPoints(player);
    this.nextPlayerTurn();
  }

  leaveMineClick() {
    console.log("player " + (this.playerTurnIndex + 1) + " has left the mine");
    this.players[this.playerTurnIndex].leaveMine();
    this.currentPlayer().playerDom.toggleClass("leftMine");
    //this.updatePlayerStatus( this.players[this.playerTurnIndex] );
    if (!this.checkIfEveryoneLeftMine()) {
      this.nextPlayerTurn();
    } else {
      this.gameOver();
    }
  }

  playerAccident(player) {
    player.hasAccident();
    player.playerDom.toggleClass("accident");
    player.returnGems(this.gemMine);
    this.updatePlayerGems(player, this.typeOfGems);
    this.updatePlayerPoints(player);
    this.leaveMineClick();
  }

  nextPlayerTurn() {
    this.players[this.playerTurnIndex].playerDom.toggleClass("yourTurn");
    if (this.playerTurnIndex === this.players.length - 1) {
      this.playerTurnIndex = 0;
    } else {
      this.playerTurnIndex++;
    }
    this.players[this.playerTurnIndex].playerDom.toggleClass("yourTurn");
    var newPlayerTurnText = "Player Turn: Player " + (this.playerTurnIndex + 1);
    $(".playerTurn").text(newPlayerTurnText);
    if (!this.players[this.playerTurnIndex].inMine) {
      this.nextPlayerTurn();
    }
    console.log(this.players[this.playerTurnIndex].playerDom.attr("class"));
  }

  updatePlayerGems(player, newGems) {
    // update DOM to show player's current gem count
    for (var gemIndex = 0; gemIndex < newGems.length; gemIndex++) {
      //var playerClass = $(player.playerDom).attr("class");
      var gemElement = $(player.playerDom).children("." + newGems[gemIndex]);
      var newGemCount = player.gems[newGems[gemIndex]];
      gemElement.text(newGems[gemIndex].charAt(0).toUpperCase() + newGems[gemIndex].slice(1) + ": " + newGemCount);
    }
  }

  updatePlayerPoints(player) {
    // update DOM to show player's current point total
    var pointsElement = player.playerDom.children(".points");
    pointsElement.text("Points: " + player.getPoints());
  }

  checkIfEveryoneLeftMine() {
    for (var playerIndex = 0; playerIndex < this.players.length; playerIndex++) {
      if (this.players[playerIndex].inMine === true) {
        return false;
      }
    }
    return true;
  }

  currentPlayer() {
    return this.players[this.playerTurnIndex];
  }

  gameOver() {
    // get total points of each player
    var winner = this.players[0];
    for (var playerIndex = 1; playerIndex < this.players.length; playerIndex++) {
      if (this.players[playerIndex].getPoints() > winner.getPoints()) {
        winner = this.players[playerIndex];
      }
    }
    $(".winner").toggleClass("hidden");
    $(".winningPlayer").text(winner.playerName);
    console.log(winner.playerDom.attr("class") + " is the winner!");
  }

  restartGameClick() {
    for (var playerIndex = 0; playerIndex < this.players.length; playerIndex++) {
      this.players[playerIndex].returnGems(this.gemMine);
      this.updatePlayerGems(this.players[playerIndex], this.typeOfGems);
      this.players[playerIndex].playerDom.removeClass('accident yourTurn leftMine');
      this.updatePlayerPoints(this.players[playerIndex]);
      this.players[playerIndex].inMine = true;
      this.players[playerIndex].hadAccident = false;
    }
    this.players[0].playerDom.toggleClass('yourTurn');
    this.playerTurnIndex = 0;
    $('.winner').toggleClass('hidden');
  }

  // updatePlayerStatus( player ){
  //   // update player
  //   //player.playerDom.addClass("accident");

  // }

  // updateBoard(){
  //   // update dom elements to display the most current gem totals/player stats
  // }

  // playerTurn(){
  //   // display screen for selected player's turn if player.inMine is true
  //   // update board
  // }
}

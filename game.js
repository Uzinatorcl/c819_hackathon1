class Gameboard{
  constructor( numberOfPlayers ){
    this.players = [];
    this.numberOfPlayers = numberOfPlayers;
    this.gemMine = null;
    this.playerTurnIndex = 0;
    this.mineGemClick = this.mineGemClick.bind(this);
    this.leaveMineClick = this.leaveMineClick.bind(this);
    this.domElements = {
      // round number
      // player turn
      // player stats
      // rules
    }

  }

  initializeBoard(){
    // initialize game with all properties set to initial values
    // create dom elements for game data
    // create dom elements for players
    // create appropriate number of players
    // create mine
    // start game with first player turn
    this.createPlayer();
    this.createMine();
    $(".buttonContainer").on("click", ".mineGems", this.mineGemClick);
    $(".buttonContainer").on("click", ".leaveMine", this.leaveMineClick);
  }

  createPlayer(){
    // create new Player according to number of players
    // append player dom elements
    var playerOne = $(".player1").addClass("yourTurn");
    this.players.push(new Player(playerOne));
    var playerTwo = $(".player2");
    this.players.push(new Player(playerTwo));
  }

  createMine(){
    // create new Mine
    // append mine dom elements
    this.gemMine = new Mine;
  }

  playerTurn(){
    // display screen for selected player's turn if player.inMine is true
    // update board
  }

  mineGemClick( ){
    console.log("player " + (this.playerTurnIndex + 1) + " is mining for gems");
    // get gems from this.gemMine
    var player = this.currentPlayer();
    var gemsMined = player.mine(this.gemMine);
    if (player.gems["obsidian"] === 2){
      player.hasAccident();
      // put back all gems into mine
      this.updatePlayerGems(player, gemsMined);
      this.updatePlayerPoints(player);
      this.leaveMineClick();
      return;
    }
    this.updatePlayerGems(player, gemsMined);
    this.updatePlayerPoints(player);
    this.nextPlayerTurn();
  }

  leaveMineClick( ){
    console.log("player " + (this.playerTurnIndex + 1) + " has left the mine");
    this.players[this.playerTurnIndex].leaveMine();
    this.updatePlayerStatus( this.players[this.playerTurnIndex] );
    if(!this.checkIfEveryoneLeftMine()){
      this.nextPlayerTurn();
    } else {
      this.gameOver();
    }
  }

  nextPlayerTurn(){
    this.players[this.playerTurnIndex].playerName.toggleClass("yourTurn");
    if (this.playerTurnIndex === this.players.length - 1){
      this.playerTurnIndex = 0;
    } else {
      this.playerTurnIndex++;
    }
    this.players[this.playerTurnIndex].playerName.toggleClass("yourTurn");
    var newPlayerTurnText = "Player Turn: Player " + (this.playerTurnIndex + 1);
    $(".playerTurn").text(newPlayerTurnText);
    if (!this.players[this.playerTurnIndex].inMine){
      this.nextPlayerTurn();
    }
    console.log(this.players[this.playerTurnIndex].playerName.attr("class"));
  }

  updatePlayerGems( player, newGems ){
    // update DOM to show player's current gem count
    for (var gemIndex = 0; gemIndex < 2; gemIndex++){
      //var playerClass = $(player.playerName).attr("class");
      var gemElement = $(player.playerName).children("." + newGems[gemIndex]);
      var newGemCount = player.gems[newGems[gemIndex]];
      gemElement.text(newGems[gemIndex].charAt(0).toUpperCase() + newGems[gemIndex].slice(1) + ": " + newGemCount);
    }
  }

  updatePlayerPoints( player ){
    // update DOM to show player's current point total
    var pointsElement = $(player.playerName).children(".points");
    pointsElement.text("Points: " + player.getPoints());
  }

  updatePlayerStatus( player ){
    // update player
    //player.playerName.addClass("accident");

  }

  checkIfEveryoneLeftMine(){
    for (var playerIndex = 0; playerIndex < this.players.length; playerIndex++){
      if (this.players[playerIndex].inMine === true){
        return false;
      }
    }
    return true;
  }

  updateBoard(){
    // update dom elements to display the most current gem totals/player stats
  }

  currentPlayer(){
    return this.players[this.playerTurnIndex];
  }

  gameOver(){
    // get total points of each player
    var winner = this.players[0];
    for(var playerIndex = 1; playerIndex < this.players.length; playerIndex++){
      if (this.players[playerIndex].getPoints() > winner.getPoints()){
        winner = this.players[playerIndex];
      }
    }
    console.log(winner.playerName.attr("class") + " is the winner!");
  }


}

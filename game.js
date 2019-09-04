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
    $(".buttonContainer").on("click", ".mineGems", this.mineGemClick, this.players[this.playerTurnIndex]);
    $(".buttonContainer").on("click", ".leaveMine", this.leaveMineClick, this.players[this.playerTurnIndex]);
  }

  createPlayer(){
    // create new Player according to number of players
    // append player dom elements
    var playerOne = $(".player1");
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

  mineGemClick( player ){
    console.log(player, "mine");
    var gemsMined =  player.mine(this.gemMine);
    this.updatePlayerGems( player, gemsMined);
    this.nextPlayerTurn();
  }

  leaveMineClick( player ){
    console.log(player, "leave");
    this.player.leaveMine();
    this.updatePlayerStatus( player );
    this.nextPlayerTurn();
  }

  nextPlayerTurn(){
    if (this.playerTurnIndex === this.players.length - 1){
      this.playerTurnIndex = 0;
    } else {
      this.playerTurnIndex++;
    }
    var newPlayerTurnText = "Player Turn: Player " + (this.playerTurnIndex + 1);
    $(".playerTurn").text(newPlayerTurnText);
  }

  updatePlayerGems( player, newGems ){
    for (var gemIndex = 0; gemIndex < 2; gemIndex++){
      var playerClass = $(player.playerName).attr("class");
      var gemElement = $("." + playerClass + " ." + newGems[gemIndex]);
      var newGemCount = player.gems[newGems[gemIndex]];
      gemElement.text(newGems[gemIndex] + ": " + newGemCount);
    }
  }

  updatePlayerStatus( player ){
    // update player
    player.playerName.addClass("accident");

  }

  updateBoard(){
    // update dom elements to display the most current gem totals/player stats
  }

  gameOver(){
    // get total points of each player
  }

}

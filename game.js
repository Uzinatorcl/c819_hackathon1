class Gameboard{
  constructor( numberOfPlayers ){
    this.players = [];
    this.gemMine = null;
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
  }

  createPlayer(){
    // create new Player according to number of players
    // append player dom elements
  }

  createMine(){
    // create new Mine
    // append mine dom elements
  }

  playerTurn(){
    // display screen for selected player's turn if player.inMine is true
    // update board
  }

  updateBoard(){
    // update dom elements to display the most current gem totals/player stats
  }

  gameOver(){
    // get total points of each player
  }

}

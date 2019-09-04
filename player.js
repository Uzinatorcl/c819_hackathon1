class Player{
  constructor(playerName){
      //The player name that is being passed in will be the class name of the player on the dom aka '.player1' '.player2'
    this.playerName = $(playerName);
    this.points = 0;
    this.gems = {
      'topaz' : 0,
      'amethyst' : 0,
      'emerald' : 0,
      'sapphire' : 0,
      'ruby' : 0,
      'diamond' : 0,
      'obsidian' : 0
    }
  }

  render(){
    // create and set all dom elements for player
  }

  takeTurn( mineOrLeave ){
    // this.mine() or this.leaveMine()
  }

  mine(){
    // mine.mineGems(); mine for 2 gems
    // if one or more gems
  }

  leaveMine(){
    // this.inMine = false;
  }

  points(){
    // loops through array add up each
    // returns the total points by combining the values of all the gems mined
  }

  // useCard(){
  //
  //}
}

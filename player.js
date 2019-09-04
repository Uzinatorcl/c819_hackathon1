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
    this.pointChart = {
      'topaz': 1,
      'amethyst': 2,
      'emerald': 3,
      'sapphire': 4,
      'ruby': 6,
      'diamond': 8,
      'obsidian': 0
    }
    this.inMine = true;
  }

  render(){
    // create and set all dom elements for player
  }

  takeTurn( mineOrLeave ){
    // this.mine() or this.leaveMine()
  }

  mine(mineObject){
    // mine.mineGems(); mine for 2 gems
    // if one or more gems
    console.log(this.gems);
    var minedGems = mineObject.mineTwoGems();
    for(var mgIndex = 0; mgIndex < minedGems.length; mgIndex++) {
      this.gems[minedGems[mgIndex]]++;
      }
      console.log(this.gems);
      this.pointsConverter(minedGems);
      return minedGems;
    }


  leaveMine() {
    // this.inMine = false;
  }

  pointsConverter(minedGems){
    console.log(this.points)
    for(var i = 0; i < minedGems.length; i++) {
      this.points += this.pointChart[minedGems[i]]
    }
    console.log(this.points)
    // loops through array add up each
    // returns the total points by combining the values of all the gems mined
  }

  // useCard(){
  //
  //}
}

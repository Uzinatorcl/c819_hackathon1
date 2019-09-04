class Player {
  constructor(playerName) {
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
}

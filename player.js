class Player{
  constructor(playerClass, playerName){
      //The player name that is being passed in will be the class name of the player on the dom aka '.player1' '.player2'
    this.playerDom = playerClass;
    this.playerName = playerName;
    this.points = 0;
    this.gems = {
      'topaz': 0,
      'amethyst': 0,
      'emerald': 0,
      'sapphire': 0,
      'ruby': 0,
      'diamond': 0,
      'obsidian': 0
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
    this.hadAccident = false;
    this.render();
  }

  render() {
    var playerContainer = $('.playerContainer');
    this.playerDom = $('<div>').addClass(this.playerDom + ' player');
    var playerName = $('<p>').addClass(this.playerName);
    var points = $('<p>').addClass('points').text('Points : 0');
    var gems = $('<p>').addClass('gems').text('Gems');
    var topaz = $('<p>').addClass('topaz').text('Topaz : 0');
    var amethyst = $('<p>').addClass('amethyst').text('Amethyst : 0');
    var emerald = $('<p>').addClass('emerald').text('Emerald : 0');
    var sapphire = $('<p>').addClass('sapphire').text('Sapphire : 0');
    var ruby = $('<p>').addClass('ruby').text('Ruby : 0');
    var diamond = $('<p>').addClass('diamond').text('Diamond : 0');
    var obsidian = $('<p>').addClass('obsidian').text('Obsidian : 0');
    this.playerDom.append(playerName, points, gems, topaz, amethyst,emerald, sapphire, ruby, diamond, obsidian);
    playerContainer.append(this.playerDom);
  }

  takeTurn(mineOrLeave) {
    // this.mine() or this.leaveMine()
  }

  mine(mineObject) {
    // mine.mineGems(); mine for 2 gems
    // if one or more gems
    //console.log(this.gems);
    var minedGems = mineObject.mineTwoGems();
    for (var mgIndex = 0; mgIndex < minedGems.length; mgIndex++) {
      this.gems[minedGems[mgIndex]]++;
    }
    //console.log(this.gems);
    this.pointsConverter(minedGems);
    return minedGems;
  }


  leaveMine() {
    this.inMine = false;
  }

  hasAccident() {
    this.hadAccident = true;
  }

  pointsConverter(minedGems) {
    //console.log(this.points)
    for (var i = 0; i < minedGems.length; i++) {
      this.points += this.pointChart[minedGems[i]]
    }
    //console.log(this.points)
    // loops through array add up each
    // returns the total points by combining the values of all the gems mined
  }

  getPoints() {
    return this.points;
  }

  returnGems(mine) {
    var outputArray = [];
    for (var gem in this.gems) {
      var gemCount = this.gems[gem];
      for (var gemNum = 0; gemNum < gemCount; gemNum++) {
        outputArray.push(gem);
      }
    }
    this.points = 0;
    this.gems = {
      'topaz': 0,
      'amethyst': 0,
      'emerald': 0,
      'sapphire': 0,
      'ruby': 0,
      'diamond': 0,
      'obsidian': 0
    };
    mine.returnPlayerGemsToMine(outputArray);
  }


  // useCard(){
  //
  //}
}

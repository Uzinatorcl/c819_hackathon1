class Player{
  constructor(playerNumber){
    this.playerNumber = playerNumber;
    this.playerDom = null;
    this.domElements = {
      container: null,
      name: null,
      points: null,
      gems: {
        topaz: null,
        amethyst: null,
        emerald: null,
        sapphire: null,
        ruby: null,
        diamond: null,
        obsidian: null
      },
      roundPoints: null,
    }
    this.playerName = "Player " + playerNumber;
    this.points = 0;
    this.totalPoints = 0;
    this.pointsEachRound = [];
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
    this.playerDom = $('<div>').addClass('player' + this.playerNumber + ' player');
    var playerNameContainer = $("<div>",{
      'class':"playerMetaData"
    });
    var playerGemScoreBoard = $("<div>",{
      'class': 'playerGemCounts'
    })
    for( var gemName in this.gems){
      var gemIcon = $("<span>",{
        'class': 'gemIcon '+ gemName,
        html: '&diams;'
      });
      var gemCount = $("<span>",{
        'class': 'gemCount',
        text: this.gems[gemName]
      })
      this.domElements.gems[gemName] = gemCount;
      gemIcon.append(gemCount);
      playerGemScoreBoard.append(gemIcon)
    }
    var playerName = $('<p>').addClass('playerName').text(this.playerName);
    this.domElements.container= this.playerDom;
    this.domElements.name = playerNameContainer;
    var pointsContainer = $("<span>",{
      'class': 'points',
      text: ' points: '
    })
    var points = $('<span>').addClass('points').text('0');
    this.domElements.points = points;
    pointsContainer.append(points);
    playerName.append(pointsContainer);
    playerNameContainer.append(playerName, playerGemScoreBoard);
    var gems = $('<p>').addClass('gems').text('Gems');
    var topaz = $('<p>').addClass('topaz').text('Topaz : 0');
    var amethyst = $('<p>').addClass('amethyst').text('Amethyst : 0');
    var emerald = $('<p>').addClass('emerald').text('Emerald : 0');
    var sapphire = $('<p>').addClass('sapphire').text('Sapphire : 0');
    var ruby = $('<p>').addClass('ruby').text('Ruby : 0');
    var diamond = $('<p>').addClass('diamond').text('Diamond : 0');
    var obsidian = $('<p>').addClass('obsidian').text('Obsidian : 0');
    var rounds = $('<p>').addClass('roundPoints');
    this.domElements.roundPoints = rounds;
    this.domElements.container.append(this.domElements.name)
    this.playerDom.append(gems, topaz, amethyst,emerald, sapphire, ruby, diamond, obsidian, rounds);
    playerContainer.append(this.domElements.container)
  }

  updateGemCount(gemName){
    this.gems[gemName]++;
    this.domElements.gems[gemName].text(this.gems[gemName] );
  }

  mine(mineObject) {
    var minedGems = mineObject.mineTwoGems();
    for (var mgIndex = 0; mgIndex < minedGems.length; mgIndex++) {
      this.updateGemCount(minedGems[mgIndex]);
    }
    this.pointsConverter(minedGems);
    this.updateDisplayedPoints();
    return minedGems;
  }


  leaveMine() {
    this.inMine = false;
  }

  hasAccident() {
    this.hadAccident = true;
  }

  pointsConverter(minedGems) {
    for (var i = 0; i < minedGems.length; i++) {
      this.points += this.pointChart[minedGems[i]]
    }
  }

  updateDisplayedPoints(){
    for( var gem in this.gems){
      this.domElements.gems[gem].text( this.gems[gem]);
    }
    this.domElements.points.text( this.points )
  }

  updateRoundPoints(round){
    this.domElements.roundPoints.text(this.domElements.roundPoints.text() + "R" + round + ": " + this.pointsEachRound[round-1] + " ");
  }

  getPoints() {
    return this.points;
  }
  getTotalPoints() {
    return this.totalPoints;
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
    this.updateDisplayedPoints();
    mine.returnPlayerGemsToMine(outputArray);

  }

}

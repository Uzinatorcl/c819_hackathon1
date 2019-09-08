class Player{
  constructor(playerNumber){
    this.playerNumber = playerNumber;
    this.domElements = {
      playerDom: null,
      dataContainer: null,
      name: null,
      points: null,
      roundPoints: null,
      gems: {
        topaz: null,
        amethyst: null,
        emerald: null,
        sapphire: null,
        ruby: null,
        diamond: null,
        obsidian: null
      }
    }
    this.playerName = "Player " + playerNumber;
    this.points = 0;
    this.totalPoints = 0;
    this.pointsEachRound = [];
    this.typeOfGems = ["obsidian", "topaz", "amethyst", "emerald", "sapphire", "ruby", "diamond"];
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
    this.domElements.playerDom = $('<div>',{class: 'player' + this.playerNumber + ' player'});
    var playerDataContainer = $("<div>",{class: "playerMetaData"});
    this.domElements.dataContainer = playerDataContainer;
    var playerNameAndPointsContainer = $('<div>',{class: 'playerNameAndPoints'});
    var playerNameDom = $("<span>",{class: 'playerName', text: this.playerName});
    this.domElements.name = playerNameDom;
    var pointsContainer = $("<span>", {
      class: 'points',
      text: ' points: '})
    var points = $('<span>',{
      class: 'points',
      text: '0'});
    this.domElements.points = points;
    pointsContainer.append(points);
    playerNameAndPointsContainer.append(playerNameDom, pointsContainer);
    var playerGemScoreBoard = $("<div>",{class: "playerGemCounts"});
    for( var gemName in this.gems){
      var gemIcon = $("<span>",{
        class: 'gemIcon '+ gemName,
        html: '&diams;'
      });
      var gemCount = $("<span>",{
        class: 'gemCount',
        text: this.gems[gemName]
      })
      this.domElements.gems[gemName] = gemCount;
      gemIcon.append(gemCount);
      playerGemScoreBoard.append(gemIcon)
    }
    playerDataContainer.append(playerNameAndPointsContainer, playerGemScoreBoard);
    this.domElements.playerDom.append(playerDataContainer);
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
    this.domElements.playerDom.append(gems, topaz, amethyst,emerald, sapphire, ruby, diamond, obsidian, rounds);
    playerContainer.append(this.domElements.playerDom)
  }

  updateGemCount(gemName){
    this.gems[gemName]++;
    this.domElements.gems[gemName].text(this.gems[gemName] );
  }

  mine(gems) {
    for (var gemIndex = 0; gemIndex < gems.length; gemIndex++) {
      this.updateGemCount(gems[gemIndex]);
    }
    if (this.gems["obsidian"] >= 2){
      this.hadAccident = true;
      this.returnGems();
      this.updateDomToAccident();
    } else {
      this.pointsConverter(gems);
      this.updatePlayerGems(gems);
    }
    this.updateDomElements();
    return this.hadAccident;
  }

  updatePlayerGems(newGems) {
    for (var gemIndex = 0; gemIndex < newGems.length; gemIndex++) {
      var gemElement = this.domElements.playerDom.children("." + newGems[gemIndex]);
      var newGemCount = this.gems[newGems[gemIndex]];
      gemElement.text(newGems[gemIndex].charAt(0).toUpperCase() + newGems[gemIndex].slice(1) + ": " + newGemCount);
    }
  }

  leaveMine() {
    this.inMine = false;
    this.domElements.playerDom.addClass("leftMine");
  }

  updateDomToAccident(){
    this.domElements.playerDom.addClass("accident accidentBackground");
  }

  getAccidentStatus() {
    return this.hadAccident;
  }

  pointsConverter(minedGems) {
    for (var i = 0; i < minedGems.length; i++) {
      this.points += this.pointChart[minedGems[i]]
    }
  }

  updatePointsAtEndOfRound(round){
    this.totalPoints += this.points;
    this.pointsEachRound.push(this.points);
    this.domElements.roundPoints.text(this.domElements.roundPoints.text() + "R" + round + ": " + this.pointsEachRound[round - 1] + " ");
  }

  updateDomElements(){
    for( var gem in this.gems){
      this.domElements.gems[gem].text( this.gems[gem]);
    }
    this.domElements.points.text( this.points )
  }

  getPoints() {
    return this.points;
  }
  getTotalPoints() {
    return this.totalPoints;
  }
  getPlayerName(){
    return this.playerName;
  }
  getPlayerDom(){
    return this.domElements.playerDom;
  }

  returnGems() {
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
    this.updateDomElements();
    this.updatePlayerGems(this.typeOfGems);
    return outputArray;
  }

  initializeStatus(){
    this.inMine = true;
    this.hadAccident = false;
  }

  initializePoints(){
    this.points = 0;
    this.totalPoints = 0;
    this.domElements.roundPoints.text("");
  }

}

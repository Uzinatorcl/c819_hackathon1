class Gameboard {
  constructor() {
    this.players = [];
    this.playersInMine = [];
    this.gemMine = new Mine;
    this.playerTurnIndex = 0;
    this.maxRounds = 5;
    this.mineGemClick = this.mineGemClick.bind(this);
    this.leaveMineClick = this.leaveMineClick.bind(this);
    this.restartGameClick = this.restartGameClick.bind(this);
    this.createPlayer = this.createPlayer.bind(this);
    this.hideGemsReceivedModal = this.hideGemsReceivedModal.bind(this);
    this.muteVolumeClick = this.muteVolumeClick.bind(this)
    this.typeOfGems = ["obsidian", "topaz", "amethyst", "emerald", "sapphire", "ruby", "diamond"];
    this.round = 0;
    this.audio;
    this.domElements = {
      roundNumber: $(".roundNumber"),
      playerTurnDom: $(".currentPlayerContainer"),
      leaderBoard: $(".leaderBoard"),
      leaderBoardPlayerNames: [],
      leaderBoardPlayerPoints: [],
      gemModal: $(".gemsReceivedContainer"),
      gemModalPlayer: $(".playerMine"),
      gem1: $(".gem1"),
      gem2: $(".gem2"),
      volumeMute: $('.volumeMute').children()
    }
  }

  initializeBoard() {
    this.audio = new Audio;
    $(".buttonContainer").on("click", ".mineGems", this.mineGemClick);
    $(".buttonContainer").on("click", ".leaveMine", this.leaveMineClick);
    $(".rulesButton").on("click", function () { $(".rules").toggleClass("hidden") });
    $(".close-rules").on("click", function () { $(".rules").toggleClass("hidden") });
    $(".restart-game").on('click', this.restartGameClick);
    $('.createPlayer').on('click', this.createPlayer);
    $('.playerContainer').on('click', '.player', this.playerExpandClick);
    $('.volumeMute').on('click', this.muteVolumeClick);
  }

  createPlayer(event) {
    var numberOfPlayers = parseInt(event.currentTarget.innerText);
    $('.players-modal').toggleClass('hidden');
    for(var playerIndex = 1; playerIndex <= numberOfPlayers; playerIndex++) {
        this.players.push(new Player(playerIndex));
        this.playersInMine.push(this.players[playerIndex - 1]);
    }
    this.createLeaderBoard();
    this.roundChange();
    this.createAndDisplayCurrentPlayer();
  }

  createLeaderBoard(){
    for(var playerIndex = 0; playerIndex < this.players.length; playerIndex++){
      var leaderBoardPlayerDom = $("<div>", { class: "leader" + (playerIndex + 1) });
      var leaderBoardPlayerNameDom = $("<span>").text(this.players[playerIndex].getPlayerName() + ": ");
      var leaderBoardPointsDom = $("<span>").text(this.players[playerIndex].getTotalPoints());
      var leaderBoardPointUnitsDom = $("<span>").text("pts");
      leaderBoardPlayerDom.append(leaderBoardPlayerNameDom, leaderBoardPointsDom, leaderBoardPointUnitsDom);
      this.domElements.leaderBoard.append(leaderBoardPlayerDom);
      this.domElements.leaderBoardPlayerNames.push(leaderBoardPlayerNameDom);
      this.domElements.leaderBoardPlayerPoints.push(leaderBoardPointsDom);
    }
  }

  mineGemClick() {
    this.clickSounds('mine.mp3');
    var player = this.currentPlayer();
    var gemsMined = this.gemMine.mineTwoGems();
    if (player.mine(gemsMined)){
      this.playerAccident();
      return;
    }
    this.showGemsReceivedMessage(gemsMined);
    this.currentPlayer().getPlayerDom().removeClass("yourTurn");
    this.nextPlayerTurn();
  }

  showGemsReceivedMessage(gems) {
    this.domElements.gemModal.removeClass("hidden");
    this.domElements.gemModalPlayer.text(this.currentPlayer().playerName + " Received:");
    this.domElements.gem1.attr("class", "gem1 " + gems[0]);
    this.domElements.gem1.html("&diams; " + gems[0]);
    this.domElements.gem2.attr("class", "gem1 " + gems[1]);
    this.domElements.gem2.html("&diams; " + gems[1]);
    setTimeout(this.hideGemsReceivedModal, 500);
  }

  leaveMineClick() {
    this.clickSounds('leave-mine.mp3');
    this.removePlayerFromMine();
  }

  playerAccident() {
    this.clickSounds('accident.mp3');
    this.currentPlayer().getPlayerDom().append($("<span>").addClass("accidentShade"));
    this.removePlayerFromMine();
  }

  removePlayerFromMine(){
    this.currentPlayer().leaveMine()
    this.currentPlayer().getPlayerDom().removeClass("yourTurn");
    this.playersInMine.splice(this.playerTurnIndex, 1);
    if (this.playersInMine.length) {
      this.playerTurnIndex--;
      this.nextPlayerTurn();
    } else {
      this.gameOver();
    }
  }

  playerExpandClick(){
    if (!$(this).hasClass("expanded") && $(this).hasClass("collapsed")){
      return;
    }
    var players = $(".player");
    players.toggleClass("collapsed");
    $(this).toggleClass("expanded");
  }

  createAndDisplayCurrentPlayer(){
    this.domElements.playerTurnDom.empty();
    this.currentPlayer().getPlayerDom().clone().appendTo(this.domElements.playerTurnDom);
    this.currentPlayer().getPlayerDom().addClass("yourTurn");
  }

  nextPlayerTurn() {
    if (this.playerTurnIndex === this.playersInMine.length - 1 || this.playerTurnIndex < 0) {
      this.playerTurnIndex = 0;
    } else {
      this.playerTurnIndex++;
    }
    var newPlayerTurnText = "Player Turn: " + this.playersInMine[this.playerTurnIndex].getPlayerName();
    $(".playerTurn").text(newPlayerTurnText);
    this.createAndDisplayCurrentPlayer();
  }

  currentPlayer() {
    return this.playersInMine[this.playerTurnIndex];
  }

  gameOver() {
    for(var playerIndex = 0; playerIndex < this.players.length; playerIndex++){
      this.players[playerIndex].updatePointsAtEndOfRound(this.round);
    }
    if(this.round < this.maxRounds) {
      this.updateLeaderBoard();
      var roundWinner = this.players[0];
      for (var playerIndex = 1; playerIndex < this.players.length; playerIndex++) {
        if (this.players[playerIndex].getPoints() > roundWinner.getPoints()) {
          roundWinner = this.players[playerIndex];
        }
      }
      $(".winningPlayer").text(roundWinner.getPlayerName());
      $('.winningMessage').text('You Win This Round!');
      $('.restart-game').text('Next Round');
      $(".winner").removeClass("hidden");
    } else {
      var gameWinner = this.players[0];
      for (var playerIndex = 1; playerIndex < this.players.length; playerIndex++) {
        if (this.players[playerIndex].getTotalPoints() > gameWinner.getTotalPoints()) {
          gameWinner = this.players[playerIndex];
        }
      }
      $(".winningPlayer").text(gameWinner.getPlayerName());
      $('.winningMessage').text('You Win! Your Total Points: ' + gameWinner.getTotalPoints());
      $('.restart-game').text('Thanks for playing!');
      $(".winner").removeClass("hidden");
      for (var playerIndex = 0; playerIndex < this.players.length; playerIndex++) {
        this.players[playerIndex].initializePoints();
        this.domElements.leaderBoardPlayerNames[playerIndex].text(this.players[playerIndex].getPlayerName() + ": ");
        this.domElements.leaderBoardPlayerPoints[playerIndex].text(this.players[playerIndex].getTotalPoints());
      }
    }
  }

  updateLeaderBoard() {
    var leaders = [];
    var copyOfPlayers = this.players.slice(0);
    while (copyOfPlayers.length){
      var highestScore = copyOfPlayers[0];
      var highestIndex = 0;
      for (var playerIndex = 0; playerIndex < copyOfPlayers.length; playerIndex++) {
        if (highestScore.getTotalPoints() < copyOfPlayers[playerIndex].getTotalPoints()){
          highestScore = copyOfPlayers[playerIndex];
          highestIndex = playerIndex;
        }
      }
      leaders.push(copyOfPlayers.splice(highestIndex,1)[0]);
    }
    for (var leaderIndex = 0; leaderIndex < leaders.length; leaderIndex++){
      this.domElements.leaderBoardPlayerNames[leaderIndex].text(leaders[leaderIndex].getPlayerName() + ": ");
      this.domElements.leaderBoardPlayerPoints[leaderIndex].text(leaders[leaderIndex].getTotalPoints());
    }
  }

  restartGameClick() {
    for (var playerIndex = 0; playerIndex < this.players.length; playerIndex++) {
      this.gemMine.returnPlayerGemsToMine(this.players[playerIndex].returnGems());
      this.players[playerIndex].getPlayerDom().removeClass('accident yourTurn leftMine accidentBackground');
      this.players[playerIndex].initializeStatus();
      this.playersInMine.push(this.players[playerIndex]);
    }
    this.playerTurnIndex = 0
    this.playersInMine[0].getPlayerDom().addClass("yourTurn");
    this.roundChange();
    $('.winner').addClass('hidden');
    this.createAndDisplayCurrentPlayer();
  }

  hideGemsReceivedModal(){
    this.domElements.gemModal.addClass("hidden");
  }

  roundChange() {
    if (this.round < this.maxRounds) {
      var currentRound = this.round.toString();
      this.round++
      var nextRound = this.round.toString();
      var newRound = this.domElements.roundNumber.text().replace(currentRound, nextRound);
      this.domElements.roundNumber.text(newRound);
    } else {
      this.round = 1;
      this.domElements.roundNumber.text(this.domElements.roundNumber.text().replace('5', '1'))
    }
  }

  clickSounds(fileName) {
    this.audio.src = ('audio/' + fileName);
    this.audio.play();
  }
  muteVolumeClick() {
    if(this.domElements.volumeMute.text() == 'ON') {
      this.domElements.volumeMute.text('OFF');
      this.audio.volume = 0;
    } else {
      this.domElements.volumeMute.text('ON');
      this.audio.volume = 1;
    }
   }

}

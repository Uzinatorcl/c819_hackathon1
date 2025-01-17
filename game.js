class Gameboard {
  constructor() {
    this.players = [];
    this.gemMine = null;
    this.playerTurnDom = $(".currentPlayerContainer");
    this.playerTurnIndex = 0;
    this.mineGemClick = this.mineGemClick.bind(this);
    this.leaveMineClick = this.leaveMineClick.bind(this);
    this.restartGameClick = this.restartGameClick.bind(this);
    this.createPlayer = this.createPlayer.bind(this);
    this.hideGemsReceivedModal = this.hideGemsReceivedModal.bind(this);
    this.typeOfGems = ["obsidian", "topaz", "amethyst", "emerald", "sapphire", "ruby", "diamond"];
    this.round = 0;
    this.audio;
    this.domElements = {
      gemModal: $(".gemsReceivedContainer"),
      gemModalPlayer: $(".playerMine"),
      gem1: $(".gem1"),
      gem2: $(".gem2")
    }
  }

  initializeBoard() {
    this.createMine();
    $(".buttonContainer").on("click", ".mineGems", this.mineGemClick);
    $(".buttonContainer").on("click", ".leaveMine", this.leaveMineClick);
    $(".rulesButton").on("click", function () { $(".rules").toggleClass("hidden") });
    $(".close-rules").on("click", function () { $(".rules").toggleClass("hidden") });
    $(".restart-game").on('click', this.restartGameClick);
    $('.createPlayer').on('click', this.createPlayer);
    $('.playerContainer').on('click', '.player', this.playerClick);
  }

  roundChange() {
    if(this.round <= 4) {
    var currentRound = this.round.toString();
    this.round++
    var nextRound = this.round.toString();
    var newRound = $('.roundNumber').text().replace(currentRound, nextRound);
    $('.roundNumber').text(newRound);
    } else {
      this.round = 1;
      $('.roundNumber').text($('.roundNumber').text().replace('5','1'))
    }
  }

  createPlayer(event) {
    var numberOfPlayers = parseInt(event.currentTarget.innerText);
    $('.players-modal').toggleClass('hidden');
    for(var i = 1; i <= numberOfPlayers; i++) {
        this.players.push(new Player(i));
    }
    this.roundChange();
    this.cloneAndAppend();
  }

  createMine() {
    this.gemMine = new Mine;
  }

  mineGemClick() {
    this.clickSounds('mine.mp3');
    console.log("player " + (this.playerTurnIndex + 1) + " is mining for gems");
    var player = this.currentPlayer();
    var gemsMined = player.mine(this.gemMine);
    this.updateGemsReceived(gemsMined);
    if (player.gems["obsidian"] === 2) {
      this.playerAccident(player);
      return;
    }
    this.updatePlayerGems(player, gemsMined);
    this.nextPlayerTurn();
  }

  leaveMineClick() {
    if(this.currentPlayer().hadAccident === false) {
      this.clickSounds('leave-mine.mp3');
    }
    console.log("player " + (this.playerTurnIndex + 1) + " has left the mine");
    this.players[this.playerTurnIndex].leaveMine();
    this.currentPlayer().playerDom.toggleClass("leftMine");
    if (!this.checkIfEveryoneLeftMine()) {
      this.nextPlayerTurn();
    } else {
      this.gameOver();
    }
  }

  playerClick(){
    if (!$(this).hasClass("expanded") && $(this).hasClass("collapsed")){
      return;
    }
    var players = $(".player");
    players.toggleClass("collapsed");
    $(this).toggleClass("expanded");
  }

  playerAccident(player) {
    this.clickSounds('accident.mp3');
    player.hasAccident();
    player.playerDom.toggleClass("accident");
    player.returnGems(this.gemMine);
    this.updatePlayerGems(player, this.typeOfGems);
    this.leaveMineClick();
  }

  cloneAndAppend(){
    this.playerTurnDom.empty();
    this.currentPlayer().playerDom.clone().appendTo(this.playerTurnDom);
    this.currentPlayer().playerDom.addClass("yourTurn");
  }

  nextPlayerTurn() {
    this.currentPlayer().playerDom.removeClass("yourTurn");
    if (this.playerTurnIndex === this.players.length - 1) {
      this.playerTurnIndex = 0;
    } else {
      this.playerTurnIndex++;
    }
    var newPlayerTurnText = "Player Turn: Player " + (this.playerTurnIndex + 1);
    $(".playerTurn").text(newPlayerTurnText);
    this.cloneAndAppend();
    if (!this.currentPlayer().inMine) {
      this.nextPlayerTurn();
    }
  }

  updatePlayerGems(player, newGems) {
    for (var gemIndex = 0; gemIndex < newGems.length; gemIndex++) {
      var gemElement = $(player.playerDom).children("." + newGems[gemIndex]);
      var newGemCount = player.gems[newGems[gemIndex]];
      gemElement.text(newGems[gemIndex].charAt(0).toUpperCase() + newGems[gemIndex].slice(1) + ": " + newGemCount);
    }
  }

  checkIfEveryoneLeftMine() {
    for (var playerIndex = 0; playerIndex < this.players.length; playerIndex++) {
      if (this.players[playerIndex].inMine === true) {
        return false;
      }
    }
    return true;
  }

  currentPlayer() {
    return this.players[this.playerTurnIndex];
  }

  gameOver() {
    for(var playerIndex = 0; playerIndex < this.players.length; playerIndex++){
      this.players[playerIndex].totalPoints += this.players[playerIndex].points;
      this.players[playerIndex].pointsEachRound.push(this.players[playerIndex].points);
      this.players[playerIndex].updateRoundPoints(this.round);
    }
    var winner = this.players[0];
    var gameWinner = this.players[0];
    for (var playerIndex = 1; playerIndex < this.players.length; playerIndex++) {
      if (this.players[playerIndex].getPoints() > winner.getPoints()) {
        winner = this.players[playerIndex];
      }
    }
    // debugger;
    if(this.round <= 4) {
    $(".winningPlayer").text(winner.playerName);
      $('.winningMessage').text('You Win This Round!');
      $('.restart-game').text('Next Round');
    $(".winner").toggleClass("hidden");
    } else {
      for (var playerIndex = 1; playerIndex < this.players.length; playerIndex++) {
        if (this.players[playerIndex].getTotalPoints() > gameWinner.getTotalPoints()) {
          gameWinner = this.players[playerIndex];
        }
      }
      $(".winningPlayer").text(gameWinner.playerName);
      $('.winningMessage').text('You Win! Your Total Points ' + gameWinner.getTotalPoints());
      $('.restart-game').text('Thanks for playing!');
      $(".winner").toggleClass("hidden");
      for (var playerIndex = 0; playerIndex < this.players.length; playerIndex++) {
        this.players[playerIndex].totalPoints = 0;
        this.players[playerIndex].pointsEachRound = [];
        this.players[playerIndex].domElements.roundPoints.text("");
      }
    }
  }

  restartGameClick() {
    for (var playerIndex = 0; playerIndex < this.players.length; playerIndex++) {
      this.players[playerIndex].returnGems(this.gemMine);
      this.updatePlayerGems(this.players[playerIndex], this.typeOfGems);
      this.players[playerIndex].playerDom.removeClass('accident yourTurn leftMine');
      this.players[playerIndex].inMine = true;
      this.players[playerIndex].hadAccident = false;
    }
    this.playerTurnIndex = this.players.length - 1;
    this.nextPlayerTurn();
    this.roundChange();
    $('.winner').toggleClass('hidden');
    this.cloneAndAppend();
}

  updateGemsReceived(gems){
    console.log(gems);
    this.domElements.gemModal.toggleClass("hidden");
    this.domElements.gemModalPlayer.text(this.currentPlayer().playerName + " Received:");
    this.domElements.gem1.attr("class", "gem1 " + gems[0]);
    this.domElements.gem1.html("&diams; " + gems[0]);
    this.domElements.gem2.attr("class", "gem1 " + gems[1]);
    this.domElements.gem2.html("&diams; " + gems[1]);
    setTimeout(this.hideGemsReceivedModal, 1200);
  }

  hideGemsReceivedModal(){
    this.domElements.gemModal.toggleClass("hidden");
  }

  clickSounds(fileName) {
    this.audio = new Audio('audio/' + fileName);
    this.audio.play();
  }

}

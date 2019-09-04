class Mine {
  constructor() {
    this.gemsCount = { obsidian: 18, topaz: 15, amethyst: 12, emerald: 10, sapphire: 7, ruby: 4, diamond: 2 };
    this.globalGemArray = [];
    this.makeGemArray();
  }

  makeGemArray() {
    var outputArray = [];
    for (var gem in this.gemsCount) {
      var gemCount = this.gemsCount[gem];
      for (var gemNum = 0; gemNum < gemCount; gemNum++) {
        outputArray.push(gem);
      }
    }
    this.globalGemArray = outputArray;
  }

  returnRandomGem() {
    var randomIndex = Math.floor(Math.random() * this.globalGemArray.length);
    var randomGem = this.globalGemArray[randomIndex];
    this.globalGemArray.splice(randomIndex, 1);
    return randomGem;
  }

  mineTwoGems() {
    var gems = [];
    gems.push(this.returnRandomGem(), this.returnRandomGem());
    return gems;
  }
}

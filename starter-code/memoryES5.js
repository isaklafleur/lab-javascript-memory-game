//******************************************************************
// Game Logic
//******************************************************************
function MemoryGame() {
  this.cards = [
    { name: "aquaman", img: "aquaman.jpg" },
    { name: "batman", img: "batman.jpg" },
    { name: "captain america", img: "captain-america.jpg" },
    { name: "fantastic four", img: "fantastic-four.jpg" },
    { name: "flash", img: "flash.jpg" },
    { name: "green arrow", img: "green-arrow.jpg" },
    { name: "green lantern", img: "green-lantern.jpg" },
    { name: "ironman", img: "ironman.jpg" },
    { name: "spiderman", img: "spiderman.jpg" },
    { name: "superman", img: "superman.jpg" },
    { name: "the avengers", img: "the-avengers.jpg" },
    { name: "thor", img: "thor.jpg" },
    { name: "aquaman", img: "aquaman.jpg" },
    { name: "batman", img: "batman.jpg" },
    { name: "captain america", img: "captain-america.jpg" },
    { name: "fantastic four", img: "fantastic-four.jpg" },
    { name: "flash", img: "flash.jpg" },
    { name: "green arrow", img: "green-arrow.jpg" },
    { name: "green lantern", img: "green-lantern.jpg" },
    { name: "ironman", img: "ironman.jpg" },
    { name: "spiderman", img: "spiderman.jpg" },
    { name: "superman", img: "superman.jpg" },
    { name: "the avengers", img: "the-avengers.jpg" },
    { name: "thor", img: "thor.jpg" },
  ];
  this.pickedCards = [];
  this.pairsClicked = 0;
  this.pairsGuessed = 0;
}

MemoryGame.prototype.shuffleCard = function() {
  var counter = this.cards.length;
  while (counter > 0) {
    var index = Math.floor(Math.random() * counter);
    counter -= 1;
    var temp = this.cards[counter];
    this.cards[counter] = this.cards[index];
    this.cards[index] = temp;
  }
};

MemoryGame.prototype.selectCard = function(card) {
  if (this.pickedCards.length === 0) {
    card.classList.add("active");
    this.pickedCards.push(card);
  } else if (this.pickedCards.length === 1) {
    $(".front,.back").addClass("blocked");
    this.pairsClicked += 1;
    this.pickedCards.push(card);
    var pickedCard1 = this.pickedCards[0].getAttribute("name");
    var pickedCard2 = this.pickedCards[1].getAttribute("name");
    if (pickedCard1 === pickedCard2) {
      this.pickedCards = [];
      this.pairsGuessed += 1;
      $(".front,.back").removeClass("blocked");
    } else {
      var that = this;
      setTimeout(function() {
        that.pickedCards[0].style.background = "#f7b733";
        that.pickedCards[1].style.background = "#f7b733";
        that.pickedCards[0].classList.remove("active");
        that.pickedCards[1].classList.remove("active");
        that.pickedCards = [];
        $(".front,.back").removeClass("blocked");
      }, 1000);
    }
  }
};

MemoryGame.prototype.finished = function() {
  return this.pairsGuessed == "12";
};

//******************************************************************
// HTML/CSS Interactions
//******************************************************************

var memoryGame;
$(document).ready(() => {
  memoryGame = new MemoryGame();
  memoryGame.shuffleCard();
  var html = "";

  memoryGame.cards.forEach((pic, index) => {
    html += '<div class="card" id="card_' + pic.name + '">';
    html += '<div class="back"';
    html += '    name="' + pic.img + '">';
    html += "</div>";
    html += "</div>";
  });

  // Add all the div's to the HTML
  document.getElementById("memory-board").innerHTML = html;
  // Bind the click event of each element to a function

  $(".back").on("click", function() {
    if (!this.classList.contains("active")) {
      memoryGame.selectCard(this);
      this.style.background =
        "url(img/" + this.getAttribute("name") + ") no-repeat";
      document.getElementById("pairs-clicked").innerHTML =
        memoryGame.pairsClicked;
      document.getElementById("pairs-guessed").innerHTML =
        memoryGame.pairsGuessed;
      if (memoryGame.finished()) {
        alert("You won!!!");
      }
    }
  });
});

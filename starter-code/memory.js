//******************************************************************
// Game Logic
//******************************************************************
class MemoryGame {
  constructor() {
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
    this.picked_cards = [];
    this.pairs_clicked = 0;
    this.pairs_guessed = 0;
    this._shuffleCard();
  }

  _shuffleCard() {
    let counter = this.cards.length;

    while (counter > 0) {
      const index = Math.floor(Math.random() * counter);
      counter -= 1;
      const temp = this.cards[counter];
      this.cards[counter] = this.cards[index];
      this.cards[index] = temp;
    }
    return;
  }

  selectCard(card) {
    if (this.picked_cards.length === 0) {
      this.picked_cards.push(card);
      this.picked_cards[0].className += " active";
    } else if (this.picked_cards.length == 1) {
      $(".front,.back").addClass("blocked");
      this.pairs_clicked += 1;
      this.picked_cards.push(card);
      if (
        this.picked_cards[0].getAttribute("name") ==
        this.picked_cards[1].getAttribute("name")
      ) {
        this.picked_cards = [];
        this.pairs_guessed += 1;
        $(".front,.back").removeClass("blocked");
      } else {
        this.pairsClicked += 1;
        const that = this;
        setTimeout(function() {
          that.picked_cards[0].style.background = "#456783";
          that.picked_cards[1].style.background = "#456783";
          that.picked_cards[0].classList.remove("active");
          that.picked_cards[1].classList.remove("active");
          that.picked_cards = [];
          $(".front,.back").removeClass("blocked");
        }, 1000);
      }
    }
  }

  finished() {
    return this.pairs_guessed == "12";
  }
}

//******************************************************************
// HTML/CSS Interactions
//******************************************************************

let memoryGame;
$(document).ready(() => {
  memoryGame = new MemoryGame();
  let html = "";

  memoryGame.cards.forEach((pic, index) => {
    html += `<div class="card" id="card_'${pic.name}'">`;
    html += '<div class="back"';
    html += `    name="${pic.img}">`;
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
      document.getElementById("pairs_clicked").innerHTML =
        memoryGame.pairs_clicked;
      document.getElementById("pairs_guessed").innerHTML =
        memoryGame.pairs_guessed;
      if (memoryGame.finished()) {
        alert("You won!!!");
      }
    }
  });
});

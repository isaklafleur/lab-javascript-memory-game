function saveCards(cards) {
  $(".pic")
    .find(`img[src$="img/${cards[0].filename}"]`)
    .each(() => {
      $(this)
        .parent()
        .unbind("click");
    });
}

function hideCards(cards) {
  const cardsImg = [cards[0], cards[1]];
  setTimeout(() => {
    cardsImg.forEach(el => {
      $(".pic")
        .find(`img[src$="img/${el}"]`)
        .hide();
    });
  }, 1500);
}

function updateScore(cardsGuessed, cardsClicked = "-") {
  $("#pairs-guessed").text(cardsGuessed);
  $("#pairs-clicked").text(cardsClicked);
}

class MemoryGame {
  constructor() {
    this.cards = [
      { name: "aquaman", filename: "aquaman.jpg" },
      { name: "batman", filename: "batman.jpg" },
      { name: "captain america", filename: "captain-america.jpg" },
      { name: "fantastic four", filename: "fantastic-four.jpg" },
      { name: "flash", filename: "flash.jpg" },
      { name: "green arrow", filename: "green-arrow.jpg" },
      { name: "green lantern", filename: "green-lantern.jpg" },
      { name: "ironman", filename: "ironman.jpg" },
      { name: "spiderman", filename: "spiderman.jpg" },
      { name: "superman", filename: "superman.jpg" },
      { name: "the avengers", filename: "the-avengers.jpg" },
      { name: "thor", filename: "thor.jpg" },
      { name: "aquaman", filename: "aquaman.jpg" },
      { name: "batman", filename: "batman.jpg" },
      { name: "captain america", filename: "captain-america.jpg" },
      { name: "fantastic four", filename: "fantastic-four.jpg" },
      { name: "flash", filename: "flash.jpg" },
      { name: "green arrow", filename: "green-arrow.jpg" },
      { name: "green lantern", filename: "green-lantern.jpg" },
      { name: "ironman", filename: "ironman.jpg" },
      { name: "spiderman", filename: "spiderman.jpg" },
      { name: "superman", filename: "superman.jpg" },
      { name: "the avengers", filename: "the-avengers.jpg" },
      { name: "thor", filename: "thor.jpg" },
    ];
    this.picked_cards = [];
    this.pairs_clicked = 0;
    this.pairs_guessed = 0;
    this.shuffleCard();
  }

  shuffleCard() {
    let counter = this.cards.length;
    while (counter > 0) {
      const index = Math.floor(Math.random() * counter);
      counter -= 1;
      const temp = this.cards[counter];
      this.cards[counter] = this.cards[index];
      this.cards[index] = temp;
    }
  }

  selectCard(card) {
    this.picked_cards.push(card);
    if (this.picked_cards.length === 2) {
      // if the image is the same
      if (this.picked_cards[0] === this.picked_cards[1]) {
        this.pairs_guessed += 1;
        saveCards(this.picked_cards);
        this.picked_cards = [];
      } else {
        this.pairs_clicked += 1;
        hideCards(this.picked_cards);
        this.picked_cards = [];
      }
      updateScore(this.pairs_guessed, this.pairs_clicked);
    }
  }
}

// jQuery code:
$(document).ready(function() {
  const memoryGame = new MemoryGame();

  // adding the images to the grid
  memoryGame.cards.forEach((card, index) => {
    $(`#${index + 1}`).html(`<img src='./img/${card.filename}'>`);
  });

  $(".pic").click(ev => {
    // if style.display === "block" return
    // if hasClass("visible")

    $(ev.currentTarget)
      .children()
      .toggle(); // better as toggleClass("visible")
    // received the image file name which we can use to compare the images
    const card = $(ev.currentTarget)
      .children()
      .attr("src")
      .slice(6);
    memoryGame.selectCard(card);
  });
});

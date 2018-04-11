/*
 * Create a list that holds all of your cards
 */
var card = document.getElementsByClassName("card");
var cards = [...card];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//move counter
var moves = 0;
var counter = document.querySelector(".moves");

function moveCounter() {
    moves++;
    counter.innerHTML = moves;
}

//list of open cards
var openedCards = [];

//function to display card if clicked on
var displayCard = function() {
    this.classList.toggle("open");
    this.classList.toggle("show");
}

//function to add cards to list of open cards and see whether cards are matching or not
function openCard() {

    openedCards.push(this);

    if (openedCards.length > 1) {

      moveCounter();

      //matching cards
      if (openedCards[0].type === openedCards[1].type) {

        openedCards[0].classList.add("match");
        openedCards[1].classList.add("match");
        openedCards[0].classList.remove("open", "show");
        openedCards[1].classList.remove("open", "show");
        openedCards = [];

      }

      //not matching cards
      else {

        openedCards[0].classList.add("nomatch");
        openedCards[1].classList.add("nomatch");
        setTimeout(function() {
          openedCards[0].classList.remove("open", "show", "nomatch");
          openedCards[1].classList.remove("open", "show", "nomatch");
          openedCards = [];
        }, 400);

      }

    }

}

//adds event listeners to each card
for (card of cards) {
    card.addEventListener("click", displayCard);
    card.addEventListener("click", openCard);
}

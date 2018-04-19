/*
 * Create a list that holds all of your cards
 */
let card = document.getElementsByClassName("card");
let cards = [...card];

let star = document.getElementsByClassName("fa-star");
let stars = [...star];

let matchingCards = document.getElementsByClassName("match");

let showModal = document.getElementById("modal");

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

function start() {

      //shuffles cards
      cards = shuffle(cards);
      document.getElementById("cardDeck").innerHTML = "";
      cards.forEach((card)=>{
          document.getElementById("cardDeck").appendChild(card);
      })

      //reset moves
      moves = 0;
      counter.innerHTML = moves;

      //reset timer
      seconds = 0;
      timer.innerHTML = seconds;
      clearInterval(time);

      //reset stars
      for (let d = 0; d < stars.length; d++) {
            stars[d].classList.remove("fa-star-o");
            stars[d].classList.add("fa-star");
      }

      //reset cards
      for (let h = 0; h < cards.length; h++) {
            cards[h].classList.remove("show", "open", "match");
      }

}

//list of open cards
let openedCards = [];

//function to display card if clicked on
let displayCard = function() {
      this.classList.toggle("open");
      this.classList.toggle("show");
};

//function to add cards to list of open cards and see whether cards are matching or not
function openCard() {

      openedCards.push(this);

      if (openedCards.length === 2) {

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

              for (card of cards) {
                    card.classList.add("noclick");
                    //card.removeEventListener("click", displayCard);
                    //card.removeEventListener("click", openCard);
              }

              setTimeout(function() {
                openedCards[0].classList.remove("open", "show", "nomatch");
                openedCards[1].classList.remove("open", "show", "nomatch");
                for (card of cards) {
                      card.classList.remove("noclick");
                      //card.removeEventListener("click", displayCard);
                      //card.removeEventListener("click", openCard);
                }
                openedCards = [];
              }, 400);

            }

      }

}

//time counter
let seconds = 0;
let timer = document.querySelector(".seconds");
let time;

function timeCounter() {

      time = setInterval(function() {
          timer.innerHTML = seconds;
          seconds++;
      }, 1000);

}

//move counter
let moves = 0;
let counter = document.querySelector(".moves");

function moveCounter() {

      moves++;
      counter.innerHTML = moves;

      starRating();

      if (moves === 1) {
          timeCounter();
      }

}

//star rating
 function starRating() {

      if (moves > 15) {
          stars[1].classList.add("fa-star-o");
      } else if (moves > 10 && moves < 14) {
          stars[2].classList.add("fa-star-o");
      }

}

//end of the game, congratulations modal
function end() {

      if (matchingCards.length == 16) {

          clearInterval(time);
          let finalTime = timer.innerHTML;

          showModal.classList.remove("display");

          document.getElementById("totalTime").innerHTML = finalTime;

          document.getElementById("totalMoves").innerHTML = moves;

          var allStars = document.querySelector(".stars").innerHTML;
          document.getElementById("totalStars").innerHTML = allStars;

      }

}

//closing the modal
let closeModal = document.getElementById("close");

function closingModal() {

      showModal.classList.add("display");
      start();

}

closeModal.addEventListener("click", closingModal);

//adds event listeners to each card
for (card of cards) {
      card.addEventListener("click", displayCard);
      card.addEventListener("click", openCard);
      card.addEventListener("click", end);
}

// These are all the symbols that the game is going to use
const symbols = ['🍎', '🍌', '🍇', '🍓', '🍍', '🍉', '🍒', '🥝'];
let cards = [
    {symbol: '🍎'},
    {symbol: '🍎'},
    {symbol: '🍌'},
    {symbol: '🍌'},
    {symbol: '🍇'},
    {symbol: '🍇'},
    {symbol: '🍓'},
    {symbol: '🍓'},
    {symbol: '🍍'},
    {symbol: '🍍'},
    {symbol: '🍉'},
    {symbol: '🍉'},
    {symbol: '🍒'},
    {symbol: '🍒'},
    {symbol: '🥝'},
    {symbol: '🥝'},
];

let firstCard = null, secondCard = null;
let lockBoard = false;

const cardContainer = document.getElementById('game-board');

function initGame() {
    // Resetting game board & shuffling
    cardContainer.innerHTML= '';
    resetBoard();
    shuffleArray(cards);

    // For loop to display all (randomized) cards
    for (let card of cards){
        createCard(card.symbol);
    }

    document.getElementById('restart-btn').addEventListener('click', initGame);
}

function createCard(symbol) {
    // Creating element
    let card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    cardContainer.appendChild(card)

    // Adding event listener
    card.addEventListener('click', ()=> {
        flipCard(card);
    })
}

function flipCard(card) {
    // If the board is supposed to be locked or you picked the same card you already picked
    if (lockBoard || card === firstCard) return;
    // Adding flipped class (show symbol)
    card.classList.add('flipped');
    card.innerText = card.dataset.symbol;

    // Checking if first or second card
    if (!firstCard){
        firstCard = card;
    } else {
        secondCard = card;
        checkForMatch();
    }
}

function checkForMatch() {
    // Checking for match
    if (firstCard.dataset.symbol === secondCard.dataset.symbol){
        disableCards();
    } else {
        unflipCards();
    }

}

function disableCards() {
    // Adding matched class
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    // Resetting board
    resetBoard()
}
 
/* ---------------------  Everything under has already been done for you -------------------------- */

function unflipCards() {

    // We lock the board so that the user can't touch the board while it is unflipping
    lockBoard = true;

    // The cards will be flipped back after 1 second and the board will be reset
    // The 1 second is to give the user time to actaully see the card so they can memorize them before they unflip
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

initGame();
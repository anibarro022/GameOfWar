const deckButton = document.getElementById('get-deck');
const drawButton = document.getElementById('draw');
const headerText = document.getElementById('header-text');
const cardsLeftText = document.getElementById('cards-left');
const compScore = document.getElementById('player1-score');
const playerScore = document.getElementById('player2-score');
let deckId
let remCards
let score = [0, 0]
deckButton.addEventListener('click', fetchCards);
drawButton.addEventListener('click', drawCards);


function fetchCards() {
    score = [0, 0]
    playerScore.textContent = `My Score: ${score[1]}`
    compScore.textContent = `Computer Score: ${score[0]}`
    headerText.textContent = "Game of War"
    document.getElementById('cards-1').innerHTML = `
            `
    document.getElementById('cards-2').innerHTML = `
            `
    drawButton.disabled = false
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            cardsLeftText.textContent = `Cards left: ${data.remaining}`
            deckId = data.deck_id;
        })
}

function drawCards() {
    console.log('cards drawn')
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            cardsLeftText.textContent = `Cards left: ${data.remaining}`
            document.getElementById('cards-1').innerHTML = `
            <img class="cards" src="${data.cards[0].image}"/>
            `
            document.getElementById('cards-2').innerHTML = `
            <img class="cards" src="${data.cards[1].image}"/>
            `
            const winnerText = roundWinner(data.cards[0], data.cards[1])
            headerText.textContent = winnerText
            remCards = data.remaining
            if (remCards === 0) {
                drawButton.disabled = true
                if (score[0] > score[1]) {
                    headerText.textContent = 'The computer won the game!'
                } else if (score[1] > score[0]) {
                    headerText.textContent = 'You won the game!'
                } else {
                    headerText.textContent = 'It was a tie game!'
                }
            }
        })
}

function roundWinner(card1, card2) {
    const valKey = [
        "2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"
    ]
    const card1ValIndex = valKey.indexOf(card1.value)
    const card2ValIndex = valKey.indexOf(card2.value)
    if (card1ValIndex > card2ValIndex) {
        score[0]+=1
        compScore.textContent = `Computer Score: ${score[0]}`
        return "Computer wins!"
    }
    else if (card1ValIndex < card2ValIndex) {
        score[1]+=1
        playerScore.textContent = `My Score: ${score[1]}`
        return "You win!"
    }
    else {
        return "War!"
    }
}
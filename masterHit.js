function calculateHandValue(cards) {
  let sum = 0;
  let numAces = 0;

  for (let card of cards) {
    if (card === 'A') {
      sum += 11;
      numAces++;
    } else if (card === 'K' || card === 'Q' || card === 'J') {
      sum += 10;
    } else {
      sum += parseInt(card);
    }
  }

  // Adjust for Aces
  while (sum > 21 && numAces > 0) {
    sum -= 10;
    numAces--;
  }

  return sum;
}

function simulateGame(playerCards, dealerCard, numIterations) {
  let wins = 0;

  for (let i = 0; i < numIterations; i++) {
    let playerHand = [...playerCards];
    let dealerHand = [dealerCard];

    // Player always hits
    playerHand.push(getRandomCard());

    // Dealer's turn
    while (calculateHandValue(dealerHand) < 17) {
      dealerHand.push(getRandomCard());
    }

    // Check for win
    if (calculateHandValue(playerHand) <= 21 && (calculateHandValue(dealerHand) > 21 || calculateHandValue(playerHand) > calculateHandValue(dealerHand))) {
      wins++;
    }
  }

  return wins;
}

function getRandomCard() {
  const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  return cards[Math.floor(Math.random() * cards.length)];
}

// Main program
const numIterations = 100;

for (let playerCard1 of ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']) {
  for (let playerCard2 of ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']) {
    for (let dealerCard of ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']) {
      const playerCards = [playerCard1, playerCard2];
      const wins = simulateGame(playerCards, dealerCard, numIterations);
      console.log(`Player: ${playerCards.join(', ')}, Dealer: ${dealerCard}, Wins: ${wins}`);
    }
  }
}

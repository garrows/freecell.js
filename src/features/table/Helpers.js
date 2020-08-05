export function illegalMove(state) {
  state.illegalMoveShowing = true;
  state.deck.forEach(c => c.selected = false);
}

export function moveSelectedCardToColumn(state, column) {
  // Find a selected card
  const card = state.deck.find(c => c.selected);
  // Only has an action if a card is selected
  if (!card) return;

  // Same column
  if (card.column === column && card.area === 'table') {
    // Deselect it.
    card.selected = false;
    return;
  }

  // Find the top card in that column
  const cardsInColumn = state.deck.filter(c => c.area === 'table').filter(c => c.column === column).sort((a, b) => b.row - a.row);

  // Check for illegal moves.
  if (cardsInColumn.length > 0) {
    const topCard = cardsInColumn[0];
    // Wrong color
    if (topCard.color === card.color) {
      return illegalMove(state);
    }
    // Wrong value
    if (topCard.int !== card.int + 1) {
      return illegalMove(state);
    }
  }

  const row = cardsInColumn.length > 0 ? cardsInColumn[0].row : -1;
  
  card.row = row + 1;
  card.column = column;
  card.selected = false;
  card.area = 'table';

  checkForAutoMoves(state.deck);
}

export function moveSelectedCardToStack(state, column) {
  // Find a selected card
  const card = state.deck.find(c => c.selected);
  // Only has an action if a card is selected
  if (!card) return;

  // Find the top card in that column
  const cardsInColumn = state.deck.filter(c => c.area === 'stacks').filter(c => c.column === column).sort((a, b) => b.int - a.int);
  // Check if illegal moves
  // Empty stack - Can only put an ace down
  if (cardsInColumn.length === 0 && card.value !== 'A') {
    return illegalMove(state);
  }

  // Has cards in stack with wrong suit.
  if (cardsInColumn[0] && cardsInColumn[0].suit !== card.suit) {
    return illegalMove(state);
  }
  // Has cards in stack. Same suit. Must be one value lower.
  if (cardsInColumn[0] && cardsInColumn[0].int !== card.int -1) {
    return illegalMove(state);
  }
  
  card.row = 0;
  card.column = column;
  card.selected = false;
  card.area = 'stacks';

  checkForAutoMoves(state.deck);
}

function moveNextCard(deck, targetCard) {
  // Check each columm
  for (let i = 0; i < 8; i++) {
    // Find the top card in that column
    const cardsInColumn = deck.filter(c => c.area === 'table').filter(c => c.column === i).sort((a, b) => b.row - a.row);
    const topCard = cardsInColumn[0];
    if (topCard && topCard.suit === targetCard.suit && topCard.int === (targetCard.int + 1)) {
      // Move the card to the stacks area
      // Find stacked cards
      const stackCards = deck.filter(c => c.area === 'stacks');
      
      // Move card
      topCard.area = 'stacks';
      topCard.column = targetCard.column;
      // Change made, check again.
      return checkForAutoMoves(deck);
    }
  }
  // Look in hold area
  for (let i = 0; i < 4; i++) {
    const cardsInHoldColumn = deck.filter(c => c.area === 'hold').filter(c => c.column === i);
    const holdCard = cardsInHoldColumn[0];
    if (holdCard) {
      if (holdCard && holdCard.suit === targetCard.suit && holdCard.int === (targetCard.int + 1)) {
        // Move the card to the stacks area
        // Find stacked cards
        const stackCards = deck.filter(c => c.area === 'stacks');
        
        // Move card
        holdCard.area = 'stacks';
        holdCard.column = targetCard.column;
        // Change made, check again.
        return checkForAutoMoves(deck);
      }
    }
  }
}

export function checkForAutoMoves(deck) {
  // Find the first free spot.
  const stackCards = deck.filter(c => c.area === 'stacks');
  const takenSpots = stackCards.map(c => c.column);
  const freeSpot = [0,1,2,3].find(col => !takenSpots.includes(col));
  if (freeSpot !== undefined) {
    // Look for aces
    ['S', 'D', 'H', 'C'].forEach(suit => {
      const fakeCard = {
        int: 0, // one less than an ace
        suit,
        column: freeSpot,
      }
      debugger;
      const movedCard = moveNextCard(deck, fakeCard);
      if (movedCard) {
        // Something changed, check again.
        return checkForAutoMoves(deck);
      }
    });
  }
  // Check each stacked column
  for (let i = 0; i < 4; i++) {
    const cardsInStack = deck.filter(c => c.area === 'stacks').filter(c => c.column === i).sort((a, b) => b.int - a.int);
    if (cardsInStack[0]) {
      const movedCard = moveNextCard(deck, cardsInStack[0]);
      if (movedCard) {
        // Something changed, check again.
        return checkForAutoMoves(deck);
      }
    }
  }
}

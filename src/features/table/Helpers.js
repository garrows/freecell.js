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

export function checkForAutoMoves(deck) {
  // Check each columm
  for (let i = 0; i <= 8; i++) {
    // Find the top card in that column
    const cardsInColumn = deck.filter(c => c.area === 'table').filter(c => c.column === i).sort((a, b) => b.int - a.int);
    debugger;
    if (cardsInColumn[0] && cardsInColumn[0].value === 'A') {
      cardsInColumn[0].area = 'stacks';
    }
  }
}

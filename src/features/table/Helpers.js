export function illegalMove(state) {
  state.illegalMoveShowing = true;
  state.deck.forEach(c => c.selected = false);
}

export function moveSelectedCardToColumn(state, column, singleOrColumn) {
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
  const cardsInDestColumn = state.deck.filter(c => c.area === 'table').filter(c => c.column === column).sort((a, b) => b.row - a.row);

  let previousCard = null;
  const cardsInSelectedColumn = state.deck.filter(c => c.area === 'table').filter(c => c.column === card.column).sort((a, b) => b.row - a.row);
  const cardsInSourceStack = cardsInSelectedColumn.filter(c => {
    // First card. It moves.
    if (!previousCard) {
      previousCard = c;
      return true;
    }
    if (previousCard && c.int === previousCard.int + 1 && c.color !== previousCard.color) {
      previousCard = c;
      return true;
    }
    // Card doesn't match the order so stop iterating
    return false;
  });

  // Check for illegal moves.
  if (cardsInDestColumn.length > 0) {
    const topCard = cardsInDestColumn[0];
    const legalCardMove = cardsInSourceStack.find((c) => {
      return topCard.color !== c.color && topCard.int === c.int + 1;
    })
    if (!legalCardMove) {
      return illegalMove(state);
    } else {
      // TODO: check how many moves can be made before making them.
      const cardsToMove = cardsInSourceStack.slice(cardsInSourceStack.indexOf(legalCardMove));
      let row = topCard.row + 1;
      cardsToMove.forEach(c => {
        c.column = column;
        c.row = row;
        row++;
      });
    }
  }
  if (singleOrColumn) {
    if (singleOrColumn === 'single') {
      card.row = 0;
    } else {
      // TODO: check how many moves can be made before making them.
      // Move cards until mis-matching order.
      cardsInSelectedColumn.every(c => {
        // First card. It moves.
        if (!previousCard) {
          c.column = column;
          previousCard = c;
          return true;
        }
        if (previousCard && c.int === previousCard.int + 1 && c.color !== previousCard.color) {
          c.column = column;
          previousCard = c;
          return true;
        }
        // Card doesn't match the order so stop iterating
        return false;
      });
      // Set the rows in the new column
      const cardsInNewColumnReversed = state.deck.filter(c => c.area === 'table').filter(c => c.column === card.column).sort((a, b) => a.row - b.row);
      cardsInNewColumnReversed.forEach((c, i) => c.row = i);
    }
  } else if (cardsInDestColumn.length === 0) {
    // Check if we should prompt about moving the whole column
    const cardsInSelectedColumn = state.deck.filter(c => c.area === 'table').filter(c => c.column === card.column).sort((a, b) => b.row - a.row);
    const underSelectedCard = cardsInSelectedColumn[1];
    if (underSelectedCard && card.int === underSelectedCard.int - 1 && card.color !== underSelectedCard.color) {
      state.selectedColumn = column;
      state.moveColumnDialogShowing = true;
      return;
    }

    card.row = 0;
  }
  
  card.column = column;
  card.selected = false;
  card.area = 'table';

  checkForAutoMoves(state);
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

  checkForAutoMoves(state);
}

function moveNextCard(state, targetCard) {
  const deck = state.deck;
  // Check each columm
  for (let i = 0; i < 8; i++) {
    // Find the top card in that column
    const cardsInColumn = deck.filter(c => c.area === 'table').filter(c => c.column === i).sort((a, b) => b.row - a.row);
    const topCard = cardsInColumn[0];
    if (topCard && topCard.suit === targetCard.suit && topCard.int === (targetCard.int + 1)) {      
      // Move card
      topCard.area = 'stacks';
      topCard.column = targetCard.column;
      // Change made, check again.
      return checkForAutoMoves(state);
    }
  }
  // Look in hold area
  for (let i = 0; i < 4; i++) {
    const cardsInHoldColumn = deck.filter(c => c.area === 'hold').filter(c => c.column === i);
    const holdCard = cardsInHoldColumn[0];
    if (holdCard) {
      if (holdCard && holdCard.suit === targetCard.suit && holdCard.int === (targetCard.int + 1)) {
        // Move card
        holdCard.area = 'stacks';
        holdCard.column = targetCard.column;
        // Change made, check again.
        return checkForAutoMoves(state);
      }
    }
  }
}

export function checkForAutoMoves(state) {
  const deck = state.deck;
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
      const movedCard = moveNextCard(state, fakeCard);
      if (movedCard) {
        // Something changed, check again.
        return checkForAutoMoves(state);
      }
    });
  }
  // Check each stacked column
  for (let i = 0; i < 4; i++) {
    const cardsInStack = deck.filter(c => c.area === 'stacks').filter(c => c.column === i).sort((a, b) => b.int - a.int);
    if (cardsInStack[0]) {
      const movedCard = moveNextCard(state, cardsInStack[0]);
      if (movedCard) {
        // Something changed, check again.
        return checkForAutoMoves(state);
      }
    }
  }
  state.gameOverDialogShowing = deck.filter(c => c.area !== 'stacks').length === 0;
}

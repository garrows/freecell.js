import { createSlice } from '@reduxjs/toolkit';
import Dealer from './Dealer.js';
import { 
  illegalMove, 
  moveSelectedCardToColumn, 
  moveSelectedCardToStack,
  checkForAutoMoves,
} from './Helpers.js';

// 1 million because Microsoft originally only did 1 million of them.
const randomSeed = () => Math.round(Math.random() * 1000000);
const initialSeed = randomSeed();

export const tableSlice = createSlice({
  name: 'table',
  initialState: {
    deck: Dealer(initialSeed),
    overseerDirection: 'left',
    illegalMoveShowing: false,
    seed: initialSeed,
  },
  reducers: {
    deal: (state, action) => {
      state.seed = action.payload || randomSeed();
      state.deck = Dealer(state.seed);
    },
    cardClicked: (state, action) => {
      const clickedCard = state.deck.find(c => c.key === action.payload.key);
      // Find a selected card (if exists)
      const selectedCard = state.deck.find(c => c.selected);

      // Nothing is selected so select one
      if (!selectedCard) {
        // Only select the top card if it's on the table
        if (clickedCard.area === 'table') {
          // Find everything in that column
          const cardsInColumn = state.deck.filter(c => c.area === 'table').filter(c => c.column === clickedCard.column).sort((a, b) => b.row - a.row);
          // Select top card in column
          cardsInColumn[0].selected = true;
        } else {
          // Select card in stacks or hold
          clickedCard.selected = true;
        }
        return;
      }

      // Clicked on the selected card. Unselect it.
      if (clickedCard.key === selectedCard.key) {
        clickedCard.selected = false;
        return;
      }

      switch (clickedCard.area) {
        case 'table':
          // Move a card on top of another
          moveSelectedCardToColumn(state, clickedCard.column);
          break;
        case 'hold':
          // Illegal move
          return illegalMove(state);
        case 'stacks':
          // Move to stacks
          moveSelectedCardToStack(state, clickedCard.column);
          break;
        default:
          break;
      }

    },
    holdSpaceClicked: (state, action) => {
      const column = action.payload;
      // Find a selected card
      const card = state.deck.find(c => c.selected);
      // Only has an action if a card is selected
      if (!card) return;

      // Check if there's something there already
      const cardsInColumn = state.deck.filter(c => c.area === 'hold').filter(c => c.column === column);
      // Check if illegal moves
      // Is there a card there already
      if (cardsInColumn.length > 0) {
        return illegalMove(state);
      }
      
      card.row = 0;
      card.column = column;
      card.selected = false; 
      card.area = 'hold';
      checkForAutoMoves(state);
    },
    stackSpaceClicked: (state, action) => {
      moveSelectedCardToStack(state, action.payload);
    },
    holdSpaceHover: (state) => {
      state.overseerDirection = 'left';
    },
    stackSpaceHover: (state) => {
      state.overseerDirection = 'right';
    },
    cardHover: (state, action) => {
      const area = action.payload.area;
      if (area === 'stacks') {
        state.overseerDirection = 'right';
      } else if (area === 'hold') {
        state.overseerDirection = 'left';
      }
    },
    columnClicked: (state, action) => {
      moveSelectedCardToColumn(state, action.payload);
    },
    cardDoubleClicked: (state, action) => {
      // Double click usually puts the card in the hold spots
      const clickedCard = state.deck.find(c => c.key === action.payload.key);

      clickedCard.selected = false;

      // Nothing to do if it's stacked or already in temp area
      if (clickedCard.area !== 'table') {
        return;
      }

      // Find the cards in hold already
      const holdCards = state.deck.filter((card) => card.area === 'hold');
      // Check if there are spots
      if (holdCards.length < 4) {
        clickedCard.area = 'hold';
        clickedCard.row = 0;
        // Find the free spot.
        const takenSpots = holdCards.map(card => card.column);
        const freeSpot = [0,1,2,3].find(col => !takenSpots.includes(col));
        clickedCard.column = freeSpot;
      }
      checkForAutoMoves(state);
    },
    closeIllegalMoveDialog: (state) => {
      state.illegalMoveShowing = false;
    },
    closeGameOverDialog: (state) => {
      state.gameOverDialogShowing = false;
    },
    moveSingleCard: (state) => {
      state.moveColumnDialogShowing = false;
      moveSelectedCardToColumn(state, state.selectedColumn, 'single');
    },
    moveColumn: (state) => {
      state.moveColumnDialogShowing = false;
      moveSelectedCardToColumn(state, state.selectedColumn, 'column');
    },
    cancelMoveColumnDialog: (state) => {
      state.moveColumnDialogShowing = false;
    },
  },
});

export const { 
  deal, 
  cardClicked,
  holdSpaceClicked,
  stackSpaceClicked,
  holdSpaceHover,
  stackSpaceHover,
  cardHover,
  columnClicked,
  cardDoubleClicked,
  closeIllegalMoveDialog,
  closeGameOverDialog,
  moveSingleCard,
  moveColumn,
  cancelMoveColumnDialog,
} = tableSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectDeck = state => state.table.deck;
export const selectIllegalMoveShowing = state => state.table.illegalMoveShowing;
export const selectOverseerDirection = state => state.table.overseerDirection;
export const selectSeed = state => state.table.seed;
export const selectGameOverDialogShowing = state => state.table.gameOverDialogShowing;
export const selectMoveColumnDialogShowing = state => state.table.moveColumnDialogShowing;

export default tableSlice.reducer;

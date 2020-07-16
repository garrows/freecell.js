import React, { useState } from 'react';
import styles from './App.module.css';
import Card from './components/Card';
import CardSpace from './components/CardSpace';
import Overseer from './components/Overseer';
import Menu from './components/Menu';

// import { loader } from 'graphql.macro';
// const query = loader('./foo.graphql');
// console.log('query', query);

function makeDeck() {
  const deck = [];
  let column = 0;
  let row = 0;
  let area = 'table';
  ['S', 'D', 'C', 'H'].forEach((suit) => {
    for (let int = 1; int <= 13; int++) {
      let value;
      switch (int) {
        case 1:
          value = 'A';
          break;
        case 11:
          value = 'J';
          break;
        case 12:
          value = 'Q';
          break;
        case 13:
          value = 'K';
          break;
        default:
          value = int.toString();
          break;
      }
      let key = suit + value;
      deck.push({
        key,
        suit,
        value,
        int,
        column,
        row,
        area,
        color: suit === 'S' || suit === 'C' ? 'black' : 'red',
        selected: false
      });
    }
  });

  deck.forEach(card => {
    if (column >= 8) {
      column = 0;
      row++;
    }
    card.column = column;
    card.row = row;
    column++;
  });
  return deck;
}

function App() {
  const appDiv = React.useRef(null);
  const [scale, setScale] = useState(0.5);
  const [deck, setDeck] = useState(makeDeck());
  const [overseerDirection, setOverseerDirection] = useState('left');

  function handleResize() {
    const newScale = Math.min( 
      window.innerWidth / appDiv.current.clientWidth, 
      window.innerHeight / appDiv.current.clientHeight
    );
    setScale(newScale);
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return _ => {
      window.removeEventListener('resize', handleResize);
    }
  });

  function cardClicked(clickedCard) {
    // Find a selected card
    const selectedCard = deck.find(c => c.selected);

    // Nothing is selected so select one
    if (!selectedCard) {
      const newDeck = JSON.parse(JSON.stringify(deck));
      const newCard = newDeck.find(card => card.key === clickedCard.key);
      // Only select the top card if it's on the table
      if (newCard.area === 'table') {
        // Find everything in that column
        const cardsInColumn = newDeck.filter(c => c.area === 'table').filter(c => c.column === newCard.column).sort((a, b) => b.row - a.row);
        cardsInColumn[0].selected = true;
      } else {
      newCard.selected = true;
      }
      return setDeck(newDeck);
    }

    switch (clickedCard.area) {
      case 'table':
        // Move a card on top of another
        moveSelectedCardToColumn(clickedCard.column);
        break;
      case 'hold':
        // Illegal move
        return illegalMove();
      case 'stacks':
        // Move to stacks
        moveSelectedCardToStack(clickedCard.column);
        break;
      default:
        break;
    }
  }

  function cardDoubleClicked(clickedCard) {
    // Double click usually puts the card in the hold spots
    const newDeck = JSON.parse(JSON.stringify(deck));
    const newCard = newDeck.find(card => card.key === clickedCard.key);

    newCard.selected = false;

    // Find the cards in hold already
    const holdCards = newDeck.filter((card) => card.area === 'hold');
    // Check if there are spots
    if (holdCards.length < 4) {
      newCard.area = 'hold';
      newCard.row = 0;
      // Find the free spot.
      const takenSpots = holdCards.map(card => card.column);
      const freeSpot = [0,1,2,3].find(col => !takenSpots.includes(col));
      newCard.column = freeSpot;
    }

    setDeck(newDeck);
  }

  function moveSelectedCardToColumn(column) {
    const newDeck = JSON.parse(JSON.stringify(deck));
    // Find a selected card
    const card = newDeck.find(c => c.selected);
    // Only has an action if a card is selected
    if (!card) return;

    // Same column
    if (card.column === column) {
      // Deselect it.
      card.selected = false;
      return setDeck(newDeck);
    }

    // Find the top card in that column
    const cardsInColumn = newDeck.filter(c => c.area === 'table').filter(c => c.column === column).sort((a, b) => b.row - a.row);

    debugger;
    // Check for illegal moves.
    if (cardsInColumn.length > 0) {
      const topCard = cardsInColumn[0];
      // Wrong color
      if (topCard.color === card.color) {
        return illegalMove();
      }
      // Wrong value
      if (topCard.int !== card.int + 1) {
        return illegalMove();
      }
    }

    const row = cardsInColumn.length > 0 ? cardsInColumn[0].row : -1;
    
    card.row = row + 1;
    card.column = column;
    card.selected = false;
    card.area = 'table';

    setDeck(newDeck);
  }

  function illegalMove() {
    alert('That move is not allowed.');

    // Deselect card
    const newDeck = JSON.parse(JSON.stringify(deck));
    const card = newDeck.find(c => c.selected);
    if (card) {
      card.selected = false;
      setDeck(newDeck);
    }
  }

  function moveSelectedCardToStack(column) {
    const newDeck = JSON.parse(JSON.stringify(deck));
    // Find a selected card
    const card = newDeck.find(c => c.selected);
    // Only has an action if a card is selected
    if (!card) return;

    // Find the top card in that column
    const cardsInColumn = newDeck.filter(c => c.area === 'stacks').filter(c => c.column === column).sort((a, b) => b.int - a.int);
    // Check if illegal moves
    // Empty stack - Can only put an ace down
    if (cardsInColumn.length === 0 && card.value !== 'A') {
      return illegalMove();
    }

    // Has cards in stack with wrong suit.
    if (cardsInColumn[0] && cardsInColumn[0].suit !== card.suit) {
      return illegalMove();
    }
    // Has cards in stack. Same suit. Must be one value lower.
    if (cardsInColumn[0] && cardsInColumn[0].int !== card.int -1) {
      return illegalMove();
    }
    
    card.row = 0;
    card.column = column;
    card.selected = false;
    card.area = 'stacks';

    setDeck(newDeck);
  }

  function columnClicked(column) {
    moveSelectedCardToColumn(column);
  }

  function holdSpaceClicked(column) {
    
  }

  function stackSpaceClicked(column) {
    moveSelectedCardToStack(column);
  }

  function holdSpaceHover() {
    setOverseerDirection('left');
  }

  function stackSpaceHover() {
    setOverseerDirection('right');
  }


  return (
    <div ref={appDiv} className={styles.App} style={{ transform: `scale(${scale})` }} >
      <Menu />
      <div className={styles.TopRow}>
        <div className={styles.TopRowLeft} onMouseEnter={() => holdSpaceHover()}>
          <CardSpace onClick={() => holdSpaceClicked(0)} />
          <CardSpace onClick={() => holdSpaceClicked(1)} />
          <CardSpace onClick={() => holdSpaceClicked(2)} />
          <CardSpace onClick={() => holdSpaceClicked(3)} />
        </div>
        <Overseer direction={overseerDirection} />
        <div className={styles.TopRowRight} onMouseEnter={() => stackSpaceHover()} >
          <CardSpace onClick={() => stackSpaceClicked(0)} />
          <CardSpace onClick={() => stackSpaceClicked(1)} />
          <CardSpace onClick={() => stackSpaceClicked(2)} />
          <CardSpace onClick={() => stackSpaceClicked(3)} />
        </div>
      </div>
      <div className={styles.Table}>
        {Array.apply(null, Array(8)).map((item, index) => {
          return <div 
            key={index}
            className={styles.Column} 
            onClick={() => columnClicked(index)}
          ></div>
        })}
      </div>
      {deck.map((card) => {
        return <Card 
          key={card.key}
          suit={card.suit} 
          value={card.value} 
          column={card.column}
          row={card.row}
          area={card.area}
          selected={card.selected}
          onClick={() => cardClicked(card)}
          onDoubleClick={() => cardDoubleClicked(card)}
        />
      })}

    </div>
  );
}

export default App;

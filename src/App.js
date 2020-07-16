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

  function clicked() {
    const newDeck = JSON.parse(JSON.stringify(deck));
    newDeck[0].area = 'stacks';
    newDeck[0].column = 0;
    newDeck[0].row = 0;
    newDeck[12].area = 'stacks';
    newDeck[12].column = 1;
    newDeck[12].row = 0;
    setDeck(newDeck);
    setOverseerDirection('right');
  }

  function cardClicked(clickedCard) {
    console.log('card', clickedCard);
    const newDeck = JSON.parse(JSON.stringify(deck));
    const newCard = newDeck.find(card => card.key === clickedCard.key);
    newCard.selected = !newCard.selected;
    setDeck(newDeck);
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


  return (
    <div ref={appDiv} className={styles.App} style={{ transform: `scale(${scale})` }}>
      <Menu />
      <div className={styles.TopRow}>
        <div className={styles.TopRowLeft}>
          <CardSpace />
          <CardSpace />
          <CardSpace />
          <CardSpace />
        </div>
        <Overseer direction={overseerDirection} />
        <div className={styles.TopRowRight}>
          <CardSpace />
          <CardSpace />
          <CardSpace />
          <CardSpace onClick={() => clicked()}/>
        </div>
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

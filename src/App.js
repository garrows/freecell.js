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
  let area = 'hold';
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
      if (column === 4 && area === 'hold') {
        column = 0;
        area = 'stacks';
      } else if (column === 4 && area === 'stacks') {
        column = 0;
        area = 'table';
      } else if (column >= 8) {
        column = 0;
        row++;
      }
      deck.push({
        suit,
        value,
        int,
        column,
        row,
        area
      });
      column++;
    }
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


  return (
    <div ref={appDiv} className={styles.App} style={{ transform: `scale(${scale})` }} onClick={() => clicked()}>
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
          <CardSpace />
        </div>
      </div>
      {deck.map((card) => {
        return <Card 
          suit={card.suit} 
          value={card.value} 
          column={card.column}
          row={card.row}
          area={card.area}
          key={card.suit + card.value}
        />
      })}

    </div>
  );
}

export default App;

import React, { useState } from 'react';
import styles from './App.module.css';
import Card from './components/Card';
import CardSpace from './components/CardSpace';
import Overseer from './components/Overseer';

// import { loader } from 'graphql.macro';
// const query = loader('./foo.graphql');
// console.log('query', query);

function App() {
  const appDiv = React.useRef(null);
  const [scale, setScale] = useState(0.5);

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


  return (
    <div ref={appDiv} className={styles.App} style={{ transform: `scale(${scale})` }}>
      <div className={styles.TopRow}>
        <div className={styles.TopRowLeft}>
          <CardSpace />
          <CardSpace />
          <CardSpace />
          <CardSpace />
        </div>
        <Overseer direction="left" />
        <div className={styles.TopRowRight}>
          <CardSpace />
          <CardSpace />
          <CardSpace />
          <CardSpace />
        </div>
      </div>
      <div className={styles.Row}>
        <Card suit="S" number="A" />
        <Card suit="S" number="2" />
        <Card suit="S" number="3" />
        <Card suit="S" number="4" />
        <Card suit="S" number="5" />
        <Card suit="S" number="6" />
        <Card suit="S" number="7" />
        <Card suit="S" number="8" />
      </div>
      <div className={styles.Row}>
        <Card suit="S" number="9" />
        <Card suit="S" number="10" />
        <Card suit="S" number="J" />
        <Card suit="S" number="Q" />
        <Card suit="S" number="K" />
        <Card suit="S" number="2" />
        <Card suit="S" number="3" />
        <Card suit="S" number="4" />
      </div>
      <div className={styles.Row}>
        <Card suit="S" number="5" />
        <Card suit="S" number="6" />
        <Card suit="S" number="A" />
        <Card suit="S" number="A" />
        <Card suit="S" number="A" />
        <Card suit="S" number="A" />
        <Card suit="S" number="A" />
        <Card suit="D" number="A" />
      </div>
      <div className={styles.Row}>
        <Card suit="D" number="A" />
        <Card suit="D" number="A" />
        <Card suit="D" number="A" />
        <Card suit="D" number="A" />
        <Card suit="D" number="A" />
        <Card suit="D" number="A" />
        <Card suit="D" number="A" />
        <Card suit="D" number="A" />
      </div>
      <div className={styles.Row}>
        <Card suit="D" number="A" />
        <Card suit="D" number="A" />
        <Card suit="D" number="A" />
        <Card suit="C" number="A" />
        <Card suit="C" number="A" />
        <Card suit="C" number="A" />
        <Card suit="C" number="A" />
        <Card suit="C" number="A" />
      </div>
      <div className={styles.Row}>
        <Card suit="C" number="A" />
        <Card suit="C" number="A" />
        <Card suit="C" number="A" />
        <Card suit="C" number="A" />
        <Card suit="C" number="A" />
        <Card suit="C" number="A" />
        <Card suit="H" number="A" />
        <Card suit="H" number="A" />
      </div>
      <div className={styles.Row}>
        <Card suit="H" number="A" />
        <Card suit="D" number="A" />
        <Card suit="S" number="A" />
        <Card suit="C" number="A" />
      </div>

    </div>
  );
}

export default App;

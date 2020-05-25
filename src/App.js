import React from 'react';
import styles from './App.module.css';
import Card from './components/Card';
import { loader } from 'graphql.macro';

const query = loader('./foo.graphql');
console.log('query', query);

function App() {
  return (
    <div className={styles.App}>
      <div className={styles.Row}>
        <Card suit="spade" number="1" />
        <Card suit="spade" number="2" />
        <Card suit="spade" number="3" />
        <Card suit="spade" number="4" />
        <Card suit="spade" number="5" />
        <Card suit="spade" number="6" />
        <Card suit="spade" number="7" />
        <Card suit="spade" number="8" />
      </div>
      <div className={styles.Row}>
        <Card suit="spade" number="9" />
        <Card suit="spade" number="10" />
        <Card suit="spade" number="J" />
        <Card suit="spade" number="Q" />
        <Card suit="spade" number="K" />
        <Card suit="spade" number="2" />
        <Card suit="spade" number="3" />
        <Card suit="spade" number="4" />
      </div>
      <div className={styles.Row}>
        <Card suit="spade" number="5" />
        <Card suit="spade" number="6" />
        <Card suit="spade" number="1" />
        <Card suit="spade" number="1" />
        <Card suit="spade" number="1" />
        <Card suit="spade" number="1" />
        <Card suit="spade" number="1" />
        <Card suit="diamond" number="1" />
      </div>
      <div className={styles.Row}>
        <Card suit="diamond" number="1" />
        <Card suit="diamond" number="1" />
        <Card suit="diamond" number="1" />
        <Card suit="diamond" number="1" />
        <Card suit="diamond" number="1" />
        <Card suit="diamond" number="1" />
        <Card suit="diamond" number="1" />
        <Card suit="diamond" number="1" />
      </div>
      <div className={styles.Row}>
        <Card suit="diamond" number="1" />
        <Card suit="diamond" number="1" />
        <Card suit="diamond" number="1" />
        <Card suit="club" number="1" />
        <Card suit="club" number="1" />
        <Card suit="club" number="1" />
        <Card suit="club" number="1" />
        <Card suit="club" number="1" />
      </div>
      <div className={styles.Row}>
        <Card suit="club" number="1" />
        <Card suit="club" number="1" />
        <Card suit="club" number="1" />
        <Card suit="club" number="1" />
        <Card suit="club" number="1" />
        <Card suit="club" number="1" />
        <Card suit="heart" number="1" />
        <Card suit="heart" number="1" />
      </div>
      <div className={styles.Row}>
        <Card suit="heart" number="1" />
        <Card suit="diamond" number="1" />
        <Card suit="spade" number="1" />
        <Card suit="club" number="1" />
      </div>
      
    </div>
  );
}

export default App;

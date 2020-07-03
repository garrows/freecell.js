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

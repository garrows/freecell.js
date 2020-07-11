import React, { Component } from 'react';
import styles from './CardSpace.module.css';
// import deck from './deck.svg';

class CardSpace extends Component {
  render() {
    const { suit, number } = this.props;
    return <div style={{backgroundImage:`url(/deck/${number}${suit}.gif)`}} className={`${styles.cardSpace}`}></div>;
  }
}
export default CardSpace;
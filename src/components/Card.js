import React, { Component } from 'react';
import styles from './Card.module.css';
// import deck from './deck.svg';

class Card extends Component {
  render() {
    const { suit, number } = this.props;
    return <div style={{backgroundImage:`url(/deck/${number}${suit}.gif)`}} className={`${styles.card}`}></div>;
  }
}
export default Card;
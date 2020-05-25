import React, { Component } from 'react';
import styles from './Card.module.css';
// import deck from './deck.svg';

class Card extends Component {
  render() {
    const { suit, number } = this.props;
    return <div className={`${styles.card} ${styles[suit]} ${styles['c' + number]}`}></div>;
  }
}
export default Card;
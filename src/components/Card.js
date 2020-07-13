import React, { Component } from 'react';
import styles from './Card.module.css';
// import deck from './deck.svg';

class Card extends Component {
  render() {
    const { suit, value, column, row, area } = this.props;
    return <div 
      style={{backgroundImage:`url(/deck/${value}${suit}.gif)`}} 
      className={`${styles.card}`} 
      data-column={column}
      data-row={row}
      data-area={area}
      data-value={value}
    ></div>;
  }
}
export default Card;
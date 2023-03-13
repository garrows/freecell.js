import React from 'react';
import styles from './CardSpace.module.css';
// import deck from './deck.svg';

function CardSpace(props) {
  const { suit, number, onClick } = props;
  return <div 
    style={{backgroundImage:`url(./deck/${number}${suit}.gif)`}} 
    className={`${styles.CardSpace}`}
    onClick={onClick}
  ></div>;
}
export default CardSpace;
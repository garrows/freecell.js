import React from 'react';
import styles from './Card.module.css';
// import deck from './deck.svg';

function Card(props) {
  const { 
    suit, 
    value, 
    column, 
    row, 
    area, 
    selected, 
    onClick, 
    onDoubleClick,
    onMouseEnter,
  } = props;

  return (
    <div 
      style={{backgroundImage:`url(/deck/${value}${suit}.gif)`}} 
      className={`${styles.Card}`} 
      data-column={column}
      data-row={row}
      data-area={area}
      data-value={value}
      data-selected={selected}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onMouseEnter={onMouseEnter}
    ></div>
  );
}
export default Card;
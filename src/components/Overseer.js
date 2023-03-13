import React, { Component } from 'react';
import styles from './Overseer.module.css';
// import deck from './deck.svg';

class Overseer extends Component {
  render() {
    const { direction, gameOver } = this.props;

    return <div className={`${styles.overseer}`}>
      {!gameOver ? 
        <img src={`./deck/overseer-${direction}.gif`} alt="overseeing king" />
      : null }
    </div>;
  }
}
export default Overseer;
import React, { Component } from 'react';
import styles from './Overseer.module.css';
// import deck from './deck.svg';

class Overseer extends Component {
  render() {
    const { direction } = this.props;
    return <div className={`${styles.overseer}`}></div>;
  }
}
export default Overseer;
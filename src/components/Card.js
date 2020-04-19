import React, { Component } from 'react';
import deck from './deck.svg'; 

class Card extends Component {
  render() {
    return <div class="card"><img src={deck} alt="Card" /></div>;
  }
}
export default Card;
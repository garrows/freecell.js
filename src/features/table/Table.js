import React from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { illegalMove } from '../menu/menuSlice'
import {
  deal,
  cardClicked,
  selectDeck,
  selectIllegalMoveShowing,
  selectOverseerDirection,
  selectSeed,
  holdSpaceClicked,
  stackSpaceClicked,
  holdSpaceHover,
  stackSpaceHover,
  cardHover,
  columnClicked,
  cardDoubleClicked,
  closeIllegalMoveDialog,
} from './tableSlice';
import Card from '../../components/Card';
import CardSpace from './../../components/CardSpace';
import Overseer from './../../components/Overseer';
import styles from './Table.module.css';
import { Menu } from '../menu/Menu.js';

const mapStateToProps = (state, ownProps) => ({
  onIllegalMove: ownProps.onIllegalMove,
});

const mapDispatchToProps = { illegalMove }

const Table = ({ illegalMove }) => {
  const deck = useSelector(selectDeck);
  const illegalMoveShowing = useSelector(selectIllegalMoveShowing);
  const overseerDirection = useSelector(selectOverseerDirection);
  const seed = useSelector(selectSeed);
  const dispatch = useDispatch();

  function undo() {
    alert('undo');
  }

  document.title = `FreeCell Game #${seed}`;

  return (
    <div>
      <Menu 
        deck={deck}
        seed={seed}
        newGame={(seed) => dispatch(deal(seed))}
        undo={() => undo()}
        illegalMoveShowing={illegalMoveShowing}
        onIllegalMoveClosed={() => dispatch(closeIllegalMoveDialog())}
      />
      <div className={styles.TopRow}>
        <div className={styles.TopRowLeft} onMouseEnter={() => dispatch(holdSpaceHover())}>
          <CardSpace onClick={() => dispatch(holdSpaceClicked(0))} />
          <CardSpace onClick={() => dispatch(holdSpaceClicked(1))} />
          <CardSpace onClick={() => dispatch(holdSpaceClicked(2))} />
          <CardSpace onClick={() => dispatch(holdSpaceClicked(3))} />
        </div>
        <Overseer direction={overseerDirection} />
        <div className={styles.TopRowRight} onMouseEnter={() => dispatch(stackSpaceHover())} >
          <CardSpace onClick={() => dispatch(stackSpaceClicked(0))} />
          <CardSpace onClick={() => dispatch(stackSpaceClicked(1))} />
          <CardSpace onClick={() => dispatch(stackSpaceClicked(2))} />
          <CardSpace onClick={() => dispatch(stackSpaceClicked(3))} />
        </div>
      </div>
      <div className={styles.Table}>
        {Array.apply(null, Array(8)).map((item, index) => {
          return <div 
            key={index}
            className={styles.Column} 
            onClick={() => dispatch(columnClicked(index))}
          ></div>
        })}
      </div>
      {deck.map((card) => {
        return <Card 
          key={card.key}
          suit={card.suit} 
          value={card.value} 
          column={card.column}
          row={card.row}
          area={card.area}
          selected={card.selected}
          onClick={() => dispatch(cardClicked(card))}
          onDoubleClick={() => dispatch(cardDoubleClicked(card))}
          onMouseEnter={() => dispatch(cardHover(card))}
        />
      })}
    </div>
  );
};

export default connect(
  mapStateToProps,
  // null,
  mapDispatchToProps
)(Table)
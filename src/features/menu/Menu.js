import React, { useState } from 'react';
import styles from './Menu.module.css';
import "xp.css/dist/XP.css";

export function Menu(props) {
  const { 
    deck, 
    newGame,
    undo,
    illegalMoveShowing,
    onIllegalMoveClosed,
    gameOverShowing,
    onGameOverClosed,
    seed,
  } = props;
  const [ opened, setOpened ] = useState(false);
  const [ menu, setMenu ] = useState('game');
  const [ aboutDialogShowing, setAboutDialogShowing ] = useState(false);
  const [ newGamePromptShowing, setNewGamePromptShowing ] = useState(false);
  const [ restartGamePromptShowing, setRestartGamePromptShowing ] = useState(false);
  const [ selectGameShowing, setSelectGameShowing ] = useState(false);
  const [ selectGameCheckbox, setSelectGameCheckboxShowing ] = useState(true);
  const [ seedInput, setSeedInput ] = useState(seed);
  const cardsLeft = deck.filter(c => c.area !== 'stacks').length;

  function menuClicked(menu) {
    setMenu(menu);
    setOpened(!opened);
  }

  function clickedItem(callback) {
    setOpened(false);
    callback();
  }

  return (
    <div className={styles.Menu}>
      <div 
        className={`${styles.MenuItem} ${styles.MenuItemLeft}`} 
        onClick={() => menuClicked('game')}
        onMouseEnter={() => setMenu('game')}
      >
        Game
      </div>
      <div 
        className={`${styles.MenuItem} ${styles.MenuItemLeft}`} 
        onClick={() => menuClicked('help')}
        onMouseEnter={() => setMenu('help')}
      >
        Help
      </div>
      <div className={`${styles.MenuItem} ${styles.MenuItemRight}`}>Cards left: { cardsLeft }</div>
      { opened && menu === 'game' ? 
        <div className={styles.MenuList}>
          <div onClick={() => clickedItem(() => setNewGamePromptShowing(true))}>New Game</div>
          <div onClick={() => clickedItem(() => setSelectGameShowing(true))}>Select Game</div>
          <div onClick={() => clickedItem(() => setRestartGamePromptShowing(true))}>Restart Game</div>
          <div onClick={() => clickedItem(undo)} disabled={true}>Undo</div>
        </div>
      : null }
      { opened && menu === 'help' ? 
        <div className={styles.MenuList} style={{ left: '35px' }}>
          <div onClick={() => clickedItem(() => setAboutDialogShowing(true))}>
            About...
          </div>
        </div>
      : null }

      { newGamePromptShowing || restartGamePromptShowing ? 
        <div className={styles.Dialog}>
          <div style={{ width: '235px' }} className="window">
            <div className="title-bar">
              <div className="title-bar-text">FreeCell</div>
              <div className="title-bar-controls">
                <button aria-label="Close" />
              </div>
            </div>

            <div className="window-body">
              <img src={`/info.png`} alt="info bubble" style={{ verticalAlign:'middle' }}/>
              <span style={{ textAlign: "center" }}>Do you want to resign this game?</span>
              <div className="field-row" style={{ justifyContent: "center" }}>
                <button onClick={() => {
                  if (restartGamePromptShowing) {
                    newGame(seed);
                    setRestartGamePromptShowing(false);
                  } else {
                    newGame();
                    setNewGamePromptShowing(false);
                  }                  
                }}>Yes</button>
                <button onClick={() => setNewGamePromptShowing(false)}>No</button>
              </div>
            </div>
          </div>
        </div>
      : null }

      { gameOverShowing ? 
        <div className={styles.Dialog}>
          <div style={{ width: '210px' }} className="window">
            <div className="title-bar" style={{height: '21px' }}>
              <div className="title-bar-text">Game Over</div>
            </div>

            <div className="window-body">
              <p style={{ textAlign: "center" }}>Congratulations, you win!</p>
              <p style={{ textAlign: "center" }}>Do you want to play again?</p>
              <div 
                className="field-row" 
                style={{ 
                  paddingLeft: '19px',
                  paddingTop: '15px',
                  paddingBottom: '7px',
                }}
              >
                <input 
                  defaultChecked 
                  type="checkbox" 
                  id="selectGame" 
                  checked={selectGameCheckbox} 
                  onChange={(e) => setSelectGameCheckboxShowing(e.target.checked)} />
                <label htmlFor="selectGame">Select game</label>
              </div>
              <div className="field-row" style={{ justifyContent: 'center', marginBottom: '20px' }}>
                <button onClick={() => {
                  if (selectGameCheckbox) {
                    setSelectGameShowing(true);
                    onGameOverClosed();
                  } else {
                    newGame();
                    onGameOverClosed();
                  }                  
                }}>Yes</button>
                <button onClick={() => onGameOverClosed()}>No</button>
              </div>
            </div>
          </div>
        </div>
      : null }

      { selectGameShowing ? 
        <div className={styles.Dialog}>
          <div style={{ width: '185px' }} className="window">
            <div className="title-bar">
              <div className="title-bar-text">Game Number</div>
              <div className="title-bar-controls">
                <button aria-label="Close" />
              </div>
            </div>

            <div className="window-body" style={{ textAlign: "center" }}>
              <p>Select a game number<br />from 1 to 1000000</p>
              <p>
                <input 
                  type="text" 
                  value={seedInput} 
                  onChange={(e) => {
                    e.target.value = Math.min(1000000, parseInt(e.target.value)) || 0;
                    setSeedInput(e.target.value);
                  }} 
                  style={{ paddingLeft:'5px' }}
                />
              </p>
              <div className="field-row" style={{ justifyContent: "center" }}>
                <button onClick={() => {
                  newGame(seedInput);
                  setSelectGameShowing(false);
                }}>OK</button>
              </div>
            </div>
          </div>
        </div>
      : null }

      { illegalMoveShowing ? 
        <div className={styles.Dialog}>
          <div style={{ width: '198px' }} className="window">
            <div className="title-bar">
              <div className="title-bar-text">FreeCell</div>
              <div className="title-bar-controls">
                <button aria-label="Close" />
              </div>
            </div>

            <div className="window-body">
              <img src={`/info.png`} alt="info bubble" style={{ verticalAlign:'middle' }}/>
              <span style={{ textAlign: "center" }}>That move is not allowed.</span>
              <div className="field-row" style={{ justifyContent: "center" }}>
                <button onClick={() => onIllegalMoveClosed()}>OK</button>
              </div>
            </div>
          </div>
        </div>
      : null }
      
      { aboutDialogShowing ? 
        <div className={styles.Dialog}>
          <div style={{ width: '400px' }} className="window">
            <div className="title-bar">
              <div className="title-bar-text">FreeCell</div>
              <div className="title-bar-controls">
                <button aria-label="Close" />
              </div>
            </div>

            <div className="window-body">
              {<img src={`/info.png`} alt="info bubble" style={{ verticalAlign:'middle' }}/>}
              <span style={{ textAlign: "center" }}>FreeCell</span>
              <p>By <a href="https://garrows.com">Glen Arrowsmith</a></p>
              <p>I made this for my father and father-in-law because there were no decent ad-free or paid versions of FreeCell that run on Windows 10. Hopefully this helps get your dad off of Windows XP too.</p>
              <p>If you'd like to see more classic remakes, show your interest by <a href="https://patreon.com/garrows">supporting my Patreon</a>. All proceeds go to charity.</p>
              <div className="field-row" style={{ justifyContent: "center" }}>
                <button onClick={() => setAboutDialogShowing(false)}>OK</button>
              </div>
            </div>
          </div>
        </div>
      : null }
    </div>
  );
}

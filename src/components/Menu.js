import React from 'react';
import styles from './Menu.module.css';

function Menu() {
  return (
    <div className={styles.Menu}>
      <div className={`${styles.MenuItem} ${styles.MenuItemLeft}`}>Game</div>
      <div className={`${styles.MenuItem} ${styles.MenuItemLeft}`}>Help</div>
      <div className={`${styles.MenuItem} ${styles.MenuItemRight}`}>Cards left: 0</div>
    </div>
  );
}

export default Menu;

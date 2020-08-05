import React, { useState } from 'react';
import styles from './App.module.css';

import Table from '../features/table/Table.js';

function App() {
  const appDiv = React.useRef(null);
  const [scale, setScale] = useState(0.5);

  function handleResize() {
    const newScale = Math.min( 
      window.innerWidth / appDiv.current.clientWidth, 
      window.innerHeight / appDiv.current.clientHeight
    );
    setScale(newScale);
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return _ => {
      window.removeEventListener('resize', handleResize);
    }
  });


  return (
    <div ref={appDiv} className={styles.App} style={{ transform: `scale(${scale})` }} >
      
      <Table />
    </div>
  );
}

export default App;

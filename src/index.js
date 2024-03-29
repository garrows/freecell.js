import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers'

window.debugStack = function(stack) {
  stack.forEach(card => console.log(card.suit, card.value, card.color, card.int));
}

const store = configureStore({
  reducer: rootReducer
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

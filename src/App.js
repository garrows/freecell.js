import React from 'react';
import './App.css';
import Card from './components/Card';
import { loader } from 'graphql.macro';

const query = loader('./foo.graphql');
console.log('query', query);

function App() {
  return (
    <div className="App">
      <Card suit="heart" number="1" />
      <Card suit="heart" number="1" />
      <Card suit="heart" number="1" />
      <Card suit="heart" number="1" />
      <Card suit="heart" number="1" />
      <Card suit="heart" number="1" />
      <Card suit="heart" number="1" />
      <Card suit="heart" number="1" />
    </div>
  );
}

export default App;

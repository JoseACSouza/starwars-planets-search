import React, { useState } from 'react';
import Table from './components/Table';
import Header from './components/Header';
import FilterContext from './context/FilterContext';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const onChange = (eventTarget) => {
    setText(eventTarget.value);
    console.log(eventTarget.value);
  };
  return (
    <FilterContext.Provider value={ { name: text, onChange } }>
      <Header />
      <Table />
    </FilterContext.Provider>
  );
}

export default App;

import React, { useState } from 'react';
import Table from './components/Table';
import Header from './components/Header';
import FilterContext from './context/FilterContext';
import './App.css';

function App() {
  const [filter, setFilter] = useState({});
  const [filterName, setFilterName] = useState('');

  const onChange = (eventTarget) => {
    const { value } = eventTarget;
    setFilterName(value);
  };

  const onClick = (filters, eventTarget) => {
    if (eventTarget.name === 'filter') {
      setFilter({ ...filter, ...filters });
    }
  };
  return (
    <FilterContext.Provider value={ { filter, onChange, onClick, filterName } }>
      <Header />
      <Table />
    </FilterContext.Provider>
  );
}

export default App;

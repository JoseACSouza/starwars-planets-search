import React, { useState } from 'react';
import Table from './components/Table';
import Header from './components/Header';
import FilterContext from './context/FilterContext';
import './App.css';

function App() {
  const [filter, setFilter] = useState({
    nameFilter: '',
  });
  const onChange = (eventTarget) => {
    const { value } = eventTarget;
    setFilter({ ...filter, nameFilter: value });
  };

  const onClick = (filters, eventTarget) => {
    if (eventTarget.name === 'filter') {
      setFilter({ ...filter, ...filters });
      console.log(filters);
    }
  };
  return (
    <FilterContext.Provider value={ { filter, onChange, onClick } }>
      <Header />
      <Table />
    </FilterContext.Provider>
  );
}

export default App;

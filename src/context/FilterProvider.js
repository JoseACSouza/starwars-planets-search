import React, { useState } from 'react';
import Table from '../components/Table';
import Header from '../components/Header';
import FilterContext from './FilterContext';

function FilterProvider() {
  const [filter, setFilter] = useState({});
  const [filterList, setFilterList] = useState([]);
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
  const value = { filter, onChange, onClick, filterName, filterList, setFilterList };
  return (
    <FilterContext.Provider value={ value }>
      <Header />
      <Table />
    </FilterContext.Provider>
  );
}

export default FilterProvider;

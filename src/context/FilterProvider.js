import React, { useState } from 'react';
import Table from '../components/Table';
import Header from '../components/Header';
import FilterContext from './FilterContext';

function FilterProvider() {
  const [filterList, setFilterList] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [apiData, setApiData] = useState([]);
  const [infoFiltered, setInfoFiltered] = useState([]);

  const onChange = (eventTarget) => {
    const { value } = eventTarget;
    setFilterName(value);
  };

  const onClick = (filters, eventTarget) => {
    if (eventTarget.name === 'filter') {
      setFilterList((previous) => [...previous, { ...filters }]);
    } else if (eventTarget.name === 'clearFilters') {
      setFilterList([]);
      setInfoFiltered(apiData);
    }
  };
  const value = {
    onChange,
    onClick,
    filterName,
    filterList,
    setFilterList,
    apiData,
    setApiData,
    infoFiltered,
    setInfoFiltered };
  return (
    <FilterContext.Provider value={ value }>
      <Header />
      <Table />
    </FilterContext.Provider>
  );
}

export default FilterProvider;

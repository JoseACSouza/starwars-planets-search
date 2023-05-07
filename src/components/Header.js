import React, { useContext, useEffect, useState } from 'react';
import FilterContext from '../context/FilterContext';

function Header() {
  const { onChange, onClick, nameFilter, filterList,
  } = useContext(FilterContext);
  const [columnFilterList, setColumnFilterList] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);
  const [numberFilter, setNumberFilter] = useState({
    numberFilter: '0',
    comparisonFilter: 'maior que',
    columnFilter: 'population',
  });

  const onTemporaryChange = (eventTarget) => {
    const { name, value } = eventTarget;
    setNumberFilter({ ...numberFilter, [name]: value });
  };

  useEffect(
    () => {
      const getFilterActives = filterList.map((e) => e.columnFilter);
      setColumnFilterList((previousList) => previousList
        .filter((columnName) => (
          !getFilterActives.includes(columnName))));
      setNumberFilter((a) => ({ ...a, columnFilter: 'population' }));
    },
    [filterList],
  );

  return (
    <div>
      <input
        type="text"
        name="nameFilter"
        placeholder="Nome do Planeta"
        data-testid="name-filter"
        value={ nameFilter }
        onChange={ (event) => onChange(event.target) }
      />
      <select
        data-testid="column-filter"
        onChange={ (event) => onTemporaryChange(event.target) }
        name="columnFilter"
      >
        { columnFilterList
          .map((option, index) => (
            <option key={ option + index } value={ option }>
              { option }
            </option>
          )) }
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ (event) => onTemporaryChange(event.target) }
        name="comparisonFilter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        name="numberFilter"
        data-testid="value-filter"
        value={ numberFilter.numberFilter }
        onChange={ (event) => onTemporaryChange(event.target) }
      />
      <button
        type="button"
        name="filter"
        data-testid="button-filter"
        onClick={ (event) => onClick(numberFilter, event.target) }
      >
        Filtro
      </button>

      <button
        type="button"
        name="clearFilters"
        data-testid="button-remove-filters"
        onClick={ (event) => onClick(numberFilter, event.target) }
      >
        Limpar Filtros
      </button>
    </div>
  );
}

export default Header;

import React, { useContext, useState } from 'react';
import FilterContext from '../context/FilterContext';

function Header() {
  const { onChange, onClick, nameFilter } = useContext(FilterContext);
  const [numberFilter, setNumberFilter] = useState({
    numberFilter: '0',
    comparisonFilter: 'maior que',
    columnFilter: 'population',
  });

  const onTemporaryChange = (eventTarget) => {
    const { name, value } = eventTarget;
    setNumberFilter({ ...numberFilter, [name]: value });
  };

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
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
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
    </div>
  );
}

export default Header;

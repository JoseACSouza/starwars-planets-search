import React, { useContext } from 'react';
import FilterContext from '../context/FilterContext';

function Header() {
  const { name, onChange } = useContext(FilterContext);
  return (
    <input
      type="text"
      name="nameFilter"
      placeholder="Nome do Planeta"
      data-testid="name-filter"
      value={ name }
      onChange={ (event) => onChange(event.target) }
    />
  );
}

export default Header;

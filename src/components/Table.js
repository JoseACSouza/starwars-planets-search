import React, { useState, useEffect, useContext } from 'react';
import verify from '../Functions/verify';
import FilterContext from '../context/FilterContext';

export default function Table() {
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState([]);
  const [result, setResult] = useState([]);
  const {
    filterName, filterList, setFilterList, setApiData, infoFiltered, setInfoFiltered,
  } = useContext(FilterContext);

  useEffect(
    () => {
      async function fetchData() {
        const data = await fetch('https://swapi.dev/api/planets');
        const results = await data.json();
        results.results.forEach((element) => {
          delete element.residents;
        });
        setIsLoading(false);
        setInfo(results.results);
        setResult(results.results);
        setInfoFiltered(results.results);
        setApiData(results.results);
      }
      fetchData();
    },
    [setApiData, setInfoFiltered],
  );

  const deleteButton = (eventTarget) => {
    setFilterList(filterList
      .filter((targetName) => (targetName.columnFilter !== eventTarget.name)));
    setInfoFiltered(info);
  };

  useEffect(
    () => {
      if (filterList) {
        filterList.forEach((f) => setInfoFiltered((partR) => verify(partR, f)));
      }
    },
    [filterList, setInfoFiltered],
  );

  useEffect(
    () => {
      if (!isLoading) {
        setResult(info
          .filter((element) => infoFiltered.includes(element) && (
            element.name.includes(filterName))));
      }
    },
    [info, filterName, isLoading, filterList, infoFiltered],
  );

  return (
    isLoading ? <p>Carregando...</p> : (
      <div>
        { filterList
          .map((elementFilter) => (
            <div key={ elementFilter.columnFilter } data-testid="filter">
              <p>
                {elementFilter.columnFilter}
              </p>
              <button
                name={ elementFilter.columnFilter }
                type="button"
                onClick={ (event) => deleteButton(event.target) }
              >
                X
              </button>
            </div>
          )) }
        <table>
          <thead>
            <tr>
              {Object.keys(info[0]).map((key) => (
                <th key={ key }>
                  { key }
                </th>))}
            </tr>
          </thead>
          <tbody>
            { result.map((item) => (
              <tr key={ item.name }>
                {Object.keys(item).map((keyValue, index) => (
                  <td key={ index }>
                    { item[keyValue] }
                  </td>
                ))}
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    )
  );
}

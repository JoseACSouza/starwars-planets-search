import React, { useState, useEffect, useContext } from 'react';
import verify from '../Functions/verify';
import FilterContext from '../context/FilterContext';

export default function Table() {
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState([]);
  const [result, setResult] = useState([]);
  const {
    filter, filter: { numberFilter, comparisonFilter, columnFilter },
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
      }
      fetchData();
    },
    [],
  );

  useEffect(
    () => setResult(verify(info, filter)),
    [info, filter, numberFilter, comparisonFilter, columnFilter],
  );

  return (
    isLoading ? <p>Carregando...</p> : (
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
    )
  );
}

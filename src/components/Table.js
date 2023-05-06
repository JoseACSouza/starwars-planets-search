import React, { useState, useEffect, useContext } from 'react';
import verify from '../Functions/verify';
import FilterContext from '../context/FilterContext';

export default function Table() {
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState([]);
  const [result, setResult] = useState([]);
  const [infoFiltered, setInfoFiltered] = useState([]);
  const {
    filter, filterName,
  } = useContext(FilterContext);
  const [filterList, setFilterList] = useState([filter]);

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
      }
      fetchData();
    },
    [],
  );

  useEffect(
    () => setFilterList((n) => [...n, filter]),
    [filter],
  );

  useEffect(
    () => {
      if (filterList) {
        filterList.forEach((f) => setInfoFiltered((partR) => verify(partR, f)));
      }
    },
    [filterList, isLoading],
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

  useEffect(
    () => {
      if (!isLoading) {
        info.filter((element) => element.name.includes(filterName));
      }
    },
    [info, filterName, isLoading],
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

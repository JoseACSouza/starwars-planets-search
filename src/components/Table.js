import React, { useState, useEffect, useContext } from 'react';
import verify from '../Functions/verify';
import FilterContext from '../context/FilterContext';

export default function Table() {
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState([]);
  const [result, setResult] = useState([]);
  const {
    filterName, filterList, setApiData, infoFiltered, setInfoFiltered,
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
      <div className="relative overflow-x-auto shadow-md rounded-md">
        <table
          className="w-full text-sm text-left rtl:text-right text-gray-500"
        >
          <thead
            className="text-xs text-gray-700 uppercase bg-gray-50"
          >
            <tr>
              {Object.keys(info[0]).map((key) => (
                <th key={ key } scope="col" className="px-6 py-3">
                  { key }
                </th>))}
            </tr>
          </thead>
          <tbody>
            { result.map((item) => (
              <tr
                key={ item.name }
                className="odd:bg-white even:bg-gray-50"
              >
                {Object.keys(item).map((keyValue, index) => (
                  <td key={ index } className="px-6 py-4">
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

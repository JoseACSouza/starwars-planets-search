import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState([]);
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
      }
      fetchData();
    },
    [],
  );
  return (
    <div>
      {isLoading ? <p>Carregando...</p> : (
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
            { info.map((item) => (
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
      )}
    </div>
  );
}

export default App;

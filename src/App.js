import React from 'react';
import Table from './components/Table';
import Header from './components/Header';
import FilterProvider from './context/FilterProvider';
import './App.css';

function App() {
  return (
    <FilterProvider>
      <Header />
      <Table />
    </FilterProvider>
  );
}

export default App;

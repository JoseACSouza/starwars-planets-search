import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import bg from '../img/bg.jpg';
import logo from '../img/logo.png';

export default function Home() {
  return (
    <div
      style={ {
        backgroundImage: `url(${bg})`,
        backgroundSize: '100%',
      } }
      className="flex flex-col min-h-screen"
    >
      <img src={ logo } alt="logo" width="280px" className="self-center" />
      <div className="p-4">
        <Header />
        <Table />
      </div>
    </div>
  );
}

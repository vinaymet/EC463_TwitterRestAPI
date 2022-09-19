import './App.css';
import DataFetch from './dataFetch';
import GoogleAuth from './googleAuth';
import InputAccount from './inputAccount';
import React from "react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          EC463 Mini Project - Twitter Account API Project 
        </h1>
        <GoogleAuth/>
        <InputAccount/>
        <DataFetch/>
      </header>
    </div>
  );
}

export default App;

import './App.css';
import DataFetch from './dataFetch';
import GoogleAuth from './googleAuth';
import React from "react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          EC463 Mini Project - Twitter Account APIs
        </h1>
        <GoogleAuth/>
        <DataFetch/>
        <h3>
          Made by Vinay Metlapalli, Beatriz Sicilia, and Alex Zhou
        </h3>
      </header>
    </div>
  );
}

export default App;

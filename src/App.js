import './App.css';
import BotCheck from './botCheck';
import MajorTopics from './majorTopics';
import Sentiment from './sentiment';
import React, {useState} from "react";

function App() {

  const [account, setAccount] = useState("");

  const handleSubmit = (event) => {
      event.preventDefault();
      alert(`The account name you entered was: ${account}`)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          EC463 Mini Project - Twitter Account API Project 
        </h1>
        <form onSubmit={handleSubmit}>
          <label>Enter the Twitter account you want to follow:    
            <div>
              <input 
                type="text" 
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              />
            </div>
          </label>
          <input type="submit" />
        </form>
        <div>
          <BotCheck/>
        </div>
        <div>
          <MajorTopics/>
        </div>
        <div>
          <Sentiment/>
        </div>
      </header>
    </div>
  );
}

export default App;

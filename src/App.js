import React, { Component } from 'react';
import './App.css';
import Pcanvas from "./Pcanvas";

class App extends Component {
  render() {
    return (
      <div className="App test">
        <Pcanvas module="Dominik"/>
        <Pcanvas module="Robo"/>
      </div>
    );
  }
}

export default App;

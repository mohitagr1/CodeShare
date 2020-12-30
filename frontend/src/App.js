import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Editor from './Components/Editor';
import Landing from './Components/Landing';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/:name/:roomId" exact component={Editor} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

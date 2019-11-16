import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MainPage from './pages/MainPage';
import HelpPage from './pages/HelpPage';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/help" exact component={HelpPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

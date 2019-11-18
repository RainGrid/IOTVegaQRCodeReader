import React from 'react';
import { HashRouter as Router, Switch, Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MainPage from './pages/MainPage';
import HelpPage from './pages/HelpPage';
import LoginPage from './pages/LoginPage';


class App extends React.Component {

  isLogined = (Component) => {
    if (this.props && this.props.user && this.props.user.token) {
      return <Component />;
    } else {
      return <Redirect to='/login' />;
    }
  }

  render() {
    return (
      <div className="app" >
        <Router>
          <Switch>
            <Route path="/" exact render={() => this.isLogined(MainPage)} />
            <Route path="/help" render={() => this.isLogined(HelpPage)} />
            <Route path="/login" component={LoginPage} />
          </Switch>
        </Router>
      </div>
    );
  }

}

const mapStateToProps = (store) => {
  return {
    user: store.user
  };
};

export default connect(
  mapStateToProps
)(App);

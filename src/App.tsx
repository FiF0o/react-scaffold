import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.scss';
import logo from './logo.svg';

import {routes} from './routes';


class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Switch>
          {
            routes.map((route, key) =>
              <Route key={key} {...route}/>
            )
          }
        </Switch>
      </div>
    );
  }
}

export default App;

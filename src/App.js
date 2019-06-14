import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivatePages from './components/PrivatePages';
import Products from './components/Products';
import './App.css';
import 'bootswatch/dist/flatly/bootstrap.css';

import Auth from  './components/Auth';

function App() {
  return (
    <div className="App">
        <Switch>
          <Redirect exact path="/" to={{pathname: 'products'}} />
          <Route path="/login" component={Auth}/>
          <PrivatePages path="/products" component={Products}/>
        </Switch>
    </div>
  );
}

export default App;

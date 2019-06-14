import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from '../services/AuthService';

const auth = new AuthService();

const PrivatePages = ({ component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props => auth.isAuthenticated() ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{pathname: '/login'}} />
      )}
    />
  )
}

export default PrivatePages;

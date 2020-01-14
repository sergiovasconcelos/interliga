import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import PrivateRoute from "./guards/PrivateRoute";

export const Routes = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      {/** Página de erro */ }
      <Route component={() => <div style={{margin: "45vh 45vw"}}>Page 404!</div>} /> 
    </Switch>
  )
}
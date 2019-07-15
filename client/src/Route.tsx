import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Signin } from './pages/user/Signin';
import { Signup } from './pages/user/Signup';

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact={true} component={Landing} />
      <Route path='/signin' exact={true} component={Signin} />
      <Route path='/signup' exact={true} component={Signup} />
    </Switch>
  </BrowserRouter>
);
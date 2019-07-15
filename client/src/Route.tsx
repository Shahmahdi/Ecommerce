import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Signin } from './pages/user/Signin';
import { Signup } from './pages/user/Signup';
import Menu from './components/Menu';

export const Routes = () => (
  <BrowserRouter>
    <Menu />
    <Switch>
      <Route path='/' exact={true} component={Landing} />
      <Route path='/signin' exact={true} component={Signin} />
      <Route path='/signup' exact={true} component={Signup} />
    </Switch>
  </BrowserRouter>
);
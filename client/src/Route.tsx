import * as React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Landing } from './pages/LandingPage';
import { Signin } from './pages/user/SigninPage';
import { Signup } from './pages/user/SignupPage';
import { isAuthenticate } from './APIs/auth';
import { Dashboard } from './pages/DashboardPage';

const PrivateRoute = (props: {
  component: any;
  path: string;
  exact: boolean;
}) => {

  const Component: any = props.component;
  return (
    <Route
      path={props.path}
      exact={props.exact}
      render={r =>
        isAuthenticate() ? <Component /> : <Redirect to="/signin" />
      }
    />);
};

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact={true} component={Landing} />
      <Route path='/signin' exact={true} component={Signin} />
      <Route path='/signup' exact={true} component={Signup} />
      <PrivateRoute path='/dashboard' exact={true} component={Dashboard} />
    </Switch>
  </BrowserRouter>
);
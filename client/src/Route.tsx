import * as React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Landing } from './pages/LandingPage';
import { Signin } from './pages/SigninPage';
import { Signup } from './pages/SignupPage';
import { isAuthenticate } from './APIs/authAPIs';
import { UserDashboard } from './pages/UserDashboardPage';
import { AdminDashboard } from './pages/AdminDashboardPage';
import { Category } from './pages/CategoryPage';
import { ProductCreatePage } from './pages/ProductCreatePage';
import { Shop } from './pages/ShopPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';

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

const AdminRoute = (props: {
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
        isAuthenticate() && isAuthenticate().user.role === 1 ? <Component /> : <Redirect to="/signin" />
      }
    />);
};

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact={true} component={Landing} />
      <Route path='/signin' exact={true} component={Signin} />
      <Route path='/signup' exact={true} component={Signup} />
      <Route path='/shop' exact={true} component={Shop} />
      <PrivateRoute path='/cart' exact={true} component={CartPage} />
      <PrivateRoute path='/user/dashboard' exact={true} component={UserDashboard} />
      <AdminRoute path='/admin/dashboard' exact={true} component={AdminDashboard} />
      <AdminRoute path='/create/category' exact={true} component={Category} />
      <AdminRoute path='/create/product' exact={true} component={ProductCreatePage} />
      <Route path='/product/:productId' exact={true} component={ProductDetailsPage} />
    </Switch>
  </BrowserRouter>
);
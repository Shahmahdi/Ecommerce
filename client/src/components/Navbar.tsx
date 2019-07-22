import * as React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { signout, isAuthenticate } from '../APIs/authAPIs';

const isActive = (locationPath: string, path: string) => {
  if (locationPath === path) {
    return { color: '#ff9900' };
  } else {
    return { color: '#ffffff' };
  }
};

const Navbar = (props: RouteComponentProps) => (
  <div>
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link
          className="nav-link"
          style={isActive(props.history.location.pathname, '/')}
          to="/"
        >
          Home
        </Link>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link"
          style={isActive(props.history.location.pathname, '/shop')}
          to="/shop"
        >
          Shop
        </Link>
      </li>

      {isAuthenticate() && isAuthenticate().user.role === 0 &&
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(props.history.location.pathname, '/user/dashboard')}
            to="/user/dashboard"
          >
            Dashboard
          </Link>
        </li>}

      {isAuthenticate() && isAuthenticate().user.role === 1 &&
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(props.history.location.pathname, '/admin/dashboard')}
            to="/admin/dashboard"
          >
            Dashboard
          </Link>
        </li>}

      {!isAuthenticate() && (
        <>
          <li>
            <Link
              className="nav-link"
              style={isActive(props.history.location.pathname as any, "/signup")}
              to="/signup"
            >
              Sign up
            </Link>
          </li>
          <li>
            <Link
              className="nav-link"
              style={isActive(props.history.location.pathname as any, "/signin")}
              to="/signin"
            >
              Sign in
            </Link>
          </li>
        </>
      )}
      {isAuthenticate() && (
        <>
          <li>
            <span
              className="nav-link"
              style={{ cursor: 'pointer', color: '#ffffff' }}
              onClick={() => {
                signout(() => {
                  props.history.push('/');
                });
              }}
            >
              Sign out
        </span>
          </li>
        </>
      )}
    </ul>
  </div>
);

export default withRouter(Navbar);
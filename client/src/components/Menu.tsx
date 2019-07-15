import * as React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

const isActive = (locationPath: string, path: string) => {
  if (locationPath === path) {
    return { color: '#ff9900' };
  } else {
    return { color: '#ffffff' };
  }
};

const Menu = (props: RouteComponentProps) => (
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
    </ul>
  </div>
);

export default withRouter(Menu);
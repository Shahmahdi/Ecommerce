import * as React from 'react';
import Menu from './Menu';

export const Layout = (props: {
  title: string;
  description: string;
  className: string;
  children?: JSX.Element;
}) => (
  <div>
    <Menu />
    <div className="jumbotron">
      <h2>{props.title}</h2>
      <p className="lead">{props.description}</p>
    </div>
    <div className={props.className}>{props.children}</div>
  </div>
);
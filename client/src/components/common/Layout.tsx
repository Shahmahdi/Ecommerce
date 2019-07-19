import * as React from 'react';
import Navbar from '../Navbar';

export const Layout = (props: {
  title: string;
  description: string;
  className: string;
  children?: JSX.Element;
}) => (
  <div>
    <Navbar />
    <div className="jumbotron">
      <h2>{props.title}</h2>
      <p className="lead">{props.description}</p>
    </div>
    <div className={props.className}>{props.children}</div>
  </div>
);
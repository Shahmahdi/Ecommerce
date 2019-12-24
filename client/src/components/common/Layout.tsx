import * as React from 'react';
import Navbar from '../Navbar';

export const Layout = (props: {
  title: string;
  description: string;
  className?: string;
  children?: JSX.Element;
}) => (
  <div>
    <Navbar />
    {/* <div className="jumbotron">
      <h2>{props.title}</h2>
      <p className="lead">{props.description}</p>
    </div> */}
    <div className={props.className}>{props.children}</div>
    <div className="fl w-100 pv4 white" style={{backgroundColor: 'gray'}}>
      <p className="tc">REDSEA.COM</p>
      <p className="mb0 tc">House 1/h, North Adabar</p>
      <p className="mb0 tc">Adabor, Mohammadpur</p>
      <p className="tc">Dhaka-1207, Bangladesh</p>
      <p className="mb0 tc">Contact: +8801730-566200</p>
      <p className="mb0 tc">support@redsea.com</p>
    </div>
    <div className="fl w-100 pv2" style={{backgroundColor: '#d50000'}}>
      <p className="mb0 tc white">2019 reaSea. All Rights Reserved</p>
    </div>
  </div>
);
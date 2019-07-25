import * as React from 'react';
import { Link } from 'react-router-dom';
import { ShowImage } from './ShowImage';

export const Card = (props: {
  product: any
}) => (
    <div className="card">
      <div className="card-header">{props.product.name}</div>
      <div className="card-body">
        <ShowImage item={props.product} url="product" />
        <p>{props.product.description.substring(0, 100)}...</p>
        <p>${props.product.price}</p>
        <Link to="/">
          <button className="btn btn-outline-primary mt-2 mb-2">
            View product
          </button>
        </Link>
        <button className="btn btn-outline-primary mt-2 mb-2">
          View product
          </button>
      </div>
    </div>
  );
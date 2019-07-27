import * as React from 'react';
import { Link } from 'react-router-dom';
import { ShowImage } from './ShowImage';
import { Product } from '../../APIs/ProductAPIs';
import moment from 'moment';

export const Card = (props: {
  product: Product;
  hideProductDetailsButton?: boolean;
}) => (
    <div className="card">
      <div className="card-header name">{props.product.name}</div>
      <div className="card-body">
        <ShowImage item={props.product} url="product" />
        <p className="lead mt-2">{props.product.description.substring(0, 100)}</p>
        <p className="black-10">${props.product.price}</p>
        <p className="black-9">
          {`Category: ${props.product.category && props.product.category.name}`}
        </p>
        <p className="black-8">
          Added on {moment(props.product.createdAt).fromNow()}
        </p>

        {props.product.quantity > 0 ? 
          <p><span className="badge badge-primary badge-pill">In stock</span></p>
          : <p><span className="badge badge-primary badge-pill">Out of stock</span></p>
        }

        {props.hideProductDetailsButton ? undefined :
          <Link to={`/product/${props.product._id}`} className="mr-2">
            <button className="btn btn-outline-primary mt-2 mb-2">
              View product
          </button>
          </Link>
        }
        <button className="btn btn-outline-warning mt-2 mb-2">
          Add to cart
          </button>
      </div>
    </div>
  );
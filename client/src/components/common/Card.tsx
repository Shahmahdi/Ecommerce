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
        <p
          className="lead mt-2"
          style={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
          }}
        >
          {props.product.description.substring(0, 100)}</p>
        <p className="black-7 br-pill pl2">${props.product.price}</p>
        <p className="black-9 br-pill pl2">
          {`Category: ${props.product.category && props.product.category.name}`}
        </p>
        <p className="black-8 br-pill pl2">
          Added on {moment(props.product.createdAt).fromNow()}
        </p>

        {props.product.quantity > 0 ?
          <p><span className="badge badge-pill white" style={{ backgroundColor: '#d50000' }}>In stock</span></p>
          : <p><span className="badge badge-primary badge-pill">Out of stock</span></p>
        }

        {props.hideProductDetailsButton ? undefined :
          <div className="fl w-50 pr1">
            <Link to={`/product/${props.product._id}`} className="mr-2 w-100">
              <button className="btn btn-outline-primary black mt-2 mb-2 w-100">
                View product
          </button>
            </Link>
          </div>
        }
        <div className="fl w-50 pl1">
          <button className="btn btn-outline-warning black mt-2 mb-2 w-100">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
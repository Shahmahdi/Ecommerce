import * as React from 'react';
import { Layout } from '../components/common/Layout';
import { useState, useEffect } from 'react';
import { getSingleProduct, Product, getRelatedProducts } from '../APIs/ProductAPIs';
import { Card } from '../components/common/Card';
import { ShowImage } from '../components/common/ShowImage';
import { API } from '../config';

export const ProductDetailsPage = (url: any) => {

  const [product, setProduct] = useState({} as Product);
  const [relateProducts, setRelateProducts] = useState([]);
  const [error, setError] = useState("");

  const loadSingleProduct = (productId: string) => {
    getSingleProduct(productId).then(res => {
      if (res.error) {
        console.log(res.error);
      } else {
        setProduct(res.data);
        getRelatedProducts(res.data._id).then(data => {
          if (data.error) {
            console.log(data.error);
          } else {
            setRelateProducts(data.data);
          }
        })
      }
    });
  }

  useEffect(() => {
    loadSingleProduct(url.match.params.productId);
  }, [url]);

  return (
    <Layout
      title={product && product.name}
      description={product && product.description && product.description.substring(0, 100)}
      className="container-fluid"
    >
      <div className="pa4">
        <div className="row">
          <div className="col-12">
            {product && product.description &&
              // <Card product={product} hideProductDetailsButton={true} />
              <div className="flex">
                {/* <div className="col-6"> */}
                <div className="center w-60">
                  <div className="fl w-50">
                    <p className="fw5 f3">{product.name}</p>
                    <div className="product-img">
                      <img
                        src={`${API}/product/photo/${product._id}`}
                        alt={`${product.name}`}
                        className="mb-3 h5"
                      />
                    </div>
                  </div>
                  {/* </div> */}
                  <div className="fl w-50">
                    <div className="card bn">
                      <div className="card-header name">{product.name}</div>
                      <div className="card-body">
                        <p
                          className="lead mt-2"
                          style={{
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden'
                          }}
                        >
                          {product.description}</p>
                        <p className="black-7 br-pill pl2">${product.price}</p>
                        <p className="black-9 br-pill pl2">
                          {`Category: ${product.category && product.category.name}`}
                        </p>

                        {product.quantity > 0 ?
                          <p><span className="badge badge-pill white" style={{ backgroundColor: '#d50000' }}>In stock</span></p>
                          : <p><span className="badge badge-primary badge-pill">Out of stock</span></p>
                        }
                        <div className="fl w-50 pl1">
                          <button className="btn btn-outline-warning black mt-2 mb-2 w-100">
                            Add to cart
              </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              //     <div className="card">
              //       <div className="card-header name">{props.product.name}</div>
              //       <div className="card-body">
              //         <ShowImage item={product} url="product" />
              //         <p
              //           className="lead mt-2"
              //           style={{
              //             textOverflow: 'ellipsis',
              //             whiteSpace: 'nowrap',
              //             overflow: 'hidden'
              //           }}
              //         >
              //           {props.product.description.substring(0, 100)}</p>
              //         <p className="black-7 br-pill pl2">${props.product.price}</p>
              //         <p className="black-9 br-pill pl2">
              //           {`Category: ${props.product.category && props.product.category.name}`}
              //         </p>
              //         <p className="black-8 br-pill pl2">
              //           Added on {moment(props.product.createdAt).fromNow()}
              //         </p>

              //         {props.product.quantity > 0 ?
              //           <p><span className="badge badge-pill white" style={{ backgroundColor: '#d50000' }}>In stock</span></p>
              //           : <p><span className="badge badge-primary badge-pill">Out of stock</span></p>
              //         }

              //         {props.hideProductDetailsButton ? undefined :
              //           <div className="fl w-50 pr1">
              //             <Link to={`/product/${props.product._id}`} className="mr-2 w-100">
              //               <button className="btn btn-outline-primary black mt-2 mb-2 w-100">
              //                 View product
              // </button>
              //             </Link>
              //           </div>
              //         }
              //         <div className="fl w-50 pl1">
              //           <button className="btn btn-outline-warning black mt-2 mb-2 w-100">
              //             Add to cart
              // </button>
              //         </div>
              //       </div>
              //     </div>
            }
          </div>
          <div className="col-12">
            {relateProducts.length > 0 ?
              <div className="pv3">
                <h4 className="mv4">You May Like</h4>
                <div className="row">
                  {relateProducts.map(p => (
                    <div className="mb-3 col-3">
                      <Card product={p} />
                    </div>
                  ))}
                </div>
              </div>
              : undefined}
          </div>
        </div>
      </div>
    </Layout>
  );
}
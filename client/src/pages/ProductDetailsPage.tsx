import * as React from 'react';
import { Layout } from '../components/common/Layout';
import { useState, useEffect } from 'react';
import { getSingleProduct, Product, getRelatedProducts } from '../APIs/ProductAPIs';
import { Card } from '../components/common/Card';

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
      <div className="container">
        <div className="row">
          <div className="col-8">
            {product && product.description && <Card product={product} hideProductDetailsButton={true} />}
          </div>
          <div className="col-4">
            <h4>Related Products</h4>
            {relateProducts.map(p => (
              <div className="mb-3">
                <Card product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
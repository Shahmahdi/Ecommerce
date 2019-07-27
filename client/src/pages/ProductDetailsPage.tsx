import * as React from 'react';
import { Layout } from '../components/common/Layout';
import { useState, useEffect } from 'react';
import { getSingleProduct, Product } from '../APIs/ProductAPIs';
import { Card } from '../components/common/Card';

export const ProductDetailsPage = (url: any) => {

  const [product, setProduct] = useState({} as Product);
  const [error, setError] = useState("");

  const loadSingleProduct = (productId: string) => {
    getSingleProduct(productId).then(res => {
      if (res.error) {
        console.log(res.error);
      } else {
        setProduct(res.data);
      }
    });
  }

  useEffect(() => {
    loadSingleProduct(url.match.params.productId);
  }, []);

  return (
    <Layout
      title={product && product.name}
      description={product && product.description && product.description.substring(0, 100)}
      className="container-fluid"
    >
      <div className="container">
        <div className="row">
          {product && product.description && <Card product={product} hideProductDetailsButton={true} />}
        </div>
      </div>
    </Layout>
  );
}
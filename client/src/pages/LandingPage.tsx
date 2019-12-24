import * as React from 'react';
import { Layout } from '../components/common/Layout';
import { useState, useEffect } from 'react';
import { getProducts } from '../APIs/ProductAPIs';
import { Card } from '../components/common/Card';
import { Search } from '../components/Search';

export const Landing = () => {

  const [productBySell, setProductBySell] = useState([]);
  const [productByArrival, setProductByArrival] = useState([]);
  const [error, setError] = useState('');

  const loadProductBySell = () => {
    getProducts('sold').then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductBySell(data.data);
      }
    })
  }

  const loadProductByArrival = () => {
    getProducts('createdAt').then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductByArrival(data.data);
      }
    })
  }

  useEffect(() => {
    loadProductBySell();
    loadProductByArrival();
  }, []);

  return (
    <Layout
      title="Landing"
      description="Ecommerce side using React and node.js"
      className="container-fluid"
    >
      <>
        <Search />
        <h2 className="mb-4">New arrival</h2>
        <div className="row">
          {productByArrival.map((p, i) => (
            <div className="col-3 mb-3">
              <Card key={i} product={p} />
            </div>
          ))}
        </div>

        <h2 className="mb-4">Best Sellers</h2>
        <div className="row">
          {productBySell.map((p, i) => (
            <div className="col-3 mb-3">
              <Card key={i} product={p} />
            </div>
          ))}
        </div>
      </>
    </Layout>
  );
};
import * as React from 'react';
import { Layout } from '../components/common/Layout';
import { useState, useEffect } from 'react';
import { getCategories } from '../APIs/CategoryAPIs';
import { Checkbox } from '../components/common/Checkbox';

export const Shop = () => {

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data.data);
      }
    })
  }

  useEffect(() => {
    init()
  }, []);

  return (
    <Layout
      title="Shopping page"
      description="Node React Ecommerce app"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h4>Filter by categories</h4>
          <ul>
            {categories.map((c: any) => (
              <li className="list-unstyled">
                <Checkbox item={c.name} />
              </li>
            ))}
          </ul>
        </div>
        <div className="col-8">content</div>
      </div>
    </Layout>
  );
};
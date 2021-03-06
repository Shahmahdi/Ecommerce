import * as React from 'react';
import { Layout } from '../components/common/Layout';
import { ProductCreateForm } from '../components/product/CreateForm';

export const ProductCreatePage = () => (
  <Layout
    title="Product page"
    description="Add a new product"
    className="container col-xs-8 offset-md-2"
  >
    <div className="row pv4">
      <div className="col-md-8 offset-md-2">
        <ProductCreateForm />
      </div>
    </div>
  </Layout>
);
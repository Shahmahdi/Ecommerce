import * as React from 'react';
import { Layout } from '../components/common/Layout';
import { CategoryCreateForm } from '../components/category/CreateForm';

export const Category = () => (
  <Layout
    title="Category page"
    description="Add a new category"
    className="container col-xs-8 offset-md-2"
    footerClassName="fixed bottom-0"
  >
    <div className="row pv4">
      <div className="col-md-8 offset-md-2">
        <CategoryCreateForm />
      </div>
    </div>
  </Layout>
);
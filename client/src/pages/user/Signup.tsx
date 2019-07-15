import * as React from 'react';
import { Layout } from '../../components/Layout';
import { API } from '../../config';

export const Signup = () => (
  <Layout
    title="Sign up"
    description="Please sign up to enter Ecommerce site"
    className=""
  >
    <div>
      {API}
    </div>
  </Layout>
);
import * as React from 'react';
import { Layout } from '../components/common/Layout';
import { SigninForm } from '../components/auth/SigninForm';

export const Signin = () => (
  <Layout
    title="Sign in"
    description="Please sign in to enter Ecommerce site"
    className="container col-xs-8 offset-md-2"
  >
    <SigninForm />
  </Layout>
);
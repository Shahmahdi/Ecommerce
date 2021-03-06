import * as React from 'react';
import { Layout } from '../components/common/Layout';
import { SignupForm } from '../components/auth/SignupForm';

export const Signup = () => (
  <Layout
    title="Sign up"
    description="Please sign up to enter Ecommerce site"
    className="container col-xs-8 offset-md-2"
    footerClassName="fixed bottom-0"
  >
    <SignupForm /> 
  </Layout>
);
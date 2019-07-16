import * as React from 'react';
import { Layout } from '../../components/Layout';
import { API } from '../../config';
import { SignupForm } from '../../components/user/SignupForm';

export const Signup = () => (
  <Layout
    title="Sign up"
    description="Please sign up to enter Ecommerce site"
    className="container col-xs-8 offset-md-2"
  >
    <SignupForm /> 
  </Layout>
);
import * as React from 'react';
import { Layout } from '../components/common/Layout';
import { isAuthenticate } from '../APIs/authAPIs';
import { Link } from 'react-router-dom';

export const AdminDashboard = () => {

  const { user: { name, email, role } } = isAuthenticate();

  return (
    <Layout
      title="Dashboard"
      description="Dashboard Page"
      className="container-fluid"
      footerClassName="fixed bottom-0"
    >
      <div className="row pv4">
        <div className="col-3">
          <div className="card">
            <h3 className="card-header">Admin links</h3>
            <ul className="list-group">
              <li className="list-group-item">
                <Link
                  className="nav-link"
                  to="/create/category"
                >
                  Create Category
                </Link>
              </li>
              <li className="list-group-item">
                <Link
                  className="nav-link"
                  to="/create/product"
                >
                  Create Product
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-9">
          <div className="card mb-5">
            <h3 className="card-header">Admin information</h3>
            <ul className="list-group">
              <li className="list-group-item">{name}</li>
              <li className="list-group-item">{email}</li>
              <li className="list-group-item">
                {role === 1 ? 'Admin' : 'Authorized user'}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};
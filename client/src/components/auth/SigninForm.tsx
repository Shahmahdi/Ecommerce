import * as React from 'react';
import { useState } from 'react';
import { ShowError } from '../common/Error';
import { signinFormSubmit, setUserDataIntoLocalStorage, isAuthenticate } from '../../APIs/authAPIs';
import { Loading } from '../common/Loading';
import { Redirect } from 'react-router';

export const SigninForm = () => {

  const [values, setValues] = useState({
    email: 'john@gmail.com',
    password: 'jjjjjj6',
    error: '',
    loading: false,
    redirectToReferrer: false
  });

  const { user } = isAuthenticate();

  const handleChange = (name: string) => (event: any) => {
    setValues({ ...values, error: '', [name]: event.target.value });
  }

  return (
    <div className="pv4">
      <ShowError error={values.error} />
      {values.loading ? <Loading /> : undefined}
      <form>

        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            type="email"
            className="form-control"
            value={values.email}
            onChange={handleChange('email')}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            type="password"
            className="form-control"
            value={values.password}
            onChange={handleChange('password')}
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={e => {
            e.preventDefault();
            const { email, password } = values;
            setValues({...values, loading: true});
            signinFormSubmit({ email, password }).then((data: any) => {
              if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
              } else {
                setUserDataIntoLocalStorage(data.data, () => {
                  setValues({
                    ...values,
                    redirectToReferrer: true
                  });
                });
              }
            });
          }}
        >Submit
        </button>
      </form>
      {values.redirectToReferrer ? 
        user && user.role === 1  ? <Redirect to="/admin/dashboard" /> : <Redirect to="/user/dashboard" /> 
        : undefined}

      {isAuthenticate() ? <Redirect to="/" /> : undefined}
    </div>
  );
};
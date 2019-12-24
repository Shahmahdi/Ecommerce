import * as React from 'react';
import { useState } from 'react';
import { ShowError } from '../common/Error';
import { ShowSuccess } from '../common/Success';
import { signupFormSubmit } from '../../APIs/authAPIs';

export const SignupForm = () => {

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  });

  const handleChange = (name: string) => (event: any) => {
    setValues({ ...values, error: '', [name]: event.target.value });
  }

  return (
    <div className="pv4">
      <ShowError error={values.error} />
      <ShowSuccess success={`${values.success ? 'New account is create. Please Sign in' : '' }`} />
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            className="form-control"
            value={values.name}
            onChange={handleChange('name')}
          />
        </div>

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
            const { name, email, password } = values;
            signupFormSubmit({ name, email, password }).then((data: any) => {
              if (data.error) {
                setValues({ ...values, error: data.error, success: false });
              } else {
                setValues({
                  ...values,
                  name: '',
                  email: '',
                  password: '',
                  error: '',
                  success: true
                })
              }
            });
          }}
        >Submit
        </button>
      </form>
    </div>
  );
};
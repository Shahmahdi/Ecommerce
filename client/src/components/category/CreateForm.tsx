import * as React from 'react';
import { useState, FormEvent } from 'react';
import { isAuthenticate } from '../../APIs/authAPIs';
import { categoryFormSubmit } from '../../APIs/CategoryAPIs';
import { ShowSuccess } from '../common/Success';
import { ShowError } from '../common/Error';
import { Link } from 'react-router-dom';

export const CategoryCreateForm = () => {

  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    categoryFormSubmit(user._id, token, { name }).then(data => {
      if (data.error) {
        setError(data.error);
        setSuccess(false);
      } else {
        setError('');
        setSuccess(true);
      }
    });
  }

  return (
    <>
      {success ? <ShowSuccess success={`${name} is created`} /> : undefined}
      <ShowError error={error ? 'Name already exists' : ''} />
      <form onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            autoFocus={true}
            required={true}
            className="form-control"
            value={name}
            onChange={e => {
              setError('');
              setSuccess(false);
              setName(e.target.value);
            }}
          />
        </div>
        <button className="btn btn-primary">
          Create category
      </button>
      </form>
      <div className="mt-5">
        <Link to="/admin/dashboard" className="text-warning">go back to dashboard</Link>
      </div>
    </>
  );
}
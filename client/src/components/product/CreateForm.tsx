import * as React from 'react';
import { useState, FormEvent, useEffect } from 'react';
import { isAuthenticate } from '../../APIs/authAPIs';
import { Link } from 'react-router-dom';
import { productFormSubmit, getCategories } from '../../APIs/CategoryAPIs';
import { ShowError } from '../common/Error';
import { Loading } from '../common/Loading';
import { ShowSuccess } from '../common/Success';

export const ProductCreateForm = () => {

  const { user, token } = isAuthenticate();
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    quantity: 0,
    shipping: false,
    photo: '',
    categories: [],
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: new FormData()
  });

  const { name, description, price, category, quantity, shipping, categories, loading,
    error, createdProduct, redirectToProfile, formData } = values;

  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({...values, error: data.error});
      } else {
        setValues({
          ...values,
          categories: data.data,
          formData: new FormData()
        });
      }
    })
  }

  useEffect(() => {
    init();
  }, [])

  const handleChange = (name: string) => (event: any) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setValues({...values, loading: true});
    productFormSubmit(user._id, token, formData).then(data => {
      if (data.error) {
        setValues({...values, error: data.error});
      } else {
        setValues({...values, 
          name: '', description: '', price: 0, category: '', quantity: 0, shipping: false, photo: '', loading: false, 
          error: '', createdProduct: data.name})
      }
    });
  }

  return (
    <>
      {loading ? <Loading /> : undefined}
      {createdProduct ? <ShowSuccess success={`${createdProduct} is created`} /> : undefined}
      <ShowError error={error ? error : ''} />
      <form className="mb-3" onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <label className="text-muted">Post photo</label>
          <input
            type="file"
            className="form-control"
            name="photo"
            accept="image/*"
            onChange={handleChange("photo")}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={handleChange("name")}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={handleChange("description")}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={handleChange("price")}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Category</label>
          <select
            className="form-control"
            onChange={handleChange("category")}
          >
            <option value="">Select category</option>
            {categories.map((c: any, i) => (
              <option key={i} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="text-muted">Quantity</label>
          <input
            type="number"
            className="form-control"
            value={quantity}
            onChange={handleChange("quantity")}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Shipping</label>
          <select
            className="form-control"
            onChange={handleChange("shipping")}
          >
            <option value="">Select shipping status</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>
        <button className="btn btn-primary">
          Create product
      </button>
      </form>
      <div className="mt-5 mb-5">
        <Link to="/admin/dashboard" className="text-warning">go back to dashboard</Link>
      </div>
    </>
  );
}
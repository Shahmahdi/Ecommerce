import * as React from 'react';
import { useState, useEffect } from 'react';
import { getCategories } from '../APIs/CategoryAPIs';
import { getProductsBySearch } from '../APIs/ProductAPIs';
import { Card } from './common/Card';

export const Search = () => {

  const [data, setData] = useState({
    categories: [],
    category: '',
    search: '',
    result: [],
    searched: false
  });

  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data.data })
      }
    })
  }

  useEffect(() => {
    loadCategories();
  }, []);

  const searchSubmit = () => {
    // console.log(data.category, ' ', data.search);
    if (data.search) {
      getProductsBySearch({ search: data.search || undefined, category: data.category }).then(res => {
        if (res.error) {
          console.log(res.error);
        } else {
          // console.log(res.data)
          setData({ ...data, result: res.data, searched: true });
        }
      })
    }
  }

  const handleChange = (name: string, value: string) => {
    // console.log(`${name} - ${value}`)
    setData({ ...data, [name]: value, searched: false });
  }

  return (
    <div className="row ">
      <div className="container">
        <form
          onSubmit={e => {
            e.preventDefault();
            searchSubmit();
          }}
        >
          <span className="input-group-text">
            <div className="input-group input-group-lg">
              <div className="input-group-prepend">
                <select
                  className="btn mr-2"
                  onChange={e => handleChange("category", e.target.value)}
                >
                  <option value="All">All</option>
                  {data.categories.map((c: any) => (
                    <option value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                className="form-control"
                onChange={e => handleChange("search", e.target.value)}
                placeholder="Search by name"
              />
            </div>
            <div className="btn input-group-append" style={{ border: 'none' }}>
              <button className="input-group-text">Search</button>
            </div>
          </span>
        </form>

        <div className="row">
          <h2 className="mt-4 mb-4">
            {data.searched ? data.result && data.result.length > 0 ?
              `Found ${data.result.length} products` : `No products found` : undefined}
          </h2>
        </div>

        <div className="row">
          {data.result && data.result.map((p, i) => (
            <div className="col-4 mb-3">
              <Card key={i} product={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
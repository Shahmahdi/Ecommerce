import * as React from 'react';
import { Layout } from '../components/common/Layout';
import { useState, useEffect } from 'react';
import { getCategories } from '../APIs/CategoryAPIs';
import { Checkbox } from '../components/common/Checkbox';
import { RadioButton } from '../components/common/RadioButton';
import { getFilteredProducts } from '../APIs/ProductAPIs';
import { Card } from '../components/common/Card';

const prices = require('../resources/priceRange.json');

export const Shop = () => {

  const [category, setCategory] = useState([]);
  const [error, setError] = useState('');
  const [checked, setChecked] = useState([]);
  const [filters, setFilters] = useState({
    categories: [],
    price: []
  });
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResult, setFilteredResult] = useState([]);

  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategory(data.data);
      }
    })
  }

  const loadFilteredResult = (filtervalues: any) => {
    getFilteredProducts(skip, limit, filtervalues).then((data: any) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResult(data.data.data);
        setSize(data.data.size);
        console.log(data.data.size);
        setSkip(0);
      }
    })
  }

  const loadMoreAction = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, filters).then((data: any) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResult(([...filteredResult, ...data.data.data]) as any);
        setSize(data.data.size);
        setSkip(toSkip);
      }
    })
  }

  useEffect(() => {
    init();
    loadFilteredResult(filters);
  }, []);

  const setCategoryForFilter = (categoryId: string) => () => {
    const currentCategoryId = (checked as any).indexOf(categoryId);
    let categoriesForFiltering = [...checked];
    if (currentCategoryId === -1) {
      (categoriesForFiltering as any).push(categoryId);
    } else {
      categoriesForFiltering.splice(currentCategoryId, 1);
    }
    setChecked(categoriesForFiltering);

    const currentFilters = {
      ...filters,
      category: categoriesForFiltering
    }

    setFilters(currentFilters);
    loadFilteredResult(currentFilters);
  }

  const setFiltersUsingPrice = (range: []) => {
    const priceRange = range;
    const currentFilters = {
      ...filters,
      price: priceRange
    }
    setFilters(currentFilters);
    loadFilteredResult(currentFilters);
  }

  return (
    <Layout
      title="Shopping page"
      description="Node React Ecommerce app"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h4>Filter by categories</h4>
          <ul>
            {category.map((c: any) => (
              <li className="list-unstyled">
                <Checkbox
                  item={c.name}
                  value={(checked as any).indexOf(c._id === -1)}
                  onChange={setCategoryForFilter(c._id)}
                />
              </li>
            ))}
          </ul>

          <h4>Filter by price</h4>
          <div>
            {prices.map((p: any) => (
              <RadioButton
                value={p._id}
                label={p.name}
                name={p}
                onChange={e => setFiltersUsingPrice((p as any).range)}
              />
            ))}
          </div>

        </div>
        <div className="col-8">
          <div className="row">
            {filteredResult.map((product: any) => (
              <div className="col-6 mb-3">
                <Card product={product} />
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-12">
              {size > 0 && size >= limit && 
                <button 
                  className="btn btn-warning mb-5"
                  onClick={loadMoreAction}
                >
                  Load more
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
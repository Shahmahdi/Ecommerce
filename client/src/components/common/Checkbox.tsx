import * as React from 'react';

export const Checkbox = (props: {
  item: string;
}) => (
  <div>
    <input type="checkbox" className="form-check-input" id="item" />
    <label htmlFor="item" className="form-check-label">{props.item}</label>
  </div>
);
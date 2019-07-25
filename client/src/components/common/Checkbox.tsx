import * as React from 'react';

export const Checkbox = (props: {
  item: string;
  onChange: (id: string) => void
  value: any
}) => (
  <div>
    <input 
      onChange={e => props.onChange(props.item)} 
      value={props.value}
      type="checkbox" 
      className="form-check-input" 
      id={props.item} 
    />
    <label htmlFor={props.item} className="form-check-label">{props.item}</label>
  </div>
);
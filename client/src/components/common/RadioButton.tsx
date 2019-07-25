import * as React from 'react';

export const RadioButton = (props: {
  label: string;
  value: any;
  onChange: (range: any) => void;
  name: any;
}) => (
  <div>
    <input 
      id={props.label} 
      type="radio"
      className="mr-2 ml-4" 
      name={props.name}
      value={props.value} 
      onChange={e => props.onChange(props.value)} 
    />
    <label htmlFor={props.label} className="form-check-label">{props.label}</label>
  </div>
);
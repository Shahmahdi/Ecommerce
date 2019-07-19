import * as React from 'react';

export const ShowError = (props: {
  error: string;
}) => (
  <div
    className="alert alert-danger"
    style={{display: props.error ? "" : "none"}}
  >
    {props.error}
  </div>
);
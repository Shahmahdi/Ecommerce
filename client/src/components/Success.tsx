import * as React from 'react';

export const ShowSuccess = (props: {
  success: string;
}) => (
  <div
    className="alert alert-info"
    style={{display: props.success ? "" : "none"}}
  >
    {props.success}
  </div>
);
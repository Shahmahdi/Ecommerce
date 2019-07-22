import * as React from 'react';
import { API } from '../../config';

export const ShowImage = (props: {
  item: any;
  url: string;
}) => (
    <div className="product-img" style={{display: 'flex'}}>
      <img
        src={`${API}/${props.url}/photo/${props.item._id}`}
        alt={`${props.item.name}`}
        className="mb-3"
        style={{ maxHeight: '35vh', margin: 'auto' }}
      />
    </div>
  );
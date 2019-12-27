import React, { useEffect, useState } from 'react'
import { braintreeClientToken } from '../../APIs/CartAPIs';
import { isAuthenticate } from '../../APIs/authAPIs';
import { Button, Intent } from '@blueprintjs/core';
// import DropIn from "braintree-web-drop-in-react";

// const DropIn = require('braintree-web-drop-in-react');

export const PaymentForm = (props: {
  setShowBraintreePaymentForm: (val: boolean) => void;
}) => {

  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: ''
  });

  const userId = isAuthenticate() && isAuthenticate().user._id;
  const token = isAuthenticate() && isAuthenticate().token;

  useEffect(() => {
    braintreeClientToken(userId, token).then(data => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ ...data, clientToken: data.clientToken });
      }
    })
  }, [])

  return (
    <div>
      {/* <DropIn
        options={{
          authorization: data.clientToken
        }}
        onInstance={(instance: any) => data.instance = instance}
      /> */}
      <Button
        text="Pay"
        intent={Intent.SUCCESS}
        // onClick={() => {
        //   setShowBraintreePaymentForm(!showBraintreePaymentForm);
        // }}
      />
    </div>
  )
}

import React, { useState } from 'react'
import { Layout } from '../components/common/Layout'
import { getAllCartitems, deleteItemFromCart } from '../APIs/CartAPIs'
import { Product } from '../APIs/ProductAPIs'
import { Link } from 'react-router-dom'
import { API } from '../config';
import { Icon, Intent, Button } from "@blueprintjs/core";

export const CartPage = () => {

  const [cartUpdateToggle, setCartUpdateToggle] = useState(false);

  return (
    <Layout
      title="Cart page"
      description="Cart details"
      className="container col-xs-8"
    >
      <div className="row pv4">
        <div className="col-md-12">
          <p className="f3 fw5">Shopping Cart</p>
          {getAllCartitems().length > 0 ?
            <div className="pa4">
              <div className="overflow-auto">
                <table className="f6 w-100 mw8 center b--black-20 ba">
                  <thead>
                    <tr className="stripe-dark bt b--black-20">
                      <th className="fw6 tl pa3 bg-white">Product Image</th>
                      <th className="fw6 tl pa3 bg-white">Product Name</th>
                      <th className="fw6 tl pa3 bg-white">Unit Price</th>
                      <th className="fw6 tl pa3 bg-white">Qty</th>
                      <th className="fw6 tl pa3 bg-white">SubTotal</th>
                      <th className="fw6 tl pa3 bg-white"></th>
                    </tr>
                  </thead>
                  <tbody className="lh-copy">
                    {getAllCartitems().map((product: Product) => (
                      <tr className="stripe-dark bt b--black-20">
                        <td className="pa3">
                          <div className="product-img">
                            <img
                              src={`${API}/product/photo/${product._id}`}
                              alt={`${product.name}`}
                              className="h4"
                            />
                          </div>
                        </td>
                        <td className="pa3">{product.name}</td>
                        <td className="pa3">{product.price}</td>
                        <td className="pa3">
                          <span className="pointer">
                            <Icon
                              icon="remove"
                              intent={Intent.WARNING}
                              onClick={() => {
                                const updatedCart = getAllCartitems().map((cartItem: Product) => {
                                  if (cartItem._id === product._id && cartItem.count && cartItem.count > 1) {
                                    cartItem.count!--;
                                  }
                                  return cartItem;
                                });
                                setCartUpdateToggle(!cartUpdateToggle);
                                localStorage.setItem('cart', JSON.stringify(updatedCart));
                              }}
                            />
                          </span>
                          <span className="fw5 ph2">{product.count}</span>
                          <span className="pointer">
                            <Icon
                              icon="add"
                              intent={Intent.WARNING}
                              onClick={() => {
                                const updatedCart = getAllCartitems().map((cartItem: Product) => {
                                  if (cartItem._id === product._id) {
                                    cartItem.count!++;
                                  }
                                  return cartItem;
                                });
                                setCartUpdateToggle(!cartUpdateToggle);
                                localStorage.setItem('cart', JSON.stringify(updatedCart));
                              }}
                            />
                          </span>
                        </td>
                        <td className="pa3">
                          ${product.price * product.count!}
                        </td>
                        <td className="pa3">
                          <Button
                            text="Remove"
                            intent={Intent.DANGER}
                            onClick={() => {
                              deleteItemFromCart(product._id!);
                              setCartUpdateToggle(!cartUpdateToggle);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                    <tr className="bt b--black-20">
                      <td colSpan={4} className="pa3 tr fw5 pr4 f4">Total</td>
                      <td className="pa3 fw5 f4">
                        ${getAllCartitems().length > 0 ?
                          getAllCartitems().reduce((total: number, product: Product) => (
                            total + product.price * product.count!
                          ), 0)
                          : 0}
                      </td>
                      <td className="pa3 fw5 f4">
                        <Button
                          text="Checkout"
                          intent={Intent.SUCCESS}
                        // onClick={() => {
                        //   deleteItemFromCart(product._id!);
                        //   setCartUpdateToggle(!cartUpdateToggle);
                        // }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            : <p className="f5 fw5">
              Your cart is empty
                <Link to="/shop">Continue shopping</Link>
            </p>
          }
        </div>
      </div>
    </Layout>
  )
}

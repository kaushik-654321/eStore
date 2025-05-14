import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { addToCart, updateQuantity, removeCart, addToCartServer, updateCartServer, removeCartServer } from '../features/cartSlice';
import { Items } from '../types/item.type';
import { PageHeader } from './PageHeader';
import { NormalizeCartItem } from '../utils/cartNormalizer';


function CartPage() {
    const dispatch = useDispatch<AppDispatch>();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const user = useSelector((state: RootState) => state.user);
    const normalizedCartItems = NormalizeCartItem(cartItems, user?.isAuthenticated);

    // console.log("normalizedCartItems", normalizedCartItems);

    const cartTotal = useSelector((state: RootState) => state.cart.cartTotal);
    const userInfo = useSelector((state: RootState) => state.user);
    const { isAuthenticated, token, userId } = userInfo;
    const ItemaddTocart = (Itemdata: Items) => {
        if (isAuthenticated) {
            dispatch(addToCartServer({ userId, cartItems: [{ _id: Itemdata._id, quantity: 1 }] }))
        }
        else {
            dispatch(addToCart({ _id: Itemdata._id, name: Itemdata.name, price: Itemdata.price, image: Itemdata.image }))
        }

    }

    const itemupdatecart = (Itemdata: Items) => {
        if (isAuthenticated) {
            dispatch(updateCartServer({ userId, cartItems: [{ _id: Itemdata._id, quantity: 1 }] }))
        }
        else {
            dispatch(updateQuantity({ _id: Itemdata._id, quantity: Itemdata.quantity - 1 }))
        }
    }

    const itemremovecart = (Itemdata: Items) => {
        if (isAuthenticated) {
            dispatch(removeCartServer({ userId, cartItems: [{ _id: Itemdata._id }] }))
        }
        else {
            dispatch(removeCart({ _id: Itemdata._id }))
        }
    }

    return (
        <>

            <PageHeader breadcrumb={'Cart'} />

            <div className="container-fluid py-5">
                <div className="container py-5">
                    {cartTotal < 1 && <span>add some items</span>}
                    {normalizedCartItems && normalizedCartItems.length > 0 && (
                        <>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Products</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Total</th>
                                            <th scope="col">Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {normalizedCartItems.map((cartData) => (
                                            <tr>
                                                <th scope="row">
                                                    <div className="d-flex align-items-center">
                                                        <img src={cartData.image} className="img-fluid rounded-circle" style={{ width: "80px", height: "80px" }} alt="" />
                                                    </div>
                                                </th>
                                                <td>
                                                    <p className="mb-0 mt-4">{cartData.name} </p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 mt-4">$ {cartData.price}</p>
                                                </td>
                                                <td>
                                                    <div className="input-group quantity mt-4" style={{ width: "100px" }}>
                                                        <div className="input-group-btn">
                                                            <button className="btn btn-sm btn-minus rounded-circle bg-light border" onClick={() => itemupdatecart(cartData)}>
                                                                <i className="fa fa-minus"></i>
                                                            </button>
                                                        </div>
                                                        <input type="text" className="form-control form-control-sm text-center border-0" value={cartData.quantity} />
                                                        <div className="input-group-btn">
                                                            <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={() => ItemaddTocart(cartData)}>
                                                                <i className="fa fa-plus"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="mb-0 mt-4">$ {cartData.total}</p>
                                                </td>
                                                <td>
                                                    <button className="btn btn-md rounded-circle bg-light border mt-4" onClick={() => itemremovecart(cartData)}>
                                                        <i className="fa fa-times text-danger"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-5 text-start d-flex align-items-center">
                                <input type="text" className="border-0 border-bottom rounded py-3 mb-4" placeholder="Coupon Code" />
                                <button className="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button">Apply Coupon</button>
                            </div>
                            <div className="row g-4 justify-content-end">
                                <div className="col-8"></div>
                                <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                                    <div className="bg-light rounded">
                                        <div className="p-4">
                                            <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
                                            <div className="d-flex justify-content-between mb-4">
                                                <h5 className="mb-0 me-4">Subtotal:</h5>
                                                <p className="mb-0">${cartTotal?.toFixed(2)}</p>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <h5 className="mb-0 me-4">Shipping</h5>
                                                <div className="">
                                                    <p className="mb-0">Flat rate: $0.00</p>
                                                </div>
                                            </div>
                                            <p className="mb-0 text-end">Shipping to India.</p>
                                        </div>
                                        <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                            <h5 className="mb-0 ps-4 me-4">Total</h5>
                                            <p className="mb-0 pe-4">${cartTotal?.toFixed(2)}</p>
                                        </div>
                                        <button className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button">Proceed Checkout</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                </div>
            </div>

        </>

    )
}

export default CartPage as React.FC;
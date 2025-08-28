import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { addToCart, updateQuantity, removeCart, addToCartServer, updateCartServer, removeCartServer, rollbackCart } from '../features/cartSlice';
import { Items } from '../types/item.type';
import { PageHeader } from './PageHeader';
import { NormalizeCartItem } from '../utils/cartNormalizer';
import { updateActivity } from '../utils/updateActivity';
import { fetchData } from '../services/api';
import { API_ENDPOINTS } from "../api/apiEndpoints";
import ModalPage from './Modal';
import { withModal } from '../components/HOC/withModal';
import { useCouponStore } from '../app/useCouponStore';
import { Link } from 'react-router-dom';


const CouponModal = withModal(ModalPage);

interface coupons {
    _id: string;
    name: string;
    code: string;
    discount: number;
    expiresOn: string
}


function CartPage() {
    const [showModal, setshowModal] = useState<boolean>(false);
    const [couponData, setCouponData] = useState<coupons[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const normalizedCartItems: Items[] = NormalizeCartItem(cartItems);
    // console.log("normalizedCartItems", normalizedCartItems);

    const cartTotal = useSelector((state: RootState) => state.cart.cartTotal);
    const userInfo = useSelector((state: RootState) => state.user);
    const { isAuthenticated, userId } = userInfo;
    const { selectedCoupon, setSelectedCoupon, clearSelectedCoupon } = useCouponStore();
    const discountedPrice = selectedCoupon && (cartTotal * selectedCoupon?.discount) / 100;
    const cartBalance = selectedCoupon && (cartTotal - discountedPrice);
    const couponRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string>(null);

    useEffect(() => {
        if (!showModal) return;
        const controller = new AbortController();
        const getCouponData = () => {
            try {
                fetchData({ API_URL: API_ENDPOINTS.COUPON.api, signal: controller.signal })
                    .then((result) => {
                        if (result.error) {
                            console.log(result.error)
                        }
                        else {
                            setCouponData(result)
                        }
                    })
            }
            catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Coupon fetch aborted.');
                } else {
                    console.error('Fetch error:', error);
                }
            }

        };
        getCouponData();
        // Cleanup function: aborts fetch if modal closes or component unmounts
        return () => {
            controller.abort();
        }
    }, [showModal])

    const ItemaddTocart = (Itemdata: Items) => {
        if (isAuthenticated) {
           dispatch(addToCart({ _id: Itemdata._id, name: Itemdata.name, price: Itemdata.price, image: Itemdata.image }))
            dispatch(addToCartServer({ userId, cartItems: [{ _id: Itemdata._id, quantity: 1 }] })).unwrap()
                .catch(() => {
                    // Step 3: Rollback if server fails
                    dispatch(rollbackCart({ _id: Itemdata._id }));
                });
        }
        else {
            dispatch(addToCart({ _id: Itemdata._id, name: Itemdata.name, price: Itemdata.price, image: Itemdata.image }))
            updateActivity();
        }

    }

    const itemupdatecart = (Itemdata: Items) => {
        if (isAuthenticated) {
            dispatch(updateCartServer({ userId, cartItems: [{ _id: Itemdata._id, quantity: 1 }] }))
        }
        else {
            dispatch(updateQuantity({ _id: Itemdata._id, quantity: Itemdata.quantity - 1 }))
            updateActivity();
        }
    }

    const itemremovecart = (Itemdata: Items) => {
        if (isAuthenticated) {
            dispatch(removeCartServer({ userId, cartItems: [{ _id: Itemdata._id }] }))
        }
        else {
            dispatch(removeCart({ _id: Itemdata._id }))
            updateActivity();
        }
    }

    const handleModal = () => {
        const coupCode = couponRef.current?.value?.trim();

        if (selectedCoupon) {
            clearSelectedCoupon();
        }
        else if (coupCode) {
            try {
                fetchData({ API_URL: `${API_ENDPOINTS.COUPON.api}/${coupCode}`, })
                    .then((result) => {
                        if (result.error) {
                            throw new Error(result.error);
                        } else {
                            if (result.length < 1) {
                                setError('Coupon not valid')
                            }
                            else {
                                setSelectedCoupon(result[0]);
                                setError(null);
                            }

                        }
                    });
            } catch (error) {
                console.log('fetch Error', error);
            }
        }
        else {
            setshowModal(true);
        }

    }

    return (
        <>
            <div id="main-content">
                <PageHeader breadcrumb={'Cart'} />
                <div className="container-fluid py-5" >
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
                                                        <p className="mb-0 mt-4">$ {(Number(cartData.price))}</p>
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
                                    <input type="text" ref={couponRef} className="border-0 border-bottom rounded py-3 mb-4" name="coupCode" value={selectedCoupon === null ? null : selectedCoupon?.code} placeholder="Coupon Code" readOnly={selectedCoupon !== null} />
                                    <button className="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button" onClick={handleModal}>
                                        {selectedCoupon === null ? 'Apply Coupon' : 'Cancelled Coupon'}
                                    </button>


                                </div>
                                {error && (
                                    <div className='couponError mb-4'>
                                        <span> {error} </span>
                                    </div>
                                )}
                                {couponData?.length > 0 && <CouponModal isOpen={showModal} onClose={() => setshowModal(false)} isCoupon={true} coupons={couponData} />}
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
                                                {selectedCoupon && <><div className="d-flex justify-content-between mb-4">
                                                    <h5 className="mb-0 me-4">Discount {selectedCoupon?.code} </h5>
                                                    <p className="mb-0">-${discountedPrice.toFixed(2)}</p>
                                                </div>
                                                </>}


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
                                                <p className="mb-0 pe-4">${cartBalance ? cartBalance?.toFixed(2) : cartTotal?.toFixed(2)}</p>
                                            </div>
                                            <Link to="/checkout" className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4">Proceed Checkout</Link>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                    </div>
                </div>
            </div>
        </>

    )
}

export default CartPage as React.FC;
import React, { useState, useEffect, useRef } from 'react';
import FormPage from './Form';
import { fetchData } from '../services/api';
import { API_ENDPOINTS } from "../api/apiEndpoints";
import { useCouponStore } from '../app/useCouponStore';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { setUser } from '../features/userSlice';

interface modalProps {
  isOpen: boolean,
  onClose: () => void,
  isCoupon?: boolean;
  coupons?: {
    _id: string;
    name: string;
    code: string;
    discount: number;
    expiresOn: string;
  }[];
}

const ModalPage: React.FC<modalProps> = ({ isOpen, onClose, isCoupon, coupons }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [tab, setTab] = useState(0);
  const couponRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string>(null);

  const changeTab = (value: number) => setTab(value);
  const { setSelectedCoupon } = useCouponStore();
  const tabItems = [
    { label: 'Login', index: 0, className: 'login-tab' },
    { label: 'Signup', index: 1, className: 'signup-tab' },
  ];

  const handleLogin = () => {
    window.location.href = "https://estore-production-4c0c.up.railway.app/api/auth/google";
  };
  // 💡 Lock scroll and focus input when modal opens
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const modalEl = modalRef.current;

    const trapFocus = (e: KeyboardEvent) => {
      const focusableEls = modalEl.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];

      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    // Disable scroll
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Wait for elements to render before focusing
    setTimeout(() => {
      const focusableEls = modalEl.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusableEls[0]?.focus();
    }, 0);

    document.addEventListener('keydown', trapFocus);

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.removeEventListener('keydown', trapFocus);
    };
  }, [isOpen]);

  const coupValidate = () => {
    const coupCode = couponRef.current?.value?.trim();
    if (!coupCode) return;

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
              onClose();
              setError(null);
            }

          }
        });
    } catch (error) {
      console.log('fetch Error', error);
    }
  };

  const renderCoupons = (couponData: modalProps["coupons"]) => {
    if (!couponData) return null;

    return (
      <div className="container mb-3">
        <div className={`text-start d-flex align-items-center ${error ?? 'mb-4'}`} >
          <input
            type="text"
            name="coupCode"
            className="border-0 border-bottom rounded py-1 px-4 w-50"
            ref={couponRef}
            placeholder="Coupon Code"
          />
          <button
            className="btn border-secondary rounded-pill px-2 ms-2 text-primary bg-white coup-apply"
            onClick={coupValidate}
            type="button"
          >
            Apply Coupon
          </button>


        </div>
        {error && (
          <div className='couponError mb-4'>
            <span> {error} </span>
          </div>
        )}


        <div className="row gy-3">

          {couponData.slice(0, 4).map((coup) => (
            <div key={coup._id} className="col-6 col-md-6 col-lg-4">
              <button
                className="btn border-secondary bg-white rounded-pill text-primary w-100 text-center"
                type="button"
                onClick={() => { onClose(); setError(null); setSelectedCoupon(coup) }}
              >
                <div className="fw-bold">{coup.code}</div>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop-custom" role="presentation"
    >
      <div
        className="modal-dialog modal-dialog-centered"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content rounded-0">
          <div className="modal-header">
            <h5
              className="modal-title text-primary py-1 text-center w-100"
              id="exampleModalLabel"
              style={{ paddingLeft: '2rem' }}
            >
              {isCoupon ? 'Coupon List' : 'Login / Signup Form'}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => { onClose(); setError(null) }}
              aria-label="Close"
              tabIndex={0}
            ></button>
          </div>
          <div className="modal-body d-flex align-items-center justify-content-center">
            <div className="container-fluid">
              <div className="container text-center rounded mt-1 d-flex justify-content-center align-items-center flex-column">
                {isCoupon
                  ? coupons?.length > 0 && renderCoupons(coupons)
                  : (
                    <>
                      <div className="first-section border border-primary d-flex justify-content-between align-items-center">
                        {tabItems.map(({ label, index, className }) => (
                          <div
                            key={label}
                            role="button"
                            className={`${className} ${tab === index ? 'active' : ''}`}
                            onClick={() => changeTab(index)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') changeTab(index);
                            }}
                          >
                            {label}
                          </div>
                        ))}
                      </div>
                      <FormPage index={tab} onClose={onClose} />
                      <GoogleLogin
                        onSuccess={(credentialResponse) => {
                          if (!credentialResponse.credential) return;

                          const token = credentialResponse.credential;
                          const decoded: any = jwtDecode(token);
                          console.log("Google User:", decoded);

                          // Send token to backend for verification
                          fetch(`${API_ENDPOINTS.USER.api}/google`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ token }),
                          })
                            .then((res) => res.json())
                            .then((data) => {
                              const name = data?.name;
                              const email = data?.email;
                              const userId = data?.userId;
                              const token = data?.token
                              if (!name || !email || !userId || !token) {
                                throw new Error("Invalid user data from backend");
                              }
                              dispatch(setUser({ name, email, userId, token }));
                           
                              // Optionally close modal after success
                              onClose();
                            })
                            .catch((err) => console.error("Login error:", err));
                        }}
                        onError={() => {
                          console.log("Google Login Failed");
                        }}
                        useOneTap
                      />
                      <button className="btn btn-outline-primary rounded-pill px-4 google-login-btn" onClick={handleLogin}>
                         <i className="bi bi-google me-2"></i> 
                         Login with Google
                      </button>
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPage;

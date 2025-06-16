import React, { useState, useEffect, useRef } from 'react';
import FormPage from './Form';
import { fetchData } from '../services/api';
import { API_ENDPOINTS } from "../api/apiEndpoints";




interface modalProps {
  isOpen: boolean,
  onClose: () => void,
  isCoupon?: boolean;
  coupons?:
  {
    _id: string;
    name: string;
    code: string;
    discount: number;
    expiresOn: string
  }[]

}

const ModalPage: React.FC<modalProps> = ({ isOpen, onClose, isCoupon, coupons }) => {
  const [tab, setTab] = useState(0);
  const couponRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);



  const changeTab = (value: number) => {
    setTab(value);
  }

  const tabItems = [
    { label: 'Login', index: 0, className: 'login-tab' },
    { label: 'Signup', index: 1, className: 'signup-tab' },
  ];
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    }

  }, [isOpen])



  const coupValidate = () => {
    let coupCode = couponRef.current.value;
    try {
      fetchData({ API_URL: `${API_ENDPOINTS.COUPON.api}`,  coupCode})
        .then((result) => {
          if (result.error) {
            throw new Error(result.error);
          }
          else {
            console.log("coupon", coupCode);
          }
        })
    }
    catch (error) {
      console.log('fetch Error', error);
    }

  }
  const renderCoupons = (couponData) => {
    return (
      <div className="container mb-3">
        <div className="text-start d-flex align-items-center mb-4">
          <input type="text" name="coupCode" className="border-0 border-bottom rounded py-1 px-4 w-50" ref={couponRef} placeholder="Coupon Code" />
          <button className="btn border-secondary rounded-pill px-2 ms-2 text-primary bg-white coup-apply" onClick={() => coupValidate()} type="button">Apply Coupon</button>
        </div>
        <div className="row gy-3">
          {couponData.map((coup) => (
            <div key={coup._id} className="col-6 col-md-6 col-lg-4">
              <button
                className="btn border-secondary bg-white rounded-pill text-primary w-100 text-center"
                type="button"
                onClick={() => console.log(`Apply coupon: ${coup.code}`)}
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
    <div className="modal-backdrop-custom" id="searchModal" tabIndex={-1} aria-labelledby="exampleModalLabel">
      <div className="modal-dialog modal-dialog-centered" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <div className="modal-content rounded-0 ">
          <div className="modal-header">

            <h5 className="modal-title text-primary py-1 text-center w-100" id="exampleModalLabel" style={{ paddingLeft: '2rem' }}>{isCoupon ? 'Coupon List' : 'Login / Signup Form'}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body d-flex align-items-center justify-content-center">
            <div className="container-fluid">
              <div
                className="container text-center rounded mt-1 d-flex justify-content-center align-items-center flex-column">
                {isCoupon ? <>{coupons.length > 0 && renderCoupons(coupons)}</> : (
                  <>
                    <div className="first-section border border-primary d-flex justify-content-between align-items-center">
                      {tabItems.map(({ label, index, className }) => (
                        <div
                          key={label}
                          role="button"
                          tabIndex={0}
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

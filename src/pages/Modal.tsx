import React, { useState } from 'react';
import FormPage from './Form';

interface modalProps {
  isOpen: boolean,
  onClose: () => void,
  isCoupon?: boolean;
}

const ModalPage: React.FC<modalProps> = ({ isOpen, onClose, isCoupon }) => {
  const [tab, setTab] = useState(0);

  const changeTab = (value: number) => {
    setTab(value);
  }

  const tabItems = [
    { label: 'Login', index: 0, className: 'login-tab' },
    { label: 'Signup', index: 1, className: 'signup-tab' },
  ];

  if (!isOpen) return null;

  return (
    <div className=" modal-backdrop-custom" id="searchModal" tabIndex={-1} aria-labelledby="exampleModalLabel">
      <div className="modal-dialog modal-dialog-centered">
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
                {isCoupon ? <>ass</> : (
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

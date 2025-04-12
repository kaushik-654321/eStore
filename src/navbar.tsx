import React, { useState } from "react";
import Header from "./pages/Header";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./app/store"

const Navbar: React.FC = () => {
  const [expand, setExpand] = useState<boolean>(false);
  const cartCount = useSelector((state: RootState) => state.cart.items.length);

  const toggleNavbar = () => {
    setExpand(!expand)
  }

  const closeNavbar = () => {
    setExpand(false)
  }


  return (
    <div className="container-fluid fixed-top">
      <Header />

      <div className="container px-0">
        <nav className="navbar navbar-light bg-white navbar-expand-xl">
          <a href="index.html" className="navbar-brand">
            <h1 className="text-primary display-6">Fruitables</h1>
          </a>
          <button
            className="navbar-toggler py-2 px-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded={expand}
            aria-label="Toggle navigation"
            onClick={toggleNavbar}
          >
            <span className="fa fa-bars text-primary"></span>
          </button>
          <div className={`navbar-collapse bg-white collapse ${expand ? "show" : ""}`} id="navbarCollapse">
            <div className="navbar-nav mx-auto">
              <NavLink to="/" className={({ isActive }) => (isActive ? "nav-item nav-link active text-start" : "nav-item nav-link text-start")} onClick={closeNavbar}>Home</NavLink>
              <NavLink to="/shop" className={({ isActive }) => (isActive ? "nav-item nav-link active text-start" : "nav-item nav-link text-start")} onClick={closeNavbar}>Shop</NavLink>
              <NavLink to="/shop-detail" className={({ isActive }) => (isActive ? "nav-item nav-link active text-start" : "nav-item nav-link text-start")} onClick={closeNavbar}>Shop Details</NavLink>

              <div className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  data-bs-toggle="dropdown"
                  type="button"
                  aria-expanded="false"
                >
                  Pages
                </button>
                <div className="dropdown-menu m-0 bg-secondary rounded-0">
                  <NavLink to="/cart" className={({ isActive }) => (isActive ? "dropdown-item active" : "dropdown-item")} onClick={closeNavbar}>Cart</NavLink>

                  <NavLink to="/checkout" className={({ isActive }) => (isActive ? "dropdown-item active" : "dropdown-item")} onClick={closeNavbar}>CheckOut</NavLink>
                  {/* <a href="testimonial.html" className="dropdown-item">Testimonial</a>
                  <a href="404.html" className="dropdown-item">404 Page</a> */}
                </div>
              </div>
              <a href="contact.html" className="nav-item nav-link text-start">Contact</a>
            </div>
            <div className="d-flex m-3 me-0">
              <button
                className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4"
                data-bs-toggle="modal"
                data-bs-target="#searchModal"
              >
                <i className="fas fa-search text-primary"></i>
              </button>
              <a href="#" className="position-relative me-4 my-auto">
                <i className="fa fa-shopping-bag fa-2x"></i>
                {cartCount > 0 && (
                  <span
                    className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                    style={{ top: "-5px", left: "15px", height: "20px", minWidth: "20px" }}
                  >
                    {cartCount}
                  </span>
                )}

              </a>
              
              <a href="#" data-bs-toggle="modal"
                data-bs-target="#searchModal" className="my-auto">
                <i className="fas fa-user fa-2x"></i>
              </a>

            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
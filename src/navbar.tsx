import React, { useState } from "react";
import Header from "./pages/Header";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
const [expand, setExpand] = useState<boolean>(false)

const toggleNavbar = ()=>{
  setExpand(!expand)
}

const closeNavbar = ()=>{
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
            onClick={toggleNavbar}
          >
            <span className="fa fa-bars text-primary"></span>
          </button>
          <div className={`navbar-collapse bg-white collapse ${expand ? "show" : ""}`} id="navbarCollapse">
            <div className="navbar-nav mx-auto">
              <NavLink to="/" className={({ isActive }) => (isActive ? "nav-item nav-link active" : "nav-item nav-link")} onClick = {closeNavbar}>Home</NavLink>
              <NavLink to="/shop" className={({ isActive }) => (isActive ? "nav-item nav-link active" : "nav-item nav-link")} onClick = {closeNavbar}>Shop</NavLink>
              <a href="shop-detail.html" className="nav-item nav-link">Shop Detail</a>
              <div className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Pages
                </a>
                <div className="dropdown-menu m-0 bg-secondary rounded-0">
                  <a href="cart.html" className="dropdown-item">Cart</a>
                  <a href="checkout.html" className="dropdown-item">Checkout</a>
                  <a href="testimonial.html" className="dropdown-item">Testimonial</a>
                  <a href="404.html" className="dropdown-item">404 Page</a>
                </div>
              </div>
              <a href="contact.html" className="nav-item nav-link">Contact</a>
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
                <span
                  className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                  style={{ top: "-5px", left: "15px", height: "20px", minWidth: "20px" }}
                >
                  3
                </span>
              </a>
              <a href="#" className="my-auto">
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
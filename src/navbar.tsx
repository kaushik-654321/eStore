import React, { useState, useRef, useEffect } from "react";
import Header from "./pages/Header";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, persistor, RootState } from "./app/store"
import { clearUser, setUser } from "./features/userSlice";
import { clearCart, fetchUserCart } from "./features/cartSlice";

type navProps = {
  onUserIconClick: () => void
}

const Navbar: React.FC<navProps> = ({ onUserIconClick }) => {
  const [expand, setExpand] = useState<boolean>(false);
  const cartCount = useSelector((state: RootState) => state.cart.items.length);
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const savedUser = useSelector((state: RootState) => state.user);
  const { name: userName, token, userId } = savedUser;
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (userId) {
      dispatch(setUser(savedUser));
      dispatch(fetchUserCart({ userId, token }))
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [])


  const toggleProfile = () => {
    setShowProfile((prev) => !prev);
  };

  const handleLogout = () => {
    // Clear auth logic here
    console.log("Logout clicked");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    persistor.purge();
    dispatch(clearUser());
    dispatch(clearCart());
    toggleProfile();
  };

  const toggleNavbar = () => {
    setExpand(!expand)
  }

  const closeNavbar = () => {
    setExpand(false)
  }

  const handleClick = (e: any, userName: string) => {
    e.preventDefault();
    if (userName) {
      toggleProfile();
    }
    else {
      onUserIconClick();
    }

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
              {/* <button
                className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4"
                data-bs-toggle="modal"
                data-bs-target="#searchModal"
              >
                <i className="fas fa-search text-primary"></i>
              </button> */}
              <NavLink to="/cart" className="position-relative me-4 my-auto"> <i className="fa fa-shopping-bag fa-2x"></i>
                {cartCount > 0 && (
                  <span
                    className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                    style={{ top: "-5px", left: "15px", height: "20px", minWidth: "20px" }}
                  >
                    {cartCount}
                  </span>
                )}
              </NavLink>
              {/* <a href="#" >
                <i className="fa fa-shopping-bag fa-2x"></i>
                {cartCount > 0 && (
                  <span
                    className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                    style={{ top: "-5px", left: "15px", height: "20px", minWidth: "20px" }}
                  >
                    {cartCount}
                  </span>
                )}

              </a> */}

              {/* <a href="#" onClick={onUserIconClick}
                className="my-auto">
                <i className="fas fa-user fa-2x"></i>
              </a> */}
              <div ref={profileRef} className="position-relative my-auto">
                <a href="#" onClick={(e) => { handleClick(e, userName) }}>
                  <i className="fas fa-user fa-2x"></i>
                </a>

                {showProfile && (
                  <div
                    className="position-absolute bg-white border rounded shadow-sm"
                    style={{ top: "40px", right: "0", zIndex: 1000, minWidth: "150px" }}
                  >
                    <div className="p-2 border-bottom text-dark">{userName}</div>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item text-dark"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

            </div>

          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
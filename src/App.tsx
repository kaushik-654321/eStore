import React, {useState} from 'react';
import './App.css';
import Navbar from './navbar';
import Footer from './pages/Footer';
import Copyright from './pages/Copyright';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/HomePage';
import Spinner from './Spinner';
import Shop from './pages/shop';
import ShopDetails from './pages/ShopDetails';
import CartPage from './pages/Cart';
import { CheckoutPage } from './pages/Checkout';
import { ToastContainer } from 'react-toastify';
import ModalPage from "./pages/Modal";

const App: React.FC = () => {
  const [showModal, setshowModal] = useState<boolean>(false);
  return (
    <div className="App">
      <Router>
        <Spinner />
        <Navbar onUserIconClick = {()=>setshowModal(true)}/>
        
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/shop-detail" element={<ShopDetails />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/checkout" element={<CheckoutPage />}></Route>
        </Routes>

        <Footer />
        <Copyright />
        <ToastContainer position="top-right" autoClose={3000} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        <ModalPage isOpen={showModal} onClose={()=>setshowModal(false)}/>
      </Router>

    </div>
  );
};

export default App;

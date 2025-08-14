import React, { useEffect } from 'react';
import Hero from './HeroSection';
import FeaturesSection from './FeaturesSection';
import FruitsShop from './FruitsShop';
import FeaturesStart from './FeatureStart';
import VegetableShop from '../vegetableShop';
import BannerSection from './BannerSection';
import BestsellerProducts from './BestSellerProducts';
import Facts from './Facts';
import Testimonials from '../testimonials';
import { API_ENDPOINTS } from '../api/apiEndpoints';
import { setUser } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      console.log('Token found:', token);


      fetch(`${API_ENDPOINTS.USER.user}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
        credentials: 'include',
      })
        .then((res) => {
          if (!res.ok) throw new Error('Not logged in');
          return res.json();
        })
        .then((data) => {
          const name = data?.name;
          const email = data?.email;
          const userId = data?.userId;
          const token = data?.token;

          dispatch(setUser({ name, email, userId, token }));
          console.log('✅ Logged in user:', data);
          // setUser(userObj);
        })
        .catch((err) => {
          console.log('❌ Not logged in');
        });
    }
  }, [])

  return (
    <>
      <Hero />
      <FeaturesSection />

      <FruitsShop />
      <FeaturesStart />
      <VegetableShop />
      <BannerSection />
      <BestsellerProducts />
      <Facts />
      <Testimonials />
    </>
  )
}

export default Home;
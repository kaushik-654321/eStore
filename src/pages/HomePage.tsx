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


const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
  const timer = setTimeout(() => {
    fetch(`${API_ENDPOINTS.USER.user}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Not logged in');
        return res.json();
      })
      .then((data) => {
        const name = data?._json.name;
        const email = data?._json.email;
        const userId = data?.id;
        const token = data?.id;
        dispatch(setUser({ name, email, userId, token }));
        console.log('✅ Logged in user:', data);
      })
      .catch((err) => {
        console.log('❌ Not logged in');
      });
  }, 500); // Wait 0.5 seconds

  return () => clearTimeout(timer);
}, []);

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
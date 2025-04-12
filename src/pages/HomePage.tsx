import React from 'react';
import Hero from './HeroSection';
import FeaturesSection from './FeaturesSection';
import FruitsShop from './FruitsShop';
import FeaturesStart from './FeatureStart';
import VegetableShop from '../vegetableShop';
import BannerSection from './BannerSection';
import BestsellerProducts from './BestSellerProducts';
import Facts from './Facts';
import Testimonials from '../testimonials';


const Home: React.FC = () => {
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
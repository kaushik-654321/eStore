import React from 'react';
import Hero from './heroSection';
import FeaturesSection from './featuresSection';
import FruitsShop from './fruitsShop';
import FeaturesStart from './featureStart';
import VegetableShop from '../vegetableShop';
import BannerSection from './bannerSection';
import BestsellerProducts from './bestsellerProducts';
import Facts from './facts';
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
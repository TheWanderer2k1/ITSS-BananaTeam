import React from 'react';
import Footer from '../../homepage/components/footer';
import FoodScreen from './food-screen';

import './intro.css';

const FoodInforPage = () => {

    return (
        <React.Fragment>
            <FoodScreen />
            <Footer />
        </React.Fragment>
    );
}

export default FoodInforPage;
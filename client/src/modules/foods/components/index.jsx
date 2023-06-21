import React from 'react';
import Footer from '../../homepage/components/footer';
import Foods from './Foods';

import './foods.css';

const Introduction = () => {

    return (
        <React.Fragment>
            <Foods />
            <Footer />
        </React.Fragment>
    );
}

export default Introduction;
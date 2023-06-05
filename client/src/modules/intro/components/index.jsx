import React from 'react';
import Footer from '../../homepage/components/footer';
import Search from './search';

import './intro.css';

const Introduction = () => {

    return (
        <React.Fragment>
            <Search />
            <Footer />
        </React.Fragment>
    );
}

export default Introduction;
import React from 'react';
import Header from './header';
import Intro from './intro';
import Service from './service';
import Signup from './signUp';
import Location from './location';
import Contact from './contact';
import Footer from './footer';
import Search from './search';

import './intro.css';

const Introduction = () => {

    return (
        <React.Fragment>
            <Search />
            <Header />
            <Intro />
            <Service />
            <Signup />
            <Location />
            <Contact />
            <Footer />
        </React.Fragment>
    );
}

export default Introduction;
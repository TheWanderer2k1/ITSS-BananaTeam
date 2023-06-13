import React from 'react';
import Footer from '../../homepage/components/footer';
import Search from './search';
import Header from './header';

import './intro.css';
import NavbarInteractive from '../../homepage/components/navbar-interactive';

const Introduction = () => {

    return (
        <React.Fragment>
            {/* <NavbarInteractive rootClassName="navbar-interactive-root-class-name search-nav-bar"></NavbarInteractive> */}
            <Header />
            <Search />
            <Footer />
        </React.Fragment>
    );
}

export default Introduction;
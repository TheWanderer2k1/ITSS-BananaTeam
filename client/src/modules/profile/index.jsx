import React from 'react';

import './Profile.css';
import Footer from '../homepage/components/footer';
import { Profile } from './Profile';

const ProfileWrapper = () => {

    return (
        <React.Fragment>
            <Profile />
            <Footer />
        </React.Fragment>
    );
}

export default ProfileWrapper;
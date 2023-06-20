import React, { Component } from 'react';
import { withTranslate } from 'react-redux-multilingual';
import Footer from '../../homepage/components/footer';
import '../../res-info/components/restaurant-infomation.css';
import ResInfoStaff from './restaurant-infomation-staff'

const ResInfoPage = () => {
  return (
    <React.Fragment>
        <ResInfoStaff />
        <Footer />
    </React.Fragment>
  );
}

export default(withTranslate(ResInfoPage));
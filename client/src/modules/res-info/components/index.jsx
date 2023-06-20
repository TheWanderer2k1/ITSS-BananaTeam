import React, { Component } from 'react';
import { withTranslate } from 'react-redux-multilingual';
import Footer from '../../homepage/components/footer';
import './restaurant-infomation.css';
import ResInfo from './restaurant-infomation'

const ResInfoPage = () => {
  return (
    <React.Fragment>
        <ResInfo />
        <Footer />
    </React.Fragment>
  );
}

export default(withTranslate(ResInfoPage));
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import { Route } from 'react-router';
import Footer from '../../homepage/components/footer';
import './homepage.css';
import Home from './home'

const HomePage = () => {
  return (
    <React.Fragment>
        <Home />
        <Footer />
    </React.Fragment>
  );
}

export default(withTranslate(HomePage));
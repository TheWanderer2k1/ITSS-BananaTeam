import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import { Route } from 'react-router';
import './homepage.css';
import Home from './home'

class HomePage extends React.Component {
    render() {
      return (
        <div>
          <Route component={Home} exact path="/" />
        </div>
      );
    }
  }

function mapState(state) {
    const { tasks } = state;
    return { tasks };
}
const actionCreators = {
};
const connectedHome = connect(mapState, actionCreators)(withTranslate(HomePage));
export { connectedHome as HomePage };
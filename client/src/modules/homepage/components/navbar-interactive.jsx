import React from 'react'

import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

import './navbar-interactive.css'
const NavbarInteractive = (props) => {
  return (
    <div className={`navbar-interactive-container ${props.rootClassName} `}>
      <header
        data-thq="thq-navbar"
        className="navbar-interactive-navbar-interactive"
      >
        <div className="navbar-interactive-container1">
          <img
            alt="logo_tabeyou"
            src="/library/dx/images/TabeyouLogo.png"
            loading="lazy"
            className="navbar-interactive-logo"
          />
          <h1 className="navbar-interactive-text">{props.heading}</h1>
        </div>
        <div
          data-thq="thq-navbar-nav"
          data-role="Nav"
          className="navbar-interactive-desktop-menu"
        >
          <nav
            data-thq="thq-navbar-nav-links"
            data-role="Nav"
            className="navbar-interactive-nav"
          >
            <button type="button" className="navbar-interactive-button button">
            <Link to="/homepage">{props.button}</Link>
            </button>
            <button type="button" className="navbar-interactive-button1 button">
              {props.button1}
            </button>
          </nav>
        </div>
      </header>
    </div>
  )
}

NavbarInteractive.defaultProps = {
  button1: 'ログアウト',
  button: 'ホームページ',
  heading: 'TABEYOU',
  text: 'ホームページ',
  Logo_alt: 'logo',
  rootClassName: '',
  text1: 'ハノイ',
}

NavbarInteractive.propTypes = {
  button1: PropTypes.string,
  button: PropTypes.string,
  heading: PropTypes.string,
  text: PropTypes.string,
  Logo_alt: PropTypes.string,
  text3: PropTypes.string,
  text2: PropTypes.string,
  rootClassName: PropTypes.string,
  text1: PropTypes.string,
  Logo_src: PropTypes.string,
}

export default NavbarInteractive

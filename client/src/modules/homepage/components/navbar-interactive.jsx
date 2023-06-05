import React from 'react'

import PropTypes from 'prop-types'

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
              {props.button}
            </button>
            <div data-thq="thq-dropdown" className="navbar-interactive-thq-dropdown list-item">
              <div data-thq="thq-dropdown-toggle" className="navbar-interactive-dropdown-toggle">
                <span className="navbar-interactive-text1">ハノイ</span>
                <div data-thq="thq-dropdown-arrow" className="navbar-interactive-dropdown-arrow">
                  <svg viewBox="0 0 1024 1024" className="navbar-interactive-icon">
                    <path d="M426 726v-428l214 214z" className=""></path>
                  </svg>
                </div>
              </div>
              <ul data-thq="thq-dropdown-list" className="navbar-interactive-dropdown-list">
                <li data-thq="thq-dropdown" className="navbar-interactive-dropdown list-item">
                  <div data-thq="thq-dropdown-toggle" className="navbar-interactive-dropdown-toggle1">
                    <span className="navbar-interactive-text2">Sub-menu Item</span>
                  </div>
                </li>
                <li data-thq="thq-dropdown" className="navbar-interactive-dropdown1 list-item">
                  <div data-thq="thq-dropdown-toggle" className="navbar-interactive-dropdown-toggle2">
                    <span className="navbar-interactive-text3">Sub-menu Item</span>
                  </div>
                </li>
                <li data-thq="thq-dropdown" className="navbar-interactive-dropdown2 list-item">
                  <div data-thq="thq-dropdown-toggle" className="navbar-interactive-dropdown-toggle3">
                    <span className="navbar-interactive-text4">Sub-menu Item</span>
                  </div>
                </li>
              </ul>
            </div>
            <div data-thq="thq-dropdown" className="navbar-interactive-thq-dropdown list-item">
              <div data-thq="thq-dropdown-toggle" className="navbar-interactive-dropdown-toggle">
                <span className="navbar-interactive-text1">食べ物&飲み物</span>
                <div data-thq="thq-dropdown-arrow" className="navbar-interactive-dropdown-arrow">
                  <svg viewBox="0 0 1024 1024" className="navbar-interactive-icon">
                    <path d="M426 726v-428l214 214z" className=""></path>
                  </svg>
                </div>
              </div>
              <ul data-thq="thq-dropdown-list" className="navbar-interactive-dropdown-list">
                <li data-thq="thq-dropdown" className="navbar-interactive-dropdown list-item">
                  <div data-thq="thq-dropdown-toggle" className="navbar-interactive-dropdown-toggle1">
                    <span className="navbar-interactive-text2">Sub-menu Item</span>
                  </div>
                </li>
                <li data-thq="thq-dropdown" className="navbar-interactive-dropdown1 list-item">
                  <div data-thq="thq-dropdown-toggle" className="navbar-interactive-dropdown-toggle2">
                    <span className="navbar-interactive-text3">Sub-menu Item</span>
                  </div>
                </li>
                <li data-thq="thq-dropdown" className="navbar-interactive-dropdown2 list-item">
                  <div data-thq="thq-dropdown-toggle" className="navbar-interactive-dropdown-toggle3">
                    <span className="navbar-interactive-text4">Sub-menu Item</span>
                  </div>
                </li>
              </ul>
            </div>
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
  button1: 'ログイン',
  button: 'ホームページ',
  heading: 'TABEYOU',
  text: 'ホームページ',
  Logo_alt: 'logo',
  text3: 'ログイン',
  text2: '食べ物&飲み物',
  rootClassName: '',
  text1: 'ハノイ',
  Logo_src: 'https://presentation-website-assets.teleporthq.io/logos/logo.png',
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

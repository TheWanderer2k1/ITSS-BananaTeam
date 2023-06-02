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
            loading="lazy"
            src="/external/tabeyoulogo-1500h.png"
            alt="logo_tabeyou"
            className="navbar-interactive-logo"
          />
          <h1 className="navbar-interactive-text">{props.heading}</h1>
        </div>
        <div
          data-role="Nav"
          data-thq="thq-navbar-nav"
          className="navbar-interactive-desktop-menu"
        >
          <nav
            data-role="Nav"
            data-thq="thq-navbar-nav-links"
            className="navbar-interactive-nav"
          >
            <button type="button" className="navbar-interactive-button button">
              {props.button}
            </button>
            <div
              data-thq="thq-dropdown"
              className="navbar-interactive-thq-dropdown list-item"
            >
              <div
                data-thq="thq-dropdown-toggle"
                className="navbar-interactive-dropdown-toggle"
              >
                <span className="navbar-interactive-text1">ハノイ</span>
                <div
                  data-thq="thq-dropdown-arrow"
                  className="navbar-interactive-dropdown-arrow"
                >
                  <svg
                    viewBox="0 0 1024 1024"
                    className="navbar-interactive-icon"
                  >
                    <path d="M426 726v-428l214 214z" className=""></path>
                  </svg>
                </div>
              </div>
              <ul
                data-thq="thq-dropdown-list"
                className="navbar-interactive-dropdown-list"
              >
                <li
                  data-thq="thq-dropdown"
                  className="navbar-interactive-dropdown list-item"
                >
                  <div
                    data-thq="thq-dropdown-toggle"
                    className="navbar-interactive-dropdown-toggle1"
                  >
                    <span className="navbar-interactive-text2">
                      Sub-menu Item
                    </span>
                  </div>
                </li>
                <li
                  data-thq="thq-dropdown"
                  className="navbar-interactive-dropdown1 list-item"
                >
                  <div
                    data-thq="thq-dropdown-toggle"
                    className="navbar-interactive-dropdown-toggle2"
                  >
                    <span className="navbar-interactive-text3">
                      Sub-menu Item
                    </span>
                  </div>
                </li>
                <li
                  data-thq="thq-dropdown"
                  className="navbar-interactive-dropdown2 list-item"
                >
                  <div
                    data-thq="thq-dropdown-toggle"
                    className="navbar-interactive-dropdown-toggle3"
                  >
                    <span className="navbar-interactive-text4">
                      Sub-menu Item
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div
              data-thq="thq-dropdown"
              className="navbar-interactive-thq-dropdown1 list-item"
            >
              <div
                data-thq="thq-dropdown-toggle"
                className="navbar-interactive-dropdown-toggle4"
              >
                <span className="navbar-interactive-text5">
                  食べ物&amp;飲み物
                </span>
                <div
                  data-thq="thq-dropdown-arrow"
                  className="navbar-interactive-dropdown-arrow1"
                >
                  <svg
                    viewBox="0 0 1024 1024"
                    className="navbar-interactive-icon2"
                  >
                    <path d="M426 726v-428l214 214z" className=""></path>
                  </svg>
                </div>
              </div>
              <ul
                data-thq="thq-dropdown-list"
                className="navbar-interactive-dropdown-list1"
              >
                <li
                  data-thq="thq-dropdown"
                  className="navbar-interactive-dropdown3 list-item"
                >
                  <div
                    data-thq="thq-dropdown-toggle"
                    className="navbar-interactive-dropdown-toggle5"
                  >
                    <span className="navbar-interactive-text6">
                      Sub-menu Item
                    </span>
                  </div>
                </li>
                <li
                  data-thq="thq-dropdown"
                  className="navbar-interactive-dropdown4 list-item"
                >
                  <div
                    data-thq="thq-dropdown-toggle"
                    className="navbar-interactive-dropdown-toggle6"
                  >
                    <span className="navbar-interactive-text7">
                      Sub-menu Item
                    </span>
                  </div>
                </li>
                <li
                  data-thq="thq-dropdown"
                  className="navbar-interactive-dropdown5 list-item"
                >
                  <div
                    data-thq="thq-dropdown-toggle"
                    className="navbar-interactive-dropdown-toggle7"
                  >
                    <span className="navbar-interactive-text8">
                      Sub-menu Item
                    </span>
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
  Logo_src: 'https://presentation-website-assets.teleporthq.io/logos/logo.png',
  Logo_alt: 'logo',
  heading: 'TABEYOU',
  text: 'ホームページ',
  text1: 'ハノイ',
  text2: '食べ物&飲み物',
  text3: 'ログイン',
  rootClassName: '',
  button: 'ホームページ',
  button1: 'ログイン',
}

NavbarInteractive.propTypes = {
  Logo_src: PropTypes.string,
  Logo_alt: PropTypes.string,
  heading: PropTypes.string,
  text: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  text3: PropTypes.string,
  rootClassName: PropTypes.string,
  button: PropTypes.string,
  button1: PropTypes.string,
}

export default NavbarInteractive

import React from 'react'
import { Route } from 'react-router';
import PropTypes from 'prop-types'

import './footer.css'

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const Footer = (props) => {
  return (
    <div className="footer-footer">
      <div className="footer-container">
        <div className="footer-container1">
          <div className="footer-container2">
            <img
              src={props.image_src1}
              alt={props.image_alt}
              className="footer-image"
            />
            <span className="footer-text">
              <span>TABEYOU</span>
              <br></br>
            </span>
          </div>
          <div className="footer-container3">
            <img
              src="library/dx/images/facebook.png"
              alt={props.image_alt}
              className="footer-image1"
            />
            <img
              src="library/dx/images/twitter.png"
              alt={props.image_alt}
              className="footer-image1"
            />
            <img
              src="library/dx/images/youtube.png"
              alt={props.image_alt}
              className="footer-image1"
            />
          </div>
        </div>
        <div className="footer-container4">
          <h1 className="footer-heading">{props.heading}</h1>
          <a
            href={props.link_text}
            target="_blank"
            rel="noreferrer noopener"
            className="footer-link"
          >
            {props.text1}
          </a>
          <a
            href={props.link_text}
            target="_blank"
            rel="noreferrer noopener"
            className="footer-link"
          >
            {props.text2}
          </a>
          <a
            href={props.link_text}
            target="_blank"
            rel="noreferrer noopener"
            className="footer-link"
          >
            {props.text3}
          </a>
          <a
            href={props.link_text}
            target="_blank"
            rel="noreferrer noopener"
            className="footer-link"
          >
            {props.text4}
          </a>
          <a
            href={props.link_text}
            target="_blank"
            rel="noreferrer noopener"
            className="footer-link"
          >
            {props.text5}
          </a>
        </div>
        <div className="footer-container5">
          <h1 className="footer-heading">{props.heading1}</h1>
          <a
            href={props.link_text}
            target="_blank"
            rel="noreferrer noopener"
            className="footer-link"
          >
            {props.text6}
          </a>
          <a
            href={props.link_text}
            target="_blank"
            rel="noreferrer noopener"
            className="footer-link"
          >
            {props.text7}
          </a>
          <a
            href={props.link_text}
            target="_blank"
            rel="noreferrer noopener"
            className="footer-link"
          >
            {props.text8}
          </a>
        </div>
        <div className="footer-container6">
          <h1 className="footer-heading">{props.heading2}</h1>
          <a
            href={props.link_text}
            target="_blank"
            rel="noreferrer noopener"
            className="footer-link"
          >
            {props.text9}
          </a>
          <a
            href={props.link_text}
            target="_blank"
            rel="noreferrer noopener"
            className="footer-link"
          >
            {props.text10}
          </a>
          <a
            href={props.link_text}
            target="_blank"
            rel="noreferrer noopener"
            className="footer-link"
          >
            {props.text11}
          </a>
        </div>
      </div>
      <div className="footer-container7">
        <span className="footer-text6">{props.text}</span>
        <img
          src="library/dx/images/up-arrow.png"
          alt={props.image_alt}
          className="footer-image4"
          onClick={scrollToTop}
        />
      </div>
    </div>
  )
}

Footer.defaultProps = {
  text: '著作権 © 2023 。 全著作権所有。',
  image_src: 'https://play.teleporthq.io/static/svg/default-img.svg',
  image_alt: 'image',
  heading: 'コンタクト',
  text1: 'インスタグラム',
  link_text: 'https://example.com',
  text2: 'フェイスブック', 
  text3: 'ツイッター',
  text4: 'ユーチューブ',
  text5: 'グーグル',
  heading1: 'リンク',
  text6: 'ホームページ',
  text7: '食べ物&飲み物',
  text8: 'コンタクト',
  heading2: '会社',
  text9: 'ご利用条件',
  text10: 'プライバシーポリシー',
  text11: 'クッキーポリシー',
  image_src1: '/library/dx/images/TabeyouLogo.png',
  image_src2: 'https://play.teleporthq.io/static/svg/default-img.svg',
  image_src3: 'https://play.teleporthq.io/static/svg/default-img.svg',
  image_src4: 'https://play.teleporthq.io/static/svg/default-img.svg',
}

Footer.propTypes = {
  text: PropTypes.string,
  image_src: PropTypes.string,
  image_alt: PropTypes.string,
  heading: PropTypes.string,
  text1: PropTypes.string,
  link_text: PropTypes.string,
  text2: PropTypes.string,
  text3: PropTypes.string,
  text4: PropTypes.string,
  text5: PropTypes.string,
  heading1: PropTypes.string,
  text6: PropTypes.string,
  text7: PropTypes.string,
  text8: PropTypes.string,
  heading2: PropTypes.string,
  text9: PropTypes.string,
  text10: PropTypes.string,
  text11: PropTypes.string,
  image_src1: PropTypes.string,
  image_src2: PropTypes.string,
  image_src3: PropTypes.string,
  image_src4: PropTypes.string,
}

export default Footer

import React from 'react'
// import { LeftOutlined } from '@ant-design/icons';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';


import NavbarInteractive from './navbar-interactive'
import CategoryList from './category-list'
import FoodList from './food-list'
import ResList from './res-list'
import SlideShow from './slideshow'
import InputComponent from './input-component'
import { useHistory, useLocation } from 'react-router-dom';
import Avt from '../images/avt.png'
import './home.css'

const Home = (props) => {
  const history = useHistory();
  const openProfile = () => {
    history.push(`/profile`);
  }
  return (
    <div className="home-container">
        <title>TABEYOU</title>
        <meta property="og:title" content="TABEYOU" />
      <NavbarInteractive rootClassName="navbar-interactive-root-class-name"></NavbarInteractive>
      <div className="big-container">
        <div className="home-staff-container1">
          <span className="home-staff-text">こんにちは、</span>
          <img
            src={Avt}
            alt="image"
            className="home-staff-image"
            onClick={openProfile}
          />
        </div>
        <InputComponent></InputComponent>
      </div>
      <div className='user-point'>
        <span className="point-text">5400</span>
        <img
          src="/library/dx/images/coin.png"
          alt="image"
          className="coin-img"
        />
      </div>
      <div className='home-slide-show'>
        <SlideShow></SlideShow>
      </div>
      <div className="home-category-header">
        <img
          alt="image"
          src="/library/dx/images/Shape.png"
          loading="lazy"
          className="home-image"
        />
        <h1 className="home-text">項目</h1>
      </div>
      <div className="home-category-container">
        <button type="button" className="home-button button">
        <LeftOutlined />
        </button>
        <CategoryList></CategoryList>
        <button type="button" className="home-button button">
        <RightOutlined />       
        </button>
      </div>
      <div className="home-container2">
        <div className="home-category-header1">
          <img
            alt="image"
            src="/library/dx/images/update_2.jpg"
            loading="lazy"
            className="home-image1"
          />
          <h1 className="home-text">人気がある料理</h1>
        </div>
      </div>
      <div className="home-fav-food-container">
        <FoodList></FoodList>
      </div>
      <div className="home-container3">
        <div className="home-category-header2">
          <img
            alt="image"
            src="/library/dx/images/update_2.jpg"
            loading="lazy"
            className="home-image2"
          />
          <h1 className="home-text">人気があるレストラン</h1>
        </div>
      </div>
      <div className="home-fav-res-container">
        <ResList></ResList>
      </div>
    </div>
  )
}

export default Home

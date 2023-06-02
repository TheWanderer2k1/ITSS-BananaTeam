import React from 'react'

import NavbarInteractive from './navbar-interactive'
import FoodItem from './food-item'
import './home.css'

const Home = (props) => {
  return (
    <div className="home-container">
      <Helmet>
        <title>Portly Cooked Tarsier</title>
        <meta property="og:title" content="Portly Cooked Tarsier" />
      </Helmet>
      <NavbarInteractive rootClassName="navbar-interactive-root-class-name"></NavbarInteractive>
      <input
        type="text"
        placeholder="食べ物で検索"
        className="home-search-field input"
      />
      <img
        src="/external/food_slideshow_1-1500w.jpg"
        alt="food_slideshow"
        loading="lazy"
        className="home-slide-show"
      />
      <div className="home-category-header">
        <img
          src="/external/shape-200h.png"
          alt="image"
          loading="lazy"
          className="home-image"
        />
        <h1 className="home-text">項目</h1>
      </div>
      <div className="home-container1">
        <button type="button" className="home-button button">
          &lt;
        </button>
        <button type="button" className="home-button1 button">
          <span className="home-text1">
            <span>&gt;</span>
            <br></br>
          </span>
        </button>
      </div>
      <div className="home-container2">
        <div className="home-category-header1">
          <img
            src="/external/update_2-200h.jpg"
            alt="image"
            loading="lazy"
            className="home-image1"
          />
          <h1 className="home-text4">人気がある料理</h1>
        </div>
      </div>
      <div className="home-fav-food">
        <div className="home-line-1">
          <FoodItem></FoodItem>
          <FoodItem></FoodItem>
          <FoodItem></FoodItem>
          <FoodItem></FoodItem>
        </div>
        <div className="home-line-2">
          <FoodItem></FoodItem>
          <FoodItem></FoodItem>
          <FoodItem></FoodItem>
          <FoodItem></FoodItem>
        </div>
      </div>
    </div>
  )
}

export default Home

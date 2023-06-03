import React from 'react'

import NavbarInteractive from './navbar-interactive'
import CategoryItem from './category-item'
import CategoryList from './category-list'
import FoodItem from './food-item'
import ResItem from './res-item'
import SlideShow from './slideshow'
import './home.css'

const Home = (props) => {
  return (
    <div className="home-container">
        <title>TABEYOU</title>
        <meta property="og:title" content="TABEYOU" />
      <NavbarInteractive rootClassName="navbar-interactive-root-class-name"></NavbarInteractive>

      <input type="text" placeholder="食べ物で検索" className="home-search-field input"/>
    
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
          &lt;
        </button>
        <div className="home-container1">
          <CategoryList></CategoryList>
        </div>
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
            alt="image"
            src="/library/dx/images/update_2.jpg"
            loading="lazy"
            className="home-image1"
          />
          <h1 className="home-text">人気がある料理</h1>
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
      <div className="home-fav-res">
        <div className="home-line-11">
          <ResItem></ResItem>
          <ResItem></ResItem>
          <ResItem></ResItem>
          <ResItem></ResItem>
        </div>
        <div className="home-line-21">
          <ResItem rootClassName="res-item-root-class-name"></ResItem>
          <ResItem rootClassName="res-item-root-class-name3"></ResItem>
          <ResItem rootClassName="res-item-root-class-name1"></ResItem>
          <ResItem rootClassName="res-item-root-class-name2"></ResItem>
        </div>
      </div>
    </div>
  )
}

export default Home

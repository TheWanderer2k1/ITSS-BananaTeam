import React from 'react';
import {RightOutlined, LeftOutlined} from "@ant-design/icons"
import './food-info.css';

function FoodInfo(props) {
  const { image, name, price, description, score, restaurantImg, onClickPrev, onClickNext } = props;

  return (
    <div className="food-info">
      <div className="food-image">
        <img src={image} alt="Food Image" />
        <div className="food-nav">
          <button className="prev-button" onClick={onClickPrev}>
          <LeftOutlined />
          </button>
          <button className="next-button" onClick={onClickNext}>
          <RightOutlined />
          </button>
        </div>
        <div className="food-score">
          <p>{score}/5 <i class="fa fa-star c-star-color"></i></p>
        </div>
        <div className="resImg">
          <img className='imgcl' src={image} alt="Res Image" />
        </div>
      </div>
      <div className="food-price">
        <h2><strong>{price}</strong> ドン</h2>
      </div>
      <div className="food-name">
        <h1>{name}</h1>
      </div>
      <div className="food-description">
      <p>{description}</p>     
      </div>
    </div>
  );
}

export default FoodInfo;
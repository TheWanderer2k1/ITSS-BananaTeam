import React from 'react';
import './food-info.css';

function FoodInfo(props) {
  const { image, name, price, description, score, restaurantImg, onClickPrev, onClickNext } = props;

  return (
    <div className="food-info">
      <div className="food-image">
        <img src={image} alt="Food Image" />
        <div className="food-nav">
          <button className="prev-button" onClick={onClickPrev}>
            &lt;
          </button>
          <button className="next-button" onClick={onClickNext}>
            &gt;
          </button>
        </div>
        <div className="food-score">
          <p>{score}/5</p>
        </div>
        <div className="resImg">
          <img className='imgcl' src={image} alt="Res Image" />
        </div>
      </div>
      <div className="food-price">
        <h2>{price} VND</h2>
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
import React, { useState } from 'react';
import './food-info.css';
import { Link } from 'react-router-dom';

function FoodInfo(props) {
  const { image , name, price, description, score, restaurantImg,restaurantId } = props;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrev = () => {
    console.log(currentImageIndex);
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNext = () => {
    console.log(currentImageIndex);
    if ( currentImageIndex < image?.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <div className="food-info">
      <div className="food-image">
        <img src={process.env.REACT_APP_SERVER + image[currentImageIndex]} alt="Food Image" />
        <div className="food-nav">
  <button className="prev-button" onClick={handlePrev}>
    &lt;
  </button>
  <button className="next-button" onClick={handleNext}>
    &gt;
  </button>
</div>
        <div className="food-score">
          <p>{score}/5</p>
        </div>
        <div className="resImg">
          <Link to={`/resinfo?res_id=${restaurantId}`}>
    <img className='imgcl' src={process.env.REACT_APP_SERVER + restaurantImg} alt="Res Image" />
  </Link>
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
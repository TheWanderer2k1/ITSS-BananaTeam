import React from 'react'
import PropTypes from 'prop-types'
import './food-item.css'
import { useLocation, useHistory } from 'react-router-dom';


const FoodItem =  ({ id, image_alt, image_src, name, price, rating, restaurant }) => {
  const history = useHistory();
  const handleRedirect = () => {
    history.push(`/FoodInforPage/${id}`);
  }
  return (
    <div className="food-item" onClick={handleRedirect}>
        <div className="row d-flex">
            <div className="hfood-image">
                <img src={image_src} alt={image_alt} />
                {/* <div className="food-rate">{Math.round(rating)} <i class="fa fa-star"></i></div> */}
                {/* <div className="food-rate">{rating} <i class="fa fa-star"></i></div> */}
                <div className="food-rate">{rating ? rating.toFixed(2): Math.round(rating)} <i class="fa fa-star"></i></div>
            </div>
            <div className="food-info">
                <div className="hfood-name">{name}</div>
                <div className="food-restaurant"><i class="fa fa-map-marker"></i> {restaurant.name + ', ' + restaurant.detailedAdress}</div>
                <div className="food-restaurant-time"><i class="fa fa-pin"></i> {restaurant.openTime + ' - ' + restaurant.closeTime}</div>
                {/* <div className="food-price"><i class="fa fa-money"></i> {price} 円</div> */}
                <div className="hfood-price"><i class="fa fa-money"></i> {price ? price.toLocaleString() : 0} ドン</div>
            </div>
        </div>
    </div>
  )
}

FoodItem.defaultProps = {
  image_src: '/library/dx/images/food-slideshow.png',
  image_alt: 'fav-food-img',
  text: '豚つくね',
}

FoodItem.propTypes = {
  image_src: PropTypes.string,
  image_alt: PropTypes.string,
  Text: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default FoodItem

import React from 'react'
import PropTypes from 'prop-types'
import './food-item.css'

const FoodItem =  ({ image_alt, image_src, name, price, rating, restaurant }) => {
  return (
    <div className="food-item">
        <div className="row d-flex">
            <div className="food-image">
                <img src={image_src} alt={image_alt} />
                <div className="food-rate">{Math.round(rating)} <i class="fa fa-star"></i></div>
            </div>
            <div className="food-info">
                <div className="food-name">{name}</div>
                <div className="food-restaurant"><i class="fa fa-pin"></i> {restaurant.name + ', ' + restaurant.address}</div>
                <div className="food-restaurant-time"><i class="fa fa-pin"></i> {restaurant.openTime + ' - ' + restaurant.closeTime}</div>
                <div className="food-price"><i class="fa fa-money"></i> {price} 円</div>
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

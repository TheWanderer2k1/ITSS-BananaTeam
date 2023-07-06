import React from 'react'
import PropTypes from 'prop-types'
import './food-item.css'
import { useLocation, useHistory } from 'react-router-dom';

const FoodItem =  ({ id,image_alt, image_src, text }) => {
  const history = useHistory();
  const handleRedirect = () => {
    history.push(`/FoodInforPage/${id}`);
  }
  return (
    <div className={`food-item-food-item `} onClick={handleRedirect}>
      <img
        src={image_src}
        alt={image_alt}
        className="food-item-image"
      />
      <span className="food-item-text">{text}</span>
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

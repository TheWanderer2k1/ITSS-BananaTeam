import React from 'react'

import PropTypes from 'prop-types'

import './food-item.css'

const FoodItem = (props) => {
  return (
    <div className={`food-item-food-item ${props.rootClassName} `}>
      <img
        src={props.image_src}
        alt={props.image_alt}
        className="food-item-image"
      />
      <span className="food-item-text">{props.Text}</span>
    </div>
  )
}

FoodItem.defaultProps = {
  image_src: '/external/food_slideshow_1-1500w.jpg',
  image_alt: 'image',
  Text: '豚つくね',
  rootClassName: '',
}

FoodItem.propTypes = {
  image_src: PropTypes.string,
  image_alt: PropTypes.string,
  Text: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default FoodItem

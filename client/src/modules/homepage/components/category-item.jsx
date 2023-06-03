import React from 'react';
import PropTypes from 'prop-types';
import './category-item.css';

const CategoryItem = ({ image_alt, image_src, text }) => {
  return (
    <div className="category-item-category-item">
      <img
        alt={image_alt}
        src={image_src}
        className="category-item-image"
      />
      <span className="category-item-text">{text}</span>
    </div>
  )
}

CategoryItem.defaultProps = {
  image_alt: 'image',
  text: '弁当',
  image_src: 'https://play.teleporthq.io/static/svg/default-img.svg',
}


CategoryItem.propTypes = {
  image_alt: PropTypes.string,
  text: PropTypes.string,
  image_src: PropTypes.string,
}

export default CategoryItem;

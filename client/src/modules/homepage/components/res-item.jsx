import React from 'react'

import PropTypes from 'prop-types'

import './res-item.css'

const ResItem = (props) => {
  return (
    <div className={`res-item-container ${props.rootClassName} `}>
      <img
        alt={props.image_alt}
        src={props.image_src}
        className="res-item-image"
      />
      <span className="res-item-text">{props.text}</span>
    </div>
  )
}

ResItem.defaultProps = {
  image_src: 'https://play.teleporthq.io/static/svg/default-img.svg',
  text: 'VietNam Cafe',
  rootClassName: '',
  image_alt: 'image',
}

ResItem.propTypes = {
  image_src: PropTypes.string,
  text: PropTypes.string,
  rootClassName: PropTypes.string,
  image_alt: PropTypes.string,
}

export default ResItem

import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom';
import './res-item.css'

const ResItem = (props) => {
  const history = useHistory();
  
  const handleClick = () => {
    history.push(`/resinfo?res_id=${props.res_id}`);
  };

  return (
    <div className={`res-item-container ${props.rootClassName} `}>
      <img
        alt={props.res_id}
        src={props.image_src}
        className="res-item-image"
        onClick={handleClick}
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
  res_id: 0,
}

ResItem.propTypes = {
  image_src: PropTypes.string,
  text: PropTypes.string,
  rootClassName: PropTypes.string,
  image_alt: PropTypes.string,
  res_id: PropTypes.number,
}

export default ResItem

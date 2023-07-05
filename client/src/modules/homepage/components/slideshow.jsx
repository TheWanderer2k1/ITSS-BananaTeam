import React, { useEffect, useState } from 'react';
import './slideshow.css';
import { sendRequest } from '../../../helpers/requestHelper';

function Slideshow() {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const delay = 7500;
  let timeoutRef = null;
  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    resetTimeout();
    timeoutRef = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, delay);

    return () => {
      resetTimeout();
    };
  }, [index, images]);

  const resetTimeout = () => {
    if (timeoutRef) {
      clearTimeout(timeoutRef);
    }
  };

  const fetchImages = async () => {
    const resp = await sendRequest({
        url: process.env.REACT_APP_SERVER + `/api/v1/home`,
        method: "GET",
      })
    console.log('in home', resp.data['content']['food_slider'])
    setImages(resp.data['content']['food_slider'])
  };

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {images.map((image, idx) => (
          <div className="slide" key={idx} style={{ backgroundImage: `url(${process.env.REACT_APP_SERVER}${image.img})` }}></div>
        ))}
      </div>

      <div className="slideshowDots">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? ' active' : ''}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Slideshow;
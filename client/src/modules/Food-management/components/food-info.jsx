import React from 'react';
import './food-info.css';

function FoodInfo(props) {
  const { image, name, description, score, onClickPrev, onClickNext, onClickDelete, onClickEdit } = props;

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
      </div>
      <div className="food-name">
        <h1>{name}</h1>
      </div>
      <div className="food-description">
        <p>{description}</p>
      </div>
      <div className="food-actions">
        <button className="delete-button" onClick={onClickDelete}>
          Xóa món ăn
        </button>
        <button className="edit-button" onClick={onClickEdit}>
          Chỉnh sửa món ăn
        </button>
      </div>
    </div>
  );
}

export default FoodInfo;
import React from 'react';
import './food-info.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

function FoodInfo(props) {
  //const { image, name, description, score, onClickPrev, onClickNext, onClickDelete, onClickEdit } = props;

  return (
    <div className="food-info">
      <div className="food-image">
        <img src={"https://i.pinimg.com/736x/7c/b5/49/7cb5492889809cb8303b76b80759f0df.jpg"} alt="Food Image" />
        <div className="food-nav">
          <button className="prev-button" >
            &lt;
          </button>
          <button className="next-button" >
            &gt;
          </button>
        </div>
        <div className="food-score">
          <p>4.5/5</p>
        </div>
      </div>
      <div className="food-name">
        <h1>gỏi cuốn</h1>
      </div>
      <div className="food-description">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis enim nesciunt dolorem facere consectetur adipisci! Commodi eligendi, reprehenderit est, porro magnam sunt, ullam nam optio sed id cumque recusandae. Iure.</p>
      </div>
      <div className="food-actions">
        <button className="delete-button">
      <FontAwesomeIcon className="delete-button-icon" icon={faTrash} />
      Xoá món ăn
    </button>

    <button className="edit-button">
    <FontAwesomeIcon className="edit-button-icon" icon={faEdit} />
     Chỉnh sửa món ăn
    </button>
      </div>
    </div>
  );
}

export default FoodInfo;
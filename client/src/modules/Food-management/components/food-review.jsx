import React from 'react';
import { Button, Checkbox, Rate, Input } from 'antd';
import './food-review.css';

function FoodReview(props) {
  return (
    <React.Fragment>
      <div className="container">
        <div className="food-info-list">
          <div className="food-info-item">
            <div className="food-info__label">
              Sao
            </div>
            <div className="food-info__detail">
              <Button type="text">Tất cả</Button>
              <Button type="text">1 <i class="fa fa-star c-star-color"></i></Button>
              <Button type="text">2 <i class="fa fa-star c-star-color"></i></Button>
              <Button type="text">3 <i class="fa fa-star c-star-color"></i></Button>
              <Button type="text">4 <i class="fa fa-star c-star-color"></i></Button>
              <Button type="text">5 <i class="fa fa-star c-star-color"></i></Button>
            </div>
          </div>
          <div className="food-info-item">
            <div className="food-info__label">
              Thời gian
            </div>
            <div className="food-info__detail">
              <Button type="text">Tất cả</Button>
              <Button type="text">Gần đây</Button>              
            </div>
          </div>
          <div className="food-info-item">
            <div className="food-info__label">
              Đính kèm
            </div>
            <div className="food-info__detail">
              <Checkbox>Ảnh</Checkbox>
              <Checkbox>Video</Checkbox>
            </div>
          </div>
        </div>
        <div className="review-list">
          <div className="review-block">
            <div className="review-block__header">  
              <div className="d-flex aic">
                <div className="review-block__avatar">
                  <img src="https://images.pexels.com/photos/17218003/pexels-photo-17218003/free-photo-of-analog-flowers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </div>
                <div className="review-block__username">
                  花澤
                </div>
                <div className="review-block__date">
                  2023/01/31
                </div>
              </div>    
              <div className="d-flex aic">
                <div className="review-block__rating mx-24 ">
                  <Rate disabled defaultValue={2}/>
                </div>
                <div className="review-block__like">
                  <i class="fa fa-heart"></i> 120
                </div>
              </div>
            </div>
            <div className="review-block__body">
              <ul>
                <li>Trang trí đẹp mắt: </li>
                <li>Mùi thơm: </li>
                <li>Đồ ăn tươi: </li>
                <li>Bát đũa sạch: </li>
                <li>Hợp khẩu vị: </li>
                <li>Giá phù hợp: </li>
                <li>Dịch vụ tốt: </li>
                <li>Khác: </li>
              </ul>
            </div>
            <div className="review-block__footer d-flex">
              <div className="review-block__my-avatar mx-12">
                <img src="https://images.pexels.com/photos/17218003/pexels-photo-17218003/free-photo-of-analog-flowers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
              </div>
              <div className="review-block__comment">
                <Input placeholder="Phản hồi" />
              </div>
            </div>
          </div>
        </div>
      </div>      
    </React.Fragment>
  );
}

export default FoodReview;
import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Rate, Input, Modal } from 'antd';
import { sendRequest } from '../../../helpers/requestHelper';
import { convertJsonObjectToFormData } from '../../../helpers/jsonObjectToFormDataObjectConverter';
import './food-review.css';
import axios from 'axios';
const { TextArea } = Input;

const FoodReview = ({id}) => {
  const [listAllComment, setListAllComment] = useState([]);
  const [listComment, setListComment] = useState([]);
  const [newCommentRate, setNewCommentRate] = useState(0);
  const [newCommentText, setNewCommentText] = useState('');
  const [editCommentRate, setEditCommentRate] = useState(0);
  const [editCommentText, setEditCommentText] = useState('');
  const [editCommentUserId, setEditCommentUserId] = useState(0);
  const [editingReviewId, setEditingReviewId] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (comment) => {
    setEditingReviewId(comment.reviewId);
    setEditCommentRate(comment.rating);
    setEditCommentText(comment.review);
    setEditCommentUserId(comment.userId);
    setIsModalOpen(true);
  };
  const onClickDeleteComment = (comment) => {
    deleteComment(comment.reviewId);
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    fetchFoodReview();
  }, []);

  const onClickLikeReview = async(reviewId) => {
    const url = `http://localhost:8000/api/v1/food/${id}/review/${reviewId}/reaction`;
    const data = {
      reactType: 3,
      userId: 3
    }
    const resp = await sendRequest({
      url: url,
      method: "POST",
      data: data,
    })
    fetchFoodReview();
  }
  
  const fetchFoodReview = async () => {
    var url = `http://localhost:8000/api/v1/food/${id}/review`;
    const resp = await sendRequest({
      url: url,
      method: "GET",
    });    
    setListComment(resp.data['content']);
    setListAllComment(resp.data['content']);
  }

  const getFormatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleString('en-US', options);
  }

  const handleCommentText = (event) => {
    setNewCommentText(event.target.value);
  };

  const handleEditCommentText = (event) => {
    setEditCommentText(event.target.value);
  };

  const postComment = async () => {
    const data = { 
      rating: newCommentRate,
      review: newCommentText,
      userId: 3,
      img: null,
    };
    // formData = convertJsonObjectToFormData(data);
    try {
      var url = `http://localhost:8000/api/v1/food/${id}/review`;
      const resp = await sendRequest({
        url: url,
        method: 'POST',
        data: data,
      });
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
    // const resp = await axios(url, options);
    // setListComment([...listComment, resp.data['content']]);
    // setNewCommentText('');
  };
  const editComment = async () => {
    const data = { 
      rating: editCommentRate,
      review: editCommentText,
      userId: editCommentUserId,
      img: null,
    };
    // formData = convertJsonObjectToFormData(data);
    try {
      var url = `http://localhost:8000/api/v1/food/${id}/review/`;
      url += `${editingReviewId}`;
      console.log('rul day: ', url);
      const resp = await sendRequest({
        url: url,
        method: 'PUT',
        data: data,
      });
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
    // const resp = await axios(url, options);
    // setListComment([...listComment, resp.data['content']]);
    // setNewCommentText('');
  };
  const deleteComment = async (reviewId) => {
    try {
      var url = `http://localhost:8000/api/v1/food/${id}/review/`;
      url += `${reviewId}`;
      console.log('rul day: ', url);
      const resp = await sendRequest({
        url: url,
        method: 'DELETE',
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
    // const resp = await axios(url, options);
    // setListComment([...listComment, resp.data['content']]);
    // setNewCommentText('');
  };

  const onFilterByStar = (rateStar) => {
    if(rateStar !== 0) {
      let newList = listAllComment.filter(comment => {
        return comment.rating === rateStar;
      })
      setListComment(newList);
    } else {
      setListComment(listAllComment);
    }
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="post-comment mb-24">
          <div className="post-avatar">
            <img src="https://images.pexels.com/photos/17218003/pexels-photo-17218003/free-photo-of-analog-flowers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="mr-24"/>
            <Rate onChange={setNewCommentRate} value={newCommentRate} />
          </div>
          <div className="comment-text-box">
            <TextArea onChange={handleCommentText} value={newCommentText} rows={4} className="mt-12" placeholder=""/>
            <div className="comment-send-icon">              
              <Button type="text" onClick	={postComment}><i class="fa fa-paper-plane"></i></Button>
            </div>
          </div>  
        </div>
        <div className="food-info-list">
          <div className="food-info-item">
            <div className="food-info__label">
              星
            </div>
            <div className="food-info__detail">
              <Button type="text" onClick={() => onFilterByStar(0)}>すべて</Button>
              <Button type="text" onClick={() => onFilterByStar(1)}>1 <i class="fa fa-star c-star-color"></i></Button>
              <Button type="text" onClick={() => onFilterByStar(2)}>2 <i class="fa fa-star c-star-color"></i></Button>
              <Button type="text" onClick={() => onFilterByStar(3)}>3 <i class="fa fa-star c-star-color"></i></Button>
              <Button type="text" onClick={() => onFilterByStar(4)}>4 <i class="fa fa-star c-star-color"></i></Button>
              <Button type="text" onClick={() => onFilterByStar(5)}>5 <i class="fa fa-star c-star-color"></i></Button>
            </div>
          </div>
          <div className="food-info-item">
            <div className="food-info__label">
              時間
            </div>
            <div className="food-info__detail">
              <Button type="text">すべて</Button>
              <Button type="text">新着順</Button>              
            </div>
          </div>
          <div className="food-info-item">
            <div className="food-info__label">
              添付
            </div>
            <div className="food-info__detail">
              <Checkbox>写真</Checkbox>
              <Checkbox>ビデオ</Checkbox>
            </div>
          </div>
        </div>
        <div className="review-list">
          {listComment.map((comment) => (
            <div className="review-block">
              <div className="review-block__header">  
                <div className="d-flex aic">
                  <div className="review-block__avatar">
                    <img src="https://images.pexels.com/photos/17218003/pexels-photo-17218003/free-photo-of-analog-flowers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  </div>
                  <div className="review-block__username">
                    {comment.userName}
                  </div>
                  <div className="review-block__date">
                    {getFormatDate(comment.updateAt)}
                  </div>
                </div>    
                <div className="d-flex aic">
                  <div className="review-block__rating mx-24 ">
                    <Rate disabled value={comment.rating}/>
                  </div>
                  <div className="review-block__like">
                    <Button onClick={() => onClickLikeReview(comment.reviewId)}><i class="fa fa-heart mr-6"></i> {comment.reactNumber}</Button>
                  </div>
                </div>
              </div>
              <div className="d-flex">
                <div className="review-block__body p-12 flex-9">
                  {comment.review}
                </div>
                <div className="flex-1">
                  <Button type="text"><i class="fa fa-edit" onClick={() => showModal(comment)}></i></Button>                
                  <Button type="text"><i class="fa fa-trash" onClick={() => onClickDeleteComment(comment)}></i></Button>                
                </div>
              </div>
              <div className="review-block__footer d-flex my-12">
                <div className="review-block__my-avatar mx-24">
                  <img src="https://images.pexels.com/photos/17218003/pexels-photo-17218003/free-photo-of-analog-flowers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </div>
                <div className="review-block__comment">
                  <Input placeholder="Phản hồi" />
                </div>
              </div>
            </div>
          ))}          
        </div>
      </div>      
      <Modal title="Edit review" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={<div></div>}>
        <React.Fragment>
          <div className="post-avatar">
            <img src="https://images.pexels.com/photos/17218003/pexels-photo-17218003/free-photo-of-analog-flowers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="mr-24"/>
            <Rate onChange={setEditCommentRate} value={editCommentRate} />
          </div>
          <div className="comment-text-box">
            <TextArea onChange={handleEditCommentText} value={editCommentText} rows={4} className="mt-12" placeholder=""/>
            <div className="comment-send-icon">              
              <Button type="text" onClick	={editComment}><i class="fa fa-paper-plane"></i></Button>
            </div>
          </div>
        </React.Fragment>
      </Modal>
    </React.Fragment>
  );
}

export default FoodReview;
// export default connect(mapState, mapDispatchToProps)(withTranslate(FoodReview));
import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Rate, Input, Modal, Image, Upload, message } from 'antd';
import { sendRequest } from '../../../helpers/requestHelper';
import { UploadFile } from '../../../common-components';
import { convertJsonObjectToFormData } from '../../../helpers/jsonObjectToFormDataObjectConverter';
import './food-review.css';
import axios from 'axios';
import { FileImageOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const oneDay = 24 * 60 * 60 * 1000; // number of milliseconds in one day
const now = new Date();

const FoodReview = ({ id ,avatarImage}) => {

  const [listStart, setListStar] = useState([
    { value: 0, label: "すべて", isHover: true },
    { value: 1, label: "1", iconClass: "fa fa-star c-star-color", isHover: false },
    { value: 2, label: "2", iconClass: "fa fa-star c-star-color", isHover: false },
    { value: 3, label: "3", iconClass: "fa fa-star c-star-color", isHover: false },
    { value: 4, label: "4", iconClass: "fa fa-star c-star-color", isHover: false },
    { value: 5, label: "5", iconClass: "fa fa-star c-star-color", isHover: false }
  ])


  const [listAllComment, setListAllComment] = useState([]);
  const [listComment, setListComment] = useState([]);
  const [newCommentRate, setNewCommentRate] = useState(0);
  const [newCommentText, setNewCommentText] = useState('');
  const [editCommentRate, setEditCommentRate] = useState(0);
  const [editCommentText, setEditCommentText] = useState('');
  const [editCommentUserId, setEditCommentUserId] = useState(0);
  const [editingReviewId, setEditingReviewId] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleFullImage, setVisibleFullImage] = useState(false);
  const [uploadImg, setUploadImg] = useState({ recommendFiles: [] });
  const [fileList, setFileList] = useState([]);
  const [checkedListByImg, setCheckedListByImg] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isAllActive, setIsAllActive] = useState(true);

  const clickRecentReview = (e) => {
    const newListComment = listComment.filter((item) => {
      const itemDate = new Date(item.updateAt);
      return (now - itemDate) < oneDay;
    })
    setListComment(newListComment);
    setIsAllActive(false);
  }

  const onChangeCheckImage = (e) => {
    if (e.target.checked) {
      setCheckedListByImg(e.target.checked)
      const newListComment = listComment.filter((item) => {
        return item.img && item.img.length > 0
      });
      setListComment([...newListComment]);
    } else {
      setCheckedListByImg(!e.target.checked)
      fetchFoodReview();
    }
  };

  const pointMessage = () => {
    messageApi.info('100ポイントを獲得します!');
  };
  const [values, setValues] = useState({
    cleanliness: '',
    smell: '',
    freshness: '',
    tableware: '',
    taste: '',
    price: '',
    service: '',
    other: '',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };
  // const handleSubmit = (event) => {
  //   console.log("aa");
  //   event.preventDefault();
  //   const data = {
  //     cleanliness: values.cleanliness,
  //     smell: values.smell,
  //     freshness: values.freshness,
  //     tableware: values.tableware,
  //     taste: values.taste,
  //     price: values.price,
  //     service: values.service,
  //     other: values.other,
  //   };
  //   const reviewString = `・きれいに並べられたか：${data.cleanliness}<br>・いい匂いか：${data.smell}<br>・新鮮なのか：${data.freshness}<br>・きれいな箸、お茶碗なのか：${data.tableware}<br>・口に合うか：${data.taste}<br>・良い値段か：${data.price}<br>・良いサービスか：${data.service}<br>・他に：${data.other}`;
  //   console.log(reviewString);
  //   postComment(reviewString);
  //   setValues({
  //     cleanliness: '',
  //     smell: '',
  //     freshness: '',
  //     tableware: '',
  //     taste: '',
  //     price: '',
  //     service: '',
  //     other: '',
  //   });
  // };
  const handleChangeUploadFile = (info) => {
    let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    // newFileList = newFileList.slice(-2);

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });
    setFileList(newFileList);
  };
  const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange: handleChangeUploadFile,
    multiple: true,
  };
  const showModal = (comment) => {
    setEditingReviewId(comment.reviewId);
    setEditCommentRate(comment.rating);
    setEditCommentText(comment.review);
    setEditCommentUserId(comment.userId);
    setIsModalOpen(true);
  };
  const onClickDeleteComment = (comment) => {
    // deleteComment(comment.reviewId);
    deleteComment(comment);
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

  const onClickLikeReview = async (reviewId, index) => {
    const url = `${process.env.REACT_APP_SERVER}/api/v1/food/${id}/review/${reviewId}/reaction`;
    const data = {
      reactType: 3,
      userId: 3
    }
    const resp = await sendRequest({
      url: url,
      method: "POST",
      data: data,
    })
    let newCommentList = [...listComment]
    newCommentList[index].liked.push(3);
    newCommentList[index].reactNumber += 1;
    setListComment(newCommentList);
    // fetchFoodReview();
  }

  const onRemoveLikeReview = async (reviewId, index) => {
    const url = `${process.env.REACT_APP_SERVER}/api/v1/food/${id}/review/${reviewId}/reaction`;
    const data = {
      userId: 3
    }
    const resp = await sendRequest({
      url: url,
      method: "DELETE",
      data: data,
    });
    let newCommentList = [...listComment]
    const indexToRemove = newCommentList[index].liked.indexOf(3);
    newCommentList[index].liked.splice(indexToRemove, 1);
    newCommentList[index].reactNumber -= 1;
    setListComment(newCommentList);
    // fetchFoodReview();
  }

  const fetchFoodReview = async () => {
    var url = `${process.env.REACT_APP_SERVER}/api/v1/food/${id}/review`;
    const resp = await sendRequest({
      url: url,
      method: "GET",
    });
    setListComment(resp.data['content']);
    setListAllComment(resp.data['content']);
    setIsAllActive(true);
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
    const comment = {
      cleanliness: values.cleanliness,
      smell: values.smell,
      freshness: values.freshness,
      tableware: values.tableware,
      taste: values.taste,
      price: values.price,
      service: values.service,
      other: values.other,
    };
    const reviewString = `・きれいに並べられたか：${comment.cleanliness}<br>・いい匂いか：${comment.smell}<br>・新鮮なのか：${comment.freshness}<br>・きれいな箸、お茶碗なのか：${comment.tableware}<br>・口に合うか：${comment.taste}<br>・良い値段か：${comment.price}<br>・良いサービスか：${comment.service}<br>・他に：${comment.other}`;
    const data = {
      rating: newCommentRate,
      review: reviewString,
      userId: 3,
      img: null,
    };
    let formData = convertJsonObjectToFormData(data);
    if (fileList && fileList.length > 0) {
      fileList.forEach(obj => {
        // formData.append('img', obj.fileUpload)
        formData.append('img', obj.originFileObj)
      })
    }
    try {
      var url = `${process.env.REACT_APP_SERVER}/api/v1/food/${id}/review`;
      const resp = await sendRequest({
        url: url,
        method: 'POST',
        data: formData,
      });
      if (resp.data.message == "100ポイントを獲得します!") {
        pointMessage();
      }
    } catch (error) {
      console.error(error);
    }
    fetchFoodReview();
    setFileList([]);
    setValues({
      cleanliness: '',
      smell: '',
      freshness: '',
      tableware: '',
      taste: '',
      price: '',
      service: '',
      other: '',
    });
    // window.location.reload();
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
      var url = `${process.env.REACT_APP_SERVER}/api/v1/food/${id}/review/`;
      url += `${editingReviewId}`;
      console.log('rul day: ', url);
      const resp = await sendRequest({
        url: url,
        method: 'PUT',
        data: data,
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
    fetchFoodReview();
  };
  const deleteComment = async (review) => {
    try {
      const data = {
        userId: review.userId
      }
      var url = `${process.env.REACT_APP_SERVER}/api/v1/food/${id}/review/`;
      url += `${review.reviewId}`;
      console.log('rul day: ', url);
      const resp = await sendRequest({
        url: url,
        method: 'DELETE',
        data: data
      });
      fetchFoodReview();
      // window.location.reload();
    } catch (error) {
      console.error(error);
    }
    // const resp = await axios(url, options);
    // setListComment([...listComment, resp.data['content']]);
    // setNewCommentText('');
  };

  const onFilterByStar = (rateStar) => {
    if (rateStar !== 0) {
      let newList = []
      if (checkedListByImg) {
        if (listComment.length === 0) {
          fetchFoodReview().then(() => {
            const newListComment = listAllComment.filter((item) => {
              return item.img && item.img.length > 0
            });
            setListComment([...newListComment]);
          });
        }
        newList = listComment.filter(comment => {
          return comment.rating === rateStar;
        })
      } else {
        newList = listAllComment.filter(comment => {
          return comment.rating === rateStar;
        })
      }
      setListComment(newList);
    } else {
      setListComment(listAllComment);
    }
    handleChangeStarStatus(rateStar)
  };

  const handleChangeStarStatus = (value) => {

    const updatedNumStars = listStart.map(star => {
      if (star.value === value) {
        return { ...star, isHover: true };
      } else {
        return { ...star, isHover: false };
      }
    });
    listStart.length = 0;
    listStart.push(...updatedNumStars);
  };

  const handleChangeFile = (files) => {
    const recommendFiles = files.map(x => ({
      url: x.urlFile,
      fileUpload: x.fileUpload
    }))
    setUploadImg(recommendFiles);
  };

  return (
    <React.Fragment>
      {contextHolder}
      <div className="container">
        <div className="post-comment mb-24">
          <div className="post-avatar">
            <img src={avatarImage} alt="" className="mr-24" style={{ width: '10%' }} />
            <Rate style={{ width: '30%' }} onChange={setNewCommentRate} value={newCommentRate} />
            <Upload style={{ width: '40%' }} {...props} fileList={fileList} listType="picture" maxCount={100} multiple>
              <Button type="text" danger><i className="fa fa-upload"></i><FileImageOutlined style={{ color: 'red', fontSize: "24px" }} /></Button>
            </Upload>
            <div style={{ width: '40%' }}>
            </div>
          </div>
          <div className="comment-text-box">
            {/* <TextArea onChange={handleCommentText} value={newCommentText} rows={4} className="mt-12" placeholder=""/> */}
            <div className="food-review-form">
              <div className="form-item">
                <div className='input-item'>
                  <label>・きれいに並べられたか：</label>
                  <input
                    type="text"
                    name="cleanliness"
                    value={values.cleanliness}
                    onChange={handleChange}
                  />
                </div>
                <div className='input-item'>
                  <label>・いい匂いか：</label>
                  <input
                    type="text"
                    name="smell"
                    value={values.smell}
                    onChange={handleChange}
                  />
                </div>
                <div className='input-item'>
                  <label>・新鮮なのか：</label>
                  <input
                    type="text"
                    name="freshness"
                    value={values.freshness}
                    onChange={handleChange}
                  />
                </div>
                <div className='input-item'>
                  <label>・きれいな箸、お茶碗なのか：</label>
                  <input
                    type="text"
                    name="tableware"
                    value={values.tableware}
                    onChange={handleChange}
                  />
                </div>
                <div className='input-item'>
                  <label>・口に合うか：</label>
                  <input
                    type="text"
                    name="taste"
                    value={values.taste}
                    onChange={handleChange}
                  />
                </div>
                <div className='input-item'>
                  <label>・良い値段か：</label>
                  <input
                    type="text"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                  />
                </div>
                <div className='input-item'>
                  <label>・良いサービスか：</label>
                  <input
                    type="text"
                    name="service"
                    value={values.service}
                    onChange={handleChange}
                  />
                </div>
                <div className='input-item'>
                  <label>・他に：</label>
                  <input
                    type="text"
                    name="other"
                    value={values.other}
                    onChange={handleChange}
                  />
                </div>
                <div>
                </div>
              </div></div>
            <div className="comment-send-icon">
              <Button type="text" onClick={postComment}><i class="fa fa-paper-plane"></i></Button>
            </div>
          </div>
        </div>
        <div className="food-info-list">
          <div className="food-info-item">
            <div className="food-info__label">
              <strong>星</strong>
            </div>
            <div className="food-info__detail">
              {
                listStart.map((star) =>
                  <Button type="text" key={star.value} onClick={() => onFilterByStar(star.value)} className={ star.isHover && 'is-selected' }>
                    {star.label} {star.iconClass && <i class={star.iconClass}></i>}
                  </Button>
                )
              }
            </div>
          </div>
          <div className="food-info-item">
            <div className="food-info__label">
              <strong>時間</strong>
            </div>
            <div className="food-info__detail">
              <Button type="text" onClick={fetchFoodReview} className={isAllActive ? "is-selected" : ""}>すべて</Button>
              <Button type="text" onClick={clickRecentReview} className={!isAllActive ? "is-selected" : ""}>新着順</Button>
            </div>
          </div>
          <div className="food-info-item">
            <div className="food-info__label">
              <strong>添付</strong>
            </div>
            <div className="food-info__detail">
              <Checkbox style={{ marginLeft: '18px' }} onChange={onChangeCheckImage}>写真</Checkbox>
              {/* <Checkbox>ビデオ</Checkbox> */}
            </div>
          </div>
        </div>
        <div className="review-list">
          {listComment.map((comment, index) => (
            <div className="review-block">
              <div className="review-block__header">
                <div className="d-flex aic">
                  <div className="review-block__avatar">
                    <img src={comment.avatar} alt="" />
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
                    <Rate disabled value={comment.rating} />
                  </div>
                  <div className="review-block__like">
                    {
                      comment.liked.length > 0 && comment.liked.includes(3)
                        ?
                        <Button type="primary" onClick={() => onRemoveLikeReview(comment.reviewId, index)}><i class="fa fa-heart mr-6"></i> {comment.reactNumber}</Button>
                        :
                        <Button onClick={() => onClickLikeReview(comment.reviewId, index)}><i class="fa fa-heart mr-6"></i> {comment.reactNumber}</Button>
                    }
                  </div>
                </div>
              </div>
              <div className="d-flex">
                <div className="review-block__body p-12 flex-9">
                  {/* {comment.review} */}
                  <div dangerouslySetInnerHTML={{ __html: comment.review }} />
                  <div className="comment-image-block">
                    {/* <img className='comment-image' src="https://images.pexels.com/photos/17218003/pexels-photo-17218003/free-photo-of-analog-flowers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" /> */}
                    {/* <Image
                      className='comment-image'
                      preview={{visibleFullImage: false}}
                      width={80}
                      src='https://images.pexels.com/photos/17218003/pexels-photo-17218003/free-photo-of-analog-flowers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                      onClick={() => setVisibleFullImage(true)}
                    /> */}
                    {comment.img && comment.img.length > 0 ?
                      <div>
                        <Image.PreviewGroup
                          className='comment-image'
                          preview={{
                            visibleFullImage,
                            onVisibleChange: (vis) => setVisibleFullImage(vis)
                          }}
                        >
                          <Image width={80} src={comment.img[0]} />
                          {/* <Image width={80} src="https://images.pexels.com/photos/17218003/pexels-photo-17218003/free-photo-of-analog-flowers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" /> */}
                          {
                            // comment.img.slice()
                            comment.img.length > 1 ?
                              comment.img.slice(1).map((img) => (
                                <Image style={{ display: 'none' }} key={img} src={img} />
                              ))
                              : <div></div>
                          }
                          {/* <Image style={{display: 'none'}} src="https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp" />
                        <Image style={{display: 'none'}} src="https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp" /> */}
                        </Image.PreviewGroup>
                      </div> : <div></div>}
                  </div>
                </div>
                <div className="flex-1">
                  {
                    comment.userId == 3 ? <>
                      <Button type="text"><i class="fa fa-edit" style={{ color: "red" }} onClick={() => showModal(comment)}></i></Button>
                      <Button type="text"><i class="fa fa-trash" style={{ color: "red" }} onClick={() => onClickDeleteComment(comment)}></i></Button>

                    </> : <div style={{ width: '80px' }}></div>
                  }
                </div>
              </div>
              {/* <div className="review-block__footer d-flex my-12">
                <div className="review-block__my-avatar mx-24">
                  <img src="https://images.pexels.com/photos/17218003/pexels-photo-17218003/free-photo-of-analog-flowers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </div>
                <div className="review-block__comment">
                  <Input placeholder="Phản hồi" />
                </div>
              </div> */}
            </div>
          ))}
        </div>
      </div>
      <Modal title="レビューの編集" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={<div></div>}>
        <React.Fragment>
          <div className="post-avatar">
            <img src="https://images.pexels.com/photos/17218003/pexels-photo-17218003/free-photo-of-analog-flowers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="mr-24" />
            <Rate onChange={setEditCommentRate} value={editCommentRate} />
          </div>
          <div className="comment-text-box">
            <TextArea onChange={handleEditCommentText} value={editCommentText} rows={4} className="mt-12" placeholder="" />

            <div className="comment-send-icon">
              <Button type="text" onClick={editComment}><i class="fa fa-paper-plane"></i></Button>
            </div>
          </div>
        </React.Fragment>
      </Modal>
    </React.Fragment>
  );
}

export default FoodReview;
// export default connect(mapState, mapDispatchToProps)(withTranslate(FoodReview));

import React,{ useEffect, useState } from 'react'
import FoodItem from '../../homepage/components/food-item'
import { sendRequest } from '../../../helpers/requestHelper';
import './homepage-staff.css'
import { useHistory, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import NavbarInteractive from '../../homepage/components/navbar-interactive'
const HomeStaff = (props) => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState([]);
    const [user, setUserdata] = useState([]);
    const [usedPoint, setUsedPoint] = useState([]);
    const [data, setResData] = useState([]);
    const [topFoods, setTopFoods] = useState([]);
    const [firstfour, setFirstFour] = useState([]);
    const [lastfour, setLastFour] = useState([]);
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
    const [isValid, setIsValid] = useState(true);
    const [errmessage, setErrMessage] = useState([]);

    const openPopup = () => {
      if(phoneNumber && phoneNumber.startsWith('0')){
        console.log("Valid!");
      }
      if(phoneNumber.length > 0 && phoneNumber.startsWith('0')){
        setIsOpen(true);
        fetchUserdata();
        console.log("phonenumber:" + phoneNumber);
      }else{
        setIsPhoneNumberValid(false);
      }
    };

    const closePopup = () => {
        setIsOpen(false);
    };
    const history = useHistory();
    const openProfile = () => {
      history.push(`/profile`);
    }
    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
        setIsPhoneNumberValid(true);
    };

    const handleUsePoint = (event) => {
      let localusedPoint = event.target.value;
      if(localusedPoint.length > 0 && parseInt(localusedPoint) <= parseInt(user.point)){
        setIsValid(true);
        setErrMessage('none');
      }else{
        setIsValid(false);
        setErrMessage('Vui lòng nhập số điểm không lớn hơn số điểm khả dụng');
      }
      if(parseInt(localusedPoint) < 0){
        setIsValid(false);
        setErrMessage('Hãy nhập số nguyên dương');
      }
      if(localusedPoint.length == 0){
        setIsValid(true);
        setErrMessage('none');
      }
      setUsedPoint(event.target.value);
    };

    useEffect(() => {
        console.log(user);
    }, [user]);

    useEffect(() => {
        fetchPageInfo();
    }, [])

    useEffect(() => {
      //console.log('usedpoint:' + usedPoint)  
    }, [usedPoint])

    useEffect(() => {
      if (data && data.length > 0){
        const sortedMenu = data.sort((a, b) => b.rating - a.rating);
        const topFoods = sortedMenu.slice(0, 8);
        setTopFoods(topFoods);
      }
    }, [data])

    useEffect(() => {
      setFirstFour(topFoods.slice(0, 4));
      setLastFour(topFoods.slice(4));
  }, [topFoods])
    const fetchUserdata = async () => {
        let url = process.env.REACT_APP_SERVER + "/api/v1/user/"; //API here
        url+= phoneNumber + "/phone";
        console.log(url);
        const resp = await sendRequest({
            //url: `https://mocki.io/v1/92d0734f-ec77-4ee0-9a36-7a330349f933`,
            url: url,
            method: "GET",
          })
        setUserdata(resp.data['content']);

    };

    const fetchPageInfo= async () => {
      let url = process.env.REACT_APP_SERVER + "/api/v1/restaurant/"; //API here
      url += 1 + "/food";
      const resp = await sendRequest({
          //url: `https://mocki.io/v1/8014c1a9-37a0-4143-8701-bc94a515be8a`,
          url: url,
          method: "GET",
        })
      setResData(resp.data['content']);
    };

    const changeUserPoint = async () => {
      if(isValid){
        const requestData = {
          point:user.point - usedPoint
        };
        console.log(requestData)
        let url = process.env.REACT_APP_SERVER + "/api/v1/user/"; //API here
        url+= user.userId + "/point";
        const resp = await sendRequest({
            //url: `https://mocki.io/v1/92d0734f-ec77-4ee0-9a36-7a330349f933`,
            url: url, //Main API Route
            method: 'PUT',
            data: requestData
        })
        fetchUserdata();
      }
    };
    
return (
    <div className="home-staff-container">
        <NavbarInteractive></NavbarInteractive>
        {isOpen && (
            <div className="page-container">
                <div className="page-container1">
                <img
                    src="/library/dx/images/cancelbox.png"
                    alt="image"
                    className="page-image"
                    onClick={closePopup}
                />
                <div className="page-container2">
                    <img
                    src="https://play.teleporthq.io/static/svg/default-img.svg"
                    className="page-image1"
                    />
                    <h1 className="page-res-info-heading">Sử dụng điểm</h1>
                    <img
                    alt="image"
                    src="https://play.teleporthq.io/static/svg/default-img.svg"
                    className="page-image2"
                    />
                </div>
                <div className="page-container3">
                    <div className="page-container4">
                    <img
                        //src={process.env.REACT_APP_SERVER + '/' + user.avatarLink}
                        src="https://play.teleporthq.io/static/svg/default-img.svg"
                        alt="image"
                        className="page-image3"
                    />
                    <span className="page-text">{user.username}</span>
                    <div className="page-container5">
                        <img
                        src="/library/dx/images/coin.png"
                        alt="image"
                        className="page-image4"
                        />
                        <span className="page-text01">
                        <span>{user.point}</span>
                        <br></br>
                        </span>
                    </div>
                    </div>
                    <div className="page-container6">
                    <span className="page-text04">Tên khách hàng</span>
                    <span className="page-text05">{user.username}</span>
                    <span className="page-text06">Số điểm khả dụng</span>
                    <span className="page-text07">
                        <span>{user.point}</span>
                        <br></br>
                    </span>
                    <span className="page-text10">Số điểm muốn sử dụng</span>
                    <input
                        type="number"
                        min="0"
                        placeholder="Số điểm sử dụng"
                        className="page-resname-input input"
                        onChange={handleUsePoint}
                    />
                    {!isValid && <div className="error-text">{errmessage}</div>}
                    </div>
                </div>
                <button type="button" onClick={changeUserPoint} className="page-button button">
                    Sử dụng
                </button>
                </div>
            </div>
        )}
      <div className="home-staff-container1">
        <span className="home-staff-text">Xin chào</span>
        <img
          src="https://play.teleporthq.io/static/svg/default-img.svg"
          alt="image"
          className="home-staff-image"
          onClick={openProfile}
        />
      </div>
      <div className="home-staff-container2">
        <div className="home-staff-category-header">
          <img
            alt="image"
            src="/library/dx/images/update_2.jpg"
            loading="lazy"
            className="home-staff-image1"
          />
          <h1 className="home-staff-text1">Top 8 món ăn được yêu thích</h1>
        </div>
      </div>
      <div className="home-staff-fav-food">
        <div className="home-staff-line-1">
          {firstfour.map((food) => (
            <FoodItem
              id={food.foodID}
              key={food.id}
              image_src={process.env.REACT_APP_SERVER +food.img}
              text={food.name}
            />
          ))}
        </div>
        <div className="home-staff-line-2">
          {lastfour.map((food) => (
            <FoodItem
              id={food.foodID}
              key={food.id}
              image_src={process.env.REACT_APP_SERVER + food.img}
              text={food.name}
            />
          ))}
        </div>
      </div>
      <div className="home-staff-container3"></div>
      <div className="home-staff-container4">
        <div className="home-staff-category-header1">
          <img
            alt="image"
            src="/library/dx/images/voucher.png"
            loading="lazy"
            className="home-staff-image2"
          />
          <h1 className="home-staff-text1">Dịch vụ sử dụng điểm</h1>
        </div>
      </div>
      <div className="home-staff-container5">
        <span className="home-staff-text3">
          <span>Số điện thoại của khách hàng</span>
          <br></br>
        </span>
        <input
          type="text"
          placeholder="sdt bắt đầu bằng số 0"
          className={`home-staff-resname-input input ${isPhoneNumberValid ? '' : 'invalid'}`}
          onChange={handlePhoneNumberChange}
        />
        <button type="button" onClick={phoneNumber ? openPopup : undefined} className="home-staff-button button">
          Sử dụng điểm
        </button>
      </div>
    </div>
  )
}

export default HomeStaff

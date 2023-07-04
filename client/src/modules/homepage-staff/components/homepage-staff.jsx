import React,{ useEffect, useState } from 'react'
import FoodItem from '../../homepage/components/food-item'
import { sendRequest } from '../../../helpers/requestHelper';
import './homepage-staff.css'
import NavbarInteractive from '../../homepage/components/navbar-interactive'
import { convertJsonObjectToFormData } from '../../../helpers/jsonObjectToFormDataObjectConverter';
const HomeStaff = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState([]);
    const [user, setUserdata] = useState([]);
    const [usedPoint, setUsedPoint] = useState([]);
    const [data, setResData] = useState([]);
    const [topFoods, setTopFoods] = useState([]);
    const [firstfour, setFirstFour] = useState([]);
    const [lastfour, setLastFour] = useState([]);

    const openPopup = () => {
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
    };

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handleUsePoint = (event) => {
        setUsedPoint(event.target.value);
    };

    useEffect(() => {
        console.log(user);
    }, [user]);

    useEffect(() => {
        fetchUserdata();
    }, [phoneNumber]);

    useEffect(() => {
        fetchPageInfo();
    }, [])

    useEffect(() => {
        changeUserPoint();
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
        let url = process.env.REACT_APP_SERVER + ""; //API here
        url+= phoneNumber;
        const resp = await sendRequest({
            url: `https://mocki.io/v1/92d0734f-ec77-4ee0-9a36-7a330349f933`,
            method: "GET",
          })
        setUserdata(resp.data['content']);
    };

    const fetchPageInfo= async () => {
      let url = process.env.REACT_APP_SERVER + "/api/v1/restaurant/"; //API here
      url += 1 + "/food";
      const resp = await sendRequest({
          url: `https://mocki.io/v1/8014c1a9-37a0-4143-8701-bc94a515be8a`,
          method: "GET",
        })
      setResData(resp.data['content']['menu']);
    };

    const changeUserPoint = async () => {
        const requestData = {
            point:usedPoint
        };
        let formData;
        formData = convertJsonObjectToFormData(requestData);
        let url = process.env.REACT_APP_SERVER + ""; //API here
        url+= user.userId;
        const resp = await sendRequest({
            url: `https://mocki.io/v1/92d0734f-ec77-4ee0-9a36-7a330349f933`,
            method: 'PUT',
            data: formData
        })
        setUserdata(resp.data['content']);
    };
    
return (
    <div className="home-staff-container">
        <NavbarInteractive></NavbarInteractive>
        {isOpen && (
            <div className="page-container">
                <div className="page-container1">
                <img
                    src="/external/mdi_cancel-box-outline-200h.png"
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
                        src="https://play.teleporthq.io/static/svg/default-img.svg"
                        alt="image"
                        className="page-image3"
                    />
                    <span className="page-text">{user.username}</span>
                    <div className="page-container5">
                        <img
                        src="https://play.teleporthq.io/static/svg/default-img.svg"
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
                        type="text"
                        placeholder="Số điểm sử dụng"
                        className="page-resname-input input"
                    />
                    </div>
                </div>
                <button type="button" onClick={handleUsePoint} className="page-button button">
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
        />
      </div>
      <div className="home-staff-container2">
        <div className="home-staff-category-header">
          <img
            alt="image"
            src="/external/update_2-200h.jpg"
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
              key={food.id}
              image_src={process.env.REACT_APP_SERVER +food.img}
              text={food.name}
            />
          ))}
        </div>
        <div className="home-staff-line-2">
          {lastfour.map((food) => (
            <FoodItem
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
            src="/external/update_2-200h.jpg"
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
          className="home-staff-resname-input input"
          onChange={handlePhoneNumberChange}
        />
        <button type="button" onClick={openPopup} className="home-staff-button button">
          Sử dụng điểm
        </button>
      </div>
    </div>
  )
}

export default HomeStaff

import React,{ useEffect, useState } from 'react'
import NavbarInteractive from '../../homepage/components/navbar-interactive'
import './restaurant-infomation.css'
import { sendRequest } from '../../../helpers/requestHelper';
import { useLocation, useHistory } from 'react-router-dom';

const RestaurantInfomation = (props) => {
  const location = useLocation();
  const [restaurantInfo, setRestaurantInfo] = useState([]);
  const [resIdParam, setResIdParan] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const resIdParamloc = params.get('res_id');
    setResIdParan(resIdParamloc);
    window.scrollTo(0, 0);
  }, []); 

  useEffect(() => {
    fetchrestaurantinfo();
  }, [resIdParam]);
  
  const history = useHistory();
  const handleMenuButton = () => {
    history.push(`/foods?res_id=${resIdParam}&staff=0`);
  }
  const fetchrestaurantinfo = async () => {
    var url = 'http://localhost:8000/api/v1/restaurant/'
    url +=`${resIdParam}`;
    console.log(url);
    const resp = await sendRequest({
        url: url,  //final link
        //url: `https://mocki.io/v1/32491675-2162-45a2-886b-d2df95cf568b`,
        method: "GET",
      })
    setRestaurantInfo(resp.data['content'])
  };
  if (restaurantInfo === null) {
    return <div>Loading...</div>;
  }
  return (  
    <div className="restaurant-infomation-container">
        <title>Restaurant-Infomation</title>
        <meta
          property="og:title"
          content="Restaurant-Infomation - Portly Cooked Tarsier"
        />
      <NavbarInteractive rootClassName="navbar-interactive-root-class-name1"></NavbarInteractive>
      <div className="restaurant-infomation-container1">
        <img
          src="library/dx/images/maplocation.jpg"
          alt="image"
          className="restaurant-infomation-image"
        />
        <img
          src={restaurantInfo.avatar}
          alt="image"
          className="restaurant-infomation-logo"
        />
        <h1 className="restaurant-infomation-text">{restaurantInfo.name}</h1>
      </div>
      <div className="restaurant-infomation-container2">
        <img
          className="restaurant-infomation-image2"
        />
        <h1 className="restaurant-infomation-res-info-heading">
          レストラン情報
        </h1>
        <img
          className="restaurant-infomation-image2"
        />
      </div>
      <div className="restaurant-infomation-res-info-container">
        <span className="restaurant-infomation-res-name">レストラン名</span>
        <span className="restaurant-infomation-text1">{restaurantInfo.name}</span>
        <span className="restaurant-infomation-res-name1">アドレス</span>
        <span className="restaurant-infomation-text1">{restaurantInfo.detailedAddress} {restaurantInfo.ward}, {restaurantInfo.district}, {restaurantInfo.province}</span>
        <span className="restaurant-infomation-res-name2">開館時間</span>
        <span className="restaurant-infomation-text1">
        {restaurantInfo.from}～{restaurantInfo.to}　{restaurantInfo.openTime}時～{restaurantInfo.closeTime}時
        </span>
        <span className="restaurant-infomation-res-name3">連絡先</span>
        <span className="restaurant-infomation-text1">
          電話番号：{restaurantInfo.phone}
        </span>
        <span className="restaurant-infomation-res-name4">説明</span>
        <span className="restaurant-infomation-text1">
          {restaurantInfo.description}
        </span>
        <span className="restaurant-infomation-res-name5">イメージ</span>
        <div className="restaurant-infomation-slider">
          {restaurantInfo.img && restaurantInfo.img.map((image, index) => (
            <img
              key={index}
              src={process.env.REACT_APP_SERVER + image}
              alt={`Image ${index + 1}`}
              className="restaurant-image"
            />
          ))}
        </div>
        <button type="button" className="restaurant-infomation-button" onClick={handleMenuButton}>
          メニュー
        </button>
      </div>
    </div>
  )
}

export default RestaurantInfomation

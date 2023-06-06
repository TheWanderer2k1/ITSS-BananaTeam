import { Button, Rate, DatePicker, TimePicker  } from 'antd';
import FoodList from './food-list'
import FoodItem from "./food-item";

import { sendRequest } from '../../../helpers/requestHelper';


import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withTranslate, IntlActions } from 'react-redux-multilingual';
import { AuthActions } from '../../auth/redux/actions';
import { getStorage, setStorage } from '../../../config';
import moment from "moment";
import store from '../../../redux/store';
import './intro.css';


function Search ({ translate }) {
    const [searchData, setSearchData] = useState('');
  const [foodDecription, setfoodDecription] = useState([]);
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
    
    const handleSearchData = (event) => {
      setSearchData(event.target.value);
    };

    const handleKeyUp = (event) => {
      if (event.keyCode === 13) {
        fetchfoodDecription();
      }
    }
  useEffect(() => {
      fetchfoodDecription();
  }, []); 

  const fetchfoodDecription = async () => {
      var url = `http://localhost:8000/api/v1/foods`;
      if(searchData != '') url += `?keyword=${searchData}`
      console.log(url);
      const resp = await sendRequest({
          url: url,
          method: "GET",
      })
      setfoodDecription(resp.data['content'])
  };

  const clickFilter = () => {
    console.log('haha');
    console.log('haha', foodDecription);
  }

  const sortByPriceIncrease = () => {
    setfoodDecription([...foodDecription].sort((a, b) => a.price - b.price));
  };

  const sortByPriceDecrease = () => {
    setfoodDecription([...foodDecription].sort((a, b) => b.price - a.price));
  };

  const onChangeFromTime = (date, dateString) => {
    setFromTime(date);
  };
  const onChangeToTime = (date, dateString) => {
    setToTime(date);
  };

//   const onChangeFromTime = () => {
//     console.log("toang");
//   };
    return (
        <div className='search-container'>  
            <div className="salutation">
                <strong> こにちは、</strong>
                <div className="user-info">
                    <img src="/library/dx/images/vietnam.png" alt="" />
                    <div className="user-coin d-flex mt-6"><img src="/library/dx/images/bnn-coin.png" alt="" className="coin-icon"/>1000</div>
                </div>
            </div>
            <div className="main-layout d-flex">
                <div className="filter-sidebar px-12">
                    <h2>検出</h2>
                    <div className="reference-link-list d-flex flex-direction-column">
                        <a className="reference-link-item">
                            <i class="fa fa-home"></i> 人気がある料理
                        </a>
                        <a className="reference-link-item">
                            <i class="fa fa-home"></i> 人気があるレストラン
                        </a>
                    </div>
                    <hr class="divider"></hr>
                    <div className="filter-box">
                        <div className="fast-filter">
                            <p data-toggle="collapse" data-target="#fastFilter">
                                <i class="fa fa-chevron-down mr-6"></i>
                                <i class="fa fa-lock mr-6"></i>
                                食べ物
                            </p>
                            <div id="fastFilter" class="collapse in">
                                <Button type="text">近く人気がある料理</Button>
                                <Button type="text" onClick={sortByPriceIncrease}>安いから高いまで値段</Button>
                                <Button type="text" onClick={sortByPriceDecrease}>高いから安いまで値段</Button>
                            </div>
                        </div>
                        <div className="time-filter">
                            <p data-toggle="collapse" data-target="#timeFilter">
                                <i class="fa fa-chevron-down mr-6"></i>
                                <i class="fa fa-lock mr-6"></i>
                                営業時間
                            </p>
                            <div id="timeFilter" class="collapse in row">
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
                                    <TimePicker value={fromTime} onChange={onChangeFromTime}/>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
                                    <TimePicker value={toTime} onChange={onChangeToTime}/>
                                </div>                            
                            </div>
                        </div>
                        <div className="time-filter">
                            <p data-toggle="collapse" data-target="#starFilter">
                                <i class="fa fa-chevron-down mr-6"></i>
                                <i class="fa fa-lock mr-6"></i>
                                評価
                            </p>
                            <div id="starFilter" class="collapse in">                                
                                <label className="rate-star-item">
                                    <input type="checkbox" />
                                    <Rate disabled defaultValue={1} />
                                </label>
                                <label className="rate-star-item">
                                    <input type="checkbox" />
                                    <Rate disabled defaultValue={2} />
                                </label>
                                <label className="rate-star-item">
                                    <input type="checkbox" />
                                    <Rate disabled defaultValue={3} />
                                </label>
                                <label className="rate-star-item">
                                    <input type="checkbox" />
                                    <Rate disabled defaultValue={4} />
                                </label>
                                <label className="rate-star-item">
                                    <input type="checkbox" />
                                    <Rate disabled defaultValue={5} />
                                </label>
                            </div>
                        </div>
                        <p data-toggle="collapse" data-target="#priceFilter">
                            <i class="fa fa-chevron-down mr-6"></i>
                            <i class="fa fa-lock mr-6"></i>
                            値段
                        </p>
                        <div id="priceFilter" class="collapse in">
                        <p className="rate-star-item">
                            <input type="checkbox" />
                            0-50.000 VNĐ
                        </p>
                        <p className="rate-star-item">
                            <input type="checkbox" />
                            50.000-100.000 VNĐ
                        </p>
                        <p className="rate-star-item">
                            <input type="checkbox" />
                            100.000-200.000 VNĐ
                        </p>
                        <p className="rate-star-item">
                            <input type="checkbox" />
                            200.000-300.000 VNĐ
                        </p>
                        <p className="rate-star-item">
                            <input type="checkbox" />
                            300.000 VNĐ 以上
                        </p>
                        </div>
                    </div>
                    <div className="action-button d-flex">
                        <button className="cancel-button">クリア</button>
                        <button className="confirm-button">適用</button>
                    </div>
                </div>
                <div className="content">
                    {/* <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-8" >
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4" >
                            <div className="search-box d-flex">
                                <div className="search-icon"><button type="button" class="btn btn-link"><i class="fa fa-search"></i></button></div>
                                <div className="search-text">
                                    <input type="text" placeholder='Nem cuốn' value={searchData} onChange={handleSearchData} onKeyUp={handleKeyUp}/>
                                </div>
                            </div>
                        </div>                            
                    </div>             */}
                    {/* <FoodList searchData={searchData}></FoodList> */}
                    {/* <FoodList></FoodList> */}
                    <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-8" >
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4" >
            <div className="search-box d-flex">
                <div className="search-icon"><button type="button" class="btn btn-link"><i class="fa fa-search"></i></button></div>
                <div className="search-text">
                    <input type="text" placeholder='Nem cuốn' value={searchData} onChange={handleSearchData} onKeyUp={handleKeyUp}/>
                </div>
            </div>
            <Button type="primary" onClick={clickFilter}>
                Open the notification box
            </Button>
        </div>                            
      </div>    
    <div className="food-list d-flex">
        {foodDecription.map((food) => (
          <FoodItem
            key={food.id}
            image_src={"http://localhost:8000" + food.img}
            rating={food.rating}
            name={food.name}
            price={food.price}
            description={food.description}
            restaurant={food.restaurant}
          />
        ))}
    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-8" >
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4" >
                            <div className="pagination-box">
                            <button type="button" className="btn btn-link pagination-page pagination-page__selected">1</button>
                            <button type="button" className="btn btn-link pagination-page">2</button>
                            <button type="button" className="btn btn-link pagination-page">3</button>
                            <button type="button" className="btn btn-link pagination-page">4</button>
                            <button type="button" className="btn btn-link pagination-page">5</button>
                            <button type="button" className="btn btn-link pagination-page">6</button>
                            </div>
                        </div>                            
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

function mapState(state) {
    const { auth } = state;
    return { auth };
}

const mapDispatchToProps = {
    refresh: AuthActions.refresh,
    getLinksOfRole: AuthActions.getLinksOfRole,
    getComponentsOfUserInLink: AuthActions.getComponentOfUserInLink,
}

export default connect(mapState, mapDispatchToProps)(withTranslate(Search));

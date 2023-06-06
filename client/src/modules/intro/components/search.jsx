import { Button, Rate, DatePicker, TimePicker  } from 'antd';
import FoodList from './food-list'
import FoodItem from "./food-item";
import { useLocation } from 'react-router-dom';

import { sendRequest } from '../../../helpers/requestHelper';


import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withTranslate, IntlActions } from 'react-redux-multilingual';
import { AuthActions } from '../../auth/redux/actions';
import { getStorage, setStorage } from '../../../config';
import moment from "moment";
import store from '../../../redux/store';
import './intro.css';

let initialPriceFilter = [
	{ id: 0, from: 0, to: 50000, checked: true },
	{ id: 1, from: 50000, to: 100000, checked: true },
	{ id: 2, from: 100000, to: 200000, checked: true },
	{ id: 3, from: 200000, to: 300000, checked: true },
	{ id: 4, from: 300000, to: '以上', checked: true }
]

let initialRatingFilter = [
	{ id: 1, value: 1, checked: true },
	{ id: 2, value: 2, checked: true },
	{ id: 4, value: 3, checked: true },
	{ id: 4, value: 4, checked: true },
	{ id: 5, value: 5, checked: true }
]

function Search () {
    const location = useLocation();
    const [inputValue, setInputValue] = useState('');
    const [searchData, setSearchData] = useState('');
    const [foodDecription, setfoodDecription] = useState([]);
    const [fromTime, setFromTime] = useState(null);
    const [toTime, setToTime] = useState(null);
	const [priceFilter, setPriceFilter] = useState(initialPriceFilter);
	const [ratingFilter, setRatingFilter] = useState(initialRatingFilter);
	const [cityFilter, setCityFilter] = useState('');
    
    const handleSearchData = (event) => {
      setSearchData(event.target.value);
    };

    const handleKeyUp = (event) => {
      if (event.keyCode === 13) {
        fetchfoodDecription();
      }
    }
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const inputValueParam = params.get('search_query');
        setInputValue(inputValueParam || '');
        setSearchData(inputValueParam);
        fetchfoodDecription();
  }, [inputValue]); 

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
	const onChangePriceFilter = (id) => {
		console.log('before', priceFilter[id])
		const newPriceFilter = priceFilter.map(price => {
			if (price.id === id) 
				return {...price, checked:!price.checked}
			else 
				return price
		})
		setPriceFilter(newPriceFilter)
		console.log('filter', newPriceFilter)
	};
    const onChangeRatingFilter = (id) => {
		const newRatingFilter = ratingFilter.map(rating => {
			if (rating.id === id) 
				return {...rating, checked:!rating.checked}
			else 
				return rating
		})
		setRatingFilter(newRatingFilter)
	};
	const handleFilter = () => {
		console.log('dang filter ne:3')
	}

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
                                {ratingFilter.map((rating) => (
                                    <label className="rate-star-item">
                                        <input type="checkbox" 
                                            onChange={() => {onChangeRatingFilter(rating.id)}} 
                                            defaultChecked={rating.checked}/>
                                        <Rate disabled defaultValue={rating.value} />
                                    </label>
                                ))}                                                               
                            </div>
                        </div>
                        <p data-toggle="collapse" data-target="#priceFilter">
                            <i class="fa fa-chevron-down mr-6"></i>
                            <i class="fa fa-lock mr-6"></i>
                            値段
                        </p>
                        <div id="priceFilter" class="collapse in">
												{priceFilter.map((price) => (
													<p className="rate-star-item" key={price.id}>
													<input type="checkbox" 
															onChange={() => {onChangePriceFilter(price.id)}} 
															defaultChecked={price.checked}/>
														{price.from}-{price.to} VNĐ
													</p>
												))}
                        </div>

                        <p data-toggle="collapse" data-target="#cityFilter">
                            <i class="fa fa-chevron-down mr-6"></i>
                            <i class="fa fa-lock mr-6"></i>
                            場所
                        </p>
                        <div id="cityFilter" class="collapse in">
                            {priceFilter.map((price) => (
                                <p className="rate-star-item" key={price.id}>
                                <input type="checkbox" 
                                        onChange={() => {onChangePriceFilter(price.id)}} 
                                        defaultChecked={price.checked}/>
                                    {price.from}-{price.to} VNĐ
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="action-button d-flex">
                        <button className="cancel-button">クリア</button>
                        <button className="confirm-button" onClick={handleFilter}>適用</button>
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

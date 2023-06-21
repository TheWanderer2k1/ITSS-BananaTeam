import { Button, Rate, TimePicker, Select  } from 'antd';
import FoodList from './food-list'
import FoodItem from "./food-item";
import { useLocation } from 'react-router-dom';

import { sendRequest } from '../../../helpers/requestHelper';
import { useHistory } from 'react-router-dom';



import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withTranslate, IntlActions } from 'react-redux-multilingual';
import { AuthActions } from '../../auth/redux/actions';
import { getStorage, setStorage } from '../../../config';
import moment from "moment";
import store from '../../../redux/store';
import './intro.css';
import { DatePicker } from '../../../common-components';

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
	{ id: 3, value: 3, checked: true },
	{ id: 4, value: 4, checked: true },
	{ id: 5, value: 5, checked: true }
]
let listSearchOption = [
    {id: 1, value: "料理の名前"},
    {id: 2, value: "場所"}
]

let listCityFilter = [
    { value: "HA Noi", label: "Thành phố Hà Nội", id: "01" },
    { value: "Tỉnh Hà Giang", label: "Tỉnh Hà Giang", id: "02" },
    { value: "Tỉnh Cao Bằng", label: "Tỉnh Cao Bằng", id: "04" },
    { value: "Tỉnh Bắc Kạn", label: "Tỉnh Bắc Kạn", id: "06" },
    { value: "Tỉnh Tuyên Quang", label: "Tỉnh Tuyên Quang", id: "08" },
    { value: "Tỉnh Lào Cai", label: "Tỉnh Lào Cai", id: "10" },
    { value: "Tỉnh Điện Biên", label: "Tỉnh Điện Biên", id: "11" },
    { value: "Tỉnh Lai Châu", label: "Tỉnh Lai Châu", id: "12" },
    { value: "Tỉnh Sơn La", label: "Tỉnh Sơn La", id: "14" },
    { value: "Tỉnh Yên Bái", label: "Tỉnh Yên Bái", id: "15" },
    { value: "Tỉnh Hoà Bình", label: "Tỉnh Hoà Bình", id: "17" },
    { value: "Tỉnh Thái Nguyên", label: "Tỉnh Thái Nguyên", id: "19" },
    { value: "Tỉnh Lạng Sơn", label: "Tỉnh Lạng Sơn", id: "20" },
    { value: "Tỉnh Quảng Ninh", label: "Tỉnh Quảng Ninh", id: "22" },
    { value: "Tỉnh Bắc Giang", label: "Tỉnh Bắc Giang", id: "24" },
    { value: "Tỉnh Phú Thọ", label: "Tỉnh Phú Thọ", id: "25" },
    { value: "Tỉnh Vĩnh Phúc", label: "Tỉnh Vĩnh Phúc", id: "26" },
    { value: "Tỉnh Bắc Ninh", label: "Tỉnh Bắc Ninh", id: "27" },
    { value: "Tỉnh Hải Dương", label: "Tỉnh Hải Dương", id: "30" },
    { value: "Hai Phong", label: "Thành phố Hải Phòng", id: "31" },
    { value: "Tỉnh Hưng Yên", label: "Tỉnh Hưng Yên", id: "33" },
    { value: "Tỉnh Thái Bình", label: "Tỉnh Thái Bình", id: "34" },
    { value: "Tỉnh Hà Nam", label: "Tỉnh Hà Nam", id: "35" },
    { value: "Tỉnh Nam Định", label: "Tỉnh Nam Định", id: "36" },
    { value: "Tỉnh Ninh Bình", label: "Tỉnh Ninh Bình", id: "37" },
    { value: "Tỉnh Thanh Hóa", label: "Tỉnh Thanh Hóa", id: "38" },
    { value: "Tỉnh Nghệ An", label: "Tỉnh Nghệ An", id: "40" },
    { value: "Tỉnh Hà Tĩnh", label: "Tỉnh Hà Tĩnh", id: "42" },
    { value: "Tỉnh Quảng Bình", label: "Tỉnh Quảng Bình", id: "44" },
    { value: "Tỉnh Quảng Trị", label: "Tỉnh Quảng Trị", id: "45" },
    { value: "Tỉnh Thừa Thiên Huế", label: "Tỉnh Thừa Thiên Huế", id: "46" },
    { value: "Da Nang", label: "Thành phố Đà Nẵng", id: "48" },
    { value: "Tỉnh Quảng Nam", label: "Tỉnh Quảng Nam", id: "49" },
    { value: "Tỉnh Quảng Ngãi", label: "Tỉnh Quảng Ngãi", id: "51" },
    { value: "Tỉnh Bình Định", label: "Tỉnh Bình Định", id: "52" },
    { value: "Tỉnh Phú Yên", label: "Tỉnh Phú Yên", id: "54" },
    { value: "Tỉnh Khánh Hòa", label: "Tỉnh Khánh Hòa", id: "56" },
    { value: "Tỉnh Ninh Thuận", label: "Tỉnh Ninh Thuận", id: "58" },
    { value: "Tỉnh Bình Thuận", label: "Tỉnh Bình Thuận", id: "60" },
    { value: "Tỉnh Kon Tum", label: "Tỉnh Kon Tum", id: "62" },
    { value: "Tỉnh Gia Lai", label: "Tỉnh Gia Lai", id: "64" },
    { value: "Tỉnh Đắk Lắk", label: "Tỉnh Đắk Lắk", id: "66" },
    { value: "Tỉnh Đắk Nông", label: "Tỉnh Đắk Nông", id: "67" },
    { value: "Tỉnh Lâm Đồng", label: "Tỉnh Lâm Đồng", id: "68" },
    { value: "Tỉnh Bình Phước", label: "Tỉnh Bình Phước", id: "70" },
    { value: "Tỉnh Tây Ninh", label: "Tỉnh Tây Ninh", id: "72" },
    { value: "Tỉnh Bình Dương", label: "Tỉnh Bình Dương", id: "74" },
    { value: "Tỉnh Đồng Nai", label: "Tỉnh Đồng Nai", id: "75" },
    { value: "Tỉnh Bà Rịa - Vũng Tàu", label: "Tỉnh Bà Rịa - Vũng Tàu", id: "77" },
    { value: "TP HCM", label: "Thành phố Hồ Chí Minh", id: "79" },
    { value: "Tỉnh Long An", label: "Tỉnh Long An", id: "80" },
    { value: "Tỉnh Tiền Giang", label: "Tỉnh Tiền Giang", id: "82" },
    { value: "Tỉnh Bến Tre", label: "Tỉnh Bến Tre", id: "83" },
    { value: "Tỉnh Trà Vinh", label: "Tỉnh Trà Vinh", id: "84" },
    { value: "Tỉnh Vĩnh Long", label: "Tỉnh Vĩnh Long", id: "86" },
    { value: "Tỉnh Đồng Tháp", label: "Tỉnh Đồng Tháp", id: "87" },
    { value: "Tỉnh An Giang", label: "Tỉnh An Giang", id: "89" },
    { value: "Tỉnh Kiên Giang", label: "Tỉnh Kiên Giang", id: "91" },
    { value: "Thành phố Cần Thơ", label: "Thành phố Cần Thơ", id: "92" },
    { value: "Tỉnh Hậu Giang", label: "Tỉnh Hậu Giang", id: "93" },
    { value: "Tỉnh Sóc Trăng", label: "Tỉnh Sóc Trăng", id: "94" },
    { value: "Tỉnh Bạc Liêu", label: "Tỉnh Bạc Liêu", id: "95" },
    { value: "Tỉnh Cà Mau", label: "Tỉnh Cà Mau", id: "96" },
]

function Search () {
    const history = useHistory();
    const location = useLocation();
    // Dữ liệu lấy về từ server
    const [allFoodDescription, setAllFoodDescription] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [searchData, setSearchData] = useState('');
    const [foodDecription, setfoodDecription] = useState([]);
    const [fromTime, setFromTime] = useState(null);
    const [toTime, setToTime] = useState(null);
	const [priceFilter, setPriceFilter] = useState(initialPriceFilter);
	const [ratingFilter, setRatingFilter] = useState(initialRatingFilter);
	const [cityFilter, setCityFilter] = useState(null);
	const [districtFilter, setDistrictFilter] = useState(null);
    const [citySearch, setCitySearch] = useState(null);
	const [districtSearch, setDistrictSearch] = useState(null);
	const [listDistrictFilter, setListDistrictFilter] = useState([]);
	const [searchOption, setSearchOption] = useState(listSearchOption[0].id);
    

    const moveToHomePage = () => {
        // Navigate to the desired route
        history.push('/homepage');
      };

    const handleSearchData = (event) => {
      setSearchData(event.target.value);
    };

    const handleKeyUp = (event) => {
      if (event.keyCode === 13) {
        fetchfoodDecription();
      }
    }

    const handleChangeCityFilter = (value) => {
        setCityFilter(value);
        fetchDistrict(value);
    };

    const handleChangeDistrictFilter = (value) => {
        setDistrictFilter(value);
    };

    const handleChangeCitySearch = (value) => {
        setCitySearch(value);
        fetchDistrict(value);
        let newFoodDescription = allFoodDescription.filter(food => {
            return checkPrice(food.price) && checkRating(food.rating) && checkTime(food.restaurant.openTime, food.restaurant.closeTime) && checkProvince(food.restaurant.address) 
            // && (food.restaurant.province)
        })
    };

    const handleChangeDistrictSearch = (value) => {
        setDistrictSearch(value);
    };

    const handleChangeSearchOption = (event) => {
        setSearchOption(event.target.value);
        console.log('haha: ', searchOption);
      };
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const inputValueParam = params.get('search_query');
        setInputValue(inputValueParam || '');
        setSearchData(inputValueParam);
        fetchfoodDecription();
  }, [inputValue]); 

  const fetchfoodDecription = async () => {
      var url = `http://localhost:8000/api/v1/foods`;
      if(searchData != ''){url += `?keyword=${searchData}`;}
      console.log(url);
      const resp = await sendRequest({
          url: url,
          method: "GET",
      })
      setfoodDecription(resp.data['content'])
			setAllFoodDescription(resp.data['content'])
			console.log('in fetch', resp.data['content'], foodDecription)
  };

//   const fetchDistrict = async (provinceValue) => {
//     var provinceId = listCityFilter.find(x => x.value === provinceValue).id;
//     var url = 'https://vapi.vnappmob.com/api/province/district/' + provinceId;
//     const resp = await sendRequest({
//         url: url,
//         method: "GET",
//     })
//     var a = [];
//     console.log(resp.data['results']);
//     resp.data['results'].forEach(item => {
//         a.push({...item, value: item.district_name, label: item.district_name})
//     })
//     console.log(a);
//     setListDistrictFilter(a);
//     console.log(listDistrictFilter);
//   }

const fetchDistrict = async (provinceValue) => {
    var provinceId = listCityFilter.find(x => x.value === provinceValue).id;
    var url = 'https://vapi.vnappmob.com/api/province/district/' + provinceId;
    const resp = await sendRequest({
        url: url,
        method: "GET",
    })
    // var a = [];
    // resp.data['results'].map(item => ({
    //     value: item.district_name, label: item.district_name})
    // );
    setListDistrictFilter(resp.data['results'].map(item => ({
        value: item.district_name, label: item.district_name})
    ));
    console.log('came here');
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
		const newPriceFilter = priceFilter.map(price => {
			if (price.id === id) 
				return {...price, checked:!price.checked}
			else 
				return price
		})
        console.log('đổi lọc giá');
		setPriceFilter(newPriceFilter)
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

    const clearFilter = () => {
        setFromTime(null);
        setToTime(null);
        setCityFilter(undefined);
        const newPriceFilter = priceFilter.map(price => ({...price, checked: true}));
		setPriceFilter(newPriceFilter)
        setPriceFilter(initialPriceFilter)        
    }

	const handleFilter = async () => {
        const checkPrice = (price) => {
            for (let p of priceFilter) {
                if (p.checked === false && (p.from < price && (p.to == '以上' || price < p.to))) 
                    return false
            }
            return true
        }
        const checkRating = (rating) => {
            if(!rating) return false;

            for (let r of ratingFilter) {
                if (r.checked === false && (r.value <= rating && rating < r.value + 1))
                    return false;
            }
            return true;
        }

        const checkTime = (from, to) => {
            var fromTimeFilter = new Date(fromTime);
            var toTimeFilter = new Date(toTime);
            var openTimeRestaurant = new Date(new Date().setHours(parseInt(from.slice(0,2)), parseInt(from.slice(3,5)), 0, 0));
            var closeTimeRestaurant = new Date(new Date().setHours(to.slice(0,2), to.slice(3,5), 0, 0));
            if(fromTime && toTime) {
                if(fromTimeFilter <= openTimeRestaurant && toTimeFilter >= closeTimeRestaurant) return true;
                else return false;
            } else if (fromTime) {
                if(fromTimeFilter <= openTimeRestaurant) return true;
                else return false;
            } else if (toTime) {
                if(toTimeFilter >= closeTimeRestaurant) return true;
                else return false;
            } else return true;       
        }

        const checkProvince = (province) => {
            if (!cityFilter) return true;
            else if (province === cityFilter) return true;
            return false;
        }
        let newFoodDescription = allFoodDescription.filter(food => {
            return checkPrice(food.price) && checkRating(food.rating) && checkTime(food.restaurant.openTime, food.restaurant.closeTime) && checkProvince(food.restaurant.address)
        })
        setfoodDecription(newFoodDescription)
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
                            <div id="fastFilter" class="collapse">
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
                            <div id="timeFilter" class="collapse row">
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
                                    <TimePicker placeholder='時間' showTime={{ format: 'HH:mm' }} format="HH:mm" value={fromTime} onChange={onChangeFromTime}/>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
                                    <TimePicker placeholder='時間' showTime={{ format: 'HH:mm' }} format="HH:mm" value={toTime} onChange={onChangeToTime}/>
                                </div>                            
                            </div>
                        </div>
                        <div className="time-filter">
                            <p data-toggle="collapse" data-target="#starFilter">
                                <i class="fa fa-chevron-down mr-6"></i>
                                <i class="fa fa-lock mr-6"></i>
                                評価
                            </p>
                            <div id="starFilter" class="collapse"> 
                                {ratingFilter.map((rating) => (
                                    <label className="rate-star-item" key={rating.id}>
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
                        <div id="priceFilter" class="collapse">
                            {priceFilter.map((price) => (
                                <p className="rate-star-item" key={price.id}>
                                <input type="checkbox" 
                                        onChange={() => {onChangePriceFilter(price.id)}} 
                                        defaultChecked={price.checked}/>
                                    {/* {price.from}-{price.to} 円 */}
                                    {price.from}-{price.to} VNĐ
                                </p>
                            ))}
                        </div>

                        <p data-toggle="collapse" data-target="#cityFilter">
                            <i class="fa fa-chevron-down mr-6"></i>
                            <i class="fa fa-lock mr-6"></i>
                            場所
                        </p>
                        <div id="cityFilter" class="collapse row">                            
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
                                <Select
                                    allowClear
                                    placeholder='市'
                                    value={cityFilter}
                                    onChange={handleChangeCityFilter}
                                    options={listCityFilter}
                                    style={{ width: '100%' }}
                                />
                            </div>   
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
                                <Select
                                    allowClear
                                    placeholder='区'
                                    value={districtFilter}
                                    onChange={handleChangeDistrictFilter}
                                    options={listDistrictFilter}
                                    style={{ width: '100%' }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="action-button d-flex mt-12">
                        <button className="cancel-button" onClick={clearFilter}>クリア</button>
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
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-2" >        
            <select value={searchOption} onChange={handleChangeSearchOption} class="form-select select-search-option" aria-label="Default select example">
                <option value="1" selected>料理の名前</option>
                <option value="2">場所</option>
            </select>
        </div>
            {
                searchOption == 1 ? (
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4" >
                        <div className="search-box d-flex">
                            <div className="search-icon"><button type="button" class="btn btn-link"><i class="fa fa-search"></i></button></div>
                            <div className="search-text">
                                <input type="text" placeholder='Nem cuốn' value={searchData} onChange={handleSearchData} onKeyUp={handleKeyUp}/>
                            </div>
                        </div>
                    </div>                            
                ) : (
                    <React.Fragment>
                        {/* <div id="addressSearch" class="row">        */}
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-2" >
                                <Select
                                    allowClear
                                    placeholder='市'
                                    value={citySearch}
                                    onChange={handleChangeCitySearch}
                                    options={listCityFilter}
                                    style={{ width: '100%' }}
                                />
                            </div>   
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-2" >
                                <Select
                                    allowClear
                                    placeholder='区'
                                    value={districtSearch}
                                    onChange={handleChangeDistrictSearch}
                                    options={listDistrictFilter}
                                    style={{ width: '100%' }}
                                />
                            </div>
                        {/* </div> */}
                    </React.Fragment>
                )
            }
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

import { Rate, TimePicker, Select } from 'antd';
import FoodItem from "./food-item";
import { useLocation } from 'react-router-dom';
import { sendRequest } from '../../../helpers/requestHelper';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Avt from '../images/avt.png'
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import { AuthActions } from '../../auth/redux/actions';
import './intro.css';
import { Radio } from 'antd';
import { initialPriceFilter, initialRatingFilter, listSearchOption, listCityFilter, sortOptions } from './SearchConstant'

/**
 * @typedef {{id:number;name:string;openTime:string;province:string;district:string;ward:string;detailedAdress:string}} Restaurant
 * @typedef {{id:number;name:string;description:string}} Category
 * @typedef {{id:number;img:string;rating:number;price:number;description:string;restaurant:Restaurant}} FD
 * @typedef {Omit<FD,"img"> & {img: string[]}} FoodDecription
 */
const pageSize = 10;

function Search() {
	const history = useHistory();
	const location = useLocation();

	// Dữ liệu lấy về từ server
	const [allFoodDescription, setAllFoodDescription] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [searchData, setSearchData] = useState('');
	const [foodDecription, setfoodDecription] = useState([]);
	/** @type {[FoodDecription[],React.Dispatch<FoodDecription[]>]} */
	const [foodDecriptionCorrect, setfoodDecriptionCorrect] = useState([]);
	const [listCategories, setListCategories] = useState([]);
	const [fromTime, setFromTime] = useState(null);
	const [toTime, setToTime] = useState(null);
	const [priceFilter, setPriceFilter] = useState(initialPriceFilter);
	const [ratingFilter, setRatingFilter] = useState(initialRatingFilter);
	const [categoryFilter, setCategoryFilter] = useState(null);
	const [cityFilter, setCityFilter] = useState(null);
	const [districtFilter, setDistrictFilter] = useState(null);
	const [wardFilter, setWardFilter] = useState(null);
	const [citySearch, setCitySearch] = useState(null);
	const [districtSearch, setDistrictSearch] = useState(null);
	const [wardSearch, setWardSearch] = useState(null);
	const [listDistrictFilter, setListDistrictFilter] = useState([]);
	const [listDistrictSearch, setListDistrictSearch] = useState([]);
	const [listWardFilter, setListWardFilter] = useState([]);
	const [listWardSearch, setListWardSearch] = useState([]);
	const [searchOption, setSearchOption] = useState(listSearchOption[0].id);
	const [isShowAddressFilter, setIsShowAddressFilter] = useState(true);
	const [isFirstLoad, setIsFirstLoad] = useState(true);
	const [isSearchByAddress, setIsSearchByAddress] = useState(false);
	const [isFilterByAddress, setIsFilterByAddress] = useState(false);
	const [sortValue, setSortValue] = useState('');
	const [pageinate, setPageinate] = useState(0);

	const onChangeSort = ({ target: { value } }) => {
		setSortValue(value);
		if (value == '価格の高い順') sortByPriceDecrease();
		else sortByPriceIncrease();
	};

	const handleSearchData = (event) => {
		setSearchData(event.target.value);
	};

	const handleKeyUp = (event) => {
		if (event.keyCode === 13) {
			fetchfoodDecription();
			setPageinate(0);
			clearFilter();
		}
	}

	const handleChangeCityFilter = (value) => {
		setCityFilter(value);
		if (value != undefined) fetchDistrict(value);
	};

	const handleChangeDistrictFilter = (value) => {
		setDistrictFilter(value);
		if (value != undefined) fetchWard(value);
	};

	const handleChangeWardFilter = (value) => {
		setWardFilter(value);
	};

	const handleChangeCitySearch = (value) => {
		setCitySearch(value);
		setDistrictSearch(null);
		setWardSearch(null);
		if (value != undefined) fetchDistrict(value);
		// fetchfoodDecriptionByAddress();
	};

	const handleChangeDistrictSearch = (value) => {
		setDistrictSearch(value);
		setWardSearch(null);
		if (value != undefined) fetchWard(value);
		// fetchfoodDecriptionByAddress();
	};

	const handleChangeWardSearch = (value) => {
		setWardSearch(value);
		// fetchfoodDecriptionByAddress();
	};

	const handleChangeSearchOption = (event) => {
		setSearchOption(event.target.value);
		if (event.target.value == 1) {
			setIsShowAddressFilter(true);
		} else {
			setIsShowAddressFilter(false);
			setIsFilterByAddress(true);
		}
	};

	useEffect(() => {
		fetchCategories();
		const params = new URLSearchParams(location.search);
		const inputValueParam = params.get('search_query');
		const provinceParam = params.get('province');
		if (isFirstLoad && provinceParam) {
			setIsSearchByAddress(true);
			setCitySearch(provinceParam);
			setIsFirstLoad(false);
		}
		if (provinceParam) {
			setSearchOption(2);
			setIsShowAddressFilter(false);
			fetchfoodDecriptionByAddress();
		} else {
			setInputValue(inputValueParam || '');
			setSearchData(inputValueParam);
			fetchfoodDecription(inputValueParam);
		}
	}, []);

	useEffect(() => {
		if (isSearchByAddress || isFilterByAddress) {
			fetchfoodDecriptionByAddress();
			setIsSearchByAddress(false);
		}
	}, [citySearch, districtSearch, wardSearch]);

	const fetchCategories = async () => {
		const url = `${process.env.REACT_APP_SERVER}/api/v1/categories`;
		const resp = await sendRequest({
			url: url,
			method: "GET",
		})
		const transformedCategories = resp.data['content'].listCategory.map((item) => {
			return { value: item.id, label: item.name }
		})
		setListCategories(transformedCategories)
		console.log('Huy on da test: ' + listCategories);
	}
	const fetchfoodDecription = async (searchDataParam = '') => {
		var url = `${process.env.REACT_APP_SERVER}/api/v1/foods`;
		if (searchDataParam && searchDataParam != '') { url += `?keyword=${searchDataParam}`; }
		else if (searchData != '') { url += `?keyword=${searchData}`; }
		console.log(url);
		const resp = await sendRequest({
			url: url,
			method: "GET",
		})
		setfoodDecription(resp.data['content'])
		setAllFoodDescription(resp.data['content'])
	};
	useEffect(() => {
		setfoodDecriptionCorrect(mapGroupErrorFoodDes2Correct(foodDecription));
		// TODO: 
	}, [foodDecription]);
	const fetchfoodDecriptionByAddress = async () => {
		var url = `${process.env.REACT_APP_SERVER}/api/v1/foods/findByAddress`;
		if (citySearch) {
			url += `?province=${citySearch}`;
			if (districtSearch) {
				url += `&district=${districtSearch}`;
				if (wardSearch) {
					url += `&ward=${wardSearch}`;
				}
			}
		} else {
			url = `${process.env.REACT_APP_SERVER}/api/v1/foods`;
		}
		console.log(url);
		const resp = await sendRequest({
			url: url,
			method: "GET",
		})
		setfoodDecription(resp.data['content'])
		setAllFoodDescription(resp.data['content'])
		console.log('in fetch', resp.data['content'], foodDecription)
	};

	const fetchDistrict = async (provinceValue) => {
		var provinceId = listCityFilter.find(x => x.value === provinceValue).id;
		var url = 'https://vapi.vnappmob.com/api/province/district/' + provinceId;
		const resp = await sendRequest({
			url: url,
			method: "GET",
		})
		setListDistrictFilter(resp.data['results'].map(item => ({
			value: item.district_name, label: item.district_name, id: item.district_id
		})
		));
		setListDistrictSearch(resp.data['results'].map(item => ({
			value: item.district_name, label: item.district_name, id: item.district_id
		})
		));
	}

	const fetchWard = async (districtValue) => {
		var districtId = listDistrictFilter.find(x => x.value === districtValue).id;
		console.log('salad on the test: ' + districtId);
		var url = 'https://vapi.vnappmob.com/api/province/ward/' + districtId;
		const resp = await sendRequest({
			url: url,
			method: "GET",
		})
		setListWardFilter(resp.data['results'].map(item => ({
			value: item.ward_name, label: item.ward_name, id: item.ward_id
		})
		));
		setListWardSearch(resp.data['results'].map(item => ({
			value: item.ward_name, label: item.ward_name, id: item.ward_id
		})
		));
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
				return { ...price, checked: !price.checked }
			else
				return price
		})
		console.log('đổi lọc giá');
		setPriceFilter(newPriceFilter)
	};
	const onChangeRatingFilter = (id) => {
		const newRatingFilter = ratingFilter.map(rating => {
			if (rating.id === id)
				return { ...rating, checked: !rating.checked }
			else
				return rating
		})
		setRatingFilter(newRatingFilter)
	};
	const handleChangeCategoryFilter = (value) => {
		console.log(`selected ${value}`);
		setCategoryFilter(value);
	};

	const resetValueFunc = (arrayReset) => {
		return arrayReset.map(obj => {
			if (obj.checked === true) {
				return { ...obj, checked: false };
			}
			return obj;
		});
	}

	const clearFilter = () => {
		setFromTime(null);
		setToTime(null);

		const ratingReset = resetValueFunc(ratingFilter)
		setRatingFilter(ratingReset)

		const priceReset = resetValueFunc(priceFilter)
		setPriceFilter(priceReset)

		setCategoryFilter(null)

		setDistrictFilter(null)
		setWardFilter(null)
		setCityFilter(null);
	}

	const handleFilter = async () => {
		const checkPrice = (price) => {
			if (priceFilter.every(price => price.checked === false)) return true
			for (let p of priceFilter) {
				if (p.checked === true && (p.from <= price && (p.to == '以上' || price <= p.to)))
					return true
			}
			return false
		}
		const checkRating = (rating) => {
			if (!rating) return false;
			if (ratingFilter.every(rating => rating.checked === false)) return true

			for (let r of ratingFilter) {
				if (r.checked === false && (r.value <= rating && rating < r.value + 1))
					return false;
			}
			return true;
		}

		const checkCategory = (categoryId) => {
			if (!categoryFilter) return true;
			else if (categoryId === categoryFilter) return true;
			return false;
		}

		const checkTime = (from, to) => {
			var fromTimeFilter = new Date(fromTime);
			var toTimeFilter = new Date(toTime);
			var openTimeRestaurant = new Date(new Date().setHours(parseInt(from.slice(0, 2)), parseInt(from.slice(3, 5)), 0, 0));
			var closeTimeRestaurant = new Date(new Date().setHours(to.slice(0, 2), to.slice(3, 5), 0, 0));
			if (fromTime && toTime) {
				if (fromTimeFilter <= openTimeRestaurant && toTimeFilter >= closeTimeRestaurant) return true;
				else return false;
			} else if (fromTime) {
				if (fromTimeFilter <= openTimeRestaurant) return true;
				else return false;
			} else if (toTime) {
				if (toTimeFilter >= closeTimeRestaurant) return true;
				else return false;
			} else return true;
		}

		const checkProvince = (province) => {
			if (!cityFilter) return true;
			else if (province === cityFilter) return true;
			return false;
		}
		let newFoodDescription = allFoodDescription.filter(food => {
			return checkPrice(food.price) && checkRating(food.rating) && checkTime(food.restaurant.openTime, food.restaurant.closeTime) && checkCategory(food.category.id) && checkProvince(food.restaurant.address)
		})
		setfoodDecription(newFoodDescription)
		setPageinate(0)
	}

	const totalPage = () => {
		try {
			return Math.floor((foodDecriptionCorrect.length + pageSize - 1) / pageSize)
		} catch (error) {
			return 1
		}
	}
	return (
		<div className='search-container'>
			<div className="salutation">
				<strong> こんにちは、</strong>
				<div className="user-info">
					<Link className="img-container" to={`/profile`}>
						<img src={Avt} alt="" />
					</Link>
					<div className="user-coin d-flex mt-6"><img src="/library/dx/images/bnn-coin.png" alt="" className="coin-icon" /><strong>1000</strong></div>
				</div>
			</div>
			<div className="main-layout d-flex">
				<div className="filter-sidebar px-24">
					<h2><strong>検出</strong></h2>
					<div className="reference-link-list d-flex flex-direction-column">
						<Link to="/homepage/#ninkigaaru_foods" className="reference-link-item">
							<i className="fa fa-home"></i> 人気がある料理
						</Link>
						<Link  to="/homepage/#ninkigaaru_restaurants" className="reference-link-item">
							<i className="fa fa-home"></i> 人気があるレストラン
						</Link>
					</div>
					<hr className="divider"></hr>
					<div className="filter-box" style={{
						fontSize: '16px',
						fontWeight: 'bold',
						margin: ' 4px 0',
					}}>
						{/* <div className="fast-filter">
                            <p data-toggle="collapse" data-target="#fastFilter">
                                <i className="fa fa-chevron-down mr-6"></i>
                                <i className="fa fa-lock mr-6"></i>
                                食べ物
                            </p>
                            <div id="fastFilter" className="collapse">
                                <Button type="text">近く人気がある料理</Button>
                                <Button type="text" onClick={sortByPriceIncrease}>安いから高いまで値段</Button>
                                <Button type="text" onClick={sortByPriceDecrease}>高いから安いまで値段</Button>
                            </div>
                        </div> */}
						<div className="time-filter">
							<p data-toggle="collapse" data-target="#timeFilter">
								<i className="fa fa-chevron-down mr-6"></i>
								<i className="fa fa-lock mr-6"></i>
								営業時間
							</p>
							<div id="timeFilter" className="collapse row">
								<div className="col-xs-11 col-sm-11 col-md-5 col-lg-5" >
									<TimePicker placeholder='時間' showTime={{ format: 'HH:mm' }} format="HH:mm" value={fromTime} onChange={onChangeFromTime} />
								</div>
								<span className='col-xs-2 col-sm-2 col-md-2 col-lg-2' >~</span>
								<div className="col-xs-11 col-sm-11 col-md-5 col-lg-5" >
									<TimePicker placeholder='時間' showTime={{ format: 'HH:mm' }} format="HH:mm" value={toTime} onChange={onChangeToTime} />
								</div>
							</div>
						</div>
						<div className="time-filter">
							<p data-toggle="collapse" data-target="#starFilter">
								<i className="fa fa-chevron-down mr-6"></i>
								<i className="fa fa-lock mr-6"></i>
								評価
							</p>
							<div id="starFilter" className="collapse">
								{ratingFilter.map((rating) => (
									<label className="rate-star-item" key={rating.id}>
										<input type="checkbox"
											onChange={() => { onChangeRatingFilter(rating.id) }}
											checked={rating.checked}
											value={rating.checked} />
										<Rate disabled defaultValue={rating.value} />
									</label>
								))}
							</div>
						</div>
						<p data-toggle="collapse" data-target="#priceFilter">
							<i className="fa fa-chevron-down mr-6"></i>
							<i className="fa fa-lock mr-6"></i>
							値段
						</p>
						<div id="priceFilter" className="collapse">
							{priceFilter.map((price) => (
								<p className="rate-star-item" key={price.id}>
									<input type="checkbox"
										onChange={() => { onChangePriceFilter(price.id) }}
										defaultChecked={price.checked}
										checked={price.checked} />
									{/* {price.from}-{price.to} 円 */}
									{price.from} - {price.to} VNĐ
								</p>
							))}
						</div>

						<p data-toggle="collapse" data-target="#categoryFilter">
							<i className="fa fa-chevron-down mr-6"></i>
							<i className="fa fa-lock mr-6"></i>
							項目
						</p>
						<div id="categoryFilter" className="collapse">
							<Select
								showSearch
								placeholder="項目"
								optionFilterProp="children"
								value={categoryFilter}
								onChange={handleChangeCategoryFilter}

								options={listCategories}
								style={{ width: '100%', margin: '2px 0' }} />
						</div>

						{isShowAddressFilter == true ?
							(
								<React.Fragment>
									<p data-toggle="collapse" data-target="#cityFilter">
										<i className="fa fa-chevron-down mr-6"></i>
										<i className="fa fa-lock mr-6"></i>
										場所
									</p>
									<div id="cityFilter" className="collapse">
										<div >
											<Select
												allowClear
												placeholder='市'
												value={cityFilter}
												onChange={handleChangeCityFilter}
												options={listCityFilter}
												style={{ width: '100%', margin: '2px 0' }}
											/>
										</div>
										<div >
											<Select
												allowClear
												placeholder='区'
												value={districtFilter}
												onChange={handleChangeDistrictFilter}
												options={listDistrictFilter}
												style={{ width: '100%', margin: '2px 0' }}
											/>
										</div>
										<div >
											<Select
												allowClear
												placeholder='街'
												value={wardFilter}
												onChange={handleChangeWardFilter}
												options={listWardFilter}
												style={{ width: '100%', margin: '2px 0' }}
											/>
										</div>
									</div>
								</React.Fragment>
							) : (
								<div></div>
							)}
					</div>
					<div className="action-button d-flex mt-12">
						<button className="cancel-button" onClick={clearFilter}>クリア</button>
						<button className="confirm-button" onClick={handleFilter}>適用</button>
					</div>
				</div>
				<div className="h-content">
					<div className="row">
						<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
						</div>
						<div className="col-xs-12 col-sm-12 col-md-6 col-lg-2" >
							<select value={searchOption} onChange={handleChangeSearchOption} className="form-select select-search-option" aria-label="Default select example">
								<option value="1" selected><strong>料理の名前</strong></option>
								<option value="2">場所</option>
							</select>
						</div>
						{
							searchOption == 1 ? (
								<div className="col-xs-12 col-sm-12 col-md-6 col-lg-4" >
									<div className="search-box d-flex">
										<div className="search-icon"><button type="button" className="btn btn-link"><i className="fa fa-search" style={{ color: "#000" }}></i></button></div>
										<div className="search-text">
											<input type="text" placeholder='Nem cuốn' value={searchData} onChange={handleSearchData} onKeyUp={handleKeyUp} />
										</div>
									</div>
								</div>
							) : (
								<React.Fragment>
									<div id="addressSearch" className="address-search-block">
										<Select
											allowClear
											placeholder='市'
											value={citySearch}
											onChange={handleChangeCitySearch}
											options={listCityFilter}
											style={{ width: '33%', marginRight: "8px" }}
										/>
										<Select
											allowClear
											placeholder='区'
											value={districtSearch}
											onChange={handleChangeDistrictSearch}
											options={listDistrictSearch}
											style={{ width: '33%', marginRight: "8px" }}
										/>
										<Select
											allowClear
											placeholder='街'
											value={wardSearch}
											onChange={handleChangeWardSearch}
											options={listWardSearch}
											style={{ width: '33%', marginRight: "8px" }}
										/>
									</div>
								</React.Fragment>
							)
						}
					</div>
					<div className="row optionValue">
						<Radio.Group options={sortOptions} onChange={onChangeSort} value={sortValue} className='float-right mt-12 fs-1 optionValue ' />
					</div>
					<div className="food-list d-flex">
						{foodDecriptionCorrect.slice(pageinate * pageSize, (pageinate + 1) * pageSize).map((food, i) => {
							return (
								<FoodItem
									key={food.id}
									id={food.id}
									image_src={`${food.img[0]}`}
									rating={food.rating}
									name={food.name}
									price={food.price}
									description={food.description}
									restaurant={food.restaurant}
								/>
							)
						})}
					</div>
					<div className="row">
						<div className="col-xs-12 col-sm-12 col-md-6 col-lg-8" >
						</div>
					</div>
				</div>

			</div>
			<div className="pagination-box">
				{[...Array(totalPage())].map((x, i) =>
					<button 
						type="button"
						className={`btn btn-link pagination-page ${pageinate === i ? " pagination-page__selected" : ""}`}
						onClick={() => {
							setPageinate(i)
						}}
					>
						{i + 1}
					</button>
				)}
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
	getComponentsOfUserInLink: AuthActions.getComponentOfUserInLink,
}
/**
 * @param {FD[]} fds
 * @returns {FoodDecription[]}
 */
const mapGroupErrorFoodDes2Correct = (fds) => {
	const shuffledArr = array => array.sort(() => 0.5 - Math.random());
	const map = new Map();
	fds.forEach(fd => {
		const { id, img, ...rest } = fd;
		if (map.has(id)) {
			map.get(id).img.push(img);
			map.get(id).img = shuffledArr(map.get(id).img);
		} else {
			map.set(id, { ...rest, img: [img], id });
		}
	});
	return [...map.values()];
}
export default connect(mapState, mapDispatchToProps)(withTranslate(Search));

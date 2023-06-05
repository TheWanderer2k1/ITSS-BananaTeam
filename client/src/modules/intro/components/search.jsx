import { Button, Rate, DatePicker  } from 'antd';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withTranslate, IntlActions } from 'react-redux-multilingual';
import { AuthActions } from '../../auth/redux/actions';
import { getStorage, setStorage } from '../../../config';
import moment from "moment";
import store from '../../../redux/store';
import './intro.css';

const Search = ({ translate }) => {

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
                                <ul>
                                    <li>近く人気がある料理</li>
                                    <li>安いから高いまで値段</li>
                                    <li>高いから安いまで値段</li>
                                </ul>  
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
                                    <DatePicker />
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
                                    <DatePicker />
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
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-8" >
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4" >
                            <div className="search-box d-flex">
                                <div className="search-icon"><button type="button" class="btn btn-link"><i class="fa fa-search"></i></button></div>
                                <div className="search-text">
                                    <input type="text" placeholder='Nem cuốn'/>
                                </div>
                            </div>
                        </div>                            
                    </div>
                    
                    <div className="food-list d-flex">
                        <div className="food-item">
                            <div className="row d-flex">
                                <div className="food-image">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg" alt="" />
                                    <div className="food-rate">5 <i class="fa fa-star"></i></div>
                                </div>
                                <div className="food-info">
                                    <div className="food-name">Nem Cuốn (春巻き）</div>
                                    <div className="food-restaurant"><i class="fa fa-pin"></i> Hoàng Mai</div>
                                    <div className="food-price"><i class="fa fa-money"></i> 700円</div>
                                </div>
                            </div>
                        </div>
                        <div className="food-item">
                            <div className="row d-flex">
                                <div className="food-image">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg" alt="" />
                                    <div className="food-rate">5 <i class="fa fa-star"></i></div>
                                </div>
                                <div className="food-info">
                                    <div className="food-name">Nem Cuốn (春巻き）</div>
                                    <div className="food-restaurant"><i class="fa fa-location"></i>Hoàng Văn Thụ, Quận Hoàng Mai, Hà Nội</div>
                                    <div className="food-price"><i class="fa fa-money"></i> 700円</div>
                                </div>
                            </div>
                        </div>
                        <div className="food-item">
                            <div className="row d-flex">
                                <div className="food-image">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg" alt="" />
                                    <div className="food-rate">5 <i class="fa fa-star"></i></div>
                                </div>
                                <div className="food-info">
                                    <div className="food-name">Nem Cuốn (春巻き）</div>
                                    <div className="food-restaurant"><i class="fa fa-location"></i> Hoàng Mai</div>
                                    <div className="food-price"><i class="fa fa-money"></i> 700円</div>
                                </div>
                            </div>
                        </div>
                        <div className="food-item">
                            <div className="row d-flex">
                                <div className="food-image">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg" alt="" />
                                    <div className="food-rate">5 <i class="fa fa-star"></i></div>
                                </div>
                                <div className="food-info">
                                    <div className="food-name">Nem Cuốn (春巻き）</div>
                                    <div className="food-restaurant"><i class="fa fa-location"></i> Hoàng Mai</div>
                                    <div className="food-price"><i class="fa fa-money"></i> 700円</div>
                                </div>
                            </div>
                        </div>
                        <div className="food-item">
                            <div className="row d-flex">
                                <div className="food-image">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg" alt="" />
                                    <div className="food-rate">5 <i class="fa fa-star"></i></div>
                                </div>
                                <div className="food-info">
                                    <div className="food-name">Nem Cuốn (春巻き）</div>
                                    <div className="food-restaurant"><i class="fa fa-location"></i> Hoàng Mai</div>
                                    <div className="food-price"><i class="fa fa-money"></i> 700円</div>
                                </div>
                            </div>
                        </div>
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

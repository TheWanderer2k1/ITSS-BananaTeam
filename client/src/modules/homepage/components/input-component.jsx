import { Select  } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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

function InputComponent() {
  const [inputValue, setInputValue] = useState('');
	const [searchOption, setSearchOption] = useState(listSearchOption[0].id);
  const [citySearch, setCitySearch] = useState(null);
	const [districtSearch, setDistrictSearch] = useState(null);
	const [listDistrictFilter, setListDistrictFilter] = useState([]);
  const history = useHistory();

  const handleChange = (event) => {
    console.log('huy on the test: ' + setInputValue(event.target.value));
    setInputValue(event.target.value);
  };
  const handleChangeSearchOption = (event) => {
    setSearchOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      history.push(`/?search_query=${encodeURIComponent(inputValue)}`);
      console.log(inputValue);
    }
  };

  const handleChangeCitySearch = (value) => {
    setCitySearch(value);
    history.push(`/?province=${encodeURIComponent(value)}`);
  };

  const handleChangeDistrictSearch = (value) => {
    // setDistrictSearch(value);
    // fetchWard(value);
};

  return (
    <React.Fragment>
      <div class="input-row">
        
        <div className="dropdown-selectbox" >
          <select value={searchOption} onChange={handleChangeSearchOption} class="dropdown-selectform" aria-label="Default select example">
            <option value="1" selected>料理の名前</option>
            <option value="2">場所</option>
          </select>
        </div>
        <div className="location-selectlist" >
          {
            searchOption == 1 ? (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="食べ物で検索"
                  value={inputValue}
                  onChange={handleChange}
                  className="home-search-field input"
                />
              </form>        
            ) : (
              <div id="addressSearch" class="address-search">       
                <div class="dropdown-list-area">
                    <Select
                        allowClear
                        placeholder='市'
                        value={citySearch}
                        onChange={handleChangeCitySearch}
                        options={listCityFilter}
                        style={{ width: '100%' }}
                    />
                    <Select
                        allowClear
                        placeholder='区'
                        value={districtSearch}
                        options={[]}
                        style={{ width: '100%' , margin: '0 1px'}}
                    />
                    <Select
                        allowClear
                        placeholder='街'
                        value={districtSearch}
                        options={[]}
                        style={{ width: '100%' , margin: '0 1px'}}
                    />
                </div>
              </div>
            )
          }
        </div>
      </div>
    </React.Fragment>
  );
}

export default InputComponent;
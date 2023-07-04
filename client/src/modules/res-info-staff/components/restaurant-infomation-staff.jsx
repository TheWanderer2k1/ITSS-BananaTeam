import React,{ useEffect, useState } from 'react'
import { TimePicker } from 'antd';
import NavbarInteractive from '../../homepage/components/navbar-interactive'
import { sendRequest } from '../../../helpers/requestHelper';
import {  UploadFile } from '../../../common-components';
import { useHistory } from 'react-router-dom';
import { convertJsonObjectToFormData } from '../../../helpers/jsonObjectToFormDataObjectConverter';
import './restaurant-infomation-staff.css'

const RestaurantInfomationStaff = (props) => {
  const [resname, setName] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedProvine, setSelectedProvine] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [fromTime, setFromTime] = useState(null);
  const [selectedFromTime, setSelectedFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [selectedToTime, setSelectedToTime] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [detailedAddress, setDetailedAddress] = useState(null);
  const [contact, setContact] = useState(null);
  const [description, setDescription] = useState(null);
  const [uploadImg, setUploadImg] = useState({recommendFiles: []});
  const [restaurantInfo, setRestaurantInfo] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [resIdParam, setResIdParan] = useState([]);
  const [logoImg, setLogoImage] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchrestaurantinfo();
    setLogoImage(restaurantInfo.avatar);
    fetchProvines();
    const params = new URLSearchParams(location.search);
    const resIdParamloc = params.get('res_id');
    setResIdParan(resIdParamloc);
    window.scrollTo(0, 0);
  }, []); 

  useEffect(() => {
    fetchrestaurantinfo();
  }, [resIdParam]);

  useEffect(() => {
    
    setName(restaurantInfo.name);
    setSelectedProvine(restaurantInfo.province);
    setSelectedDistrict(restaurantInfo.district);
    setSelectedWard(restaurantInfo.ward);
    setSelectedFromTime(restaurantInfo.openTime);
    setSelectedToTime(restaurantInfo.closeTime);
    setFromDate(restaurantInfo.from);
    setToDate(restaurantInfo.to);
    setDetailedAddress(restaurantInfo.detailedAddress);
    setContact(restaurantInfo.phone);
    setDescription(restaurantInfo.description);
    setPreviewImage(restaurantInfo.avatar);

  }, [restaurantInfo]);

  const fetchrestaurantinfo = async () => {
    var url = 'http://localhost:8000/api/v1/restaurant/'
        url +=`${resIdParam}`;
    const resp = await sendRequest({
        url: url,
        //url: `https://mocki.io/v1/32491675-2162-45a2-886b-d2df95cf568b`,
        method: "GET",
      })
    setRestaurantInfo(resp.data['content']);
  };

  const fetchProvines = async () => {
    const resp = await sendRequest({
        url: `https://mocki.io/v1/14ea5248-d198-4b30-95c2-e7115f39f942`,
        method: "GET",
      })
    setLocations(resp.data['content']);
  };

  const handleProvineChange = (event) => {
    const selectedName = event.target.value;
    const selectedLocation = locations.find((location) => location.name === selectedName);
    setSelectedProvine(event.target.value);
    if (selectedLocation) {
      setDistrict(selectedLocation.districts);
    }
  };

  const handleDistrictChange = (event) => {
    const selectedName = event.target.value;
    const selectedLocation = district.find((location) => location.name === selectedName);
    setSelectedDistrict(event.target.value);
    if (selectedLocation) {
      setWard(selectedLocation.wards);
    }
  };

  const handleWardChange = (event) => {
    setSelectedWard(event.target.value);  
  }

  const onChangeFromTime = (date, dateString) => {
    const selectedTime = new Date(date);
    setFromTime(date);
    const hours = selectedTime.getHours().toString().padStart(2, '0'); 
    const minutes = selectedTime.getMinutes().toString().padStart(2, '0'); 
    setSelectedFromTime(`${hours}:${minutes}`);
  };
  const onChangeToTime = (date, dateString) => {
    const selectedTime = new Date(date);
    setToTime(date);
    const hours = selectedTime.getHours().toString().padStart(2, '0'); 
    const minutes = selectedTime.getMinutes().toString().padStart(2, '0'); 
    setSelectedToTime(`${hours}:${minutes}`);
  };

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };
  const handleChangeFile = (files) => { 
    const recommendFiles = files.map(x => ({
      url: x.urlFile,
      fileUpload: x.fileUpload
    }))
    setUploadImg(recommendFiles);
  };
  const handleLogoChange = (files) => { 
    if(files.length){
      setPreviewImage(files[0].urlFile);
      setLogoImage(files[0]);
    }else{
      setPreviewImage(restaurantInfo.avatar);
    }
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleContactChange = (event) => {
    setContact(event.target.value);
  };

  const handleAddressChange = (event) => {
    setDetailedAddress(event.target.value);
  };
  const history = useHistory();
  const handleMenuButton = () => {
    history.push(`/foods?res_id=${resIdParam}&staff=1`);
  }
  let formData;
  const handleSaveButton = async () => {
    const requestData = {
      name: resname,
      province: selectedProvine,
      district: selectedDistrict,
      ward: selectedWard,
      detailedAddress: detailedAddress,
      openTime: selectedFromTime,
      closeTime: selectedToTime,
      from: fromDate,
      to: toDate,
      phone: contact,
      description: description,
    };
    formData = convertJsonObjectToFormData(requestData);
    
    if (uploadImg && uploadImg.length > 0) {
      uploadImg.forEach(obj => {
          formData.append('img', obj.fileUpload)
      })
    }
    
    if (logoImg) {
      formData.append('avatar',logoImg.fileUpload)
    }
    
    try {
      var url = 'http://localhost:8000/api/v1/restaurant/'
      url +=`${resIdParam}`;
      console.log(JSON.stringify(requestData));
      const resp = await sendRequest({
        url: url,
        method: 'PUT',
        data: formData
      });
    } catch (error) {
      console.error(error);
    }
    fetchrestaurantinfo();
  };

  return (
    <div className="restaurant-infomation-staff-container">
        <title>Restaurant-Infomation-Staff - Portly Cooked Tarsier</title>
        <meta
          property="og:title"
          content="Restaurant-Infomation-Staff - Portly Cooked Tarsier"
        />
      <NavbarInteractive rootClassName="navbar-interactive-root-class-name2"></NavbarInteractive>
      <div className="restaurant-infomation-staff-container1">
        <img
          alt="image"
          src="library/dx/images/maplocation.jpg"
          className="restaurant-infomation-staff-image"
        />
        {previewImage && <img
          alt="image"
          src={process.env.REACT_APP_SERVER + previewImage}
          className="restaurant-infomation-staff-logo"
        />}
        <h1 className="restaurant-infomation-staff-text">{restaurantInfo.name}</h1>
        <UploadFile onChange={handleLogoChange} />
      </div>
      <div className="restaurant-infomation-staff-container2">
        <img
          className="restaurant-infomation-image2"
        />
        <h1 className="restaurant-infomation-staff-res-info-heading">
          Thông tin nhà hàng
        </h1>
        <img
          className="restaurant-infomation-image2"
        />
      </div>
      <div className="restaurant-infomation-staff-res-info-container">
        <span className="restaurant-infomation-staff-res-name">
          Tên nhà hàng
        </span>
        <input
          type="text"
          placeholder={restaurantInfo.name}
          className="restaurant-infomation-staff-resname-input input"
          onChange={handleNameChange}
        />
        <span className="restaurant-infomation-staff-res-name1">Địa chỉ</span>
        <div className="restaurant-infomation-staff-select-dropdown-container">
          <select className="restaurant-infomation-staff-location-select" onChange={handleProvineChange}>
            <option value="">Select Province</option>
            {locations.map((location) => (
              <option key={location.code} value={location.name}>
                {location.name}
              </option>
            ))}
          </select>
            <select className="restaurant-infomation-staff-location-select" onChange={handleDistrictChange}>
              <option value="">Select District</option>
              {district && district.map((location) => (
                <option key={location.code} value={location.name}>
                  {location.name}
                </option>
              ))}
            </select>
            <select className="restaurant-infomation-staff-location-select" onChange={handleWardChange}>
              <option value="">Select Ward</option>
              {ward && ward.map((location) => (
                <option key={location.id} value={location.name}>
                  {location.name}
                </option>
              ))}
            </select>
        </div>
        <input
          type="text"
          placeholder={restaurantInfo.detailedAddress}
          className="restaurant-infomation-staff-resname-input1 input"
          onChange={handleAddressChange}
        />
        <span className="restaurant-infomation-staff-res-name2">
          <span>Thời gian mở cửa</span>
          <br></br>
          <br></br>
        </span>
        <div className="restaurant-infomation-staff-time-select-container">
          <select className="restaurant-infomation-staff-select" onChange={handleFromDateChange}>
            <option value="thứ hai">T2</option>
            <option value="thứ ba">T3</option>
            <option value="thứ tư">T4</option>
            <option value="thứ năm">T5</option>
            <option value="thứ sáu">T6</option>
            <option value="thứ bảy">T7</option>
            <option value="chủ nhật">CN</option>
          </select>
          <img
            src="/library/dx/images/tilde.png"
            alt="tilde"
            className="restaurant-infomation-staff-image4"
          />
          <select className="restaurant-infomation-staff-select1" onChange={handleToDateChange}>
          <option value="thứ hai">T2</option>
            <option value="thứ ba">T3</option>
            <option value="thứ tư">T4</option>
            <option value="thứ năm">T5</option>
            <option value="thứ sáu">T6</option>
            <option value="thứ bảy">T7</option>
            <option value="chủ nhật">CN</option>
          </select>
          <div id="timeFilter" class="collapse in row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
              <TimePicker showTime={{ format: 'HH:mm' }} format="HH:mm" value={fromTime} onChange={onChangeFromTime}/>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
              <TimePicker showTime={{ format: 'HH:mm' }} format="HH:mm" value={toTime} onChange={onChangeToTime}/>
            </div>
          </div>
        </div>
        <span className="restaurant-infomation-staff-res-name3">
          <span>Thông tin liên hệ</span>
          <br></br>
          <br></br>
        </span>
        <textarea
          placeholder={restaurantInfo.phone}
          className="restaurant-infomation-staff-contact-text textarea"
          onChange={handleContactChange}
        ></textarea>
        <span className="restaurant-infomation-staff-res-name4">
          <span>Mô tả</span>
          <br></br>
          <br></br>
        </span>
          <textarea
            placeholder={restaurantInfo.description}
            className="restaurant-infomation-staff-description-text textarea"
            onChange={handleDescriptionChange}
          ></textarea>
          <span className="restaurant-infomation-staff-res-name5">
            <span>Hình ảnh</span>
            <br></br>
            <br></br>
          </span>
          <div className="restaurant-infomation-staff-image-slider-container">
            <div className="upload-container">
            <UploadFile multiple={true} onChange={handleChangeFile} />
            </div>
          <div className="restaurant-infomation-staff-slider">
          {restaurantInfo.img && restaurantInfo.img.map((image, index) => (
            <img
              key={index}
              src={"http://localhost:8000" + image}
              alt={`Image ${index + 1}`}
              className="restaurant-image"
            />
          ))}
          </div>
        </div>
        <div className="restaurant-infomation-staff-container3">
          <button
            type="button"
            className="restaurant-infomation-staff-button button"
            onClick={handleMenuButton}
          >
            Menu
          </button>
          <button
            type="button"
            className="restaurant-infomation-staff-button1 button"
            onClick={handleSaveButton}
          >
            <span>
              <span>Lưu</span>
              <br></br>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default RestaurantInfomationStaff

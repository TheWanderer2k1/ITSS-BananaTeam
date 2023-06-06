import React, { useEffect, useState } from "react";
import FoodItem from "./food-item";
import { sendRequest } from '../../../helpers/requestHelper';

function ListComponent(props) {
  const [searchData, setSearchData] = useState('');
  const [foodDecription, setfoodDecription] = useState([]);
    
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
// fetchfoodDecription();

  return (
    <React.Fragment>
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
    </React.Fragment>

  );
}

export default ListComponent;

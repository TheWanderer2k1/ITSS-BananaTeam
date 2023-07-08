import React, { useEffect, useState } from "react";
import FoodItem from "./food-item";
import { sendRequest } from '../../../helpers/requestHelper';

function ListComponent() {
  const [foodDecription, setfoodDecription] = useState([]);

  useEffect(() => {
    fetchfoodDecription();
  }, []); 

  const fetchfoodDecription = async () => {
    const resp = await sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/api/v1/home`,
        method: "GET",
      })
    console.log('in home', resp.data['content']['foodDecription'])
    setfoodDecription(resp.data['content']['foodDecription'])
  };
 
  const firstFourfoodDecription = foodDecription.slice(0, 4);
  const remainingfoodDecription = foodDecription.slice(4);

  return (
    <div className="home-fav-food">
      <div className="home-line-1">
        {firstFourfoodDecription.map((food) => (
          <FoodItem
            id = {food.id}
            key={food.id}
            image_src={food.img}
            text={food.name}
          />
        ))}
      </div>
      <div className="home-line-2">
        {remainingfoodDecription.map((food) => (
          <FoodItem
            id = {food.id}
            key={food.id}
            image_src={food.img}
            text={food.name}
          />
        ))}
      </div>
    </div>
  );
}

export default ListComponent;

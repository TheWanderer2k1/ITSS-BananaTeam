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
        url: `https://mocki.io/v1/72763f80-9ce7-4523-9957-ff0192e559ed`,
        method: "GET",
      })
    console.log('in home', resp.data['data']['foodDecription'])
    setfoodDecription(resp.data['data']['foodDecription'])
  };
 
  const firstFourfoodDecription = foodDecription.slice(0, 4);
  const remainingfoodDecription = foodDecription.slice(4);

  return (
    <div className="home-fav-food">
      <div className="home-line-1">
        {firstFourfoodDecription.map((food) => (
          <FoodItem
            key={food.id}
            image_src={food.img}
            text={food.name}
          />
        ))}
      </div>
      <div className="home-line-2">
        {remainingfoodDecription.map((food) => (
          <FoodItem
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

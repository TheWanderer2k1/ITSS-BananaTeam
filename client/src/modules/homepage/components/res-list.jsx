import React, { useEffect, useState } from "react";
import ResItem from "./res-item";
import { sendRequest } from '../../../helpers/requestHelper';

function ListComponent() {
  const [restaurant, setrestaurant] = useState([]);

  useEffect(() => {
    fetchrestaurant();
  }, []); 

  const fetchrestaurant = async () => {
    const resp = await sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/api/v1/home`,
        method: "GET",
      })
    console.log('restaurant', resp.data['content']['restaurant'])
    setrestaurant(resp.data['content']['restaurant'])
  };
 
  const firstFourrestaurant = restaurant.slice(0, 4);
  const remainingrestaurant = restaurant.slice(4);
  console.log(restaurant);
  return (
    <div className="home-fav-res">
      <div className="res-line-1">
        {firstFourrestaurant.map((restaurant) => (
          <ResItem
            key={restaurant.ID}
            image_src={restaurant.img}
            res_id={restaurant.ID}
            text={restaurant.Name}
          />
        ))}
      </div>
      <div className="res-line-2">
        {remainingrestaurant.map((restaurant) => (
          <ResItem
            key={restaurant.ID}
            image_src={restaurant.img}
            res_id={restaurant.ID}
            text={restaurant.Name}
          />
        ))}
      </div>
    </div>
  );
}

export default ListComponent;

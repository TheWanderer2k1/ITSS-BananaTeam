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
        url: `https://mocki.io/v1/72763f80-9ce7-4523-9957-ff0192e559ed`,
        method: "GET",
      })
    console.log('in home', resp.data['data']['restaurant'])
    setrestaurant(resp.data['data']['restaurant'])
  };
 
  const firstFourrestaurant = restaurant.slice(0, 4);
  const remainingrestaurant = restaurant.slice(4);

  return (
    <div className="home-fav-res">
      <div className="res-line-1">
        {firstFourrestaurant.map((restaurant) => (
          <ResItem
            key={restaurant.id}
            image_src={restaurant.img}
            text={restaurant.name}
          />
        ))}
      </div>
      <div className="res-line-2">
        {remainingrestaurant.map((restaurant) => (
          <ResItem
            key={restaurant.id}
            image_src={restaurant.img}
            text={restaurant.name}
          />
        ))}
      </div>
    </div>
  );
}

export default ListComponent;

import React, { useEffect, useState } from "react";
import ResItem from "./res-item";

function ListComponent() {
  //const [restaurant, setrestaurant] = useState([]);

  const jsonString = `{
    "success": true,
    "message": "Get data success",
    "data": {
      "food_slider": [
        {
          "img": "abc.jpg",
          "foodDescriptionId": 15
        }
      ],
      "categories": [
        {
          "img": "abc.jpg",
          "categoryId": 14
        }
      ],
      "restaurant": [
        {
          "id": 1,
          "img": "food1.jpg",
          "name": "Cơm gà"
        },
        {
            "id": 2,
            "img": "food1.jpg",
            "name": "Cơm gà"
        },
        {
            "id": 3,
            "img": "food1.jpg",
            "name": "Cơm gà"
        },
        {
            "id": 4,
            "img": "food1.jpg",
            "name": "Cơm gà"
        },
        {
            "id": 1,
            "img": "food1.jpg",
            "name": "Cơm gà"
          },
          {
              "id": 2,
              "img": "food1.jpg",
              "name": "Cơm gà"
          },
          {
              "id": 3,
              "img": "food1.jpg",
              "name": "Cơm gà"
          },
          {
              "id": 4,
              "img": "food1.jpg",
              "name": "Cơm gà"
          }
      ],
      "restaurant": [
        {
          "id": 2,
          "img": "restaurant1.jpg",
          "name": "Kơm ngon"
        }
      ]
    }
  }`;

  /*
  useEffect(() => {
    fetchrestaurant();
  }, []); 

  const fetchrestaurant = () => {
    fetch("https://mocki.io/v1/7765e32a-6765-486e-af9a-56220ac6f88a") // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => setrestaurant(data.restaurant))
      .catch((error) => console.error("Error fetching restaurant:", error));
  };
  */
 //Part này là để fix cứng dữ liệu ( test )
  const jsonData = JSON.parse(jsonString);
  const restaurant = jsonData.data.restaurant;
 //
 
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

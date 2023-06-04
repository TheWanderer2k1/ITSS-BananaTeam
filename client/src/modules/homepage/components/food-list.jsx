import React, { useEffect, useState } from "react";
import FoodItem from "./food-item";

function ListComponent() {
  //const [foodDecription, setfoodDecription] = useState([]);

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
      "foodDecription": [
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
    fetchfoodDecription();
  }, []); 

  const fetchfoodDecription = () => {
    fetch("https://mocki.io/v1/7765e32a-6765-486e-af9a-56220ac6f88a") // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => setfoodDecription(data.foodDecription))
      .catch((error) => console.error("Error fetching foodDecription:", error));
  };
  */
 //Part này là để fix cứng dữ liệu ( test )
  const jsonData = JSON.parse(jsonString);
  const foodDecription = jsonData.data.foodDecription;
 //
 
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
